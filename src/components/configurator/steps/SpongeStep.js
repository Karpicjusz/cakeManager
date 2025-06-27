import React from 'react';
import { useConfigurator } from '../../../hooks/useConfigurator';
import { CAKE_OPTIONS } from '../../../constants/cakeOptions';
import Option from '../../common/Option';
import styles from './Step.module.css';

const SpongeStep = () => {
  const { state, dispatch } = useConfigurator();
  const { cake } = state;
  const stepConfig = CAKE_OPTIONS.sponge;

  const handleSelect = (optionId) => {
    dispatch({
      type: 'COMPLETE_STEP',
      payload: {
        stepId: stepConfig.id,
        nextStepId: stepConfig.next,
        value: { spongeType: optionId, useStevia: false },
      },
    });
  };

  const handleSteviaChange = (e) => {
    dispatch({
      type: 'COMPLETE_STEP',
      payload: {
        stepId: stepConfig.id,
        nextStepId: stepConfig.next,
        value: { useStevia: e.target.checked }
      }
    });
    // This does not move to next step, just updates a value
  }

  return (
    <div className={styles.controlGroup}>
      <label>Choose Your Sponge Type</label>
      <div className={styles.optionGrid}>
        {stepConfig.options.map((option) => (
          <Option
            key={option.id}
            option={option}
            isSelected={cake.spongeType === option.id}
            onSelect={() => handleSelect(option.id)}
          >
            <div className={styles.sugarOption} onClick={e => e.stopPropagation()}>
                <input 
                    type="checkbox" 
                    id={`${option.id}-stevia`}
                    onChange={handleSteviaChange}
                    checked={cake.useStevia && cake.spongeType === option.id}
                    disabled={cake.spongeType !== option.id}
                />
                <label htmlFor={`${option.id}-stevia`}>Use Stevia/Erythritol</label>
            </div>
          </Option>
        ))}
      </div>
    </div>
  );
};
export default SpongeStep;
// NOTE: CremeStep, GellyStep, and CrispStep would be structured identically,
// changing 'spongeType' to 'cremeType', etc., and removing the stevia checkbox.