# Code Export Modal

A responsive modal popup for exporting web projects as HTML/CSS or Next.js with customizable options and a sleek dark theme interface.

## Features

- **Tabbed Interface**: Switch between HTML & CSS and Next.js export options
- **Animated Tab Indicator**: Smooth sliding animation between active tabs
- **Customizable Export Options**: Multiple checkboxes for different export configurations
- **Dark Theme UI**: Modern dark interface with blur backdrop
- **Responsive Design**: Works on various screen sizes
- **Accessibility**: Full keyboard navigation and screen reader support
- **Download Simulation**: Includes loading states and progress feedback

## File Structure

```
project/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # All styles and themes
├── js/
│   └── script.js       # Modal functionality and interactions
└── assets/
    └── icons/
        ├── react-svgrepo-com.png      # React icon
        └── icons8-html-5-50.png       # HTML5 icon
```

## Usage

1. Click the "EXPORT CODE" button to open the modal
2. Choose between "HTML & CSS" or "Next JS" tabs
3. Select desired export options using checkboxes
4. Click the download button to simulate export process
5. Close modal by clicking the X button, pressing Escape, or clicking outside

## Export Options

### HTML & CSS Tab
- Include search/scripts styles (text, etc.)
- Include custom code

### Next JS Tab
- Use 'app' directory (Next.js v13+)
- Include assets locally (images, styles, fonts, etc.)
- Include custom code

## Customization

### Colors
The CSS uses CSS custom properties (variables) for easy theming:
- `--popup-bg`: Main popup background
- `--text-primary`: Primary text color
- `--text-secondary`: Secondary text color
- `--button-bg`: Button background gradient
- And more...

### Styling
- Modify `style.css` to change appearance
- Update CSS variables in `:root` for global color changes
- Adjust animations by modifying transition properties



## Development

To customize or extend the modal:

1. **HTML Structure**: Modify `index.html` for layout changes
2. **Styling**: Update `css/style.css` for visual modifications
3. **Functionality**: Edit `js/script.js` for behavior changes
