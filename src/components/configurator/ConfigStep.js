import React from 'react';
import { useConfigurator } from '../../hooks/useConfigurator';
import styles from './ConfigStep.module.css';

const ConfigStep = ({ stepId, title, children }) => {
  const { state, dispatch } = useConfigurator();
  const { steps, activeStep, cake } = state;
  const stepState = steps[stepId];

  const isExpanded = activeStep === stepId;
  const { isCompleted, status } = stepState;

  const getStatusClass = () => {
    if (status === 'locked') return styles.locked;
    if (stepId === 'text') {
      if (cake.customText) return styles.completed;
      if (status === 'active') return styles.active;
      return '';
    }
    if (isCompleted) return styles.completed;
    if (status === 'active') return styles.active;
    return '';
  };

  const handleToggle = (e) => {
    // Allow click or Enter/Space key
    if (!e || e.type === 'click' || (e.type === 'keydown' && (e.key === 'Enter' || e.key === ' '))) {
      dispatch({ type: 'SET_ACTIVE_STEP', payload: isExpanded ? null : stepId });
    }
  };
  
 const getStatusText = () => {
    if (stepId === 'size') return `${cake.persons} people`;
    if (cake[`${stepId}Type`]) return cake[`${stepId}Type`].replace('-', ' ');
    
    if (stepId === 'creme') {
      if (cake.cremeType1 && cake.cremeType2) return `${cake.cremeType1.replace('-', ' ')} & ${cake.cremeType2.replace('-', ' ')}`;
      if (cake.cremeType1) return `${cake.cremeType1.replace('-', ' ')} (1 of 2)`;
      return 'Choose 2 flavours';
    }
    if (stepId === 'delivery') {
      const isDeliveryComplete = cake.deliveryDate && cake.deliveryTime && cake.contactName && cake.contactEmail && cake.contactPhone;
      if (isDeliveryComplete) {
        return new Date(cake.deliveryDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      }
      return 'Enter details';
    }
    if (stepId === 'delivery' && cake.deliveryDate) return new Date(cake.deliveryDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    if (stepId === 'text') {
      if (cake.customText) return `"${cake.customText}"`;
      if (steps[stepId].status !== 'locked') return 'Skipped';
      return `Choose ${stepId}`;
    }
    if (stepId === 'decorations') {
      if (isCompleted) return 'Completed';
      return 'Choose Decorations';
    }
    if (isCompleted) return 'Completed';
    return `Choose ${stepId}`;
  };

  return (
    <div className={`${styles.configStep} ${getStatusClass()} ${isExpanded ? styles.expanded : ''}`}>
      <div className={styles.stepHeader} onClick={handleToggle} onKeyDown={handleToggle} aria-expanded={isExpanded} aria-controls={`step-content-${stepId}`} tabIndex={0}>
        <div className={styles.stepTitle}>
          <span className={styles.stepNumber}>{Object.keys(steps).indexOf(stepId) + 1}</span>
          {title}
          {/* Optional badge for optional steps */}
          {['gelly', 'crisp', 'decorations', 'text'].includes(stepId) && (
            <span className={styles.optionalBadge}>Optional</span>
          )}
        </div>
        <div className={styles.headerRight}>
            <span className={styles.stepStatus}>{getStatusText()}</span>
            <span className={styles.stepChevron} aria-hidden="true">▼</span>
        </div>
      </div>
      <div className={styles.stepContent} id={`step-content-${stepId}`}>
        {children}
      </div>
    </div>
  );
};

export default ConfigStep;