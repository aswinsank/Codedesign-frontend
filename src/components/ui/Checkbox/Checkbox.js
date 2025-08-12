import React from 'react';
import styles from './Checkbox.module.css';

export const Checkbox = ({ 
  id, 
  checked, 
  onChange, 
  label, 
  disabled = false 
}) => (
  <label className={styles.container}>
    <input
      type="checkbox"
      className={styles.input}
      id={id}
      checked={checked}
      onChange={onChange}
      disabled={disabled}
    />
    <span className={styles.custom}></span>
    <span className={styles.label}>{label}</span>
  </label>
);