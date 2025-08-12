import React from 'react';
import { Checkbox } from '../ui/Checkbox/Checkbox';
import styles from './TabPanel.module.css';

const ExportOptions = ({ options, onOptionChange, disabled }) => (
  <ul className={styles.optionsList}>
    {options.map((option) => (
      <li key={option.id}>
        <Checkbox
          id={option.id}
          checked={option.checked}
          onChange={(e) => onOptionChange(option.id, e.target.checked)}
          label={option.label}
          disabled={disabled}
        />
      </li>
    ))}
  </ul>
);

export const TabPanel = ({ 
  id, 
  isActive, 
  icon, 
  title, 
  tag, 
  options, 
  onOptionChange, 
  disabled 
}) => (
  <div
    id={id}
    className={`${styles.tabPanel} ${isActive ? styles.active : ''}`}
    role="tabpanel"
    aria-hidden={!isActive}
  >
    <div className={styles.exportGroup}>
      <div className={styles.header}>
        <span className={`${styles.icon} ${styles[icon]}`}></span>
        <span className={styles.title}>{title}</span>
        <span className={styles.tag}>{tag}</span>
      </div>
      <ExportOptions
        options={options}
        onOptionChange={onOptionChange}
        disabled={disabled}
      />
    </div>
  </div>
);