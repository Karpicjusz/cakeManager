export const validateCustomText = (text) => {
  if (!text.trim()) return { isValid: true, count: 0 };
  const words = text.trim().split(/\s+/).filter(word => word.length > 0);
  return {
    isValid: words.length <= 3,
    count: words.length,
  };
};