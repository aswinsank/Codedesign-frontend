import React, { useState } from 'react';
import { CloseButton, Button } from '../ui/Button/Button';
import { Tabs } from '../Tabs/Tabs';
import { TabPanel } from '../TabPanel/TabPanel';
import { TABS, HTML_OPTIONS, NEXTJS_OPTIONS, DOWNLOAD_MESSAGES } from '../../utils/constants';
import styles from './ExportPopup.module.css';

const TAB_CONFIG = [
  { id: TABS.HTML_CSS, label: 'HTML & CSS' },
  { id: TABS.NEXTJS, label: 'Next JS' }
];

export const ExportPopup = ({ 
  isOpen, 
  onClose, 
  downloadInProgress, 
  setDownloadInProgress 
}) => {
  const [activeTab, setActiveTab] = useState(TABS.HTML_CSS);
  const [htmlOptions, setHtmlOptions] = useState(HTML_OPTIONS);
  const [nextjsOptions, setNextjsOptions] = useState(NEXTJS_OPTIONS);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleHtmlOptionChange = (optionId, checked) => {
    setHtmlOptions(prev => 
      prev.map(option => 
        option.id === optionId ? { ...option, checked } : option
      )
    );
  };

  const handleNextjsOptionChange = (optionId, checked) => {
    setNextjsOptions(prev => 
      prev.map(option => 
        option.id === optionId ? { ...option, checked } : option
      )
    );
  };

  const handleDownload = () => {
    if (downloadInProgress) return;
    
    setDownloadInProgress(true);
    
    setTimeout(() => {
      setDownloadInProgress(false);
      onClose();
      
      const options = {};
      const currentOptions = activeTab === TABS.HTML_CSS ? htmlOptions : nextjsOptions;
      currentOptions.forEach(option => {
        options[option.id.replace(/-/g, '_')] = option.checked;
      });
      console.log(`Downloaded ${activeTab} with options:`, options);
    }, 2000);
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains(styles.overlay)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`${styles.overlay} ${isOpen ? styles.active : ''}`}
      onClick={handleOverlayClick}
      aria-hidden={!isOpen}
      aria-modal="true"
      role="dialog"
    >
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h2 className={styles.title}>Code Export</h2>
            <p className={styles.subtitle}>Manage how you download your website's code.</p>
          </div>
          <CloseButton onClick={onClose} />
        </div>
        
        <div className={styles.body}>
          <div className={styles.tabContentContainer}>
            <Tabs
              activeTab={activeTab}
              onTabChange={handleTabChange}
              tabs={TAB_CONFIG}
            />
            
            <TabPanel
              id={TABS.HTML_CSS}
              isActive={activeTab === TABS.HTML_CSS}
              icon="html"
              title="Export as HTML & CSS"
              tag="Zipped"
              options={htmlOptions}
              onOptionChange={handleHtmlOptionChange}
              disabled={downloadInProgress}
            />
            
            <TabPanel
              id={TABS.NEXTJS}
              isActive={activeTab === TABS.NEXTJS}
              icon="react"
              title="Export as Next JS Project"
              tag="Zipped"
              options={nextjsOptions}
              onOptionChange={handleNextjsOptionChange}
              disabled={downloadInProgress}
            />
          </div>
          
          <Button
            variant="primary"
            size="large"
            onClick={handleDownload}
            disabled={downloadInProgress}
          >
            {DOWNLOAD_MESSAGES[activeTab]}
          </Button>
        </div>
      </div>
    </div>
  );
};