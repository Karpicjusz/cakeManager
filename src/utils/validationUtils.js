export const validateCustomText = (text) => {
  if (!text.trim()) return { isValid: true, count: 0 };
  const words = text.trim().split(/\s+/).filter(word => word.length > 0);
  return {
    isValid: words.length <= 3,
    count: words.length,
  };
};

export const validateEmail = (email) => {
  // Basic email regex (can be more complex, but this covers most cases)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhoneNumber = (phone) => {
  // Polish phone number regex:
  // - Optional +48 prefix
  // - Allows for spaces between digits (e.g., 123 456 789 or +48 123 456 789)
  // - Requires 9 digits after optional +48 and spaces
  const polishPhoneRegex = /^(?:\+48)?\s?\d{3}\s?\d{3}\s?\d{3}$/;
  // Also check for a simple 9-digit number without country code
  const simpleNineDigitRegex = /^\d{9}$/;
  return polishPhoneRegex.test(phone) || simpleNineDigitRegex.test(phone);
};