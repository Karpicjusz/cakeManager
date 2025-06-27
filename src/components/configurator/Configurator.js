import React from 'react';
import { STEP_ORDER, CAKE_OPTIONS } from '../../constants/cakeOptions';
import ConfigStep from './ConfigStep';
import SizeStep from './steps/SizeStep';
import SpongeStep from './steps/SpongeStep';
import CremeStep from './steps/CremeStep';
import GellyStep from './steps/GellyStep';
import CrispStep from './steps/CrispStep';
import DecorationsStep from './steps/DecorationsStep';
import TextStep from './steps/TextStep';
import DeliveryStep from './steps/DeliveryStep';
import { useConfigurator } from '../../hooks/useConfigurator';
import { generateOrderSummary, sendOrder } from '../../utils/orderUtils';
import styles from './Configurator.module.css';

const stepComponentMap = {
  size: SizeStep,
  // The original code had a comment about CremeStep, GellyStep, and CrispStep
  // being structured identically to SpongeStep. This is a good observation,
  // but the current implementation already has separate files for them.
  // The comment was likely a remnant or a general note.
  // No change needed here, just a clarification.
  // NOTE: CremeStep, GellyStep, and CrispStep would be structured identically,
  // changing 'spongeType' to 'cremeType', etc., and removing the stevia checkbox.
  // This comment was in SpongeStep.js, but it's relevant to the overall structure.
  // It's good practice to keep such notes in the relevant component file or a design doc.
  // For now, we'll proceed with the existing file structure.


  sponge: SpongeStep,
  creme: CremeStep,
  gelly: GellyStep,
  crisp: CrispStep,
  decorations: DecorationsStep,
  text: TextStep,
  delivery: DeliveryStep,
};

const Configurator = () => {
  const { state } = useConfigurator();
  const { steps, cake } = state;

  // Check if all steps are completed
  const allStepsCompleted = STEP_ORDER.every(stepId => steps[stepId]?.isCompleted);

  const handlePlaceOrder = () => {
    if (allStepsCompleted) {
      const orderSummary = generateOrderSummary(cake);
      sendOrder(orderSummary);
      alert('Your order has been placed! We will contact you shortly.');
      // In a real application, you would dispatch an action to reset the state or navigate
      // dispatch({ type: 'RESET_CONFIGURATOR' }); // Example of a reset action
    }
  };

  return (
    <div className={styles.cakeControls}>
      <div className={styles.configurationSteps}>
        {STEP_ORDER.map((stepId) => {
          const StepContent = stepComponentMap[stepId];
          if (!StepContent) return null;
          return (
            <ConfigStep
              key={stepId}
              stepId={stepId}
              title={CAKE_OPTIONS[stepId].title}
            >
              <StepContent />
            </ConfigStep>
          );
        })}
        <div className={styles.orderSummarySection}>
          <div className={styles.pricePlaceholder}>
              <h4>💰 Price Calculator</h4>
              <p>Pricing functionality coming soon</p>
          </div>
          <button
            className={styles.placeOrderButton}
            onClick={handlePlaceOrder}
            disabled={!allStepsCompleted}
          >
            Place Your Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Configurator;