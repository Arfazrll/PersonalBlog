# Creative Portfolio

A production-ready, full-stack creative portfolio/personal blog built with Next.js 14+, TypeScript, and Tailwind CSS. Features advanced 3D animations, internationalization, and a stunning Web3-inspired design.

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **3D/WebGL**: React Three Fiber, Drei
- **Animation**: GSAP, Framer Motion
- **i18n**: next-intl
- **Deployment**: Vercel

## Features

- Dark/Light theme with system preference detection
- English/Indonesian language support
- Creative loading animation
- Auto-hiding navbar with full-screen overlay
- Expandable footer
- 3D particle background
- Scroll-triggered animations
- Responsive design
- SEO optimized

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm run start
```

## Project Structure

```
src/
├── app/                    # App Router pages
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── projects/
│   ├── experience/
│   ├── skills/
│   ├── achievements/
│   └── contact/
├── components/
│   ├── layout/             # Navbar, Footer, Loading
│   └── three/              # 3D components
├── lib/                    # Utilities
├── hooks/                  # Custom hooks
├── providers/              # Context providers
├── styles/                 # Global styles
├── types/                  # TypeScript definitions
├── data/                   # Portfolio data
└── messages/               # i18n translations
```

## Customization

Edit `src/data/portfolio.ts` to update your personal information, projects, experience, skills, and achievements.

## Deployment

This project is configured for Vercel deployment. Simply connect your repository and deploy.

## License

MIT