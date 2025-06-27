import React, { useState, useEffect } from 'react';
import { useConfigurator } from '../../../hooks/useConfigurator';
import { CAKE_OPTIONS } from '../../../constants/cakeOptions';
import { validateCustomText } from '../../../utils/validationUtils';
import styles from './Step.module.css';

const TextStep = () => {
    const { state, dispatch } = useConfigurator();
    const stepConfig = CAKE_OPTIONS.text;
    const [text, setText] = useState(state.cake.customText);
    const [validation, setValidation] = useState({ isValid: true, count: 0 });

    useEffect(() => {
        const validationResult = validateCustomText(text);
        setValidation(validationResult);
        if (validationResult.isValid) {
            dispatch({
                type: 'COMPLETE_STEP',
                payload: {
                    stepId: stepConfig.id,
                    nextStepId: stepConfig.next,
                    value: { customText: text },
                },
            });
        }
    }, [text, dispatch, stepConfig.id, stepConfig.next]);

    const getValidationMessage = () => {
        if (!text) return "Enter up to 3 words.";
        if (!validation.isValid) return `Too many words! (${validation.count}/3)`;
        return `${validation.count} of 3 words used.`;
    }

    return (
        <div className={styles.controlGroup}>
            <label htmlFor="custom-text">Cake Message (Max 3 Words)</label>
            <div className={styles.textInputContainer}>
                <input 
                    type="text" 
                    id="custom-text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className={`${styles.textInput} ${!validation.isValid ? styles.error : ''}`} 
                    placeholder="e.g., Happy Birthday"
                />
                <div className={`${styles.validationMessage} ${!validation.isValid ? styles.error : ''}`}>
                    {getValidationMessage()}
                </div>
            </div>
        </div>
    );
};

export default TextStep;