export const CONTACT_LIMITS = Object.freeze({
  fullname: 100,
  email: 254,
  phone: 24,
});

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_CHARACTERS_PATTERN = /^[0-9+()\s-]{6,24}$/;
const AUSTRALIAN_PHONE_PATTERN = /^(?:0(?:[2378]\d{8}|4\d{8})|13\d{4}|1[38]00\d{6})$/;

function clean(value, maxLength) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function normaliseAustralianPhone(value) {
  const digits = value.replace(/\D/g, '');
  if (!digits.startsWith('61')) return digits;

  const nationalNumber = digits.slice(2);
  return nationalNumber.startsWith('1') ? nationalNumber : `0${nationalNumber}`;
}

export function sanitizeAustralianPhoneInput(value) {
  const allowedCharacters = typeof value === 'string' ? value.replace(/[^0-9+()\s-]/g, '') : '';
  return allowedCharacters.replace(/(?!^)\+/g, '');
}

export function validateContactDetails(values) {
  const data = {
    fullname: clean(values.fullname, CONTACT_LIMITS.fullname),
    email: clean(values.email, CONTACT_LIMITS.email),
    phone: clean(values.phone, CONTACT_LIMITS.phone),
  };
  const errors = {};

  if (data.fullname.length < 2) {
    errors.fullname = 'Enter at least 2 characters.';
  }

  if (!EMAIL_PATTERN.test(data.email)) {
    errors.email = 'Enter an email address in the format name@example.com.';
  }

  if (
    !PHONE_CHARACTERS_PATTERN.test(data.phone) ||
    !AUSTRALIAN_PHONE_PATTERN.test(normaliseAustralianPhone(data.phone))
  ) {
    errors.phone = 'Enter a valid Australian mobile, landline, 13, 1300, or 1800 number.';
  }

  return { data, errors };
}
