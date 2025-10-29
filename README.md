# 💍 Wedding Invitation Website

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0.5-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.17-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-11.15.0-0055FF?logo=framer)](https://www.framer.com/motion/)

A beautiful, responsive, and interactive Arabic wedding invitation website built with modern web technologies. Features elegant animations, interactive elements, and a comprehensive guest experience including RSVP, location maps, gift registry, and wishes collection.

## ✨ Features

### 🎨 **Design & User Experience**
- **Responsive Design** - Optimized for all devices (mobile, tablet, desktop)
- **RTL Support** - Full Arabic language support with right-to-left layout
- **Elegant Animations** - Smooth transitions and micro-interactions using Framer Motion
- **Modern UI** - Clean, minimalist design with beautiful typography
- **Custom Favicon** - Wedding-themed heart design with gradient colors

### 🎵 **Interactive Elements**
- **Background Music** - Ambient wedding music with play/pause controls
- **Confetti Animation** - Celebratory effects for special moments
- **Smooth Scrolling** - Enhanced navigation experience
- **Loading Animations** - Engaging loading states

### 📱 **Core Functionality**
- **Landing Page** - Beautiful entrance with invitation reveal
- **Hero Section** - Couple introduction with elegant typography
- **Event Schedule** - Detailed agenda with multiple venues
- **Location Maps** - Interactive Google Maps integration
- **RSVP System** - Guest response collection
- **Digital Gifts** - Bank account information for monetary gifts
- **Wishes Collection** - Guest message board with real-time updates

### 🛠 **Technical Features**
- **SEO Optimized** - Meta tags, Open Graph, and Twitter Cards
- **PWA Ready** - Progressive Web App capabilities
- **Fast Loading** - Optimized bundle size and lazy loading
- **Type Safety** - ESLint configuration for code quality
- **Modern Build** - Vite for fast development and building

## 🚀 Quick Start

### Prerequisites

- **Node.js** (version 18.0 or higher)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sakeenah-main
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

## 📦 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build production-ready application |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality checks |

## ⚙️ Configuration

### Wedding Information

Edit `src/config/config.js` to customize your wedding details:

```javascript
const config = {
  data: {
    title: "زِفَافُ مُعْتَصِم وَ أَسْمَاء",
    description: "بإذن الله سنتزوج وندعوكم للاحتفال معنا بهذه اللحظة المميزة",
    groomName: "مُعْتَصِم",
    brideName: "أَسْمَاء",
   date: "2025-11-05",
    time: "19:00 - 23:00",
    location: "منزل العائلة",
    // ... more configuration options
  }
};
```

### Key Configuration Sections

- **👫 Couple Information** - Names, parents, and personal details
- **📅 Event Details** - Date, time, and venue information
- **📍 Location** - Google Maps integration and addresses
- **🎵 Audio Settings** - Background music configuration
- **💰 Gift Registry** - Bank account information for digital gifts
- **🎨 Styling** - Theme colors and visual preferences

## 🏗️ Project Structure

```
sakeenah-main/
├── public/                 # Static assets
│   ├── images/            # Images and favicon
│   ├── audio/             # Background music files
│   └── robots.txt         # SEO robots file
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Layout.jsx     # Main layout wrapper
│   │   ├── BottomBar.jsx  # Navigation bar
│   │   └── ...
│   ├── pages/             # Main page components
│   │   ├── Hero.jsx       # Hero/landing section
│   │   ├── Events.jsx     # Event schedule
│   │   ├── Location.jsx   # Maps and venue info
│   │   ├── Gifts.jsx      # Digital gift registry
│   │   ├── Wishes.jsx     # Guest wishes/messages
│   │   └── ...
│   ├── config/            # Configuration files
│   │   └── config.js      # Main wedding configuration
│   ├── lib/               # Utility functions and API
│   │   ├── api.js         # API integration
│   │   └── utils.js       # Helper functions
│   ├── App.jsx            # Root application component
│   ├── main.jsx           # Application entry point
│   └── index.css          # Global styles
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── vercel.json            # Deployment configuration
└── README.md              # Project documentation
```

## 🎨 Customization

### Styling

The project uses **Tailwind CSS** for styling with custom configurations:

- **Colors** - Defined in `tailwind.config.js`
- **Fonts** - Arabic fonts (Amiri, Scheherazade New) loaded from Google Fonts
- **Animations** - Custom animations using Tailwind and Framer Motion

### Adding New Sections

1. Create a new component in `src/pages/`
2. Import and add to `MainContent.jsx`
3. Update navigation in `BottomBar.jsx`
4. Configure any new data in `config.js`

### Audio Customization

Replace audio files in `public/audio/` and update `config.js`:

```javascript
audio: {
  src: "/audio/your-music.mp3",
  title: "Your Music Title",
  autoplay: true,
  loop: true
}
```

## 🌐 Deployment

### Vercel (Recommended)

1. **Connect to Vercel**
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Configure deployment**
   - The project includes `vercel.json` for optimal configuration
   - Automatic deployments on git push

### Other Platforms

- **Netlify** - Drag and drop the `dist` folder after `npm run build`
- **GitHub Pages** - Use GitHub Actions for automated deployment
- **Firebase Hosting** - Deploy with Firebase CLI

### Build for Production

```bash
npm run build
```

The `dist` folder contains the production-ready files.

## 🔧 Technical Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.3.1 | UI framework |
| **Vite** | 6.0.5 | Build tool and dev server |
| **Tailwind CSS** | 3.4.17 | Utility-first CSS framework |
| **Framer Motion** | 11.15.0 | Animation library |
| **React Router** | 7.1.1 | Client-side routing |
| **React Helmet** | 2.0.5 | Document head management |
| **Lucide React** | 0.469.0 | Icon library |
| **React Confetti** | 6.1.0 | Celebration animations |

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style and conventions
- Write meaningful commit messages
- Test your changes across different devices
- Ensure RTL layout compatibility
- Update documentation as needed

## 📄 License

This project is licensed under the **Apache License 2.0** - see the [LICENSE](LICENSE) file for details.

```
Copyright (c) 2024-present mrofisr

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

## 🙏 Acknowledgments

- **Google Fonts** - For beautiful Arabic typography
- **Unsplash** - For stock photography
- **Framer Motion** - For smooth animations
- **Tailwind CSS** - For rapid UI development
- **React Community** - For the amazing ecosystem

## 📞 Support

If you encounter any issues or have questions:

1. **Check the documentation** above
2. **Search existing issues** in the repository
3. **Create a new issue** with detailed information
4. **Contact the maintainer** for urgent matters

---

**Made with ❤️ for celebrating love and union**

*This wedding invitation template is designed to create beautiful, memorable experiences for couples and their guests. Customize it to match your unique love story!*
