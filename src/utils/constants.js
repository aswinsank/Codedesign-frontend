export const TABS = {
  HTML_CSS: 'html-css-tab',
  NEXTJS: 'nextjs-tab'
};

export const HTML_OPTIONS = [
  { 
    id: 'include-scripts', 
    checked: true, 
    label: 'Include search/scripts styles (text, etc.)' 
  },
  { 
    id: 'include-custom-html', 
    checked: true, 
    label: 'Include custom code' 
  }
];

export const NEXTJS_OPTIONS = [
  { 
    id: 'use-app-dir', 
    checked: true, 
    label: 'Use \'app\' directory (Next.js v13+)' 
  },
  { 
    id: 'include-magic-styles', 
    checked: true, 
    label: 'Include assets locally (images, styles, fonts, etc.)' 
  },
  { 
    id: 'include-custom-next', 
    checked: true, 
    label: 'Include custom code' 
  }
];

export const DOWNLOAD_MESSAGES = {
  [TABS.HTML_CSS]: 'Download HTML & CSS Project',
  [TABS.NEXTJS]: 'Download Next JS Project'
};