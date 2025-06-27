import React, { useEffect, useState, useCallback } from 'react';
import { useConfigurator } from '../../../hooks/useConfigurator';
import { CAKE_OPTIONS } from '../../../constants/cakeOptions';
import { getMinDeliveryDate, formatDeliveryDate } from '../../../utils/dateUtils';
import styles from './Step.module.css';
import { validateEmail, validatePhoneNumber } from '../../../utils/validationUtils';

const DeliveryStep = () => {
    const { state, dispatch } = useConfigurator();
    const stepConfig = CAKE_OPTIONS.delivery;
    const { deliveryDate, deliveryTime, contactName, contactEmail, contactPhone } = state.cake;

    const handleDateChange = (e) => {
        // Clear any date-related errors if they were present
        setErrors(prev => ({ ...prev, deliveryDate: '' }));
        if (!e.target.value) {
            setErrors(prev => ({ ...prev, deliveryDate: 'Delivery date is required.' }));
        }
        dispatch({
            type: 'COMPLETE_STEP',
            payload: {
                stepId: stepConfig.id,
                nextStepId: stepConfig.next,
                value: { deliveryDate: e.target.value }
            }
        });
    };

    const handleTimeChange = (e) => {
        // Clear any time-related errors if they were present
        setErrors(prev => ({ ...prev, deliveryTime: '' }));
        if (!e.target.value) {
            setErrors(prev => ({ ...prev, deliveryTime: 'Preferred time is required.' }));
        }
        dispatch({
            type: 'COMPLETE_STEP',
            payload: {
                stepId: stepConfig.id,
                nextStepId: stepConfig.next,
                value: { deliveryTime: e.target.value }
            }
        });
    };

    const [errors, setErrors] = useState({
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        deliveryDate: '',
        deliveryTime: '',
    });

    const validateField = useCallback((name, value) => {
        let error = '';
        switch (name) {
            case 'contactName':
                if (!value.trim()) error = 'Name is required.';
                break;
            case 'contactEmail':
                if (!value.trim()) error = 'Email is required.';
                else if (!validateEmail(value)) error = 'Invalid email format.';
                break;
            case 'contactPhone':
                if (!value.trim()) error = 'Phone number is required.';
                else if (!validatePhoneNumber(value)) error = 'Invalid Polish phone number format (e.g., +48 123456789 or 123456789).';
                break;
            case 'deliveryDate':
                if (!value) error = 'Delivery date is required.';
                break;
            case 'deliveryTime':
                if (!value) error = 'Preferred time is required.';
                break;
            default:
                break;
        }
        setErrors(prev => ({ ...prev, [name]: error }));
        return !error; // Return true if valid, false if error
    }, []);

    const handleContactChange = (e) => {
        const { name, value } = e.target;
        // Update the state immediately
        dispatch({
            type: 'COMPLETE_STEP',
            payload: {
                stepId: stepConfig.id,
                nextStepId: stepConfig.next,
                value: { [name]: value }
            }
        });
        // Validate the field
        validateField(name, value);
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        validateField(name, value);
            
        };


    // Effect to ensure step completion status is updated when any field changes
    useEffect(() => {
        const isStepComplete = deliveryDate && deliveryTime && contactName && contactEmail && contactPhone;
        const allFieldsValid =
            validateField('deliveryDate', deliveryDate) &&
            validateField('deliveryTime', deliveryTime) &&
            validateField('contactName', contactName) &&
            validateField('contactEmail', contactEmail) &&
            validateField('contactPhone', contactPhone);

        // Only mark as complete if all fields are filled AND all fields are valid
        const finalCompletionStatus = isStepComplete && allFieldsValid;

        // Dispatch COMPLETE_STEP to update isCompleted status for the delivery step
        // This ensures the overall step completion is correctly reflected, especially if fields are cleared or become invalid.
        dispatch({
            type: 'COMPLETE_STEP',
            payload: {
                stepId: stepConfig.id,
                nextStepId: stepConfig.next, // This might not be needed if it's the last step
                value: { deliveryDate, deliveryTime, contactName, contactEmail, contactPhone },
                uncomplete: !finalCompletionStatus, // Explicitly mark as uncomplete if not all fields are filled or valid
            }
        });
    }, [deliveryDate, deliveryTime, contactName, contactEmail, contactPhone, dispatch, stepConfig.id, stepConfig.next, validateField]);

    return (
        <div className={styles.controlGroup}>
            <label htmlFor="delivery-date">Choose Delivery Date</label>
            <input 
                // Consider adding a `required` attribute for HTML5 validation
                // This would provide immediate browser feedback.
                // However, the current validation is handled by the context reducer.
                // For a better UX, combine both.
                // required
                type="date"
                id="delivery-date"
                className={styles.dateInput}
                min={getMinDeliveryDate()}
                onChange={handleDateChange}
                onBlur={handleBlur}
                value={state.cake.deliveryDate || ''}
            />
            <label htmlFor="delivery-time" style={{marginTop: '1rem', display: 'block'}}>Preferred Pick-up Time</label>
            <input
                type="time"
                id="delivery-time"
                className={styles.dateInput}
                onChange={handleTimeChange}
                onBlur={handleBlur}
                value={deliveryTime || ''}
            />
            {errors.deliveryTime && <p className={`${styles.validationMessage} ${styles.error}`}>{errors.deliveryTime}</p>}

            <label htmlFor="contact-name" style={{marginTop: '1.5rem', display: 'block'}}>Your Name</label>
            <input
                type="text"
                id="contact-name"
                name="contactName"
                className={styles.textInput}
                placeholder="Full Name"
                value={contactName || ''}
                onChange={handleContactChange}
                onBlur={handleBlur}
                required
            />
            {errors.contactName && <p className={`${styles.validationMessage} ${styles.error}`}>{errors.contactName}</p>}

            <label htmlFor="contact-email" style={{marginTop: '1rem', display: 'block'}}>Email Address</label>
            <input
                type="email"
                id="contact-email"
                name="contactEmail"
                className={styles.textInput}
                placeholder="your.email@example.com"
                value={contactEmail || ''}
                onChange={handleContactChange}
                onBlur={handleBlur}
                required
            />
            {errors.contactEmail && <p className={`${styles.validationMessage} ${styles.error}`}>{errors.contactEmail}</p>}

            <label htmlFor="contact-phone" style={{marginTop: '1rem', display: 'block'}}>Phone Number</label>
            <input
                type="tel" // Use type="tel" for phone numbers
                id="contact-phone"
                name="contactPhone"
                className={styles.textInput}
                placeholder="+1 (555) 123-4567"
                value={contactPhone || ''}
                onChange={handleContactChange}
                onBlur={handleBlur}
                required
            />
            {errors.contactPhone && <p className={`${styles.validationMessage} ${styles.error}`}>{errors.contactPhone}</p>}

            <div className={styles.infoBox}>
                <p>📅 Orders must be placed at least 7 days in advance.</p>
                {deliveryDate && <p className={styles.selectedDate}>Delivery for: {formatDeliveryDate(deliveryDate)}</p>}
                {contactName && contactEmail && contactPhone && <p className={styles.selectedDate}>Contact: {contactName}</p>}
            </div>
        </div>
    );
};

export default DeliveryStep;