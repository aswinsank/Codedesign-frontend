import React from 'react';
import styles from './Tabs.module.css';

export const TabButton = ({ id, isActive, onClick, children }) => {
  return (
    <button
      data-tab-id={id}
      className={`${styles.tabBtn} ${isActive ? styles.active : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};