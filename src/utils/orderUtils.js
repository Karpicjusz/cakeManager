import { CAKE_OPTIONS } from '../constants/cakeOptions';
import { formatDeliveryDate } from './dateUtils';

/**
 * Generates a human-readable summary of the cake order.
 * @param {object} cakeState - The cake object from the configurator state.
 * @returns {string} A formatted string representing the order summary.
 */
export const generateOrderSummary = (cakeState) => {
  const {
    persons,
    tiers,
    spongeType,
    useStevia,
    cremeType1,
    cremeType2,
    gellyType,
    crispType,
    decorationFile,
    decorationDetails,
    customText,
    deliveryDate,
    deliveryTime,
    contactName,
    contactEmail,
    contactPhone,
  } = cakeState;

  const getOptionName = (stepId, optionId) =>
    CAKE_OPTIONS[stepId]?.options?.find(o => o.id === optionId)?.name || 'N/A';

  let summary = `--- Moli Cakes Order Summary ---\n\n`;
  summary += `Customer Details:\n`;
  summary += `  Name: ${contactName}\n`;
  summary += `  Email: ${contactEmail}\n`;
  summary += `  Phone: ${contactPhone}\n\n`;

  summary += `Cake Configuration:\n`;
  summary += `  Serves: ${persons} people (${tiers} tier(s))\n`;
  summary += `  Sponge: ${getOptionName('sponge', spongeType)} ${useStevia ? '(with Stevia/Erythritol)' : ''}\n`;
  summary += `  Creme Layer 1: ${getOptionName('creme', cremeType1)}\n`;
  summary += `  Creme Layer 2: ${getOptionName('creme', cremeType2)}\n`;
  summary += `  Gelly Fruit: ${gellyType ? getOptionName('gelly', gellyType) : 'None'}\n`;
  summary += `  Crisp Layer: ${crispType ? getOptionName('crisp', crispType) : 'None'}\n`;
  summary += `  Decorations: ${decorationDetails || 'None provided'} ${decorationFile ? `(File: ${decorationFile.name})` : ''}\n`;
  summary += `  Custom Text: "${customText || 'None'}"\n`;
  summary += `  Delivery Date: ${deliveryDate ? formatDeliveryDate(deliveryDate) : 'N/A'}\n`;
  summary += `  Preferred Time: ${deliveryTime || 'N/A'}\n\n`;
  summary += `--- End Order Summary ---`;

  return summary;
};

/**
 * Simulates sending the order summary.
 * In a real application, this would be an API call to a backend service.
 * @param {string} orderSummary - The formatted order summary string.
 */
export const sendOrder = (orderSummary) => {
  console.log('Simulating order submission...');
  console.log('Order Details to be sent:\n', orderSummary);

  // --- Actual API call to your Node.js backend ---
  fetch('http://localhost:5000/api/send-order-email', { // Adjust URL if your backend is on a different port/host
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ orderSummary }),
  })
  .then(response => response.json())
  .then(data => console.log('Order sent successfully:', data))
  .catch(error => console.error('Error sending order:', error))
  .finally(() => {
    console.log('Order submission process completed.');
  });
};