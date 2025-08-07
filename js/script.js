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

    // State variables
    let isPopupOpen = false;
    let activeTab = 'html-css-tab';
    let downloadInProgress = false;

    // Initialize popups
    function initPopup() {
        // Set ARIA attributes
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
    }

    // Open popup
    function openPopup() {
        if (isPopupOpen || downloadInProgress) return;

        isPopupOpen = true;
        popupOverlay.classList.add('active');
        popupOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        closeBtn.focus();
    }

    // Close popup
    function closePopup() {
        if (!isPopupOpen || downloadInProgress) return;

        isPopupOpen = false;
        popupOverlay.classList.remove('active');
        popupOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = 'auto';
        if (openPopupBtn) openPopupBtn.focus();
    }

    // Handle tab switching
    function handleTabClick(e) {
        const button = e.currentTarget;
        const targetTab = button.dataset.tab;

        if (!targetTab || button.classList.contains('active')) return;

        // Update active tab
        activeTab = targetTab;

        // Update tab buttons
        tabButtons.forEach(btn => {
            const isActive = btn.dataset.tab === targetTab;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-selected', isActive);
        });

        // Update tab panels
        tabPanels.forEach(panel => {
            const isActive = panel.id === targetTab;
            panel.classList.toggle('active', isActive);
            panel.setAttribute('aria-hidden', !isActive);
        });
    }

    // Handle download
    function handleDownload(e) {
        if (downloadInProgress) return;

        downloadInProgress = true;
        loadingIndicator.style.display = 'block';
        e.currentTarget.disabled = true;

        // Simulate download
        setTimeout(() => {
            downloadInProgress = false;
            loadingIndicator.style.display = 'none';
            e.currentTarget.disabled = false;
            closePopup();

            // Log which options were selected
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

    // Handle overlay click
    function handleOverlayClick(e) {
        if (e.target === popupOverlay) {
            closePopup();
        }
    }

    // Handle checkbox changes
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

    // Initialize event listeners
    function initEventListeners() {
        // Popup controls
        if (openPopupBtn) openPopupBtn.addEventListener('click', openPopup);
        if (closeBtn) closeBtn.addEventListener('click', closePopup);
        popupOverlay.addEventListener('click', handleOverlayClick);

        // Prevent click propagation inside popup
        popupContainer.addEventListener('click', function (e) {
            e.stopPropagation();
        });

        // Tabs
        tabButtons.forEach(button => {
            button.addEventListener('click', handleTabClick);
        });

        // Downloads
        downloadBtns.forEach(button => {
            button.addEventListener('click', handleDownload);
        });

        // Checkboxes
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', handleCheckboxChange);
        });

        // Keyboard
        document.addEventListener('keydown', handleKeyDown);
    }

    // Initialize everything
    initPopup();
    initEventListeners();
});