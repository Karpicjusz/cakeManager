import React, { useState } from 'react';
import { useConfigurator } from '../../../hooks/useConfigurator';
import { CAKE_OPTIONS } from '../../../constants/cakeOptions';
import styles from './Step.module.css';

const DecorationsStep = () => {
  const { state, dispatch } = useConfigurator();
  const stepConfig = CAKE_OPTIONS.decorations;
  const [fileName, setFileName] = useState('');
  const [details, setDetails] = useState(state.cake.decorationDetails || '');
  const maxChars = 300;
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      dispatch({
        type: 'COMPLETE_STEP',
        payload: { stepId: stepConfig.id, nextStepId: stepConfig.next, value: { decorationFile: file } },
      });
    }
  };

  const handleDetailsChange = (e) => {
      const value = e.target.value.slice(0, maxChars);
      setDetails(value);
      dispatch({
        type: 'COMPLETE_STEP',
        payload: { stepId: stepConfig.id, nextStepId: stepConfig.next, value: { decorationDetails: value } },
      });
  }

  return (
    <div className={styles.controlGroup}>
      <div className={styles.fileUploadContainer}>
        <label htmlFor="inspiration-upload" className={styles.fileUploadLabel}>
            <span className={styles.uploadIcon} aria-hidden="true">📸</span>
            <div className={styles.uploadText}>
                <span className={styles.uploadTitle}>Upload Inspiration Photo</span>
            </div>
        </label>
        <span className={styles.uploadSubtitle}>JPG, PNG, max 5MB</span>
        <input type="file" id="inspiration-upload" className={styles.fileUploadInput} accept="image/*" onChange={handleFileChange} />
        {fileName && <div className={styles.fileName}>Selected: {fileName}</div>}
      </div>

      <label htmlFor="decoration-details">Describe Your Decoration Ideas</label>
      <textarea
        id="decoration-details"
        className={styles.textarea}
        placeholder="Tell us about your vision..."
        value={details}
        onChange={handleDetailsChange}
        maxLength={maxChars}
      ></textarea>
      <div className={styles.validationMessage}>
        {details.length}/{maxChars} characters
      </div>
      
      <div className={styles.infoBox}>
          <h4>Popular Decoration Options</h4>
          <ul className={styles.decorationList}>
              {stepConfig.popular.map(item => <li key={item}>{item}</li>)}
          </ul>
      </div>
    </div>
  );
};

export default DecorationsStep;