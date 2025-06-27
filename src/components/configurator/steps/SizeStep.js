import React from 'react';
import { useConfigurator } from '../../../hooks/useConfigurator';
import { TIER_CONFIGS, CAKE_OPTIONS } from '../../../constants/cakeOptions';
import styles from './Step.module.css';

const SizeStep = () => {
  const { state, dispatch } = useConfigurator();
  const { persons } = state.cake;

  const handleSliderChange = (e) => {
    const newPersons = parseInt(e.target.value, 10);
    dispatch({ type: 'SET_PERSONS', payload: newPersons });
    dispatch({
      type: 'COMPLETE_STEP',
      payload: { stepId: 'size', nextStepId: CAKE_OPTIONS.size.next, value: { persons: newPersons } },
    });
  };

  const config = persons <= 20 ? TIER_CONFIGS.single : persons <= 70 ? TIER_CONFIGS.double : TIER_CONFIGS.triple;

  return (
    <div className={styles.controlGroup}>
      <label htmlFor="persons-slider">Number of People</label>
      <div className={styles.sliderContainer}>
        <input
          type="range"
          id="persons-slider"
          className={styles.personsSlider}
          min="10"
          max="200"
          value={persons}
          step="1"
          onChange={handleSliderChange}
        />
      </div>
      <div className={styles.personsDisplay}>
        <div className={styles.personsCount}>{persons}</div>
        <div className={styles.personsLabel}>people</div>
      </div>
      <div className={styles.infoBox}>
        <h4>{config.name}</h4>
        <p>{config.desc}</p>
      </div>
    </div>
  );
};

export default SizeStep;