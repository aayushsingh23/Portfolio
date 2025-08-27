# 🖥️ Terminal Portfolio

A futuristic, interactive portfolio website with a command-line interface theme, featuring a floating ID card and terminal-based navigation.

![Portfolio Preview](https://via.placeholder.com/800x400/0a0a0a/00ff29?text=Terminal+Portfolio)

## ✨ Features

### 🎮 Interactive Elements
- **Floating ID Card**: Physics-based draggable card with smooth animations
- **Terminal Interface**: Functional command-line interface for navigation
- **Command System**: Type commands to explore different sections
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

### 🎨 Visual Effects
- **Matrix-Style Theme**: Green-on-black terminal aesthetic
- **Scan Lines Animation**: Retro CRT monitor effect
- **Particle Effects**: Floating particles around the ID card
- **Dynamic Lighting**: Responsive shadows and highlights
- **Smooth Transitions**: Framer Motion powered animations

### 📱 Sections
- **About**: Personal information and bio
- **Projects**: Showcase of development work
- **Experience**: Professional background
- **Education**: Academic qualifications
- **Achievements**: Awards and recognitions
- **Contact**: Get in touch information

## 🚀 Demo

Visit the live demo: [Your Portfolio URL]

## 🛠️ Built With

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Framer Motion** - Animation library
- **Tailwind CSS** - Styling framework
- **Radix UI** - Accessible components
- **Lucide React** - Icon library

## 🎯 Terminal Commands

```bash
help          # Show available commands
about         # Learn more about me
projects      # View my projects and work
experience    # Check my work experience
education     # View my educational background
achievements  # See my accomplishments
contact       # Get my contact information
clear         # Clear the terminal
whoami        # Display user information
ls            # List available directories
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
# or
yarn build
```

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── HangingIdCard.tsx  # Interactive floating ID card
│   ├── Terminal.tsx       # Command-line interface
│   └── FolderView.tsx     # Content display component
├── pages/
│   ├── Index.tsx          # Main portfolio page
│   └── NotFound.tsx       # 404 page
├── lib/
│   └── utils.ts           # Utility functions
├── hooks/                 # Custom React hooks
└── styles/
    └── index.css          # Global styles and animations
```

## 🎨 Customization

### Updating Personal Information

1. **ID Card Data**: Edit `src/components/HangingIdCard.tsx`
2. **Terminal Commands**: Modify `src/components/Terminal.tsx`
3. **Section Content**: Update data objects in Terminal component

### Styling

- **Colors**: Modify Tailwind config in `tailwind.config.ts`
- **Animations**: Adjust Framer Motion settings in components
- **Layout**: Update component structures and CSS classes

### Adding New Commands

```typescript
// In Terminal.tsx
const commands = {
  newcommand: {
    description: "Your command description",
    data: {
      // Your data structure
    }
  }
};
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Deploy automatically on every push

### Netlify
1. Connect repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`

### Other Platforms
The project builds to static files and can be deployed to any static hosting service.

## 🔄 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Bundle Size**: Optimized with code splitting
- **Loading**: Lazy loading for optimal performance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by retro terminal interfaces
- Matrix movie aesthetics
- Modern web development practices

## 📞 Contact

- **GitHub**: [Your GitHub]
- **LinkedIn**: [Your LinkedIn]
- **Email**: [Your Email]
- **Portfolio**: [Live Demo URL]

---

⭐ **Star this repository if you found it helpful!**
