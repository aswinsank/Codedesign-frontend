import React from 'react';
import styles from './Button.module.css';

export const Button = ({ 
  children, 
  onClick, 
  disabled = false, 
  variant = 'primary',
  size = 'medium',
  className = '',
  ...props 
}) => {
  const buttonClass = `
    ${styles.button} 
    ${styles[variant]} 
    ${styles[size]} 
    ${disabled ? styles.disabled : ''} 
    ${className}
  `.trim();

  return (
    <button
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export const CloseButton = ({ onClick }) => (
  <button 
    className={styles.closeBtn} 
    onClick={onClick}
    aria-label="Close popup"
  >
  </button>
);