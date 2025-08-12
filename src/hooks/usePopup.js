import { useState, useEffect } from 'react';

export const usePopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [downloadInProgress, setDownloadInProgress] = useState(false);
  
  const openPopup = () => {
    if (downloadInProgress) return;
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };
  
  const closePopup = () => {
    if (downloadInProgress) return;
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };
  
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closePopup();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);
  
  return { 
    isOpen, 
    downloadInProgress, 
    setDownloadInProgress, 
    openPopup, 
    closePopup 
  };
};