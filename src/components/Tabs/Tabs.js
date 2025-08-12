import React, { useRef } from 'react';
import { TabButton } from './TabButton';
import { TabIndicator } from './TabIndicator';
import styles from './Tabs.module.css';

export const Tabs = ({ activeTab, onTabChange, tabs }) => {
  const tabsRef = useRef(null);

  return (
    <div className={styles.tabs} ref={tabsRef}>
      <TabIndicator activeTab={activeTab} tabsRef={tabsRef} />
      {tabs.map((tab) => (
        <TabButton
          key={tab.id}
          id={tab.id}
          isActive={activeTab === tab.id}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </TabButton>
      ))}
    </div>
  );
};