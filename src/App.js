import React from 'react';
import { Button } from './components/ui/Button/Button';
import { ExportPopup } from './components/ExportPopup/ExportPopup';
import { usePopup } from './hooks/usePopup';
import './styles/globals.css';

const App = () => {
  const { 
    isOpen, 
    downloadInProgress, 
    setDownloadInProgress, 
    openPopup, 
    closePopup 
  } = usePopup();

  return (
    <div 
      className="app"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}
    >
      <Button
        variant="trigger"
        size="medium"
        onClick={openPopup}
        disabled={downloadInProgress}
        style={{
          width: '130px',
          height: '32px',
          minWidth: '130px'
        }}
      >
        EXPORT CODE
      </Button>

      <ExportPopup
        isOpen={isOpen}
        onClose={closePopup}
        downloadInProgress={downloadInProgress}
        setDownloadInProgress={setDownloadInProgress}
      />
    </div>
  );
};

export default App;