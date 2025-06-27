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
import styles from './Configurator.module.css';

const stepComponentMap = {
  size: SizeStep,
  sponge: SpongeStep,
  creme: CremeStep,
  gelly: GellyStep,
  crisp: CrispStep,
  decorations: DecorationsStep,
  text: TextStep,
  delivery: DeliveryStep,
};

const Configurator = () => {
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
        <div className={styles.pricePlaceholder}>
            <h4>💰 Price Calculator</h4>
            <p>Pricing functionality coming soon</p>
        </div>
      </div>
    </div>
  );
};

export default Configurator;