import React, { useState, useEffect } from 'react';
import styles from './Tabs.module.css';

export const TabIndicator = ({ activeTab, tabsRef }) => {
  const [indicatorStyle, setIndicatorStyle] = useState({ display: 'none' });

  useEffect(() => {
    if (tabsRef.current && activeTab) {
      const activeButton = tabsRef.current.querySelector(
        `[data-tab-id="${activeTab}"]`
      );

      if (activeButton) {
        const tabsRect = tabsRef.current.getBoundingClientRect();
        const buttonRect = activeButton.getBoundingClientRect();
        const offsetLeft = buttonRect.left - tabsRect.left;

        setIndicatorStyle({
          width: `${buttonRect.width}px`,
          transform: `translateX(${offsetLeft}px)`,
          display: 'block',
        });
      }
    }
  }, [activeTab, tabsRef]);

  return <div className={styles.innerBox} style={indicatorStyle} />;
};