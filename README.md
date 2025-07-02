# NodeXstation Portfolio

A modern, professional portfolio website showcasing full-stack development services and expertise.

## 🚀 Features

- **Interactive 3D Elements**: Three.js visualizations and particle systems
- **AI-Powered Chat**: Real-time assistance with multiple AI providers
- **Professional Services**: Comprehensive service offerings with detailed information
- **Modern Design**: Terminal-inspired theme with smooth animations
- **Responsive Layout**: Optimized for all device sizes
- **Performance Optimized**: Lazy loading and efficient rendering
- **Accessibility**: ARIA labels and keyboard navigation support
- **Error Handling**: Graceful error boundaries with recovery options

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Build Tool**: Vite
- **UI Components**: Shadcn/ui, Radix UI
- **3D Graphics**: Three.js
- **State Management**: TanStack Query
- **Routing**: React Router DOM
- **Form Handling**: React Hook Form + Zod validation
- **Animations**: Tailwind CSS animations + custom keyframes

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── services/       # Service-related components
│   └── ui/             # Base UI components (Shadcn)
├── data/               # Static data and configurations
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── services/           # API and external services
```

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd nodexstation-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:8080](http://localhost:8080) in your browser.

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Design System

The project uses a consistent design system with:

- **Color Tokens**: Terminal-inspired color palette
- **Typography**: Code-style font families
- **Spacing**: Consistent spacing scale
- **Animations**: Smooth transitions and effects

### Key Design Tokens

```css
--terminal-green: hsl(168, 76%, 42%)
--terminal-blue: hsl(187, 85%, 53%) 
--terminal-purple: hsl(271, 91%, 65%)
--terminal-yellow: hsl(54, 100%, 68%)
```

## 🔧 Configuration

### Environment Variables

The project doesn't require environment variables for basic functionality, but you may configure:

- API endpoints for contact forms
- Analytics tracking IDs
- External service configurations

### Customization

1. **Colors**: Modify `src/index.css` for color tokens
2. **Components**: Customize Shadcn components in `src/components/ui/`
3. **Content**: Update service data in `src/data/servicesData.ts`

## 📱 Features Overview

### Services Section
- **Interactive Cards**: Hover effects and detailed tooltips
- **Professional Pricing**: Transparent pricing structure
- **Technology Stack**: Detailed technology listings
- **Accessibility**: Full ARIA support and keyboard navigation

### AI Chat Integration
- **Multiple Providers**: OpenAI, Anthropic, Groq support
- **Real-time Responses**: Streaming chat interface
- **Error Handling**: Graceful fallbacks and retry logic

### 3D Visualizations
- **Three.js Showcase**: Interactive 3D elements
- **Particle Systems**: Dynamic background animations
- **Performance Optimized**: Efficient rendering

## 🚀 Deployment

The project is optimized for deployment on:

- **Vercel** (recommended)
- **Netlify**
- **GitHub Pages**
- **Traditional hosting**

### Build Optimization

- Tree shaking for minimal bundle size
- Code splitting for faster loading
- Image optimization
- CSS purging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

NodeX Station - [nodexstation@gmail.com](mailto:nodexstation@gmail.com)

Project Link: [GitHub Repository URL]

---

Built with ❤️ using React, TypeScript, and modern web technologies.