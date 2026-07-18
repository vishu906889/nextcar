import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { Sun, Moon } from 'lucide-react';
import clsx from 'clsx';
import logoImg from '../../assets/logo.png';
import styles from './Header.module.scss';

export const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={styles.header}>
      {/* Left: Logo Section */}
      <div className={styles.logoSection}>
        <div className={styles.logoIconWrapper}>
          <img src={logoImg} alt="NEXTCAR Logo" className={styles.logoImage} />
        </div>
      </div>

      {/* Right: Theme Switcher Section */}
      <div className={styles.themeSection}>
        <button
          onClick={toggleTheme}
          className={styles.themeSwitcher}
          aria-label="Toggle Theme"
        >
          {/* Slider Background Indicator */}
          <div
            className={clsx(
              styles.themeSlider,
              theme === 'light' ? styles.sliderLight : styles.sliderDark
            )}
          />
          <span className={clsx(styles.themeIcon, theme === 'light' && styles.iconActive)}>
            <Sun size={14} strokeWidth={2.5} />
          </span>
          <span className={clsx(styles.themeIcon, theme === 'dark' && styles.iconActive)}>
            <Moon size={14} strokeWidth={2.5} />
          </span>
        </button>
      </div>
    </header>
  );
};

export default Header;
