import React from 'react';
import { useConfigurator } from '../../../hooks/useConfigurator';
import { CAKE_OPTIONS } from '../../../constants/cakeOptions';
import Option from '../../common/Option';
import styles from './Step.module.css';

const GellyStep = () => {
  const { state, dispatch } = useConfigurator();
  const { cake } = state;
  const stepConfig = CAKE_OPTIONS.gelly;

  const handleSelect = (optionId) => {
    if (cake.gellyType === optionId) {
      // Unselect if already selected
      dispatch({
        type: 'COMPLETE_STEP',
        payload: {
          stepId: stepConfig.id,
          nextStepId: stepConfig.next,
          value: { gellyType: null },
          uncomplete: true,
        },
      });
    } else {
      dispatch({
        type: 'COMPLETE_STEP',
        payload: {
          stepId: stepConfig.id,
          nextStepId: stepConfig.next,
          value: { gellyType: optionId },
        },
      });
    }
  };

  return (
    <div className={styles.controlGroup}>
      <label>Choose Your Gelly Fruit Flavour</label>
      <div className={styles.optionGrid}>
        {stepConfig.options.map((option) => (
          <Option
            key={option.id}
            option={option}
            isSelected={cake.gellyType === option.id}
            onSelect={() => handleSelect(option.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default GellyStep;