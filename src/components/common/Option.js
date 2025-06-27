import React from 'react';
import styles from './Option.module.css';

const Option = ({ option, isSelected, onSelect, children }) => {
  return (
    <div
      className={`${styles.configOption} ${isSelected ? styles.selected : ''}`}
      onClick={onSelect}
    >
      <div className={styles.optionHeader}>
        <div className={styles.optionColorSwatch} style={{ background: option.color }}></div>
        <div className={styles.optionDetails}>
          <div className={styles.optionName}>{option.name}</div>
          <div className={styles.optionDescription}>{option.description}</div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Option;