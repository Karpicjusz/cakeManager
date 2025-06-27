import React from 'react';
import { useConfigurator } from '../../../hooks/useConfigurator';
import { CAKE_OPTIONS } from '../../../constants/cakeOptions';
import Option from '../../common/Option';
import styles from './Step.module.css';

const CremeStep = () => {
  const { state, dispatch } = useConfigurator();
  const { cake } = state;
  const stepConfig = CAKE_OPTIONS.creme;

  const handleSelect = (optionId) => {
    dispatch({
      type: 'COMPLETE_STEP',
      payload: {
        stepId: stepConfig.id,
        nextStepId: stepConfig.next,
        value: { cremeType: optionId },
      },
    });
  };

  return (
    <div className={styles.controlGroup}>
      <label>Choose Your Creme Flavour</label>
      <div className={styles.optionGrid}>
        {stepConfig.options.map((option) => (
          <Option
            key={option.id}
            option={option}
            isSelected={cake.cremeType === option.id}
            onSelect={() => handleSelect(option.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default CremeStep;