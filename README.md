# Alpha Team Website

A cutting-edge, modern website for Alpha Team - a technology-focused group at the University of Babylon's College of Information Technology.

## ✨ Features

- **🎨 Ultra-Modern Design**: Glassmorphism, advanced animations, and gradient effects
- **🌟 Interactive Animations**: MetaBalls, Ribbons, and particle systems
- **📱 Fully Responsive**: Optimized for all devices and screen sizes
- **🎯 Dark Theme**: Professional dark design with red/white accents
- **⚡ Performance Optimized**: Built with Vite and modern React patterns
- **🎪 Advanced UI Components**: Star borders, fade animations, and hover effects
- **🔧 TypeScript**: Full type safety and modern development practices

## 🚀 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS with custom animations
- **Build Tool**: Vite
- **Animations**: OGL (WebGL), Framer Motion concepts
- **Routing**: React Router DOM
- **Fonts**: Inter & JetBrains Mono from Google Fonts

## 🎨 Design Highlights

- **Glassmorphism Effects**: Modern frosted glass appearance
- **Gradient Animations**: Dynamic background shifts
- **Particle Systems**: Interactive MetaBalls and Ribbons
- **Micro-interactions**: Smooth hover and focus states
- **Typography**: Modern font combinations
- **Color Palette**: Dark theme with red accent colors

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Navigation header
│   ├── Footer.tsx      # Site footer
│   ├── MetaBalls.tsx   # WebGL particle animation
│   ├── Ribbons.tsx     # Flowing ribbon animation
│   ├── StarBorder.tsx  # Animated border component
│   └── FadeContent.tsx # Scroll-triggered animations
├── pages/              # Page components
│   ├── Home.tsx        # Landing page
│   └── Team.tsx        # Team members page
├── styles/             # Global styles and CSS
└── assets/             # Static assets
```

## 🚀 Getting Started

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd alpha-team-website
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Copy the environment template
   cp .env.example .env

   # Edit .env with your actual values
   nano .env
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Open Browser**
   ```
   http://localhost:5173
   ```

6. **Build for Production**
   ```bash
   npm run build
   ```

## 🔐 Environment Variables

The application uses environment variables for configuration. Create a `.env` file in the root directory:

```bash
# Copy from template
cp .env.example .env

# Required Variables
VITE_SUPABASE_URL="your-supabase-url"
VITE_SUPABASE_ANON_KEY="your-supabase-anon-key"

# Optional Variables
VITE_SENTRY_DSN="your-sentry-dsn"
VITE_GA_TRACKING_ID="your-google-analytics-id"
```

### Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Supabase project URL | ✅ |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | ✅ |
| `VITE_SENTRY_DSN` | Sentry DSN for error tracking | ❌ |
| `VITE_GA_TRACKING_ID` | Google Analytics tracking ID | ❌ |
| `VITE_APP_TITLE` | Application title | ❌ |
| `VITE_CONTACT_EMAIL` | Contact email address | ❌ |

**⚠️ Security Note**: Never commit `.env` files to version control. They contain sensitive information.

## 🎯 Key Components

### MetaBalls
Interactive particle system that responds to mouse movement, creating a mesmerizing background effect.

### Ribbons
Flowing, colorful ribbons that create a dynamic and engaging visual experience.

### StarBorder
Animated border component with star-like effects for buttons and interactive elements.

### FadeContent
Scroll-triggered fade-in animations for smooth content reveals.

## 🎨 Customization

### Colors
The design uses CSS custom properties for easy theming:
```css
:root {
  --bg-color: #000000;
  --text-color: #ffffff;
  --accent-color: #ff0000;
  --glass-bg: rgba(255, 255, 255, 0.05);
}
```

### Animations
Customize animation speeds and effects in `tailwind.config.js`:
```javascript
animation: {
  'star-movement-bottom': 'star-movement-bottom linear infinite alternate',
  'fade-in': 'fade-in 1s ease-out',
  'glow': 'glow 2s ease-in-out infinite alternate',
}
```

## 📱 Responsive Design

The website is fully responsive with:
- Mobile-first approach
- Flexible grid layouts
- Adaptive typography
- Touch-friendly interactions

## 🌟 Performance

- **Lazy Loading**: Components load as needed
- **Optimized Animations**: GPU-accelerated effects
- **Minimal Bundle**: Tree-shaken dependencies
- **Fast Builds**: Vite-powered development

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is part of Alpha Team's initiatives at the University of Babylon.

## 🙏 Acknowledgments

- **ReactBits**: For inspiring animation components
- **Tailwind CSS**: For the utility-first CSS framework
- **OGL**: For WebGL rendering capabilities
- **Google Fonts**: For beautiful typography

---

**Made with ❤️ by Alpha Team - University of Babylon**