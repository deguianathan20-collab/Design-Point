import { validateContactDetails } from '../shared/contact-validation.js';

const MAX_BODY_BYTES = 8_192;
const RESEND_TIMEOUT_MS = 10_000;

function clean(value, maxLength) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function sendJson(response, status, payload) {
  response.status(status).setHeader('Content-Type', 'application/json; charset=utf-8');
  response.setHeader('Cache-Control', 'no-store');
  return response.json(payload);
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return sendJson(response, 405, { message: 'Method not allowed.' });
  }

  const contentLength = Number(request.headers['content-length'] || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return sendJson(response, 413, { message: 'Request is too large.' });
  }

  let parsedBody;
  try {
    parsedBody = request.body;
  } catch {
    return sendJson(response, 400, { message: 'The request body is not valid JSON.' });
  }

  const body = parsedBody && typeof parsedBody === 'object' ? parsedBody : {};
  const { data, errors } = validateContactDetails(body);
  const { fullname, email, phone } = data;
  const website = clean(body.website, 120);

  // Quietly accept likely bot submissions so the endpoint is not useful to spammers.
  if (website) {
    return sendJson(response, 200, { ok: true });
  }

  if (Object.keys(errors).length > 0) {
    return sendJson(response, 400, {
      message: 'Please correct the highlighted fields and try again.',
      errors,
    });
  }

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    console.error('Contact email environment variables are not configured.');
    return sendJson(response, 503, {
      message: 'Online enquiries are temporarily unavailable. Please call 1300 123 456.',
    });
  }

  let resendResponse;
  try {
    resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': `website-enquiry/${crypto.randomUUID()}`,
      },
      signal: AbortSignal.timeout(RESEND_TIMEOUT_MS),
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: [CONTACT_TO_EMAIL],
        reply_to: email,
        subject: 'New website proposal enquiry',
        text: [`Name: ${fullname}`, `Email: ${email}`, `Phone: ${phone}`].join('\n'),
      }),
    });
  } catch (error) {
    console.error('Resend request could not be completed:', error);
    return sendJson(response, 502, {
      message: 'We could not send your request. Please call 1300 123 456 or try again.',
    });
  }

  if (!resendResponse.ok) {
    const errorText = await resendResponse.text();
    console.error('Resend request failed:', resendResponse.status, errorText);
    return sendJson(response, 502, {
      message: 'We could not send your request. Please call 1300 123 456 or try again.',
    });
  }

  return sendJson(response, 200, { ok: true });
}
