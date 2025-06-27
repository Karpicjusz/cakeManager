import React from 'react';
import { useConfigurator } from '../../../hooks/useConfigurator';
import { CAKE_OPTIONS } from '../../../constants/cakeOptions';
import Option from '../../common/Option';
import styles from './Step.module.css';

const CrispStep = () => {
  const { state, dispatch } = useConfigurator();
  const { cake } = state;
  const stepConfig = CAKE_OPTIONS.crisp;

  const handleSelect = (optionId) => {
    if (cake.crispType === optionId) {
      // Unselect if already selected
      dispatch({
        type: 'COMPLETE_STEP',
        payload: {
          stepId: stepConfig.id,
          nextStepId: stepConfig.next,
          value: { crispType: null },
          uncomplete: true,
        },
      });
    } else {
      dispatch({
        type: 'COMPLETE_STEP',
        payload: {
          stepId: stepConfig.id,
          nextStepId: stepConfig.next,
          value: { crispType: optionId },
        },
      });
    }
  };

  return (
    <div className={styles.controlGroup}>
      <label>Choose Your Crisp Layer</label>
      <div className={styles.optionGrid}>
        {stepConfig.options.map((option) => (
          <Option
            key={option.id}
            option={option}
            isSelected={cake.crispType === option.id}
            onSelect={() => handleSelect(option.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default CrispStep;