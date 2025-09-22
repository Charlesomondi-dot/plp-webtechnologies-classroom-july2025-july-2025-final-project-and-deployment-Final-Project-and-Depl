# 🚀 Deployment Guide

## Quick Deployment to GitHub Pages

### Step 1: Prepare Your Repository
1. **Make sure all files are in the root directory:**
   ```
   your-repo/
   ├── index.html
   ├── about.html
   ├── projects.html
   ├── skills.html
   ├── contact.html
   ├── css/style.css
   ├── js/main.js
   ├── images/
   └── README.md
   ```

### Step 2: Push to GitHub
```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Commit your changes
git commit -m "Initial portfolio website commit"

# Add remote repository (replace with your GitHub repo URL)
git remote add origin https://github.com/your-username/your-repository-name.git

# Push to main branch
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **Deploy from a branch**
5. Choose **main** branch and **/ (root)** folder
6. Click **Save**

### Step 4: Access Your Live Site
- Your website will be available at: `https://your-username.github.io/your-repository-name/`
- It may take 5-10 minutes for the site to become available

## Pre-Deployment Checklist

### ✅ File Validation
- [ ] All HTML files are valid (use W3C Validator)
- [ ] CSS is valid and properly organized
- [ ] JavaScript has no console errors
- [ ] All image references are correct
- [ ] All internal links work properly

### ✅ Content Updates
- [ ] Replace "Your Name" with actual name throughout site
- [ ] Update contact information and social links
- [ ] Add real project descriptions and links
- [ ] Replace placeholder images with actual images
- [ ] Update skills and experience sections

### ✅ Performance Checks
- [ ] Images are optimized for web
- [ ] No broken links or 404 errors
- [ ] Mobile responsiveness tested
- [ ] Cross-browser compatibility verified
- [ ] Loading speed is acceptable

### ✅ SEO & Accessibility
- [ ] All images have alt text
- [ ] Meta descriptions are added
- [ ] Proper heading hierarchy (h1, h2, h3)
- [ ] Color contrast meets WCAG standards
- [ ] Navigation is keyboard accessible

## Post-Deployment Steps

1. **Test the live site thoroughly**
2. **Share the URL with others for feedback**
3. **Monitor for any issues**
4. **Update content regularly**

## Troubleshooting Common Issues

### Site Not Loading
- Check if GitHub Pages is enabled in repository settings
- Ensure `index.html` is in the root directory
- Wait 10-15 minutes for propagation

### Images Not Displaying
- Check image file paths (case-sensitive)
- Ensure images are committed to the repository
- Verify image file formats are supported

### CSS/JS Not Working
- Check file paths in HTML files
- Ensure CSS and JS files are in correct directories
- Check browser console for errors

## Alternative Deployment Options

### Netlify
1. Connect your GitHub repository
2. Build settings: Leave empty (static site)
3. Deploy directory: `/` (root)

### Vercel
1. Import GitHub repository
2. Framework: Other
3. Build command: Leave empty
4. Output directory: `./`

## Custom Domain (Optional)
If you want to use a custom domain (e.g., yourname.com):
1. Buy a domain from a registrar
2. Add a CNAME file to your repository root
3. Configure DNS settings with your domain provider
4. Update GitHub Pages settings to use custom domain