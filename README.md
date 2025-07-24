# Muhammad Sohaib Jameel - Portfolio Website

A professional portfolio website built with HTML, CSS, and JavaScript showcasing Muhammad Sohaib Jameel's mobile development expertise.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Dark/Light Theme**: Toggle between dark and light themes with system preference detection
- **Smooth Navigation**: Animated scrolling between sections with active navigation indicators
- **Dynamic Content**: Portfolio data loaded from JSON files for easy maintenance
- **Modern UI**: Clean, professional design with smooth animations and transitions
- **Accessibility**: Built with accessibility best practices in mind
- **SEO Optimized**: Proper meta tags and semantic HTML structure

## Project Structure

```
static-site/
├── index.html          # Main HTML file
├── styles.css          # Custom CSS styles and theme system
├── script.js           # JavaScript functionality and data loading
├── data/               # Portfolio data in JSON format
│   ├── personal-info.json
│   ├── experiences.json
│   ├── projects.json
│   ├── skills.json
│   └── education.json
└── README.md          # This file
```

## Getting Started

### Local Development

1. **Clone or download the files**
2. **Open in a local server** (recommended):
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```
3. **Open in browser**: Navigate to `http://localhost:8000`

### Direct Opening

You can also open `index.html` directly in your browser, but some features may not work due to CORS restrictions when loading JSON files locally.

## Deployment Options

### GitHub Pages

1. Create a new repository on GitHub
2. Upload all files to the repository
3. Go to Settings → Pages
4. Select source as "Deploy from a branch"
5. Choose "main" branch and "/ (root)" folder
6. Your site will be available at `https://username.github.io/repository-name/`

### Netlify

1. Drag and drop the `static-site` folder to Netlify
2. Your site will be automatically deployed

### Vercel

1. Upload the folder to GitHub
2. Connect your GitHub repository to Vercel
3. Deploy automatically

## Customization

### Updating Content

Edit the JSON files in the `data/` directory:

- **personal-info.json**: Name, title, contact information, and summary
- **experiences.json**: Work experience with achievements
- **projects.json**: Portfolio projects with descriptions and links
- **skills.json**: Technical skills organized by category
- **education.json**: Educational background

### Styling

- **Theme Colors**: Modify CSS variables in `styles.css` under `:root` and `.dark` selectors
- **Layout**: Adjust grid layouts and spacing in the CSS
- **Animations**: Customize transition durations and effects

### Functionality

- **Data Loading**: Modify the `DataLoader` class in `script.js`
- **Content Rendering**: Update the `ContentRenderer` class methods
- **Navigation**: Customize the `NavigationManager` class

## Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile Browsers**: iOS Safari, Chrome Mobile, Samsung Internet
- **JavaScript Required**: The site requires JavaScript for dynamic content loading

## Performance Features

- **Lazy Loading**: Content loads progressively
- **Caching**: Data is cached after first load
- **Optimized Assets**: Minimal external dependencies
- **Responsive Images**: Scalable vector icons (Lucide)

## External Dependencies

- **Tailwind CSS**: Loaded via CDN for styling utilities
- **Lucide Icons**: SVG icon library for consistent iconography

## Technical Features

- **Theme System**: Automatic dark/light mode with localStorage persistence
- **Smooth Scrolling**: Native CSS scroll-behavior with JavaScript fallback
- **Mobile Menu**: Responsive navigation with hamburger menu
- **Form Handling**: Contact form with mailto integration
- **Error Handling**: Graceful fallbacks for data loading failures

## Contact Form

The contact form uses `mailto:` links to open the user's default email client with pre-filled content. This works without a backend server but requires the user to have an email client configured.

## License

This project is open source and available under the MIT License.

## Support

For questions or issues, please contact Muhammad Sohaib Jameel at sohaibjameel3@gmail.com.