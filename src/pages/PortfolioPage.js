import React from 'react';
import styles from './PortfolioPage.module.css';

const portfolioItems = [
  { title: 'Elegant Wedding Cakes', desc: 'Multi-tier wedding cakes designed to match your perfect day' },
  { title: 'Birthday Celebrations', desc: 'Custom birthday cakes that bring joy to every celebration' },
  { title: 'Corporate Events', desc: 'Professional cakes for business celebrations and milestones' },
  { title: 'Special Occasions', desc: 'Unique designs for anniversaries, graduations, and more' },
];

const PortfolioPage = () => {
  return (
    <div className={styles.portfolio}>
      <div className={styles.portfolioContainer}>
        <div className={styles.sectionHeader}>
          <h2>Our Cake Portfolio</h2>
          <p>Discover our collection of artistic custom cakes, each one crafted with attention to detail.</p>
        </div>
        <div className={styles.portfolioGrid}>
          {portfolioItems.map((item, index) => (
            <div key={index} className={styles.portfolioItem}>
              <div className={styles.portfolioImage}>
                <span>{item.title}</span>
              </div>
              <div className={styles.portfolioInfo}>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;