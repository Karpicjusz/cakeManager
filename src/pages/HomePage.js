import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.heroContainer}>
        <div className={styles.heroContent}>
          <h1>Artistic <span className={styles.highlight}>Custom Cakes</span> Made Perfect</h1>
          <p>Every cake is delicious, different, and extra detailed. We create stunning custom cakes that make your special moments unforgettable.</p>
          <div className={styles.ctaButtons}>
            <Link to="/configure-cake" className={`${styles.btn} ${styles.btnPrimary}`}>Design Your Cake</Link>
            <Link to="/portfolio" className={`${styles.btn} ${styles.btnSecondary}`}>View Portfolio</Link>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.cakeContainer}>
            <div className={`${styles.cakeTier} ${styles.tier3}`}></div>
            <div className={`${styles.cakeTier} ${styles.tier2}`}></div>
            <div className={`${styles.cakeTier} ${styles.tier1}`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;