import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change (optional, for better UX)
  useEffect(() => {
    const closeMenu = () => setMenuOpen(false);
    window.addEventListener('resize', closeMenu);
    return () => window.removeEventListener('resize', closeMenu);
  }, []);

  // Close menu on navigation (optional, for better UX)
  const handleNavClick = (to) => {
    setMenuOpen(false);
    navigate(to);
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.navContainer}>
        <span
          className={styles.logo}
          onClick={() => handleNavClick('/')}
          style={{ cursor: 'pointer' }}
        >
          🎂 Moli Cakes
        </span>
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </button>
        <ul className={`${styles.navLinks} ${menuOpen ? styles.open : ''}`}>
          <li><NavLink to="/" className={({ isActive }) => isActive ? styles.active : ''} onClick={() => setMenuOpen(false)}>Home</NavLink></li>
          <li><NavLink to="/portfolio" className={({ isActive }) => isActive ? styles.active : ''} onClick={() => setMenuOpen(false)}>Portfolio</NavLink></li>
          <li><NavLink to="/configure-cake" className={({ isActive }) => isActive ? styles.active : ''} onClick={() => setMenuOpen(false)}>Configure Cake</NavLink></li>
        </ul>
        {menuOpen && <div className={styles.backdrop} onClick={() => setMenuOpen(false)}></div>}
      </div>
    </nav>
  );
};

export default Navbar;