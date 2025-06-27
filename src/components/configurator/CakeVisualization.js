import React, { useMemo } from 'react';
import { useConfigurator } from '../../hooks/useConfigurator';
import { CAKE_OPTIONS } from '../../constants/cakeOptions';
import styles from './CakeVisualization.module.css';

const CakeVisualization = () => {
  const { state } = useConfigurator();
  const { cake, isLayerView } = state;

  const { spongeColor, cremeColor, gellyColor, crispColor } = useMemo(() => {
    const getColor = (type, defaultColor) =>
      CAKE_OPTIONS[type].options.find(o => o.id === cake[`${type}Type`])?.color || defaultColor;

    return {
      spongeColor: getColor('sponge', 'linear-gradient(135deg, #F4D03F, #F7DC6F)'),
      cremeColor: getColor('creme', 'linear-gradient(135deg, #FFFEF7, #F8F6F0)'),
      gellyColor: getColor('gelly', 'linear-gradient(135deg, #FF6B6B, #FF8E8E)'),
      crispColor: getColor('crisp', 'linear-gradient(135deg, #D4A574, #E6C589)'),
    };
  }, [cake.spongeType, cake.cremeType, cake.gellyType, cake.crispType]);

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