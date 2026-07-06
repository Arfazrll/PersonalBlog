<div align="center">

<img src="public/Arfazrll_light.svg" alt="Project Logo" width="80" height="80" />

# Syahril Arfian Almazril — Technical Portfolio

### Engineering AI Systems, Scalable Software, and Data Architectures

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-0.170-000000?style=for-the-badge&logo=threedotjs&logoColor=white)](https://threejs.org/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_Portfolio-6366f1?style=for-the-badge)](https://syahrilarfianalmazril.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Arfazrll-181717?style=for-the-badge&logo=github)](https://github.com/Arfazrll)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/syahril-arfian-almazril)

---

![GitHub last commit](https://img.shields.io/github/last-commit/Arfazrll/PersonalBlog?style=flat-square&color=6366f1)
![GitHub repo size](https://img.shields.io/github/repo-size/Arfazrll/PersonalBlog?style=flat-square&color=a855f7)
![GitHub stars](https://img.shields.io/github/stars/Arfazrll/PersonalBlog?style=flat-square&color=f59e0b)
![License](https://img.shields.io/badge/license-MIT-22c55e?style=flat-square)

</div>

---

## Executive Summary

A production-grade, highly interactive portfolio application engineered to showcase technical expertise across Artificial Intelligence, Data Science, and Modern Software Engineering. Moving beyond traditional static documentation, this platform delivers an immersive, high-performance user experience powered by WebGL physics simulations, real-time data integrations, and an autonomous AI chatbot assistant.

---

## System Architecture & Technologies

The repository is built on a modern, decoupled architecture designed for maximal performance, scalability, and maintainability.

### Core Framework
- **Next.js 16 (App Router):** Leverages server-side rendering (SSR), static site generation (SSG), and advanced caching mechanisms for optimal content delivery.
- **React 19 & TypeScript:** Enforces strict type safety and modern reactive paradigms across 50+ custom UI components.

### 3D Graphics & Physics Simulation
- **Three.js & React Three Fiber (R3F):** Powers the core WebGL rendering engine.
- **Rapier Physics:** Integrates real-time, deterministic physics simulations (e.g., interactive 3D Lanyard and structural models).
- **Custom GLSL Shaders:** Utilized for bespoke background elements, including the Hyperspeed and warp effects.

### UI/UX Choreography
- **Framer Motion & GSAP:** Drives complex, timeline-based choreographies, micro-interactions, and fluid page transitions.
- **Tailwind CSS & Shadcn UI:** Provides a scalable, utility-first design system utilizing robust Radix UI accessibility primitives.
- **Lenis:** Implements smooth, premium scrolling dynamics.

### System Integrations & APIs
- **Dual-LLM AI Chatbot Architecture:** Integrates Groq (LLaMA 3.1) as the primary provider with an automatic failover to Google Gemini (1.5 Flash), utilizing retrieval-augmented generation context mapped directly from `portfolio.ts`.
- **GraphQL & REST Pipelines:** Consumes GitHub GraphQL for repository statistics and WakaTime API for real-time code telemetry.
- **Next-Intl:** Provides a complete bilingual experience (EN/ID) driven by client-side browser header detection.

---

## Project Structure

```text
PersonalBlog/
├── src/
│   ├── app/                          # Next.js 16 App Router Entry Points
│   │   ├── api/                      # Backend API Routes (Chatbot, GitHub, WakaTime)
│   │   ├── projects/                 # Comprehensive Project Directory
│   │   ├── experience/               # Career Timeline and Analytics
│   │   ├── skills/                   # Technical Skill Radar
│   │   ├── resume/                   # Custom PDF Rendering Engine (react-pdf)
│   │   └── blog/                     # MDX/Markdown Article Renderer
│   ├── components/
│   │   ├── three/                    # WebGL & R3F Components (Lanyard, Splash)
│   │   ├── sections/                 # Primary Page Layout Structures
│   │   └── ui/                       # 50+ Custom Shadcn & Animated Primitives
│   ├── data/
│   │   └── portfolio.ts              # Centralized JSON/TS Data Store
│   ├── hooks/                        # Custom React Hooks (Performance, Intersection)
│   └── styles/                       # Global CSS & Tailwind Directives
├── public/                           # Static Assets (Images, 3D Models, PDFs)
├── next.config.ts                    # Next.js Optimization Configuration
└── tailwind.config.ts                # Custom Design System Configurations
```

---

## Key Features

### 1. Interactive 3D Environments
Implements hardware-accelerated 3D models using `@react-three/drei` and `@react-three/fiber`. Features include a physics-simulated identification badge that responds to cursor velocity and window constraints in real time.

### 2. Autonomous Portfolio Chatbot
An intelligent conversational agent deployed via the `/api/chat` route. The system builds a dynamic context window from the static `portfolio.ts` database and processes natural language queries using a redundant Dual-LLM infrastructure.

### 3. Real-Time Telemetry
Dashboards across the platform retrieve and display real-time engineering metrics, utilizing authenticated GraphQL requests to GitHub (activity heatmaps, language breakdown) and WakaTime (coding hours, IDE preferences).

### 4. Interactive PDF Document Viewer
A custom-built document rendering engine utilizing `react-pdf`, allowing users to zoom, rotate, search, and download the resume natively within the browser application without relying on external plugins.

### 5. Performance Diagnostics
The application implements a `usePerformance` hook to evaluate client hardware capabilities in real time, automatically disabling intensive WebGL shaders and complex GSAP animations on low-power or mobile devices to preserve battery life and maintain stable framerates.

---

## Local Development Setup

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Arfazrll/PersonalBlog.git
   cd PersonalBlog
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory.

   ```env
   NEXT_PUBLIC_GITHUB_USERNAME=your_username
   GITHUB_TOKEN=your_personal_access_token
   WAKATIME_API_KEY=your_wakatime_key
   GROQ_API_KEY=your_groq_key
   GEMINI_API_KEY=your_gemini_key
   ```

4. **Initialize Development Server:**
   ```bash
   npm run dev
   ```
   Navigate to `http://localhost:3000` to interact with the application.

### Production Build
Execute the following to compile and serve the optimized application bundle:
```bash
npm run build
npm start
```

---

## Project Showcase Overview

The platform currently documents **19 technical projects** spanning multiple engineering disciplines:

| Discipline | Notable Projects | Core Technologies |
|------------|------------------|-------------------|
| **Artificial Intelligence** | DocsInsight Engine, NeuroVision, Hand Gesture Recognition | Python, TensorFlow, OpenCV, LangChain |
| **Data Science & Analytics** | Credit Risk Analysis, MyTelkomsel Sentiment, Data Analyst Dashboard | Python, LSTM, Pandas, Plotly |
| **Software Engineering** | Donasiaku, POLABDC SaaS, Digilibzx | Laravel, Next.js, Go, PostgreSQL, Prisma |
| **IoT & Embedded Systems** | TerraFlow Platform, Smart Motion Detection | ESP32, Raspberry Pi, MQTT, C++ |

---

## License

This project is licensed under the [MIT License](LICENSE).

<div align="center">
  <p>Engineered by Syahril Arfian Almazril</p>
</div>
