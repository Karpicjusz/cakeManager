import React from 'react';
import { useConfigurator } from '../../hooks/useConfigurator';
import { CAKE_OPTIONS } from '../../constants/cakeOptions';
import styles from './CakeVisualization.module.css';

const CakeVisualization = () => {
  const { state } = useConfigurator();
  const { cake, isLayerView } = state;

  const spongeColor = CAKE_OPTIONS.sponge.options.find(o => o.id === cake.spongeType)?.color || 'linear-gradient(135deg, #F4D03F, #F7DC6F)';
  const cremeColor = CAKE_OPTIONS.creme.options.find(o => o.id === cake.cremeType)?.color || 'linear-gradient(135deg, #FFFEF7, #F8F6F0)';
  const gellyColor = CAKE_OPTIONS.gelly.options.find(o => o.id === cake.gellyType)?.color || 'linear-gradient(135deg, #FF6B6B, #FF8E8E)';
  const crispColor = CAKE_OPTIONS.crisp.options.find(o => o.id === cake.crispType)?.color || 'linear-gradient(135deg, #D4A574, #E6C589)';

  return (
    <div className={`${styles.visualizationContainer} ${isLayerView ? styles.layerMode : ''}`}>
        {/* Cake View */}
        <div className={`${styles.cakeContainer} ${isLayerView ? styles.hidden : ''}`}>
            <div className={`${styles.cakeTier} ${styles.tier3} ${cake.tiers === 3 ? styles.active : ''}`}></div>
            <div className={`${styles.cakeTier} ${styles.tier2} ${cake.tiers >= 2 ? styles.active : ''}`}></div>
            <div className={`${styles.cakeTier} ${styles.tier1}`}></div>
        </div>

        {/* Layer View */}
        <div className={`${styles.layerView} ${isLayerView ? styles.active : ''}`}>
            <div className={styles.cakeLayer} style={{ flex: 2.5, background: spongeColor }}><span className={styles.layerLabel}>Sponge</span></div>
            <div className={styles.cakeLayer} style={{ flex: 1.8, background: cremeColor }}><span className={styles.layerLabel}>Creme</span></div>
            {cake.gellyType && (
              <div className={styles.cakeLayer} style={{ flex: 1.2, background: gellyColor }}><span className={styles.layerLabel}>Gelly Fruit</span></div>
            )}
            <div className={styles.cakeLayer} style={{ flex: 2.5, background: spongeColor }}><span className={styles.layerLabel}>Sponge</span></div>
            <div className={styles.cakeLayer} style={{ flex: 1.8, background: cremeColor }}><span className={styles.layerLabel}>Creme</span></div>
            {cake.crispType && (
              <div className={styles.cakeLayer} style={{ flex: 1.0, background: crispColor }}><span className={styles.layerLabel}>Crisp</span></div>
            )}
            <div className={styles.cakeLayer} style={{ flex: 2.5, background: spongeColor }}><span className={styles.layerLabel}>Sponge</span></div>
        </div>
    </div>
  );
};

export default CakeVisualization;