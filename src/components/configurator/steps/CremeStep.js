import React from 'react';
import { useConfigurator } from '../../../hooks/useConfigurator';
import { CAKE_OPTIONS } from '../../../constants/cakeOptions';
import Option from '../../common/Option';
import styles from './Step.module.css';

const CremeStep = () => {
  const { state, dispatch } = useConfigurator();
  const { cake } = state;
  const stepConfig = CAKE_OPTIONS.creme;

  const handleSelectLayer = (layerNum, optionId) => {
    // 'otherLayerType' is no longer needed as we allow duplicate flavors and removed the prevention logic.
    const currentLayerType = layerNum === 1 ? 'cremeType1' : 'cremeType2';

    // Allow unselection: If the user clicks the currently selected option for the *same* layer, unselect it.
    let newValue = optionId;
    if (cake[currentLayerType] === optionId) {
        newValue = null; // Unselect the current layer's flavor
    }

    // Dispatch the action to update only the specific layer
    dispatch({
      type: 'COMPLETE_STEP',
      payload: {
        stepId: stepConfig.id,
        nextStepId: stepConfig.next,
        value: { [currentLayerType]: newValue },
      },
    });
  };

  const isCremeStepCompleted = cake.cremeType1 && cake.cremeType2;

  return (
    <div className={styles.controlGroup}>
      <label>Creme Layer 1 Flavour</label>
      <div className={styles.optionGrid}>
        {stepConfig.options.map((option) => (
          <Option
            key={option.id}
            option={option} // Pass the option object
            isSelected={cake.cremeType1 === option.id} // Check if this option is selected for Layer 1
            onSelect={() => handleSelectLayer(1, option.id)} // Handler for Layer 1 selection
          >
            {cake.cremeType1 === option.id && <span className={styles.selectedBadge}>Layer 1</span>}
            {/* Indicate if this flavor is used in the other layer, but not currently selected for this layer */}
            {cake.cremeType2 === option.id && cake.cremeType1 !== option.id && <span className={styles.usedInOtherLayerBadge}>Used in Layer 2</span>}
          </Option>
        ))}
      </div>

      <label style={{ marginTop: '1.5rem' }}>Creme Layer 2 Flavour</label>
      <div className={styles.optionGrid}>
        {stepConfig.options.map((option) => (
          <Option
            key={option.id}
            option={option} // Pass the option object
            isSelected={cake.cremeType2 === option.id} // Check if this option is selected for Layer 2
            onSelect={() => handleSelectLayer(2, option.id)} // Handler for Layer 2 selection
          >
            {cake.cremeType2 === option.id && <span className={styles.selectedBadge}>Layer 2</span>}
            {/* Indicate if this flavor is used in the other layer, but not currently selected for this layer */}
            {cake.cremeType1 === option.id && cake.cremeType2 !== option.id && <span className={styles.usedInOtherLayerBadge}>Used in Layer 1</span>}
          </Option>
        ))}
      </div>

      {!isCremeStepCompleted && ( // Display general completion message
        <div className={styles.infoBox}>
          <p>Please select two creme flavours for your cake layers.</p>
        </div>
      )}
    </div>
  );
};
 
export default CremeStep;