import React from 'react';
import Configurator from '../components/configurator/Configurator';
import CakeVisualization from '../components/configurator/CakeVisualization';
import styles from './ConfiguratorPage.module.css';

const ConfiguratorPage = () => {
  return (
    <div className={styles.configuratorPage}>
        <div className={styles.sectionHeader}>
            <h2>Design Your Perfect Cake</h2>
            <p>Use our interactive cake configurator to design a cake that's perfect for your event</p>
        </div>
        <div className={styles.configuratorLayout}>
            <div className={styles.controls}>
                <Configurator />
            </div>
            <div className={styles.visualization}>
                <CakeVisualization />
            </div>
        </div>
    </div>
  );
};

export default ConfiguratorPage;