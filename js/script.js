document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const popupOverlay = document.getElementById('popupOverlay');
    const popupContainer = document.getElementById('popupContainer');
    const openPopupBtn = document.getElementById('openPopupBtn');
    const closeBtn = document.getElementById('closeBtn');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    const downloadBtns = document.querySelectorAll('.download-btn');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const checkboxes = document.querySelectorAll('.checkbox-input');
    const tabsContainer = document.querySelector('.tabs');
    
    // Create the sliding indicator element
    const tabsInnerBox = document.createElement('div');
    tabsInnerBox.className = 'tabs-inner-box';
    tabsContainer.insertBefore(tabsInnerBox, tabsContainer.firstChild);

    // State variables
    let isPopupOpen = false;
    let activeTab = 'html-css-tab';
    let downloadInProgress = false;

    // Helper function to update the sliding indicator position
    function updateTabsInnerBox() {
        const activeButton = document.querySelector('.tab-btn.active');
        if (activeButton && tabsContainer) {
            requestAnimationFrame(() => {
                const tabsRect = tabsContainer.getBoundingClientRect();
                const buttonRect = activeButton.getBoundingClientRect();
                
                // Calculate position relative to the tabs container
                const offsetLeft = buttonRect.left - tabsRect.left - 4; // -4 for container padding
                
                // Update the sliding indicator
                tabsInnerBox.style.width = `${buttonRect.width}px`;
                tabsInnerBox.style.transform = `translateX(${offsetLeft}px)`;
                tabsInnerBox.style.display = 'block';
            });
        } else {
            tabsInnerBox.style.display = 'none';
        }
    }

    // Function to update download button text based on active tab
    function updateDownloadButton() {
        const downloadBtn = document.querySelector('.download-btn');
        if (downloadBtn) {
            if (activeTab === 'html-css-tab') {
                downloadBtn.textContent = 'Download HTML & CSS Project';
            } else if (activeTab === 'nextjs-tab') {
                downloadBtn.textContent = 'Download Next JS Project';
            }
        }
    }

    // Initialize popup functionality
    function initPopup() {
        // Set ARIA attributes for accessibility
        popupOverlay.setAttribute('aria-hidden', 'true');
        popupOverlay.setAttribute('aria-modal', 'true');
        popupOverlay.setAttribute('role', 'dialog');

        // Set tab ARIA attributes
        tabButtons.forEach((button, index) => {
            button.setAttribute('role', 'tab');
            button.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
            button.setAttribute('aria-controls', button.dataset.tab);
        });

        tabPanels.forEach(panel => {
            panel.setAttribute('role', 'tabpanel');
            panel.setAttribute('aria-hidden', panel.id !== activeTab);
        });

        // Initialize the sliding indicator position and download button text
        setTimeout(() => {
            updateTabsInnerBox();
            updateDownloadButton();
        }, 100);
    }

    // Open popup function
    function openPopup() {
        if (isPopupOpen || downloadInProgress) return;

        isPopupOpen = true;
        popupOverlay.classList.add('active');
        popupOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        
        // Focus close button for accessibility
        closeBtn.focus();
        
        // Update sliding indicator position after popup opens
        setTimeout(() => {
            updateTabsInnerBox();
        }, 150);
    }

    // Close popup function
    function closePopup() {
        if (!isPopupOpen || downloadInProgress) return;

        isPopupOpen = false;
        popupOverlay.classList.remove('active');
        popupOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = 'auto';
        
        // Return focus to open button
        if (openPopupBtn) openPopupBtn.focus();
    }

    // Handle tab switching
    function handleTabClick(e) {
        const button = e.currentTarget;
        const targetTab = button.dataset.tab;

        // Prevent switching to same tab
        if (!targetTab || button.classList.contains('active')) return;

        // Update active tab state
        activeTab = targetTab;

        // Update tab button states
        tabButtons.forEach(btn => {
            const isActive = btn.dataset.tab === targetTab;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-selected', isActive);
        });

        // Update tab panel states
        tabPanels.forEach(panel => {
            const isActive = panel.id === targetTab;
            panel.classList.toggle('active', isActive);
            panel.setAttribute('aria-hidden', !isActive);
        });
        
        // Update sliding indicator position and download button text
        updateTabsInnerBox();
        updateDownloadButton();
    }

    // Handle download process
    function handleDownload(e) {
        if (downloadInProgress) return;

        downloadInProgress = true;
        loadingIndicator.style.display = 'block';
        e.currentTarget.disabled = true;

        // Simulate download process
        setTimeout(() => {
            downloadInProgress = false;
            loadingIndicator.style.display = 'none';
            e.currentTarget.disabled = false;
            closePopup();

            // Log selected options (for debugging)
            const options = {};
            if (activeTab === 'html-css-tab') {
                options.includeScripts = document.getElementById('include-scripts').checked;
                options.includeCustom = document.getElementById('include-custom-html').checked;
                console.log('Downloaded HTML/CSS with options:', options);
            } else {
                options.useAppDir = document.getElementById('use-app-dir').checked;
                options.includeMagicStyles = document.getElementById('include-magic-styles').checked;
                options.includeCustom = document.getElementById('include-custom-next').checked;
                console.log('Downloaded Next.js project with options:', options);
            }
        }, 2000);
    }

    // Handle overlay clicks (close popup when clicking outside)
    function handleOverlayClick(e) {
        if (e.target === popupOverlay) {
            closePopup();
        }
    }

    // Handle checkbox state changes
    function handleCheckboxChange(e) {
        const label = e.currentTarget.closest('label');
        if (label) {
            label.classList.toggle('checked', e.currentTarget.checked);
        }
    }

    // Handle keyboard events
    function handleKeyDown(e) {
        if (e.key === 'Escape' && isPopupOpen) {
            closePopup();
        }
    }

    // Handle window resize (recalculate indicator position)
    function handleResize() {
        if (isPopupOpen) {
            updateTabsInnerBox();
        }
    }

    // Initialize all event listeners
    function initEventListeners() {
        // Popup control events
        if (openPopupBtn) {
            openPopupBtn.addEventListener('click', openPopup);
        }
        if (closeBtn) {
            closeBtn.addEventListener('click', closePopup);
        }
        popupOverlay.addEventListener('click', handleOverlayClick);

        // Prevent event bubbling inside popup container
        popupContainer.addEventListener('click', function (e) {
            e.stopPropagation();
        });

        // Tab switching events
        tabButtons.forEach(button => {
            button.addEventListener('click', handleTabClick);
        });

        // Download button events
        downloadBtns.forEach(button => {
            button.addEventListener('click', handleDownload);
        });

        // Checkbox events
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', handleCheckboxChange);
        });

        // Global events
        document.addEventListener('keydown', handleKeyDown);
        window.addEventListener('resize', handleResize);
    }

    // Initialize everything
    initPopup();
    initEventListeners();
});