# Digital Business Card Generator

A modern, responsive web application for creating professional digital business cards with multiple templates and high-quality export options.

## ✨ Features

### 🎨 Card Customization
- **4 Unique Templates**: Minimal White, Split Design, Centered Classic, and Creative Bold
- **Custom Colors**: Change primary color for each template
- **Profile Image**: Upload your photo or use initials
- **Social Links**: Twitter, LinkedIn, Facebook, Instagram, GitHub
- **Real-time Preview**: See changes instantly

### 📥 Export Options
- **High-Quality PNG**: Sharp 3x resolution images with proper gradient rendering
- **Professional PDF**: Business card size (A6 landscape, 105x74mm)
- **Perfect Color Capture**: Uses dom-to-image for accurate gradient export

### 💾 Smart Features
- **Auto-save**: Card data persists in browser
- **Color Reset**: Primary color auto-resets when switching templates
- **Form Validation**: Real-time input validation
- **Responsive Design**: Works on all devices

## 🚀 Quick Start

### Option 1: Direct Use
Simply open `index.html` in your browser - no installation needed!

### Option 2: Local Server
```bash
# Clone the repository
git clone https://github.com/knoxiboy/Digital-Business-Card-Generator.git
cd Digital-Business-Card-Generator

# Open with live server (recommended)
npx live-server

# Or use Python
python -m http.server 8000
```

## 📋 How to Use

1. **Fill in your details**: Name, title, company, email, phone, website
2. **Upload profile image** (optional): JPG, PNG, or WebP (max 5MB)
3. **Add social links** (optional): Paste your social media URLs
4. **Choose a template**: Select from 4 unique designs
5. **Customize color**: Adjust the primary color to match your brand
6. **Generate & Download**: Get PNG or PDF export

## 🎨 Available Templates

### 1. **Minimal White**
- Clean white background with black text
- Perfect for minimalist professionals
- Stands out with simplicity

### 2. **Split Design**
- Sidebar accent strip on left
- Professional vertical split layout
- Great for corporate use

### 3. **Centered Classic**
- Circular avatar with centered content
- Traditional business card style
- Ideal for executives

### 4. **Creative Bold**
- Asymmetric with floating decorative elements
- Bold and modern design
- Perfect for creatives and designers

## 🛠️ Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Responsive design with gradients and animations
- **JavaScript (ES6+)** - Modular architecture
- **dom-to-image** - High-quality element-to-image conversion
- **jsPDF** - Professional PDF generation

## 📁 Project Structure

```
Digital-Business-Card-Generator/
├── index.html                 # Main entry point
├── css/
│   └── styles.css            # All styles (black & white theme)
├── js/
│   ├── config.js             # Templates & configuration
│   ├── utils.js              # Utility functions
│   ├── card-generator.js     # Card HTML generation
│   ├── template-manager.js   # Template switching logic
│   ├── form-handler.js       # Form & preview handling
│   ├── export-manager.js     # PNG & PDF export
│   └── app.js                # Application initialization
└── README.md
```

## 🎯 Key Features Explained

### Template System
Each template has:
- **Unique layout structure** (not just color variations)
- **Default color** that auto-applies on selection
- **Responsive design** that works on all screen sizes

### Smart Color Management
- Primary color resets to template default when switching
- Color picker updates automatically
- Templates adapt to any color (except Minimal White)

### High-Quality Exports
- **3x resolution scaling** for sharp images
- **dom-to-image library** for accurate gradient rendering
- **Proper background capture** - no more faded downloads!

## 🔧 Customization

### Adding a New Template

1. **Add to config.js**:
```javascript
mytemplate: {
  name: 'My Template',
  className: 'mytemplate',
  layout: 'custom',
  defaultColor: '#FF5733'
}
```

2. **Add CSS in styles.css**:
```css
.card-preview.mytemplate {
  /* Your unique layout styles */
  text-align: center;
  padding: 40px;
}
```

3. **Add to dropdown in index.html**:
```html
<option value="mytemplate">My Template</option>
```

## 💡 Technical Highlights

### Why dom-to-image?
We switched from html2canvas to dom-to-image because:
- ✅ Better CSS gradient support
- ✅ Accurate color rendering
- ✅ Handles complex backgrounds properly
- ✅ No more washed-out exports!

### Modular Architecture
- **Separation of concerns**: Each module has a single responsibility
- **No frameworks**: Pure vanilla JavaScript
- **Easy to maintain**: Clear code organization

## 🌐 Browser Compatibility

| Browser | Support |
|---------|---------|
| Chrome  | ✅ Full |
| Firefox | ✅ Full |
| Safari  | ✅ Full |
| Edge    | ✅ Full |
| IE 11   | ❌ Not Supported |

## 📊 Performance

- **Load Time**: < 1 second
- **Card Generation**: Instant
- **PNG Export**: 2-3 seconds
- **PDF Export**: 2-4 seconds
- **Bundle Size**: ~60KB (excluding libraries)

## 🔒 Privacy & Security

- ✅ **No server required** - everything runs in your browser
- ✅ **Local storage only** - data never leaves your device
- ✅ **No tracking** - no cookies or analytics
- ✅ **XSS protection** - all user input is sanitized

## 🐛 Troubleshooting

**Download shows wrong colors?**
- Refresh the page and try again
- Make sure you're using a modern browser
- Clear browser cache

**Image won't upload?**
- Check file size (max 5MB)
- Use JPG, PNG, or WebP format
- Try a smaller image

**Preview not updating?**
- Check browser console for errors
- Refresh the page
- Try different browser

## 🚀 Future Enhancements

- [ ] QR code generation
- [ ] vCard export
- [ ] Custom fonts selection
- [ ] More social platforms
- [ ] Dark mode support
- [ ] Bulk card generation
- [ ] Print layout optimization

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Template designs inspired by modern business card trends
- Built with vanilla JavaScript (no frameworks!)
- Uses [dom-to-image](https://github.com/tsayen/dom-to-image) for image export
- Uses [jsPDF](https://github.com/parallax/jsPDF) for PDF generation

---

**Made with ❤️ for COSC HackWeek**  
**Repository**: https://github.com/knoxiboy/Digital-Business-Card-Generator
