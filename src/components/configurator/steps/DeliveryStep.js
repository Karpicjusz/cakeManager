import React from 'react';
import { useConfigurator } from '../../../hooks/useConfigurator';
import { CAKE_OPTIONS } from '../../../constants/cakeOptions';
import { getMinDeliveryDate, formatDeliveryDate } from '../../../utils/dateUtils';
import styles from './Step.module.css';

const DeliveryStep = () => {
    const { state, dispatch } = useConfigurator();
    const stepConfig = CAKE_OPTIONS.delivery;

    const handleDateChange = (e) => {
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
        dispatch({
            type: 'COMPLETE_STEP',
            payload: {
                stepId: stepConfig.id,
                nextStepId: stepConfig.next,
                value: { deliveryTime: e.target.value }
            }
        });
    };

    return (
        <div className={styles.controlGroup}>
            <label htmlFor="delivery-date">Choose Delivery Date</label>
            <input 
                type="date"
                id="delivery-date"
                className={styles.dateInput}
                min={getMinDeliveryDate()}
                onChange={handleDateChange}
                value={state.cake.deliveryDate || ''}
            />
            <label htmlFor="delivery-time" style={{marginTop: '1rem', display: 'block'}}>Preferred Pick-up Time</label>
            <input
                type="time"
                id="delivery-time"
                className={styles.dateInput}
                onChange={handleTimeChange}
                value={state.cake.deliveryTime || ''}
            />
            <div className={styles.infoBox}>
                <p>📅 Orders must be placed at least 7 days in advance.</p>
                {state.cake.deliveryDate && 
                    <p className={styles.selectedDate}>
                        Delivery for: {formatDeliveryDate(state.cake.deliveryDate)}
                    </p>
                }
            </div>
        </div>
    );
};

export default DeliveryStep;