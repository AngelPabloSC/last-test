
export const validationRules = {


  required: 'This field is required.',

  // ── Character Limits ────────────────────────────────────────────────────────
  maxLength: {
    fullName: { value: 25,  message: 'Maximum 25 characters allowed.' },
    email:    { value: 30,  message: 'Maximum 30 characters allowed.' },
    phone:    { value: 15,   message: 'Maximum 15 characters allowed.' },
    address:  { value: 50,  message: 'Maximum 50 characters allowed.' },
    city:     { value: 30,  message: 'Maximum 30 characters allowed.' },
    text:     { value: 250, message: 'Maximum 250 characters allowed.' },
    password: { value: 16,  message: 'Maximum 16 characters allowed.' },
  },

  // ── Email ─────────────────────────────────────────────────────────────────
  email: {
    value:   /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/,
    message: 'Please enter a valid email address (e.g. admin@novasolutions.com).',
  },


  password: {
    value:   /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
    message: 'Minimum 8 characters, including 1 uppercase letter, 1 number, and 1 special character (e.g. !@#$).',
  },

  // ── Full name ─────────────────────────────────────────────────────────────
  // Letters (including accented), spaces, hyphens. Min 2 chars.
  fullName: {
    value:   /^[A-Za-záéíóúÁÉÍÓÚñÑüÜ\s\-]{2,}$/,
    message: 'Please enter a valid full name (letters and spaces only, min. 2 characters).',
  },

  // ── Phone ─────────────────────────────────────────────────────────────────
  // 7 to 15 digits, optional leading +
  phone: {
    value:   /^\+?[0-9]{7,15}$/,
    message: 'Please enter a valid phone number (7–15 digits, e.g. +13001234567).',
  },

  // ── ID / Cédula ───────────────────────────────────────────────────────────
  // 6 to 12 numeric digits
  cedula: {
    value:   /^[0-9]{6,12}$/,
    message: 'ID number must be between 6 and 12 digits.',
  },

  // ── ZIP code ──────────────────────────────────────────────────────────────
  // 5 digits or USPS 5+4 format (12345-6789)
  zipCode: {
    value:   /^\d{5}(-\d{4})?$/,
    message: 'Please enter a valid ZIP code (e.g. 12345 or 12345-6789).',
  },

  // ── URL ───────────────────────────────────────────────────────────────────
  url: {
    value:   /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-./?%&=]*)?$/i,
    message: 'Please enter a valid URL (e.g. https://novasolutions.com).',
  },

  // ── Numbers only ──────────────────────────────────────────────────────────
  onlyNumbers: {
    value:   /^\d+$/,
    message: 'Only numbers are allowed.',
  },

  // ── Letters only ──────────────────────────────────────────────────────────
  onlyLetters: {
    value:   /^[A-Za-záéíóúÁÉÍÓÚñÑüÜ\s]+$/,
    message: 'Only letters are allowed.',
  },

  // ── City & State ──────────────────────────────────────────────────────────
  // Format: City, ST or City,ST
  cityState: {
    value:   /^[a-zA-Z\s]+,\s*[a-zA-Z]{1,3}$/,
    message: 'Please use the format: City, State (e.g., Albany, NY or Troy,NY).',
  },
};
