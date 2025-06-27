export const getMinDeliveryDate = () => {
  const today = new Date();
  const minDate = new Date(today.setDate(today.getDate() + 7));
  return minDate.toISOString().split('T')[0];
};

export const formatDeliveryDate = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  // Adjust for timezone offset to prevent day-before issues
  const adjustedDate = new Date(date.valueOf() + date.getTimezoneOffset() * 60000);
  return adjustedDate.toLocaleDateString('en-US', options);
};