# Deploy to GitHub Pages

## Quick Setup

1. **Create a new repository** on GitHub (e.g., `portfolio-website`)

2. **Upload files**: Upload all files from the `static-site` folder to your repository

3. **Enable GitHub Pages**:
   - Go to your repository settings
   - Scroll to "Pages" section
   - Under "Source", select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"

4. **Access your site**: Your website will be available at:
   ```
   https://YOUR_USERNAME.github.io/YOUR_REPOSITORY_NAME/
   ```

## File Structure to Upload

```
your-repository/
├── index.html
├── styles.css
├── script.js
├── data/
│   ├── personal-info.json
│   ├── experiences.json
│   ├── projects.json
│   ├── skills.json
│   └── education.json
└── README.md
```

## Customization

### Update Your Information

Edit these JSON files with your own data:

**data/personal-info.json**:
```json
{
  "name": "Your Name",
  "title": "Your Job Title",
  "email": "your-email@example.com",
  "phone": "+1234567890",
  "linkedin": "https://linkedin.com/in/yourprofile",
  "github": "https://github.com/yourusername",
  "location": "Your City, Country",
  "summary": "Your professional summary..."
}
```

**data/experiences.json**: Add your work experience
**data/projects.json**: Add your projects
**data/skills.json**: Add your technical skills
**data/education.json**: Add your education

### Custom Domain (Optional)

1. **Add CNAME file**: Create a file named `CNAME` (no extension) in your repository root
2. **Add your domain**: Put your custom domain in the file (e.g., `www.yourwebsite.com`)
3. **Configure DNS**: Point your domain's DNS to GitHub Pages

## Features Included

✅ Fully responsive design
✅ Dark/Light theme toggle
✅ Smooth navigation
✅ Mobile-friendly menu
✅ Contact form (mailto integration)
✅ SEO optimized
✅ Fast loading
✅ No backend required

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## No Build Process Required

This is a static site that works directly in the browser - no compilation or build process needed!