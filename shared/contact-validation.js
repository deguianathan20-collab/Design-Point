export const CONTACT_LIMITS = Object.freeze({
  fullname: 100,
  email: 254,
  phone: 24,
});

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_CHARACTERS_PATTERN = /^[0-9+()\s-]{8,24}$/;

function clean(value, maxLength) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function hasValidPhoneDigits(value) {
  const digitCount = value.replace(/\D/g, '').length;
  return digitCount >= 8 && digitCount <= 15;
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

  if (!PHONE_CHARACTERS_PATTERN.test(data.phone) || !hasValidPhoneDigits(data.phone)) {
    errors.phone = 'Enter a phone number containing 8 to 15 digits.';
  }

  return { data, errors };
}
