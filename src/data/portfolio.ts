import { PortfolioData } from '@/types';

export const portfolioData: PortfolioData = {
    personal: {
        name: 'Syahril Arfian Almazril',
        title: 'Tech Explorer',
        subtitle: 'AI Engineer • Full Stack Developer • Blockchain Enthusiast | Bridging Technical Innovation with Strategic Execution',
        bio: 'An Information Technology student at Telkom University with a distinctive profile that fuses deep technical expertise in Artificial Intelligence with proven strategic leadership. Through hands-on experience as an AI Researcher at the Cyber Physical System Laboratory, I develop complex technical solutions from architecting IoT systems and designing software blueprints to engineering advanced Machine Learning models. Currently exploring AI Agents and Blockchain/Web3 technologies. Driven to leverage this integrated skill set to build initiatives that bridge technical innovation with effective execution.',
        avatar: '/about/arfazrll.jpeg',
        location: 'DKI Jakarta, Indonesia',
        email: 'azril4974@gmail.com',
        phone: '+6281511463282',
        resumeUrl: '/resume',
        website: 'https://personal-iqyuflz4z-arfazrlls-projects.vercel.app',
        languages: [
            { name: 'Indonesian', level: 'Native' },
            { name: 'English', level: 'Limited Working' },
            { name: 'French', level: 'Elementary' },
        ],
        socialLinks: [
            {
                platform: 'GitHub',
                url: 'https://github.com/Arfazrll',
                icon: 'github',
                username: 'Arfazrll',
            },
            {
                platform: 'LinkedIn',
                url: 'https://linkedin.com/in/syahril-arfian-almazril',
                icon: 'linkedin',
                username: 'syahril-arfian-almazril',
            },
            {
                platform: 'Twitter',
                url: 'https://twitter.com/arfazrll',
                icon: 'twitter',
                username: '@arfazrll',
            },
            {
                platform: 'Instagram',
                url: 'https://instagram.com/arfazrll',
                icon: 'instagram',
                username: 'arfazrll',
            },
            {
                platform: 'Discord',
                url: 'https://discord.com/users/arfazrll',
                icon: 'discord',
                username: 'arfazrll',
            },
            {
                platform: 'Spotify',
                url: 'https://open.spotify.com/user/arfazrll',
                icon: 'spotify',
                username: 'arfazrll',
            },
        ],
    },
    projects: [
        {
            id: 'project-1',
            slug: 'creative-portfolio-website',
            title: 'Creative Portfolio Website',
            description: 'Modern, animated portfolio with 3D elements and smooth animations.',
            longDescription: 'A production-grade creative portfolio engineered to demonstrate high-level proficiency in Artificial Intelligence, Blockchain, and Modern Web Architectures. This platform transcends traditional static websites by offering a high-performance interactive experience powered by advanced WebGL shaders, physics-based simulations, and real-time data integration. It serves as a living laboratory for experimenting with cutting-edge frontend technologies while maintaing strict accessibility and SEO standards.',

            techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Three.js', 'Framer Motion', 'GSAP'],
            tools: ['VS Code', 'Figma', 'GitHub'],
            status: 'completed',
            demoUrl: 'https://syahrilarfianalmazril.vercel.app',
            repoUrl: 'https://github.com/Arfazrll/PersonalBlog',
            startDate: '2025-01-20',
            highlights: ['3D animations', 'Scroll effects', 'Bilingual EN/ID'], // Keep for backward compatibility if needed, or rely on features
            category: 'Creative Tech',
            features: [
                {
                    title: 'Immersive 3D Experience',
                    items: [
                        '**Interactive 3D Lanyard**: A physics-simulated 3D ID Card in the hero section that reacts to mouse movements.',
                        '**Hyperspeed Backgrounds**: Custom shader-based warp effects for a futuristic Web3 aesthetic.',
                        '**Particle Systems**: Dynamic background particles that enhance depth and interactivity.'
                    ]
                },
                {
                    title: 'Professional Insights',
                    items: [
                        '**Real-time Coding Stats**: Integrated WakaTime cards showing your top languages and coding activity.',
                        '**Dynamic GitHub Metrics**: Live cards displaying repository stats and contributions.',
                        '**Interactive Timeline**: A visual journey of your career at CPS Lab, HUMIC, and more.'
                    ]
                },
                {
                    title: 'Performance & UX',
                    items: [
                        '**Bilingual (EN/ID)**: Complete internationalization support.',
                        '**Smooth Scroll**: Lenis-based smooth scrolling for a premium feel.',
                        '**Theme Engine**: System-preferred dark/light mode with a custom "Click Spark" effect.',
                        '**Responsive Architecture**: Pixel-perfect layouts for mobile, tablet, and desktop.'
                    ]
                },
                {
                    title: 'Scalable Ecosystem',
                    items: [
                        '**Modular Components**: Atomic design architecture for maximum reusability.',
                        '**Type Safety**: Full TypeScript implementation for robust code reliability.',
                        '**SEO Optimized**: Semantic HTML and meta tags for maximum visibility.'
                    ]
                }
            ],
            installation: [
                {
                    title: 'Clone the Repository',
                    code: 'git clone https://github.com/Arfazrll/PersonalBlog.git\ncd PersonalBlog',
                    type: 'code'
                },
                {
                    title: 'Install Dependencies',
                    code: 'npm install',
                    type: 'code'
                },
                {
                    title: 'Environment Variables',
                    type: 'text',
                    code:
                        `Create a .env.local file in the root directory:

NEXT_PUBLIC_GITHUB_USERNAME=Arfazrll
WAKATIME_API_KEY=your_wakatime_key`
                },
                {
                    title: 'Launch Development Server',
                    code: 'npm run dev',
                    type: 'code'
                }
            ],
            challengesAndSolutions: [
                {
                    problem: "Performance Bottlenecks with Heavy 3D Assets",
                    solution: "Engineered a custom rendering pipeline using Instanced Meshes and aggressive DRaco compression, reducing initial load time by 60% while maintaining a consistent 60 FPS on mobile devices through dynamic quality scaling."
                },
                {
                    problem: "Seamless State Synchronization",
                    solution: "Implemented a robust global state management system using Zustand to orchestrate complex interactions between the React UI layer and the 3D Canvas, ensuring perfectly synchronized animations without prop-drilling overhead."
                },
                {
                    problem: "Cross-Browser Shader Compatibility",
                    solution: "Developed fallback materials and uniform-based capability detection to ensure the custom GLSL shaders render correctly across inconsistent WebGL implementations on Safari and older Android browsers."
                }
            ],

        },
        {
            id: 'project-2',
            slug: 'snbtin-platform',
            title: 'SNBTIn - Platform Persiapan SNBT 2025',
            description: 'Platform e-learning #1 di Indonesia untuk persiapan SNBT bagi siswa SMA.',
            longDescription: 'SNBTIn adalah platform persiapan SNBT (Seleksi Nasional Berbasis Tes) terpercaya yang dirancang khusus untuk siswa SMA di Indonesia. Menyediakan ekosistem pembelajaran komprehensif dengan materi berkualitas, latihan soal, forum diskusi, dan fitur-fitur interaktif yang membantu siswa mempersiapkan diri secara optimal. Dengan lebih dari 10,000 siswa aktif dan tingkat kelulusan 85%, platform ini menjadi solusi utama untuk menembus PTN impian.',

            techStack: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS'],
            tools: ['VS Code', 'GitHub', 'Figma', 'Vercel'],
            status: 'completed',
            repoUrl: 'https://github.com/Arfazrll/SNBTIn',
            demoUrl: 'https://snbtin.vercel.app/',
            startDate: '2025-01-01',
            customTimeline: 'Mar 2025 – Apr 2025',
            team: '4 Developers',
            highlights: ['10,000+ Active Students', '85% Pass Rate', '98% Exam Similarity'],
            category: 'EdTech Platform',
            features: [
                {
                    title: '📚 Comprehensive Learning Ecosystem',
                    items: [
                        '**Materi Lengkap**: Full curriculum coverage for all SNBT subjects with videos, PDFs, and interactive docs.',
                        '**Video Interaktif**: High-quality video explanations from expert instructors.',
                        '**Latihan Soal**: Over 10,000 practice questions with detailed solutions and error analysis.'
                    ]
                },
                {
                    title: '🎯 Exam Mastery & Analytics',
                    items: [
                        '**Tryout Berkala**: Regular simulation exams with latest question patterns.',
                        '**Analisis Kemampuan**: Detailed performance dashboard to track progress and weak points.',
                        '**98% Similarity**: Questions designed to closely mimic actual SNBT exams.'
                    ]
                },
                {
                    title: '💻 Modern Tech Experience',
                    items: [
                        '**Dark/Light Mode**: Comfortable learning environment day or night.',
                        '**Responsive Design**: Optimized for desktop, tablet, and mobile learning.',
                        '**Interactive Visuals**: 3D models and animated backgrounds for engaging UX.'
                    ]
                },
                {
                    title: '🤝 Community & Support',
                    items: [
                        '**Forum Diskusi**: Collaborative learning space for students and teachers.',
                        '**Konsultasi**: Direct access to instructors for difficult topics.',
                        '**Leaderboard**: Gamified progress tracking to motivate students.'
                    ]
                }
            ],
            installation: [
                {
                    title: 'Clone the Repository',
                    code: 'git clone https://github.com/Arfazrll/SNBTIn.git\ncd SNBTIn',
                    type: 'code'
                },
                {
                    title: 'Install Dependencies',
                    code: 'npm install',
                    type: 'code'
                },
                {
                    title: 'Environmental Setup',
                    code: 'NEXT_PUBLIC_API_URL=your_api_url\nNEXTAUTH_URL=http://localhost:3000\nDATABASE_URL=your_db_connection',
                    type: 'code'
                },
                {
                    title: 'Run Development Server',
                    code: 'npm run dev',
                    type: 'code'
                }
            ],
            challengesAndSolutions: [
                {
                    problem: "Handling High-Concurrency Tryouts",
                    solution: "Implemented serverless architecture with scalable database connections to handle thousands of concurrent users during national simulation events without latency."
                },
                {
                    problem: "Real-time Analytics Processing",
                    solution: "Utilized efficient data aggregation pipelines to provide instant feedback and detailed performance analytics immediately after exam submission."
                },
                {
                    problem: "Interactive Content Delivery",
                    solution: "Integrated a custom video player and PDF viewer with lazy loading and adaptive streaming to ensure smooth content delivery even on low-bandwidth connections."
                }
            ],

        },
        {
            id: 'project-3',
            slug: 'terraflow-platform',
            title: 'Terraflow Platform',
            description: 'Enterprise-grade IoT solution for precision agriculture.',
            longDescription: 'TerraFlow Platform is an intelligent IoT solution designed for precision agriculture and environmental monitoring. It features a robust Direct-to-Cloud architecture where ESP32 sensor nodes communicate directly with Firebase Realtime Database, ensuring instant data synchronization. The system combines a high-performance Go (Gin) backend for configuration management with a modern Next.js 14 frontend for real-time visualization and remote control of actuators like pumps and servos.',

            techStack: ['Next.js', 'Go', 'Gin', 'Firebase', 'Docker', 'ESP32', 'C++', 'React', 'Tailwind CSS'],
            tools: ['VS Code', 'Docker', 'Firebase Console', 'PlatformIO'],
            status: 'completed',
            repoUrl: 'https://github.com/Arfazrll/TerraflowPlatform',
            demoUrl: 'https://terraflowio.vercel.app/',
            startDate: '2025-10-01',
            customTimeline: 'Oct 2025 - Dec 2025',
            team: '2 Developer',
            role: 'Software Engineering',
            highlights: ['Direct-to-Cloud Architecture', 'Real-time Monitoring', 'Go High-Performance API'],
            category: 'IoT & Embedded',
            features: [
                {
                    title: '🤖 Smart Firmware (ESP32)',
                    items: [
                        '**Direct HTTP Communication**: Efficient data transmission using `HTTPClient.h` directly to Firebase REST API.',
                        '**Smart Control Logic**: Automated actuation of pumps and servos based on real-time sensor readings.',
                        '**Robust Connectivity**: Built-in auto-reconnect and retry mechanisms to handle unstable field networks.'
                    ]
                },
                {
                    title: '🖥️ Modern Dashboard',
                    items: [
                        '**Real-time Visualization**: Dynamic charts using `recharts` that update instantly with Firebase data.',
                        '**Interactive Control**: Remote manual overrides for field actuators directly from the UI.',
                        '**Responsive Design**: Built with Next.js 14 and Tailwind CSS for optimal experience on all devices.'
                    ]
                },
                {
                    title: '⚡ High-Performance Backend',
                    items: [
                        '**Go (Gin) Server**: Ultra-fast API for centralized configuration management.',
                        '**Secure Distribution**: Safe delivery of Firebase credentials to authenticated clients.',
                        '**Health Monitoring**: Dedicated endpoints for container and service status checks.'
                    ]
                },
                {
                    title: '☁️ Direct-to-Cloud Architecture',
                    items: [
                        '**Zero-Gateway Latency**: Edge devices write directly to the cloud, bypassing intermediate gateways for millisecond-level updates.',
                        '**Scalable Infrastructure**: Containerized deployment with Docker ensures consistent environments across development and production.',
                        '**Firebase Sync**: Leverages Firebase Realtime Database for instant state synchronization between hardware and all connected clients.'
                    ]
                }
            ],
            installation: [
                {
                    title: 'Environment Setup',
                    code: 'PORT=8080\nALLOWED_ORIGINS=http://localhost:3000\nFIREBASE_API_KEY=your_key\n# Add other Firebase credentials',
                    type: 'code'
                },
                {
                    title: 'Deploy with Docker',
                    code: 'cd deployments\ndocker-compose up -d --build',
                    type: 'code'
                }
            ],
            challengesAndSolutions: [
                {
                    problem: "Unstable Field Connectivity",
                    solution: "Implemented a robust state machine in C++ firmware with exponential backoff retries and auto-reconnection logic to ensure zero data loss during network interruptions."
                },
                {
                    problem: "Real-time Latency",
                    solution: "Adoption of a Direct-to-Cloud architecture where edge devices bypass intermediate gateways and write directly to Firebase, reducing latency to milliseconds."
                },
                {
                    problem: "Secure Config Management",
                    solution: "Developed a centralized Go (Gin) backend service to manage and distribute sensitive configuration and credentials securely, decoupling them from the frontend code."
                }
            ],
        },
        {
            id: 'project-4',
            slug: 'docsinsight-engine',
            title: 'DocsInsight Engine',
            description: 'Enterprise RAG System for intelligent document analysis.',
            longDescription: 'DocsInsight Engine is a high-performance, private Retrieval-Augmented Generation (RAG) platform. It allows users to upload complex documents and interact with them through a neural search interface powered by local Large Language Models (LLMs). Built on a robust Python/Flask backend and orchestrated by LangChain, it ensures sensitive data never leaves your infrastructure while delivering enterprise-grade search capabilities.',

            techStack: ['Python', 'Flask', 'LangChain', 'Ollama', 'ChromaDB', 'Docker'],
            tools: ['VS Code', 'Docker', 'Ollama'],
            status: 'completed',
            repoUrl: 'https://github.com/Arfazrll/RAG-DocsInsight-Engine',
            demoUrl: '#', // Set to '#' to trigger specific disabled state
            startDate: '2024-11-01',
            role: 'AI Engineer',
            customTimeline: 'Oct - Nov 2025',

            highlights: ['Local LLM Execution', 'Multi-Format Support', 'Neural Retrieval'],
            category: 'AI & Machine Learning',
            features: [
                {
                    title: 'Core Capabilities',
                    items: [
                        '**Multi-Format Support**: Seamlessly process PDF, DOCX, XLSX, CSV, and TXT files.',
                        '**Privacy-Centric**: Fully local execution using **Ollama**. Your sensitive data never leaves your infrastructure.',
                        '**Neural Retrieval**: Uses **ChromaDB** for high-speed vector similarity search.'
                    ]
                },
                {
                    title: 'Modern Interface',
                    items: [
                        '**Glassmorphism UI**: A sleek, dark-themed interface with real-time markdown rendering.',
                        '**Code Highlighting**: Automatic syntax highlighting for technical responses.',
                        '**Source Verification**: Every answer comes with citations from uploaded documents to prevent hallucinations.'
                    ]
                },
                {
                    title: 'Technical Architecture',
                    items: [
                        '**Backend**: Python 3.11 with Flask and LangChain orchestration.',
                        '**Vector DB**: ChromaDB for persistent document embeddings.',
                        '**One-Command Setup**: Production-ready deployment with Docker and Docker Compose.'
                    ]
                },
                {
                    title: 'System Insights',
                    items: [
                        '**Scalability**: The `VectorStoreManager` handles multiple documents simultaneously by filtering searches based on unique file hashes.',
                        '**Performance**: Document chunking is optimized with a `1000` character size and `200` character overlap.',
                        '**Security**: Strictly enforced policies to prevent sensitive credentials (`.env`) or local databases from being exposed.'
                    ]
                }
            ],
            installation: [
                {
                    title: 'Clone and Setup',
                    code: 'git clone https://github.com/Arfazrll/RAG-DocsInsight-Engine.git\ncd rag-docsinsight-engine',
                    type: 'code'
                },
                {
                    title: 'Launch with Docker',
                    code: 'docker-compose up --build',
                    type: 'code'
                },
                {
                    title: 'Access Application',
                    code: 'Open http://localhost:5000',
                    type: 'text'
                }
            ],
            challengesAndSolutions: [
                {
                    problem: "Scalability with Multiple Documents",
                    solution: "Designed a `VectorStoreManager` that filters searches based on unique file hashes, allowing the system to handle multiple uploaded documents simultaneously without cross-contamination."
                },
                {
                    problem: "Context Window Efficiency",
                    solution: "Optimized document chunking with a 1000-character size and 200-character overlap to maintain context coherence while fitting within the Llama 3 context window."
                },
                {
                    problem: "Data Security",
                    solution: "Implemented strict `.dockerignore` and `.gitignore` policies to prevent sensitive credentials (`.env`) or local vector databases from being leaked to version control."
                }
            ]
        },
        {
            id: 'project-5',
            slug: 'donasiaku',
            title: 'Donasiaku',
            description: 'Platform Penyaluran Donasi Barang Layak Pakai.',
            longDescription: 'Donasiku adalah platform modern yang dirancang untuk memfasilitasi penyaluran donasi barang fisik layak pakai secara efisien dan transparan. Menghubungkan Donatur dengan Penerima melalui ekosistem digital yang dilengkapi fitur pelacakan status, chat real-time, dan verifikasi akun untuk memastikan bantuan sampai ke tangan yang tepat.',

            techStack: ['Laravel 12', 'React 19', 'Tailwind CSS 3.4', 'MySQL', 'Vite', 'Sanctum'],
            tools: ['VS Code', 'Docker', 'Postman', 'MySQL Workbench'],
            status: 'completed',
            repoUrl: 'https://github.com/Mazkad12/DONASIKU-WEBPRO',
            demoUrl: 'https://donasiku.site/',
            startDate: '2024-10-01',
            role: 'Full Stack Developer',
            customTimeline: 'Oct - Dec 2025',
            team: '6 Developers',

            highlights: ['Monorepo Architecture', 'Real-time Chat', 'Sanctum Authentication'],
            category: 'Software Engineering',
            features: [
                {
                    title: 'Donation Management',
                    items: [
                        '**Postingan Donasi**: Donatur dapat mengunggah barang dengan foto, deskripsi, dan kategori.',
                        '**Permintaan Barang**: Penerima dapat menelusuri katalog dan mengirim permintaan langsung.',
                        '**Status Tracking**: Pelacakan status transparan mulai dari Dipesan hingga Diterima.'
                    ]
                },
                {
                    title: 'Security & Trust',
                    items: [
                        '**Otentikasi Aman**: Didukung oleh **Laravel Sanctum** untuk manajemen sesi yang kuat.',
                        '**Verifikasi Akun**: Sistem validasi dokumen untuk memastikan kredibilitas Penerima.',
                        '**Role-Based Access**: Antarmuka yang dioptimalkan khusus untuk Donatur dan Penerima.'
                    ]
                },
                {
                    title: 'Communication',
                    items: [
                        '**Real-time Chat**: Koordinasi langsung antara donor dan penerima dalam platform.',
                        '**Sistem Notifikasi**: Pemberitahuan instan untuk pesan baru dan perubahan status donasi.',
                        '**Responsive UI**: Desain yang dioptimalkan untuk akses dari seluler hingga desktop.'
                    ]
                },
                {
                    title: 'User Intelligence',
                    items: [
                        '**Manajemen Profil**: Pengaturan informasi pribadi, avatar, dan preferensi donasi.',
                        '**Riwayat Aktivitas**: Rekam jejak lengkap donasi yang pernah diberikan atau diterima.',
                        '**Analitik Sederhana**: Statistik kontribusi sosial bagi pengguna aktif.'
                    ]
                }
            ],
            installation: [
                {
                    title: 'Clone the Repository',
                    code: 'git clone https://github.com/Mazkad12/DONASIKU-WEBPRO.git\ncd donasiaku',
                    type: 'code'
                },
                {
                    title: 'Docker Setup (Recommended)',
                    code: 'docker-compose -f docker-compose.dev.yml up -d --build',
                    type: 'code'
                },
                {
                    title: 'Manual Backend Setup',
                    code: 'cd backend\ncomposer install\ncp .env.example .env\nphp artisan key:generate\nphp artisan migrate\nphp artisan serve',
                    type: 'code'
                },
                {
                    title: 'Manual Frontend Setup',
                    code: 'cd frontend\nnpm install\nnpm run dev',
                    type: 'code'
                }
            ],
            challengesAndSolutions: [
                {
                    problem: "Secure Document Verification",
                    solution: "Developed a robust backend pipeline with Laravel Sanctum and manual admin verification workflows to ensure high trust levels for beneficiary accounts."
                },
                {
                    problem: "Real-time Coordination Complexity",
                    solution: "Integrated a custom chat system with instant state updates to facilitate direct communication without relying on third-party messaging apps."
                },
                {
                    problem: "Monorepo Environment Sync",
                    solution: "Orchestrated a containerized development environment using Docker to ensure seamless integration between the PHP/Laravel API and React 19 client."
                }
            ]
        },
        {
            id: 'project-6',
            slug: 'security-automation-genai',
            title: 'Security Automation with GenAI',
            description: 'AI-driven cybersecurity threat detection system using Transformers.',
            longDescription: 'Security Automation with GenAI is a research-driven project exploring the intersection of deep learning and cybersecurity. It leverages state-of-the-art Transformer architectures and Adaptive Attention mechanisms to automate the detection of complex threats like SQL Injection, DDoS, and network intrusions, providing a robust defense framework for modern digital infrastructures.',

            techStack: ['Python', 'TensorFlow', 'Keras', 'Transformers', 'Pandas', 'Scikit-learn', 'Adaptive Attention'],
            tools: ['VS Code', 'Jupyter Notebook', 'Google Colab', 'Wireshark'],
            status: 'completed',
            repoUrl: 'https://github.com/Arfazrll/Security-Automation-GenAI',
            demoUrl: '#', // Research-based platform
            startDate: '2024-09-01',
            role: 'AI Developer',
            customTimeline: 'Nov - Dec 2025',
            team: 'SOC Intern Project',

            highlights: ['Transformer-Based SQLi Detection', 'Adaptive Attention for DDoS', 'Multi-Modal Data Fusion'],
            category: 'AI & Machine Learning',
            features: [
                {
                    title: 'Threat Intelligence',
                    items: [
                        '**SQLi Transformer**: Contextual learning model that recognizes malicious SQL patterns in HTTP requests.',
                        '**Phishing BERT**: Bidirectional analysis of URLs and email text to identify deceptive social engineering attempts.',
                        '**Malware Classification**: Network traffic sequence analysis to detect C2 communications.'
                    ]
                },
                {
                    title: 'Network Defense',
                    items: [
                        '**Adaptive DDoS Protection**: Real-time traffic analysis using dynamic attention weights for spike detection.',
                        '**Intrusion Detection**: High-precision classification of unauthorized access patterns using UNSW-NB15 datasets.',
                        '**MitM Identification**: Anomaly detection in communication sequences to identify packet interception.'
                    ]
                },
                {
                    title: 'Research Domains',
                    items: [
                        '**Zero-Day Detection**: Unsupervised learning approach to identify previously unmapped attack behaviors.',
                        '**Ransomware Prediction**: Sequence modeling for sudden encryption patterns in packet data.',
                        '**Insider Threat Analysis**: Comprehensive user activity log analysis for unusual access patterns.'
                    ]
                },
                {
                    title: 'Performance Analytics',
                    items: [
                        '**Comprehensive Metrics**: Evaluation using precision-recall curves, F1-scores, and confusion matrices.',
                        '**Visual Insights**: Deep data distribution analysis using Matplotlib and Seaborn.',
                        '**Temporal Analysis**: Understanding data flow over time to identify slow-burning APT (Advanced Persistent Threats).'
                    ]
                }
            ],
            installation: [
                {
                    title: 'Setup Environment',
                    code: 'git clone https://github.com/Arfazrll/Security-Automation-GenAI.git\ncd security-automation-ai-genai\n# Recommended: use a virtual environment',
                    type: 'code'
                },
                {
                    title: 'Install Dependencies',
                    code: 'pip install tensorflow pandas numpy matplotlib seaborn scikit-learn jupyter',
                    type: 'code'
                },
                {
                    title: 'Run Research Notebooks',
                    code: 'cd [target_source_dir]\njupyter notebook\n# Open the .ipynb files in the notebook subdirectory',
                    type: 'code'
                }
            ],
            challengesAndSolutions: [
                {
                    problem: "Signature-Based Limitations",
                    solution: "Transformed security operations by implementing Transformer models that learn from behavior and context rather than static signatures."
                },
                {
                    problem: "Dynamic Attack Patterns",
                    solution: "Developed an Adaptive Attention mechanism that dynamically adjusts focus to specific traffic segments during active DDoS attempts."
                },
                {
                    problem: "Multi-Modal Data Synchronization",
                    solution: "Engineered a data fusion pipeline to integrate network traffic, file logs, and process behavior into a unified Transformer input layer."
                }
            ]
        },
        {
            id: 'project-7',
            slug: 'web3-guestbook-dapp',
            title: 'Web3 Guestbook DApp',
            description: 'Decentralized guestbook on Ethereum allowing for immutable messages.',
            longDescription: 'Web3GuestbookDapp is a decentralized application that bridges modern Web2 interfaces with the Ethereum blockchain. It allows users to connect their MetaMask wallets and sign a persistent guestbook, creating immutable records of their visit. The project demonstrates the full lifecycle of a DApp, from smart contract development with Solidity to a responsive frontend built with Next.js.',

            techStack: ['Solidity', 'Hardhat', 'Next.js', 'Ethereum', 'Web3.js', 'MetaMask', 'Ethers.js'],
            tools: ['VS Code', 'MetaMask', 'Remix IDE', 'Vercel'],
            status: 'completed',
            repoUrl: 'https://github.com/Arfazrll/Web3GuestbookDapp',
            demoUrl: 'https://metamaskguestbook.vercel.app/',
            startDate: '2025-01-01',
            role: 'Blockchain Developer',
            customTimeline: 'Jan - Feb 2026',
            team: 'Personal Project',

            highlights: ['Immutable Blockchain Records', 'MetaMask Integration', 'Smart Contract Automation'],
            category: 'Blockchain',
            features: [
                {
                    title: 'Wallet Integration',
                    items: [
                        '**MetaMask Connection**: Seamless user authentication through industry-standard Web3 providers.',
                        '**Account Status**: Real-time monitoring of wallet connection and network synchronization.',
                        '**Auto-Recovery**: Graceful handling of network switches and account changes.'
                    ]
                },
                {
                    title: 'Blockchain Logic',
                    items: [
                        '**Solidity Smart Contract**: Robust logic for managing guestbook entries stored on-chain.',
                        '**Hardhat Environment**: Comprehensive suite for testing, compiling, and deploying contracts.',
                        '**Immutable Logs**: Every signature is a permanent transaction on the Ethereum network.'
                    ]
                },
                {
                    title: 'Real-time Interaction',
                    items: [
                        '**Auto-Fetch Feed**: Instant update of guestbook entries upon successful blockchain confirmation.',
                        '**Transaction Feedback**: Visual indicators for transaction pending, success, and error states.',
                        '**Wave Reactions**: Interactive "Wave" feature that sends a blockchain-verified greeting.'
                    ]
                },
                {
                    title: 'Optimized Frontend',
                    items: [
                        '**Next.js 14**: High-performance interface with optimized rendering and asset delivery.',
                        '**Tailwind Styling**: Modern, clean UI designed for a professional Web3 experience.',
                        '**ABI Bridge**: Secure integration between Javascript logic and the smart contract interface.'
                    ]
                }
            ],
            installation: [
                {
                    title: 'Clone & Install',
                    code: 'git clone https://github.com/Arfazrll/Web3GuestbookDapp.git\ncd web3guestbookdapp\nnpm install',
                    type: 'code'
                },
                {
                    title: 'Blockchain Setup',
                    code: 'cd backend\nnpx hardhat node\n# In a new terminal:\nnpx hardhat run scripts/deploy.js --network localhost',
                    type: 'code'
                },
                {
                    title: 'Frontend Configuration',
                    code: 'cd ../frontend\n# Update contract-address.json with the deployed address\nnpm run dev',
                    type: 'code'
                }
            ],
            challengesAndSolutions: [
                {
                    problem: "Blockchain Nonce Desynchronization",
                    solution: "Implemented a custom activity reset workflow and state-sync logic to handle cases where local blockchain resets caused mismatching nonces in MetaMask."
                },
                {
                    problem: "Contract ABI Management",
                    solution: "Automated the ABI extraction process into the frontend environment to ensure the bridge between Web2 and Web3 remains perfectly aligned during contract updates."
                },
                {
                    problem: "Ethereum Event Handling",
                    solution: "Utilized Ethers.js event listeners to trigger UI updates directly from the blockchain state, ensuring the feed remains real-time without polling."
                }
            ]
        },
        {
            id: 'project-8',
            slug: 'digilibzx',
            title: 'Digilibzx',
            description: 'Modern full-stack digital library management system with AI-powered features.',
            longDescription: 'Digilibzx is a comprehensive digital library management solution designed to streamline library operations. Built with a robust Java Spring Boot backend and a high-performance Next.js frontend, it integrates Google Gemini and OpenAI to provide automated book summaries. The system features a multi-layered security framework, real-time activity analytics, and a seamless borrowing system for an enhanced user experience.',

            techStack: ['Java', 'Spring Boot 3', 'Next.js 14', 'TypeScript', 'MySQL', 'Spring Security', 'Hibernate', 'Docker', 'Tailwind CSS', 'Shadcn UI', 'Google Gemini', 'OpenAI', 'Swagger', 'Recharts'],
            tools: ['IntelliJ IDEA', 'VS Code', 'Docker Desktop', 'MySQL Workbench', 'Maven', 'pnpm'],
            status: 'completed',
            repoUrl: 'https://github.com/Arfazrll/Digilibzx',
            demoUrl: '#', // Internal system
            startDate: '2024-08-01',
            role: 'Lead & Full Stack Dev',
            customTimeline: 'December 2025',
            team: '5 Developers',

            highlights: ['AI-Powered Book Summaries', 'Real-time Analytics Dashboard', 'Docker Containerization Ready'],
            category: 'Software Engineering',
            features: [
                {
                    title: 'User Experience',
                    items: [
                        '**Smart Search**: Advanced book discovery by title, category, or author with real-time filtering.',
                        '**Self-Service Circulation**: Integrated shopping cart for borrowing requests and return tracking.',
                        '**Review System**: Community-driven ratings and reviews for every book in the collection.'
                    ]
                },
                {
                    title: 'AI Capabilities',
                    items: [
                        '**AI Summarize**: Automatic generation of book summaries using Google Gemini & OpenAI API integration.',
                        '**Smart Recommendations**: Data-driven book suggestions based on user borrowing patterns.',
                        '**Content Analysis**: Intelligent categorization and tagging of new library additions.'
                    ]
                },
                {
                    title: 'Admin Controls',
                    items: [
                        '**Analytics Dashboard**: Visualized insights into borrowing trends and popular books using Recharts.',
                        '**Transaction Validation**: Streamlined approval/rejection workflow for borrowing requests.',
                        '**Inventory Control**: Comprehensive book and category management with cover upload support.'
                    ]
                },
                {
                    title: 'System Integrity',
                    items: [
                        '**Secure Authentication**: Multi-layered protection using Spring Security and JWT signatures.',
                        '**PDF Reporting**: Automated generation of analytics and inventory reports for library auditing.',
                        '**Docker Ready**: Optimized orchestration for easy deployment and scalability across environments.'
                    ]
                }
            ],
            installation: [
                {
                    title: 'Docker Method (Recommended)',
                    code: 'git clone https://github.com/Arfazrll/Digilibzx.git\ncd digilibzx\n# Update .env and application.properties\ndocker-compose up --build',
                    type: 'code'
                },
                {
                    title: 'Manual Backend Setup',
                    code: 'cd backend\nmvn clean install\n# Setup MySQL (digilibz_db) and update application.properties\nmvn spring-boot:run',
                    type: 'code'
                },
                {
                    title: 'Manual Frontend Setup',
                    code: 'cd frontend\npnpm install\nnpm run dev',
                    type: 'code'
                }
            ],
            challengesAndSolutions: [
                {
                    problem: "AI Model Token Constraints",
                    solution: "Implemented a text-shredding and summarization pipeline to handle large book descriptions without exceeding Google Gemini's token limits."
                },
                {
                    problem: "Real-time Chart Performance",
                    solution: "Optimized database queries and integrated Recharts with memoized components to ensure smooth rendering of library activity dashboards."
                },
                {
                    problem: "Multi-Role Security Complexity",
                    solution: "Configured a granular Spring Security filter chain to manage distinct access levels for Admins, Lecturers, and Students securely."
                }
            ]
        },
        {
            id: 'project-9',
            slug: 'polabdc-dental-management',
            title: 'POLABDC Dental Management',
            description: 'AI-powered Dental Clinic Management SaaS for digitized operations.',
            longDescription: 'RoxyDental (POLABDC) is a high-performance SaaS solution designed to digitize dental clinic operations. It integrates Artificial Intelligence to assist dentists with disease prediction and data analysis while providing a seamless experience for patients, nurses, and administrators. Built as a Monorepo, the system ensures scalability by separating the Next.js client, Express.js server, and dynamic Python AI processing unit.',

            techStack: ['Next.js 14', 'Express.js', 'Prisma', 'Supabase', 'PostgreSQL', 'Python', 'TypeScript', 'Tailwind CSS', 'Shadcn UI', 'JWT', 'Google Gemini'],
            tools: ['VS Code', 'Supabase Dashboard', 'Prisma Studio', 'Figma', 'Postman'],
            status: 'completed',
            repoUrl: 'https://github.com/Arfazrll/POLABDC',
            demoUrl: 'https://polabdc.my.id/',
            startDate: '2024-07-01',
            role: 'Backend Developer',
            customTimeline: 'Nov 2025 - Jan 2026',
            team: '3 Developers',

            highlights: ['AI-Driven EMR System', 'Monorepo Architecture', 'Real-time Queue Management'],
            category: 'Software Engineering',
            features: [
                {
                    title: 'Dentist Experience',
                    items: [
                        '**Smart Dashboard**: Overview of daily appointments and financial stats at a glance.',
                        '**Digital EMR**: Comprehensive Electronic Medical Records with full history tracking.',
                        '**AI Assistant**: Intelligent disease prediction and clinical data analysis for diagnosis support.',
                        '**Treatment Planning**: Record treatments, prescriptions, and detailed clinical notes.'
                    ]
                },
                {
                    title: 'Nursing Workflow',
                    items: [
                        '**Queue Management**: Real-time handling of patient queues for efficient clinic flow.',
                        '**Vitals Recording**: Pre-consultation checks including blood pressure and symptom logging.',
                        '**Rapid Registration**: Streamlined onboarding process for new patients.'
                    ]
                },
                {
                    title: 'Operational Logic',
                    items: [
                        '**Scheduling System**: Conflict-free calendar for managing clinic-wide appointments.',
                        '**Billing & Invoicing**: Automated revenue tracking and invoice generation.',
                        '**RBAC Security**: Granular Role-Based Access Control for different clinic personnel.'
                    ]
                },
                {
                    title: 'AI & Infrastructure',
                    items: [
                        '**AI Service Integration**: Python-based microservice for high-speed disease prediction models.',
                        '**Monorepo Scaling**: Structured architecture connecting Next.js, Express.js, and AI modules.',
                        '**Database Architecture**: High-performance schema design using Prisma ORM and PostgreSQL.',
                        '**Real-time Synchronization**: Leveraging Supabase subscriptions for instant state updates across the clinic.'
                    ]
                }
            ],
            installation: [
                {
                    title: 'Database Setup',
                    code: 'cd backend\nnpm install\n# Configure .env with DATABASE_URL (Supabase)\nnpx prisma migrate dev --name init',
                    type: 'code'
                },
                {
                    title: 'Backend & AI Setup',
                    code: 'npm run dev # Backend starts at port 5000\ncd ../roxydental-ai\npip install -r requirements.txt\npython api.py',
                    type: 'code'
                },
                {
                    title: 'Frontend Launch',
                    code: 'cd ../frontend\nnpm install\n# Configure .env.local with NEXT_PUBLIC_API_URL\nnpm run dev',
                    type: 'code'
                }
            ],
            challengesAndSolutions: [
                {
                    problem: "AI Service Latency",
                    solution: "Isolated the AI engine into a separate Python microservice to prevent heavy ML processing from blocking the main Express.js event loop."
                },
                {
                    problem: "Monorepo Orchestration",
                    solution: "Implemented a structured directory system with shared environment configurations to maintain synchronization across Frontend, Backend, and AI modules."
                },
                {
                    problem: "Real-time Queue Sync",
                    solution: "leveraged Supabase real-time subscriptions and optimistic UI updates to ensure nurses and doctors see patient status changes instantly."
                }
            ]
        },
        {
            id: 'project-10',
            slug: 'deep-learning-image-classifier',
            title: 'Deep Learning Image Classifier',
            description: 'Interactive educational platform for visualizing CNN and Transfer Learning mechanics.',
            longDescription: 'The Deep Learning Image Classifier is an interactive educational platform designed to demystify the inner workings of Convolutional Neural Networks (CNN) and Transfer Learning. Built with Streamlit and TensorFlow, the application provides real-time visualizations of image preprocessing, RGB channel analysis, convolution operations, and intermediate feature maps, allowing users to watch as the model extracts features and reaches a classification decision.',

            techStack: ['Python', 'TensorFlow', 'Keras', 'Streamlit', 'Plotly', 'NumPy', 'SciPy', 'MobileNetV2', 'Pillow'],
            tools: ['Jupyter Notebook', 'Google Colab', 'Streamlit Cloud', 'VS Code'],
            status: 'completed',
            repoUrl: 'https://github.com/Arfazrll/CA-Modul03-HandsOn',
            demoUrl: 'https://ca-modul03-handson.streamlit.app/',
            startDate: '2024-06-01',
            role: 'AI Research Engineer',
            customTimeline: 'Nov 2025',
            team: 'Personal Project',

            highlights: ['Real-time Feature Map Visualization', 'Interactive Layer Breakdown', 'CNN vs Transfer Learning Comparison'],
            category: 'AI & Machine Learning',
            features: [
                {
                    title: 'Interactive Analytics',
                    items: [
                        '**RGB Matrix Analysis**: Dynamic heatmaps and histograms for detailed color channel decomposition.',
                        '**Feature Map Extraction**: Live visualization of intermediate layer outputs to understand what the model "sees".',
                        '**Prediction Confidence**: Interactive probability distributions and confidence meters for classification results.'
                    ]
                },
                {
                    title: 'Architecture Deep-Dive',
                    items: [
                        '**Custom CNN Workflow**: Step-by-step breakdown of a 3-layer convolutional network for hand gesture recognition.',
                        '**Conv Operations**: Real-time demonstration of filters extracting edges, textures, and patterns.',
                        '**MobileNetV2 Integration**: Implementation of pre-trained ImageNet models for high-accuracy Cheetah vs Hyena classification.'
                    ]
                },
                {
                    title: 'Model Learning',
                    items: [
                        '**Transfer Learning Mechanics**: Visual explanation of frozen base models and custom classifier fine-tuning.',
                        '**Hyperparameter Insights**: Interactive Sliders to adjust visualization parameters and model thresholds.',
                        '**Performance Reporting**: Detailed accuracy and loss metrics comparison between custom and pre-trained architectures.'
                    ]
                },
                {
                    title: 'Educational UX',
                    items: [
                        '**Progressive Visualization**: Managed learning path from raw image input to final classification probability.',
                        '**Interactive Documentation**: Integrated explanations of convolution, pooling, and activation functions.',
                        '**Dual-Model Comparison**: Parallel demonstration of standard CNN vs state-of-the-art Transfer Learning (MobileNetV2).'
                    ]
                }
            ],
            installation: [
                {
                    title: 'Environment Setup',
                    code: 'git clone https://github.com/Arfazrll/CA-Modul03-HandsOn.git\ncd CA-Modul03-HandsOn\npython -m venv venv\nsource venv/bin/activate',
                    type: 'code'
                },
                {
                    title: 'Install Dependencies',
                    code: 'pip install -r requirements.txt',
                    type: 'code'
                },
                {
                    title: 'Launch Platform',
                    code: 'streamlit run app.py',
                    type: 'code'
                }
            ],
            challengesAndSolutions: [
                {
                    problem: "Intermediate Activation Capture",
                    solution: "Constructed sub-models using the Keras Functional API to extract output tensors from specific intermediate layers without interrupting the main inference pipeline."
                },
                {
                    problem: "High-Resolution Heatmap Lag",
                    solution: "Optimized RGB intensity distributions using Plotly's WebGL-accelerated rendering and data downsampling for ultra-smooth interactive charts."
                },
                {
                    problem: "Limited Computation on Edge",
                    solution: "Utilized depthwise separable convolutions from MobileNetV2 to achieve 96%+ accuracy while maintaining low-latency inference on standard CPU-based instances."
                }
            ]
        },
        {
            id: 'project-11',
            slug: 'ai-book-discovery-platform',
            title: 'AI Book Discovery Platform',
            description: 'Local RAG-based book recommendation system with semantic search.',
            longDescription: 'The AI Book Discovery Platform is an intelligent recommendation system that moves beyond simple keyword matching to understand the semantic context of user queries. Powered by Ollama, it leverages the \"nomic-embed-text\" model for vector-based search and \"llama3.2:1b\" for expert-level book analysis. The entire system runs 100% locally, ensuring complete user privacy while providing deep insights into search intent and reader profiling.',

            techStack: ['Python', 'Streamlit', 'Ollama', 'LangChain', 'Nomic Embed', 'Llama 3.2', 'Pandas', 'Scikit-learn'],
            tools: ['VS Code', 'Ollama Runtime', 'Streamlit Cloud', 'Jupyter Notebook'],
            status: 'completed',
            repoUrl: 'https://github.com/Arfazrll/OllamaLLM-RecomendationSystem',
            demoUrl: '#', // Local AI service
            startDate: '2024-05-01',
            role: 'Ai & Software Developer',
            customTimeline: 'Oct - Nov 2025',
            team: 'Personal Project',

            highlights: ['Semantic Search Engine', '100% Local LLM Inference', 'Privacy-First Architecture'],
            category: 'AI & Machine Learning',
            features: [
                {
                    title: 'Search Architecture',
                    items: [
                        '**Semantic Discovery**: Natural language understanding using vector embeddings to find books by theme and intent.',
                        '**Vector Search**: Implementation of Cosine Similarity algorithms to rank matches by semantic relevance.',
                        '**Contextual Logic**: Ability to find relevant titles even without matching exact keywords in descriptions.'
                    ]
                },
                {
                    title: 'Local AI Intelligence',
                    items: [
                        '**LLM Analysis**: Leveraging Llama 3.2 to generate expert book reviews, summaries, and audience insights.',
                        '**Query Decomposition**: Intelligent breakdown of user search descriptions to identify hidden reading preferences.',
                        '**Reader Profiling**: AI-generated reports on the user\'s reading style based on their historical search history.'
                    ]
                },
                {
                    title: 'Data Management',
                    items: [
                        '**Curated Datasets**: Pre-loaded collection of diverse literature for immediate discovery.',
                        '**Custom Ingestion**: Support for user-uploaded CSV datasets to enable search across personal libraries.',
                        '**Dynamic Tabulation**: Real-time processing and ranking of large book catalogs using optimized Pandas pipelines.'
                    ]
                },
                {
                    title: 'Privacy & Performance',
                    items: [
                        '**Edge Computing**: 100% local inference via Ollama, ensuring no data ever leaves the user\'s machine.',
                        '**Inference Optimization**: Fine-tuned model parameters (top_k, temperature) to balance generation speed and analytical depth.',
                        '**Responsive UI**: Instant feedback loops in Streamlit for embedding generation and generation status.'
                    ]
                }
            ],
            installation: [
                {
                    title: 'Ollama Setup',
                    code: 'ollama pull nomic-embed-text\nollama pull llama3.2:1b\n# Ensure Ollama serve is running',
                    type: 'code'
                },
                {
                    title: 'Environment Launch',
                    code: 'git clone https://github.com/Arfazrll/OllamaLLM-RecomendationSystem.git\npip install -r requirements.txt\nstreamlit run OllamaLLM.py',
                    type: 'code'
                }
            ],
            challengesAndSolutions: [
                {
                    problem: "Vector Storage Overhead",
                    solution: "Developed an on-demand embedding generation and caching strategy for local datasets to eliminate the need for an external vector database."
                },
                {
                    problem: "LLM Hallucination Control",
                    solution: "Implemented strict system prompts and few-shot examples within the RAG pipeline to ensure generated reviews stay grounded in the provided book metadata."
                },
                {
                    problem: "System Resource Management",
                    solution: "Optimized the transition between the embedding model and generative model to prevent VRAM spikes on machines with limited hardware."
                }
            ]
        },
        {
            id: 'project-12',
            slug: 'mytelkomsel-sentiment-analysis',
            title: 'MyTelkomsel Sentiment Analysis',
            description: 'Comparing ML/DL architectures for Indonesian app review sentiment classification.',
            longDescription: 'This project provides a comprehensive sentiment analysis pipeline for MyTelkomsel application reviews scraped from the Google Play Store. It features a robust Indonesian text preprocessing engine and compares three distinct architectural approaches: TF-IDF with Linear SVM, Word2Vec with Random Forest, and a Deep Learning BiLSTM network to identify user sentiment with high accuracy.',

            techStack: ['Python', 'TensorFlow', 'Keras', 'Scikit-learn', 'Gensim', 'Pandas', 'NumPy', 'google-play-scraper'],
            tools: ['Jupyter Notebook', 'Git LFS', 'VS Code', 'Google Play Store API'],
            status: 'completed',
            repoUrl: 'https://github.com/Arfazrll/MyTelkomsel-Sentiment-Insights',
            demoUrl: '#', // Internal Data Tool
            startDate: '2024-03-01',
            role: 'Data Scientist',
            customTimeline: 'Aug - Oct 2025',
            team: 'Personal Project',

            highlights: ['BiLSTM Deep Learning Model', 'Automated Play Store Scraping', 'Indonesian NLP Pipeline'],
            category: 'Data Science',
            features: [
                {
                    title: 'Data Acquisition',
                    items: [
                        '**Automated Scraping**: Direct review extraction from Google Play Store using `google-play-scraper`.',
                        '**Star Rating Mapping**: Automated labeling logic (1-2 stars → Negative, 3 → Neutral, 4-5 → Positive).',
                        '**Indonesian Focus**: Targeted collection logic specifically for the `id:id` locale.'
                    ]
                },
                {
                    title: 'Text Preprocessing',
                    items: [
                        '**Tokenization & Cleaning**: Robust removal of URLs, mentions, hashtags, and whitespace normalization.',
                        '**Indonesian NLP**: Specific normalization rules to handle local slang and formal/informal Indonesian text.',
                        '**Vectorization Pipelines**: Comparative implementation of TF-IDF, Word2Vec, and Keras Tokenizer.'
                    ]
                },
                {
                    title: 'Model Architectures',
                    items: [
                        '**Scheme A (Linear SVM)**: High-speed production model using TF-IDF feature extraction (86.15% accuracy).',
                        '**Scheme B (Random Forest)**: Ensemble learning approach using 200D custom Word2Vec embeddings.',
                        '**Scheme C (BiLSTM)**: State-of-the-art Deep Learning architecture for capturing sequential context (86.82% accuracy).'
                    ]
                },
                {
                    title: 'Analytical Insights',
                    items: [
                        '**Performance Benchmarking**: Detailed F1-score and accuracy comparison across all three model types.',
                        '**CLI Inference Tool**: Cross-platform command-line tool for real-time sentiment prediction.',
                        '**Model Persistence**: Efficient storage and versioning of large `.keras` and `.joblib` files via Git LFS.'
                    ]
                }
            ],
            installation: [
                {
                    title: 'Base Setup',
                    code: 'git clone https://github.com/Arfazrll/MyTelkomsel-Sentiment-Insights.git\ncd mytelkomsel-sentiment-analysis\ngit lfs install\ngit lfs pull\npip install -r requirements.txt',
                    type: 'code'
                },
                {
                    title: 'Data Collection',
                    code: 'python src/scraping/scrape_playstore.py\npython src/prepare_dataset.py',
                    type: 'code'
                },
                {
                    title: 'Inference',
                    code: 'python src/train/inference.py --text "Aplikasi sangat bagus dan membantu!"',
                    type: 'code'
                }
            ],
            challengesAndSolutions: [
                {
                    problem: "Imbalanced Neutral Sentiment",
                    solution: "Applied custom weights and refined text normalization to improve F1-scores for the neutral class, which is inherently more ambiguous in Indonesian app reviews."
                },
                {
                    problem: "Large Model Storage",
                    solution: "Integrated Git LFS (Large File Storage) to manage model binary persistence while keeping the source repository lightweight and performant."
                },
                {
                    problem: "Casual Language Variance",
                    solution: "Developed a robust preprocessing script to handle Indonesian-specific linguistic nuances, slang, and common typos found in Play Store reviews."
                }
            ]
        },
        {
            id: 'project-13',
            slug: 'neurovision-real-time-detection',
            title: 'NeuroVision (Real-time Detection)',
            description: 'Advanced real-time object detection using YOLOv3 and Darknet-53.',
            longDescription: 'NeuroVision is a high-performance computer vision system that implements real-time object detection using the YOLOv3 (You Only Look Once) algorithm. By leveraging the Darknet-53 backbone and OpenCV\'s DNN module, the platform can simultaneously detect and classify 80 categories of objects from the COCO dataset with massive throughput and minimal latency, even on edge-computing hardware.',

            techStack: ['Python', 'OpenCV', 'YOLOv3', 'Darknet-53', 'NumPy', 'CUDA', 'OpenCL', 'COCO Dataset'],
            tools: ['VS Code', 'Darknet CLI', 'Git LFS', 'PowerShell'],
            status: 'completed',
            repoUrl: 'https://github.com/Arfazrll/NeuroVision-Smarter-RealTime-Detection',
            demoUrl: '#', // Hardware-dependent live feed
            startDate: '2025-01-01',
            role: 'CV Developer',
            customTimeline: 'Oct 2025',
            team: 'Personal Project',

            highlights: ['Real-time 45+ FPS Detection', 'Multi-scale Object Recognition', 'GPU-Accelerated Inference'],
            category: 'AI & Machine Learning',
            features: [
                {
                    title: 'Vision Engine',
                    items: [
                        '**Real-Time Processing**: Ultra-low latency detection logic capable of handling high-resolution webcam feeds.',
                        '**Object Localization**: Precise bounding box generation with adaptive color-coding for 80 distinct classes.',
                        '**Confidence Scoring**: Integrated probability mapping to filter low-confidence detections and ensure visual accuracy.'
                    ]
                },
                {
                    title: 'Architecture Logic',
                    items: [
                        '**Darknet-53 Backbone**: High-accuracy feature extraction using 53 convolutional layers for balanced speed and precision.',
                        '**Feature Pyramid Network (FPN)**: Multi-scale detection heads for identifying small, medium, and large objects simultaneously.',
                        '**Efficient Inference**: Single-pass forward propagation for holistic image analysis in one neural network execution.'
                    ]
                },
                {
                    title: 'Engineering Optimization',
                    items: [
                        '**GPU Acceleration**: Optional integration with CUDA and OpenCL for maximizing FPS on compatible hardware.',
                        '**Threshold Management**: Interactive configuration for Confidence and Non-Maximum Suppression (NMS) thresholds.',
                        '**I/O Versatility**: Support for diverse input sources including built-in webcams, external USB cameras, and RTSP streams.'
                    ]
                },
                {
                    title: 'Live Controls',
                    items: [
                        '**Interactive Commands**: Real-time hotkeys for pausing detection, capturing screenshots, and graceful exit.',
                        '**Performance Benchmarks**: On-screen FPS counters and object counters for real-time system monitoring.',
                        '**Adaptive Resizing**: Intelligent preprocessing pipeline using `dnn.blobFromImage` for standardized model input.'
                    ]
                }
            ],
            installation: [
                {
                    title: 'Repository & Env',
                    code: 'git clone https://github.com/Arfazrll/NeuroVision-Smarter-RealTime-Detection.git\ncd neurovision-real-time-detection\npip install opencv-python numpy',
                    type: 'code'
                },
                {
                    title: 'Model Downloads',
                    code: 'wget https://pjreddie.com/media/files/yolov3.weights\n# Verify yolov3.cfg and coco.names are present',
                    type: 'code'
                },
                {
                    title: 'Launch Vision',
                    code: 'python Vision.py',
                    type: 'code'
                }
            ],
            challengesAndSolutions: [
                {
                    problem: "Low FPS on CPU Instances",
                    solution: "Implemented frame-skipping logic and resized the input blob to 320x320 to maintain smooth UI interactivity without sacrificing significant detection accuracy."
                },
                {
                    problem: "Overlapping Bounding Boxes",
                    solution: "Fine-tuned the NMS (Non-Maximum Suppression) threshold to 0.4, effectively merging redundant detections for the same object."
                },
                {
                    problem: "Environmental Lighting Noise",
                    solution: "Applied adaptive confidence thresholding to dynamically filter false positives in varying light conditions typical of diverse webcam environments."
                }
            ]
        },
        {
            id: 'project-14',
            slug: 'voices-unheard',
            title: 'Voices Unheard',
            description: 'Secure, anonymous digital sanctuary for conflict-affected story sharing.',
            longDescription: 'Voices Unheard is a mission-critical digital platform designed to provide a safe space for war victims, refugees, and survivors of discrimination to share their stories anonymously. As a System Analyst, I defined the technical architecture to ensure \"Zero Digital Refoulement\"—guaranteeing that no identifiable user data is ever collected or tracked. The platform integrates trauma-informed UI principles with AI-assisted pre-moderation, enabling vulnerable individuals to document their experiences with absolute technical security and emotional support.',

            techStack: ['Node.js', 'Express.js', 'PostgreSQL', 'React.js', 'AI (NLP)', 'TLS 1.3', 'AES-256'],
            tools: ['VS Code', 'Redis', 'UML Design', 'Figma'],
            status: 'completed',
            repoUrl: 'https://github.com/Arfazrll/Voices-Unheard-ASE',
            demoUrl: '#', // Restricted secure platform
            startDate: '2025-07-01',
            role: 'System Analyst',
            customTimeline: 'July - September 2025',
            team: '5 Developers',

            highlights: ['Secure Managed Anonymity', 'Trauma-Informed UX', 'Zero-Refoulement Architecture'],
            category: 'Software Engineering',
            features: [
                {
                    title: 'Anonymous Protection',
                    items: [
                        '**Metadata Cleaning**: Automated removal of EXIF data and GPS coordinates from all uploaded files to protect user location.',
                        '**Zero IP Logging**: Privacy-first logging system that ensures no tracking of user identities or network signatures.',
                        '**Token-based Deletion**: Secure token system allowing users to delete their submissions without requiring a persistent account.'
                    ]
                },
                {
                    title: 'Trauma-Informed UI',
                    items: [
                        '**Quick Exit**: Always-visible emergency exit button that instantly redirects to neutral sites for physical safety.',
                        '**Content Warnings**: Layered consent mechanism requiring users to confirm before viewing potentially triggering media.',
                        '**Empathetic Design**: Minimalist, calming interface designed to reduce cognitive load and secondary trauma for survivors.'
                    ]
                },
                {
                    title: 'AI & Moderation',
                    items: [
                        '**Pre-screening Logic**: AI-driven NLP system that pre-moderates content for hate speech and high-risk triggers.',
                        '**Crisis Escalation**: Automated protocols for identifying crisis situations (suicide threats, etc.) and providing resource lists.',
                        '**Secure Dashboard**: Moderator interface designed for reviewing stories without any access to submitter metadata.'
                    ]
                },
                {
                    title: 'Security Infrastructure',
                    items: [
                        '**End-to-End Encryption**: Mandatory TLS 1.3 for all communications and AES-256 for data encryption at rest.',
                        '**OWASP Compliance**: Hardened backend implementation adhering to top-10 security practices for web applications.',
                        '**PostgreSQL Vault**: Database architecture utilizing at-rest encryption to protect sensitive narrative content.'
                    ]
                }
            ],
            installation: [
                {
                    title: 'System Requirements',
                    code: 'Node.js 18+\nPostgreSQL 13+\nRedis (Session Management)',
                    type: 'code'
                },
                {
                    title: 'Security Configuration',
                    code: 'DATABASE_URL=postgres://...\nENCRYPTION_KEY=aes256_...\nAI_MODERATION_KEY=nlp_...',
                    type: 'code'
                },
                {
                    title: 'Platform Launch',
                    code: 'npm install\nnpm run seed (Optional: Sample AI prompts)\nnpm start',
                    type: 'code'
                }
            ],
            challengesAndSolutions: [
                {
                    problem: "Survivor Geolocation Risks",
                    solution: "Implemented a server-side interceptor that strips all binary metadata (EXIF/JFIF) from library-level upload requests before the file reaches the database."
                },
                {
                    problem: "AI Moderation Accuracy",
                    solution: "Utilized dual-layer moderation—AI for initial risk classification and human review for nuanced emotional context—ensuring survivors feel heard but not judged."
                },
                {
                    problem: "Quick Exit Latency",
                    solution: "Developed the Emergency Exit as a client-side listener that bypasses standard routing logic for a sub-100ms response time when clicked."
                }
            ]
        },
        {
            id: 'project-15',
            slug: 'smart-motion-detection-system',
            title: 'Smart Motion Detection System',
            description: 'AIoT motion detection using YOLO11-Pose and MQTT for smart home automation.',
            longDescription: 'The Smart Motion Detection System is an advanced IoT solution that leverages YOLO11n pose estimation to detect and analyze human movement patterns in real-time. Unlike traditional motion detectors that rely on simple pixel changes, this system performs sophisticated skeletal analysis (17 keypoints) to distinguish between meaningful human activity and environmental noise. Integrated with EMQX Cloud via secure MQTT, it enables precise automated control of smart home devices like lamps and fans with sub-second latency.',

            techStack: ['Python', 'YOLO11-Pose', 'OpenCV', 'MQTT', 'Raspberry Pi', 'EMQX Cloud'],
            tools: ['VS Code', 'Raspberry Pi 5', 'Mosquitto', 'Git LFS'],
            status: 'completed',
            repoUrl: 'https://github.com/CPS-TelU/AIoT-dmouv2025',
            demoUrl: '#', // Hardware-dependent IoT system
            startDate: '2025-07-01',
            role: 'CV Researcher Intern',
            customTimeline: 'July - September 2025',
            team: 'CPS Research Group',

            highlights: ['Skeletal 17-Keypoint Tracking', 'Secure SSL/TLS MQTT', 'Raspberry Pi 5 Optimization'],
            category: 'IoT & Embedded',
            features: [
                {
                    title: 'Intelligent Motion Analysis',
                    items: [
                        '**Advanced Pose Detection**: YOLO11n-based skeleton tracking with 17 keypoint analysis for human activity recognition.',
                        '**Smart Movement Filtering**: Intelligent algorithms to distinguish between meaningful motion and environmental noise (pets, shadows).',
                        '**Stability Analysis**: Multi-frame pose stability verification using normalized motion calculation independent of frame position.'
                    ]
                },
                {
                    title: 'Smart Device Integration',
                    items: [
                        '**Multi-Device Control**: Automated GPIO-level control for lamps, fans, and relays with precise state management.',
                        '**Operation Modes**: Support for Automatic (motion-based), Manual (remote override), and Scheduled control modes.',
                        '**Intelligent Auto-Off**: Highly configurable delay logic that turns off devices only when sustained inactivity is verified.'
                    ]
                },
                {
                    title: 'IoT Connectivity',
                    items: [
                        '**Secure MQTT Communication**: SSL/TLS encrypted messaging via EMQX Cloud for cross-network device orchestration.',
                        '**Remote Command API**: Standardized JSON topic structure for status updates, sensor events, and remote configuration.',
                        '**Dynamic Updates**: Remote parameter tuning for thresholds and cooldowns without requiring system restarts.'
                    ]
                },
                {
                    title: 'Performance Monitoring',
                    items: [
                        '**Real-time Analytics**: On-screen FPS counters and movement pattern visualizations for system health monitoring.',
                        '**Edge Optimization**: Tailored for Raspberry Pi 5 with buffer management and efficient deque structures for history data.',
                        '**Error Handling**: Comprehensive logging system and automatic MQTT reconnection logic for 24/7 uptime.'
                    ]
                }
            ],
            installation: [
                {
                    title: 'Hardware Setup',
                    code: 'Raspberry Pi 5 (4GB recommended)\nUSB Camera (640x480+)\nRelay Modules for GPIO Pin 26 (Lamp) and 19 (Fan)',
                    type: 'code'
                },
                {
                    title: 'Dependencies & Repo',
                    code: 'git clone https://github.com/CPS-TelU/AIoT-dmouv2025\npip install opencv-python ultralytics paho-mqtt',
                    type: 'code'
                },
                {
                    title: 'MQTT Configuration',
                    code: '# Edit MQTTConfig in AIoT-dmouv2025.py\nBROKER = "your-emqx-node.emqxsl.com"\nPORT = 8883 # Use SSL',
                    type: 'code'
                }
            ],
            challengesAndSolutions: [
                {
                    problem: "Environmental Pixel Flutter",
                    solution: "Moved away from frame-differencing to skeletal pose estimation, ensuring that only validated human keypoint movements trigger device actions."
                },
                {
                    problem: "IoT Latency in Unstable Networks",
                    solution: "Implemented an asynchronous Paho-MQTT client with local state caching, allowing the system to continue local processing during brief connectivity drops."
                },
                {
                    problem: "Hardware Resource Constraints",
                    solution: "Optimized model inference using the YOLO11n-pose variant and limited frame resolution to 640x480, achieving stable 30+ FPS on Raspberry Pi gear."
                }
            ]
        },
        {
            id: 'project-16',
            slug: 'solar-energy-pinn-prediction',
            title: 'Solar Energy PINN Prediction',
            description: 'AI-powered solar energy prediction system integrating Physics-Informed Neural Networks (PINN).',
            longDescription: 'This research-driven project introduces a Physics-Informed Neural Network (PINN) framework for optimizing solar energy prediction in Indonesia. By integrating fundamental solar radiation laws and thermal efficiency equations directly into the neural network\'s loss function, the system overcomes the intermittency challenges of renewable energy and data scarcity. The model achieves an R² of 0.834, significantly outperforming traditional data-only models while maintaining strict adherence to physical conservation laws.',

            techStack: ['Python', 'TensorFlow', 'Keras', 'Scikit-learn', 'Physics-Informed Neural Network', 'NSRDB API'],
            tools: ['Jupyter Notebook', 'Google Colab', 'Matplotlib', 'Seaborn', 'LaTeX'],
            status: 'completed',
            repoUrl: 'https://github.com/Arfazrll/Photovoltaic-Physics-Informed-Neural-Network',
            demoUrl: '#', // Research-based model
            startDate: '2025-07-01',
            role: 'Data Scientist',
            customTimeline: 'July - August 2025',
            team: '3 Developers',

            highlights: ['Physics-Loss Integration', '25% RMSE Improvement', 'National Energy Research'],
            category: 'AI & Machine Learning',
            features: [
                {
                    title: 'Physics-Driven AI',
                    items: [
                        '**Hukum Fisika Terintegrasi**: Penggabungan persamaan radiasi matahari (G_eff) dan efisiensi termal panel ke dalam arsitektur AI.',
                        '**Smart Loss Function**: Desain custom loss function yang mengombinasikan data loss dengan physics residuals (Conseravation Laws).',
                        '**Auto-Differentiation**: Optimasi gradient berbasis automatic differentiation untuk pemenuhan hukum fisika yang presisi.'
                    ]
                },
                {
                    title: 'Advanced PINN Architecture',
                    items: [
                        '**Progressive Reduction**: Arsitektur neural network 5-layer dengan 8,673 parameter untuk ekstraksi fitur yang optimal.',
                        '**Physics Continuity**: Implementasi lambda weighting (λ=0.1) untuk menyeimbangkan pembelajaran dari data empiris dan teori fisika.',
                        '**Robust Generalization**: Kemampuan prediksi yang tetap akurat bahkan pada dataset terbatas melalui physics-guided learning.'
                    ]
                },
                {
                    title: 'Data & API Integration',
                    items: [
                        '**NREL NSRDB API**: Integrasi otomatis dengan National Solar Radiation Database untuk akuisisi data cuaca presisi tinggi.',
                        '**Nusantara Coverage**: Pengambilan data berbasis koordinat (Lat/Lon) untuk berbagai titik strategis PLTS di Indonesia.',
                        '**Automated Cleaning**: Pipeline preprocessing untuk outlier detection dan normalisasi data radiasi matahari secara real-time.'
                    ]
                },
                {
                    title: 'Predictive Analytics',
                    items: [
                        '**Scenario Analysis**: Simulasi output energi pada 6 variasi skenario cuaca ekstrim (Rainy vs Dry season).',
                        '**Metric Evaluation**: Pengujian performa mendalam menggunakan MAE, RMSE, dan R² dibandingkan dengan model baseline.',
                        '**SHAP Analysis**: Interpretasi model untuk memahami variabel cuaca paling berpengaruh terhadap fluktuasi energi.'
                    ]
                }
            ],
            installation: [
                {
                    title: 'Environment Setup',
                    code: 'git clone https://github.com/Arfazrll/Photovoltaic-Physics-Informed-Neural-Network.git\npip install tensorflow pandas scikit-learn matplotlib',
                    type: 'code'
                },
                {
                    title: 'NREL API Hook',
                    code: '# Get key from developer.nrel.gov\napi_key = "YOUR_NREL_API_KEY"\nlat, lon = -1.93, 125.50',
                    type: 'code'
                },
                {
                    title: 'Model Execution',
                    code: 'python PINN.py\n# Generates predictions vs actuals with physics constraints',
                    type: 'code'
                }
            ],
            challengesAndSolutions: [
                {
                    problem: "Intermittency Energi Surya",
                    solution: "Mengintegrasikan model temperatur panel (T_cell) ke dalam jaringan saraf untuk memprediksi penurunan efisiensi akibat panas secara fisik."
                },
                {
                    problem: "Data Historis Berkualitas Terbatas",
                    solution: "PINN menggunakan hukum fisika sebagai regularizer, memungkinkan training model yang robust dengan jumlah data yang lebih sedikit dibandingkan deep learning standar."
                },
                {
                    problem: "Kompleksitas Custom Loss",
                    solution: "Menggunakan TensorFlow GradientTape untuk menghitung derivatif parsial dari persamaan fisika selama proses backpropagation."
                }
            ]
        },
        {
            id: 'project-17',
            slug: 'credit-risk-analysis-lstm',
            title: 'Credit Risk Analysis LSTM',
            description: 'High-precision loan default prediction using stacked LSTM layers and sequential financial modeling.',
            longDescription: 'This project focuses on predicting credit risk using Long Short-Term Memory (LSTM), a variant of Recurrent Neural Networks (RNNs) optimized for financial sequential data. By capturing long-term temporal dependencies in credit history and financial behavior, the system identifies high-risk loan applicants with significantly higher accuracy than traditional linear models. The analysis incorporates business-critical metrics such as Default Capture Rate and Approval Rate to maximize institutional profitability.',

            techStack: ['Python', 'TensorFlow', 'Keras', 'LSTM', 'Scikit-learn', 'SMOTE'],
            tools: ['Jupyter Notebook', 'Hugging Face Spaces', 'Pandas', 'Seaborn', 'SMOTE'],
            status: 'completed',
            repoUrl: 'https://github.com/Arfazrll/CreditRisk_Analysis',
            demoUrl: 'https://huggingface.co/spaces/Alfazril/CreditRisk_Analysis',
            startDate: '2025-07-01',
            role: 'Data Scientist',
            customTimeline: 'July 2025',
            team: '3 Developers',

            highlights: ['Stacked LSTM Neural Network', 'SMOTE Imbalance Handling', 'Financial ROI Analysis'],
            category: 'Data Science',
            features: [
                {
                    title: 'Sequential Model Architecture',
                    items: [
                        '**LSTM Layers**: Stacked Long Short-Term Memory layers to capture complex temporal patterns in debt behavior.',
                        '**Dropout Optimization**: Integrated dropout layers to prevent overfitting on specific credit profiles.',
                        '**Binary Optimization**: Sigmoid activation output with Adam optimizer and binary cross-entropy loss function.'
                    ]
                },
                {
                    title: 'Financial Data Preprocessing',
                    items: [
                        '**3D Reshaping**: Data transformation into `[samples, timesteps, features]` format for deep learning sequential input.',
                        '**SMOTE Sampling**: Implementation of Synthetic Minority Over-sampling to balance default vs. non-default cases.',
                        '**Feature Scaling**: Numerical normalization and categorical encoding for employment and loan-type stability.'
                    ]
                },
                {
                    title: 'Risk & ROI Analytics',
                    items: [
                        '**Profitability Analysis**: Comparative study on ROI/cost savings from avoiding defaults vs baseline approval rates.',
                        '**Risk Segmentation**: Automatic classification of applicants into Low, Medium, and High-risk tiers based on probability scores.',
                        '**Advanced AUC Tuning**: Hyperparameter tuning via GridSearchCV to maximize Default Capture Rate.'
                    ]
                },
                {
                    title: 'Comprehensive Evaluation',
                    items: [
                        '**Default Capture Rate**: Measuring the exact proportion of actual defaults identified by the model.',
                        '**Business Metrics**: Evaluating model impact via Approval Rate vs institutional Risk Appetite.',
                        '**Interactive Visualization**: Deployment on Hugging Face Spaces for real-time model interaction and prediction testing.'
                    ]
                }
            ],
            installation: [
                {
                    title: 'Model Environment',
                    code: 'git clone https://github.com/Arfazrll/CreditRisk_Analysis\npip install -r requirements.txt',
                    type: 'code'
                },
                {
                    title: 'Preprocessing Data',
                    code: '# Data must be reshaped for LSTM\nX_train = X_train.reshape((X_train.shape[0], 1, X_train.shape[1]))',
                    type: 'code'
                },
                {
                    title: 'Training & Eval',
                    code: 'python train_lstm.py\n# Outputs Accuracy, Precision, Recall, and AUC metrics',
                    type: 'code'
                }
            ],
            challengesAndSolutions: [
                {
                    problem: "Imbalance Financial Datasets",
                    solution: "Applied SMOTE (Synthetic Minority Over-sampling Technique) to ensure the LSTM model learns to identify rare default events as effectively as frequent low-risk ones."
                },
                {
                    problem: "Vanishing Gradient in Deep RNNs",
                    solution: "Utilized LSTM gates (Input, Forget, Output) to maintain long-term memory gradients, essential for capturing years of credit history."
                },
                {
                    problem: "Overfitting on Loan Profiles",
                    solution: "Implemented early stopping and dropout strategies to ensure the model generalizes across diverse demographic and financial sectors."
                }
            ]
        },
        {
            id: 'project-18',
            slug: 'hand-gesture-recognition',
            title: 'Hand Gesture Recognition',
            description: 'Real-time hand tracking and skeletal landmark detection using MediaPipe and OpenCV.',
            longDescription: 'Hand Gesture Recognition is a high-performance computer vision system that utilizes MediaPipe’s Hands solution for robust, real-time hand landmark detection. By extracting 21 coordinate points from a video stream, the system performs dynamic finger counting and gesture analysis. This project serves as a foundational framework for human-computer interaction (HCI), enabling non-contact control systems for various software applications with high skeletal stability.',

            techStack: ['Python', 'MediaPipe', 'OpenCV'],
            tools: ['VS Code', 'Git LFS', 'PowerShell'],
            status: 'completed',
            repoUrl: 'https://github.com/Arfazrll/Hand-Gesture-Recognition',
            demoUrl: '#', // Desktop CV application
            startDate: '2024-12-01',
            role: 'CV Developer',
            customTimeline: 'December 2024',
            team: 'Personal Project',

            highlights: ['MediaPipe Hands Integration', 'Real-time 21-Landmark Tracking', 'Dynamic Finger Counting'],
            category: 'AI & Machine Learning',
            features: [
                {
                    title: 'Real-Time Hand Tracking',
                    items: [
                        '**MediaPipe Hands Integration**: Leveraging Google’s sophisticated machine learning pipeline for sub-millisecond hand tracking.',
                        '**21-Landmark Detection**: Accurate extraction of 21 key coordinate points representing joints and fingertips in 3D space.',
                        '**Static/Dynamic Mode Support**: Configurable landmark detection that works for both single frames and high-speed video streams.'
                    ]
                },
                {
                    title: 'Gesture Recognition Logic',
                    items: [
                        '**Dynamic Finger Counting**: Custom algorithms to count raised fingers by comparing tip positions with joint landmarks (MCP/PIP).',
                        '**Coordinate Analysis**: Real-time calculation of Euclidean distances between landmarks for gesture classification.',
                        '**Stability Filtering**: Signal smoothing to ensure counting accuracy even with minor hand tremors or sensor noise.'
                    ]
                },
                {
                    title: 'Cross-Platform Architecture',
                    items: [
                        '**OpenCV Integration**: Robust video processing and frame visualization with real-time landmark rendering.',
                        '**Low Hardware Overhead**: Optimized for standard laptop webcams without requiring dedicated GPU acceleration.',
                        '**Modular Code Structure**: Decoupled AI tracking logic from UI rendering for easy integration into larger projects.'
                    ]
                },
                {
                    title: 'Interactive UI & Output',
                    items: [
                        '**Live Landmark Rendering**: Real-time projection of skeletal joint maps onto the video feed for user feedback.',
                        '**Real-time Event Logging**: Instant detection feedback via console logs and on-screen text overlays.',
                        '**Customizable Gestures**: Extensible architecture that allows adding new symbolic recognitions (peace signs, thumbs up).'
                    ]
                }
            ],
            installation: [
                {
                    title: 'Environment & Setup',
                    code: 'git clone https://github.com/Arfazrll/Hand-Gesture-Recognition.git\npython -m venv HandTracking-env',
                    type: 'code'
                },
                {
                    title: 'Dependency Install',
                    code: 'HandTracking-env\\Scripts\\Activate\npip install opencv-python mediapipe',
                    type: 'code'
                },
                {
                    title: 'Run AI Application',
                    code: 'python HandsTrackingAI.py\n# Press "q" to exit camera feed',
                    type: 'code'
                }
            ],
            challengesAndSolutions: [
                {
                    problem: "Low Lighting Conditions",
                    solution: "Adjusted MediaPipe's min_detection_confidence threshold and applied OpenCV histogram equalization to improve landmark stability in dark environments."
                },
                {
                    problem: "Hand-to-Camera Distance Variance",
                    solution: "Normalized landmark coordinates relative to the palm center, ensuring finger counting logic remains accurate regardless of how close the hand is to the camera."
                },
                {
                    problem: "Frame Rate Latency",
                    solution: "Optimized frame processing by disabling static_image_mode during streaming, allowing the system to use temporal information for faster tracking."
                }
            ]
        },
        {
            id: 'project-19',
            slug: 'data-analyst-dashboard',
            title: 'Data Analyst Dashboard',
            description: 'Interactive analytics tool for e-commerce data exploration using Dash and Plotly.',
            longDescription: 'The Data Analyst Dashboard is a comprehensive, interactive analytic platform designed to streamline e-commerce data exploration. Built with Python and Streamlit, it allows analysts to move beyond static reports by providing real-time data filtering, dynamic chart generation (bar, line, pie), and automated summary statistics. The system features a robust preprocessing pipeline for handling missing data and outliers, ensuring that decision-makers have access to high-quality insights on sales performance and product category trends.',

            techStack: ['Python', 'Streamlit', 'Plotly', 'Pandas', 'NumPy', 'Dash'],
            tools: ['VS Code', 'Jupyter Notebook', 'Git LFS', 'PowerShell'],
            status: 'completed',
            repoUrl: 'https://github.com/Arfazrll/Data-Analyst-Dashboard',
            demoUrl: '#', // Desktop/Server application
            startDate: '2024-07-01',
            role: 'Data Analyst',
            customTimeline: 'July - August 2024',
            team: 'Personal Project',

            highlights: ['Interactive Real-time Visuals', 'Automated Data Preprocessing', 'E-commerce Trends Analysis'],
            category: 'Data Science',
            features: [
                {
                    title: 'Interactive Data Exploration',
                    items: [
                        '**Dynamic Chart Generation**: Real-time rendering of bar, line, and pie charts based on multi-variable user selections.',
                        '**Drill-down Analytics**: Ability to focus on specific time periods or product categories with instant visual feedback.',
                        '**Metric Customization**: Dynamic dashboard layout that adjusts according to the selected Key Performance Indicators (KPIs).'
                    ]
                },
                {
                    title: 'Data Filtering & Manipulation',
                    items: [
                        '**Smart Preprocessing**: Automated handling of missing values, duplicate entries, and data type transformations.',
                        '**Advanced Filtering**: Multi-layered filters for product categories, price ranges, and sales dates.',
                        '**Outlier Detection**: Integrated statistical methods to identify and isolate anomalies in e-commerce transaction data.'
                    ]
                },
                {
                    title: 'Customizable Dashboards',
                    items: [
                        '**Modular UI Layout**: Flexible dashboard design using Streamlit containers for a clean and professional analytics interface.',
                        '**Real-time State Management**: Instant synchronization between dropdown selections and data visualization components.',
                        '**Export Capabilities**: One-click functionality to export processed data and summary statistics for offline reporting.'
                    ]
                },
                {
                    title: 'E-Commerce Deep-Dive',
                    items: [
                        '**Sales Trend Analysis**: Visualizing historical sales growth and forecasting potential seasonal patterns.',
                        '**Category Performance**: Deep-dive into product category rankings based on volume, revenue, and profit margins.',
                        '**Reader Profiling**: (In context of related projects) Identifying high-value segments and customer behavior archetypes.'
                    ]
                }
            ],
            installation: [
                {
                    title: 'Clone & Environment',
                    code: 'git clone https://github.com/Arfazrll/Data-Analyst-Dashboard.git\ncd Data-Analyst-Dashboard',
                    type: 'code'
                },
                {
                    title: 'Install Dependencies',
                    code: 'pip install pandas streamlit plotly dash numpy',
                    type: 'code'
                },
                {
                    title: 'Launch Dashboard',
                    code: 'streamlit run Dashboard/EcomersDashboard.py\n# Access at http://localhost:8501',
                    type: 'code'
                }
            ],
            challengesAndSolutions: [
                {
                    problem: "Handling Large Unstructured Datasets",
                    solution: "Developed a robust Pandas-based cleaning pipeline that standardizes data formats and handles null values before they reach the visualization layer."
                },
                {
                    problem: "Real-time UI Responsiveness",
                    solution: "Leveraged Streamlit caching (`@st.cache_data`) to ensure that heavy data processing operations only run when the underlying dataset changes."
                },
                {
                    problem: "Visualization Over-cluttering",
                    solution: "Implemented hierarchical filtering (Category -> Sub-category) to keep visualizations focused and easy to interpret for non-technical stakeholders."
                }
            ]
        },
    ],
    experiences: [
        // 1. PROFESSIONAL EXPERIENCE
        {
            id: 'prof-1',
            company: 'Dicoding Academy',
            position: 'Machine Learning Code Reviewer',
            description: 'Technical evaluation and quality assurance of ML project submissions.',
            responsibilities: [
                'Conducting in-depth code analysis for ML projects',
                'Validating logical correctness and efficiency',
                'Enforcing industry best practices',
                'Providing expert, actionable feedback to learners',
            ],
            skills: ['Code Review', 'Machine Learning', 'Python', 'Quality Assurance', 'Mentorship'],
            startDate: '2025-01-01',
            endDate: '2025-01-31', // 1 Month
            isOngoing: false,
            location: 'Remote',
            type: 'freelance',
            logo: '/assets/dicodinglogo.png?v=2',
            externalLink: 'https://github.com/Arfazrll/Dicoding-Reviews-Submission',
        },
        {
            id: 'prof-2',
            company: 'Dicoding Indonesia',
            position: 'Digital Learning Experience Auditor',
            description: 'Educational content development and quality assurance.',
            responsibilities: [
                'Reviewing and evaluating AI Engineer learning path',
                'Providing feedback for instructional design improvement',
                'Contributing to curriculum and syllabus development',
                'Assessing learner feedback and course usability',
            ],
            skills: ['Content Review', 'AI Education', 'Instructional Design', 'Quality Assurance'],
            startDate: '2025-10-01',
            endDate: '2026-01-01', // 3 Months
            isOngoing: false,
            location: 'Remote',
            type: 'freelance',
            logo: '/assets/dicodinglogo.png?v=2',
            externalLink: 'https://docs.google.com/presentation/d/13gNI6ttgW3eMXgZS8G3LzEbzOVwQ3Ot4HVWER0hpUgI/edit?usp=sharing',
        },
        {
            id: 'prof-3',
            company: 'HUMIC Engineering Research Center',
            position: 'AI Developer Intern',
            description: 'Research-driven environment focusing on artificial intelligence and data analytics.',
            responsibilities: [
                'Managing and processing large-scale datasets through entire ML pipeline',
                'Building Deep Learning and Transformer-based attack detection models',
                'Fine-tuning model hyperparameters for high precision',
                'Collaborating on AI-driven threat detection research',
            ],
            skills: ['Deep Learning', 'Transformers', 'Data Processing', 'Cybersecurity AI', 'Python'],
            startDate: '2025-09-01',
            endDate: '2025-12-01', // 3 Months
            isOngoing: false,
            location: 'Hybrid',
            type: 'internship',
            logo: '/assets/HumicLogo.png',
            externalLink: 'https://github.com/Arfazrll/Security-Automation-GenAI',
        },
        {
            id: 'prof-4',
            company: 'Cyber Physical System Laboratory',
            position: 'Computer Vision Researcher Intern',
            description: 'AI Research focusing on the intersection of artificial intelligence and physical systems.',
            responsibilities: [
                'End-to-end development of intelligent models',
                'Investigating state-of-the-art Deep Learning architectures',
                'Implementing Machine Learning algorithms for real-world applications',
                'Contributing to pioneering autonomous and intelligent solutions',
            ],
            skills: ['Computer Vision', 'Deep Learning', 'Machine Learning', 'Research', 'Python'],
            startDate: '2025-07-01',
            endDate: '2025-09-01', // 2 Months
            isOngoing: false,
            location: 'On-site',
            type: 'internship',
            logo: '/assets/logocps.png',
            externalLink: 'https://medium.com/@cpslaboratory2324/dmouv-sistem-smart-motion-detection-berbasis-internet-of-things-8f26ef2427f1',
        },
        {
            id: 'prof-5',
            company: 'Advanced Software Engineering Laboratory',
            position: 'System Analyst Intern',
            description: 'Research-focused software engineering environment.',
            responsibilities: [
                'Comprehensive analysis of system requirements',
                'Translating requirements into SRS documentation',
                'Designing system architecture with UML diagrams',
                'Collaborating with Development, UI/UX, and QA teams',
            ],
            skills: ['System Analysis', 'SRS/SDD', 'UML', 'Software Design'],
            startDate: '2025-07-01',
            endDate: '2025-10-01', // 3 Months
            isOngoing: false,
            location: 'Remote',
            type: 'internship',
            logo: '/assets/aselablogo.png',
            externalLink: 'https://github.com/Arfazrll/Voices-Unheard-ASE',
        },
        {
            id: 'prof-6',
            company: 'Informatics Laboratory, Telkom University',
            position: 'Computer Network Practicum Assistant (Contract-Based)',
            description: 'Guiding students through practical networking sessions.',
            responsibilities: [
                'Mentoring lab sessions with up to 30 students',
                'Leading Socket Programming project as PIC',
                'Designing evaluation criteria and grading',
                'Serving as exam invigilator',
            ],
            skills: ['Networking', 'Socket Programming', 'TCP/IP', 'Teaching', 'Technical Mentorship'],
            startDate: '2025-09-01',
            endDate: '2026-01-01', // 4 Months
            isOngoing: false,
            location: 'Hybrid',
            type: 'contract',
            logo: '/assets/iflablogo.png',
            externalLink: '',
        },
        {
            id: 'prof-7',
            company: 'Cyber Physical System Laboratory',
            position: 'Research Assistant (Contract-Based)',
            description: 'Serving as a Research Assistant within a research and innovation laboratory focused on exploration and applied technology development.',
            responsibilities: [
                'Contributing to research-based products and collaborative AI projects',
                'Designing comprehensive learning materials for Deep Learning and Computer Vision',
                'Serving as mentor and instructor in workshops',
                'Reviewing and analyzing academic papers and research topics',
            ],
            skills: ['Deep Learning', 'Computer Vision', 'Research', 'Academic Writing', 'Mentorship'],
            startDate: '2025-08-01',
            isOngoing: true,
            location: 'Hybrid',
            type: 'contract',
            logo: '/assets/logocps.png',
        },
        {
            id: 'prof-8',
            company: 'Dinas Pangan dan Pertanian Kota Bandung',
            position: 'Data Entry Assistant',
            description: 'Data lifecycle and reporting for government office.',
            responsibilities: [
                'Daily data input and validation',
                'Developing analytical reports for stakeholders',
                'Ensuring data accuracy and consistency',
                'Structured documentation of tasks',
            ],
            skills: ['Data Entry', 'Data Analysis', 'Excel', 'Documentation'],
            startDate: '2024-06-01',
            endDate: '2024-08-01', // 2 Months
            isOngoing: false,
            location: 'On-site',
            type: 'internship',
            logo: '/assets/dinas-pangan-dan-pertanian-kota-bandung.png',
            externalLink: 'https://riibse.center.telkomuniversity.ac.id/e-selamat/',
        },

        // 2. LEADERSHIP & ORGANIZATIONAL EXPERIENCE
        {
            id: 'lead-1',
            company: 'Cyber Physical System Laboratory',
            position: 'Human Resources Staff',
            description: 'Fostering growth and development among lab assistants by implementing strategic HR initiatives.',
            responsibilities: [
                'Implementing strategic HR initiatives',
                'Facilitating training programs',
                'Promoting supportive, collaborative work culture',
                'Strengthening team performance',
            ],
            skills: ['HR Management', 'Team Development', 'Communication', 'Strategic Planning'],
            startDate: '2025-07-01',
            isOngoing: true,
            location: 'Hybrid',
            type: 'contract',
            logo: '/assets/logocps.png',
            externalLink: 'https://cpslaboratory.com/',
        },
        {
            id: 'lead-2',
            company: 'Digistar Club by Telkom Indonesia',
            position: 'Chief Committee',
            description: 'Managing and executing a portfolio of digital talent development programs.',
            responsibilities: [
                'Leading end-to-end planning for DigiTalks and Digicourse',
                'Overseeing program execution and coordination',
                'Stakeholder management and communication',
                'Compiling post-event reports and analysis',
            ],
            skills: ['Project Management', 'Event Planning', 'Leadership', 'Stakeholder Management'],
            startDate: '2025-03-01',
            endDate: '2025-09-01', // 6 Months
            isOngoing: false,
            location: 'Indonesia',
            type: 'contract',
            logo: '/assets/logodigistar.png',
        },
        {
            id: 'lead-3',
            company: 'Digistar Club by Telkom Indonesia',
            position: 'Ranger – Digital Application Club',
            description: 'Key committee member for DigiCourse and Digicamp, Telkom Indonesia flagship digital talent initiatives.',
            responsibilities: [
                'Steering flagship digital talent programs',
                'Developing multi-channel communications strategy',
                'Managing logistical planning for 200+ participants',
                'Robust stakeholder liaison and promotion',
            ],
            skills: ['Event Management', 'Public Relations', 'Logistics', 'Communications'],
            startDate: '2025-03-01',
            isOngoing: true,
            location: 'Indonesia',
            type: 'contract',
            logo: '/assets/logodigistar.png',
            externalLink: 'https://www.digistartelkom.id/',
        },
        {
            id: 'lead-4',
            company: 'Himpunan Mahasiswa Teknologi Informasi, Telkom University',
            position: 'Academic Affairs Division',
            description: 'Planning and execution of academic programs and student support initiatives.',
            responsibilities: [
                'Managing academic programs lifecycle',
                'Event operations and logistics support',
                'Audience engagement and promotion',
                'Document preparation and coordination',
            ],
            skills: ['Academic Planning', 'Event Operations', 'Student Engagement', 'Teamwork'],
            startDate: '2024-09-01',
            endDate: '2025-01-01', // 4 Months
            isOngoing: false,
            location: 'Bandung',
            type: 'volunteer',
            logo: '/assets/HMITlogo.png?v=1',
        },
        {
            id: 'lead-5',
            company: 'Youth Ranger Indonesia',
            position: 'Public Relations Communication',
            description: 'Strategic role in public narrative and community engagement.',
            responsibilities: [
                'Architecting integrated PR strategies',
                'Elevating brand visibility and community affinity',
                'Cultivating stakeholder and media relationships',
                'Orchestrating strategic communication channels',
            ],
            skills: ['Public Relations', 'Communications', 'Media Relations', 'Stakeholder Management'],
            startDate: '2024-07-01',
            endDate: '2025-01-01', // 6 Months
            isOngoing: false,
            location: 'West Java',
            type: 'contract',
            logo: '/assets/youth-ranger-indonesia.png',
            externalLink: 'https://youthrangerindonesia.com/',
        },

        // 3. VOLUNTEER EXPERIENCE
        {
            id: 'vol-1',
            company: 'Galeri Investasi BEI Telkom University',
            position: 'Fundraising Assistant',
            description: 'Instrumental in executing fundraising for economic empowerment events.',
            responsibilities: [
                'Execution of fundraising campaign',
                'Strategic donor prospecting',
                'High-impact sponsorship proposal development',
                'Management of targeted outreach pipeline',
            ],
            skills: ['Fundraising', 'Sponsorship Proposals', 'Outreach', 'Financial Literacy'],
            startDate: '2025-02-01',
            endDate: '2025-03-01', // 1 Month
            isOngoing: false,
            location: 'Bandung',
            type: 'volunteer',
            logo: '/assets/logobei.png',
            externalLink: 'https://www.gibeitelkomuniversity.site/',
        },
        {
            id: 'vol-2',
            company: 'HMIT Telkom University',
            position: 'Event Planner & Organizer',
            description: 'Key member of MAKRAB 2024 organizing committee.',
            responsibilities: [
                'Strategic program design and execution',
                'Co-development of master event agenda',
                'Spearheading core knowledge-sharing segments',
                'Collaborating for impactful event delivery',
            ],
            skills: ['Event Planning', 'Program Design', 'Leadership', 'Team Collaboration'],
            startDate: '2024-11-01',
            endDate: '2024-12-01', // 1 Month
            isOngoing: false,
            location: 'Bandung',
            type: 'volunteer',
            logo: '/assets/HMITlogo.png?v=1',
        },
        {
            id: 'vol-3',
            company: 'Young On Top Bandung',
            position: 'Environmental Hygiene Team',
            description: 'Volunteer for environmental improvement initiatives.',
            responsibilities: [
                'Hands-on clean-up drives',
                'Implementing waste segregation systems',
                'Strategic community outreach and education',
                'Coordination with external partners',
            ],
            skills: ['Environmental Awareness', 'Teamwork', 'Logistics', 'Community Education'],
            startDate: '2024-02-01',
            endDate: '2024-02-07', // 1 Week
            isOngoing: false,
            location: 'Bandung',
            type: 'volunteer',
            logo: '/assets/yotlogo.jpg',
        },
        {
            id: 'vol-4',
            company: 'SMA Negeri 88 Jakarta',
            position: 'Logistics Operator – Campus Expo 2024',
            description: 'Logistics Coordinator managing the operational backbone of the event.',
            responsibilities: [
                'Directing all logistical pillars (venue, equipment, transport)',
                'Orchestrating team coordination',
                'Efficient on-the-ground execution',
                'Performance evaluation and reporting',
            ],
            skills: ['Logistics Management', 'Operations', 'Leadership', 'Team Coordination'],
            startDate: '2024-01-01',
            endDate: '2024-01-15', // 2 Weeks
            isOngoing: false,
            location: 'Jakarta',
            type: 'volunteer',
            logo: '/assets/sman88logo.png',
        },

        // 4. CERTIFICATIONS & PROFESSIONAL DEVELOPMENT
        {
            id: 'cert-1',
            company: 'Coding Camp powered by DBS Foundation',
            position: 'Scholarship Awardee – Progressive Learning Program',
            description: 'Intensive AI Engineer training program.',
            responsibilities: [
                'Comprehensive Machine Learning curriculum',
                'Deep Learning for Computer Vision/NLP',
                'MLOps best practices for production models',
                'End-to-end AI Engineer skill development',
            ],
            skills: ['Machine Learning', 'Deep Learning', 'MLOps', 'AI Engineering'],
            startDate: '2025-04-01',
            endDate: '2025-10-01', // 6 Months
            isOngoing: false,
            location: 'Indonesia',
            type: 'apprenticeship',
            logo: '/assets/DBSLogo.png?v=1',
            externalLink: 'https://mail.google.com/mail/u/0/#search/DBS/FMfcgzQbfxpgnbGGdbWztHKKvfbDfgjx',
        },
        {
            id: 'cert-2',
            company: 'Indosat Ooredoo Hutchison Digital Camp',
            position: 'Machine Learning Engineer Program',
            description: 'Intensive ML curriculum aligned with industry standards.',
            responsibilities: [
                'Advanced ML lifecycle competencies',
                'Data pre-processing and model development',
                'Production-ready project portfolio creation',
                'Industry-relevant skill development',
            ],
            skills: ['Machine Learning', 'Data Preprocessing', 'Model Deployment', 'Python'],
            startDate: '2024-06-01',
            endDate: '2024-12-01', // 6 Months
            isOngoing: false,
            location: 'Indonesia',
            type: 'apprenticeship',
            logo: '/assets/indosat-ooredoo-hutchison-digital-camp.png',
            externalLink: 'https://idcamp.ioh.co.id/',
        },
        {
            id: 'cert-3',
            company: 'AIESEC in Bandung',
            position: 'Delegate – AIESEC Future Leaders 2024',
            description: 'Development program for impactful, socially conscious leadership.',
            responsibilities: [
                'Personal and professional development curriculum',
                'Implementing innovative projects targeting global issues',
                'Mastering critical leadership competencies',
                'Building sustainable solutions and global network',
            ],
            skills: ['Leadership', 'Project Management', 'Sustainability', 'Social Impact'],
            startDate: '2024-10-01',
            endDate: '2025-01-01', // 3 Months
            isOngoing: false,
            location: 'Bandung',
            type: 'apprenticeship',
            logo: '/assets/aieseclogo.png',
            externalLink: 'https://www.instagram.com/aiesecbandung/',
        },
        {
            id: 'cert-4',
            company: 'Cyber Physical System Laboratory',
            position: 'CA Study Group Member',
            description: 'Active participant in complex technology projects including IoT, Web Apps, and ML.',
            responsibilities: [
                'Leading integration of hardware and software solutions',
                'Implementing Machine Learning in real-world scenarios',
                'Presenting final prototypes to stakeholders',
                'Collaborating in diverse teams for high-quality delivery',
            ],
            skills: ['IoT', 'System Integration', 'AI Research', 'Team Collaboration'],
            startDate: '2024-11-01',
            endDate: '2025-01-01', // 2 Months
            isOngoing: false,
            location: 'Bandung',
            type: 'contract',
            logo: '/assets/logocps.png',
        },
        {
            id: 'cert-5',
            company: 'GDSC Telkom University Bandung',
            position: 'Machine Learning Path Member',
            description: 'Active member in practical ML learning environment.',
            responsibilities: [
                'Mastering core ML concepts (regression, classification, clustering)',
                'Participating in technical workshops and training',
                'Building portfolio projects',
                'Collaborating to solve real-world problems',
            ],
            skills: ['Machine Learning', 'Python', 'Data Science', 'Problem Solving'],
            startDate: '2023-11-01',
            isOngoing: true,
            location: 'Bandung',
            type: 'contract',
            logo: '/assets/logogdsc.jpg',
            externalLink: 'https://g.dev/Arfazrll',
        },
    ],
    education: [
        {
            id: 'edu-1',
            institution: 'Telkom University',
            degree: 'Bachelor of Technology',
            major: 'Information Technology',
            startDate: '2023-08-01',
            isOngoing: true,
            gpa: '3.8/4.0',
            activities: ['GDSC ML Path', 'CPS Lab Researcher', 'HMIT Academic', 'Data Science Competitions'],
            achievements: [
                'ML Project Final Score: 92/100',
                'Active in national data science competitions',
                'Research Assistant at multiple laboratories',
            ],
        },
        {
            id: 'edu-2',
            institution: 'SMAN 88 Jakarta',
            degree: 'High School Diploma',
            major: 'Science (IPA)',
            startDate: '2020-06-01',
            endDate: '2023-06-30',
            isOngoing: false,
            activities: ['Science Studies'],
            achievements: [
                'Strong foundation in mathematics and physics',
                'Analytical thinking development',
            ],
        },
    ],
    achievements: [
        {
            id: 'ach-1',
            title: 'Top 15/90 - Data Mining ADIKARA 2024',
            issuer: 'Telkom University',
            date: '2024-10-01',
            description: 'Achieved top 15 ranking in data mining competition, applying advanced ML models to complex datasets.',
            category: 'award',
        },
        {
            id: 'ach-2',
            title: '4th Place - Business Case Competition',
            issuer: 'GENBI',
            date: '2025-01-01',
            description: 'Developed innovative solutions for real-world business problems.',
            category: 'award',
        },
        {
            id: 'cert-1',
            title: 'Generative AI',
            issuer: 'Dicoding Indonesia',
            date: '2025-05-01',
            credentialId: '72ZD5LYYLZYW',
            credentialUrl: 'https://www.dicoding.com/certificates/72ZD5LYYLZYW',
            type: 'Course',
            tags: ['AI', 'Generative AI'],
            category: 'certification',
            image: '/certificate/Generative AI.pdf',
        },
        {
            id: 'cert-2',
            title: 'Practical AI for Productivity',
            issuer: 'Dicoding Indonesia',
            date: '2025-05-01',
            credentialId: 'L4PQE0RYOPO1',
            credentialUrl: 'https://www.dicoding.com/certificates/L4PQE0RYOPO1',
            type: 'Course',
            tags: ['AI', 'Productivity'],
            category: 'certification',
            image: '/certificate/Practical AI for Productivity.pdf',
        },
        {
            id: 'cert-3',
            title: 'Financial Literacy',
            issuer: 'Dicoding Indonesia',
            date: '2025-05-01',
            credentialId: 'N9ZO9KGW6XG5',
            credentialUrl: 'https://www.dicoding.com/certificates/N9ZO9KGW6XG5',
            category: 'certification',
            image: '/certificate/Financial Literacy.pdf',
        },
        {
            id: 'cert-4',
            title: 'Pemrograman Dengan Java',
            issuer: 'Dicoding Indonesia',
            date: '2025-02-01',
            credentialId: '1RXYEE173ZVM',
            credentialUrl: 'https://www.dicoding.com/certificates/1RXYEE173ZVM',
            category: 'certification',
            image: '/certificate/Pemrograman Dengan Java.pdf',
        },
        {
            id: 'cert-5',
            title: 'Back-End dengan JavaScript',
            issuer: 'Dicoding Indonesia',
            date: '2025-02-01',
            credentialId: '1RXYEE1EQZVM',
            credentialUrl: 'https://www.dicoding.com/certificates/1RXYEE1EQZVM',
            category: 'certification',
            image: '/certificate/Back-End dengan JavaScript.pdf',
        },
        {
            id: 'cert-6',
            title: 'Started with Databases',
            issuer: 'Amazon Web Services',
            date: '2025-02-01',
            credentialUrl: 'https://www.credly.com/badges/ccd9ad7a-f4b9-41e7-8589-f845d50c67f1/linked_in_profile',
            category: 'certification',
            image: '/certificate/Started with Databases.png',
        },
        {
            id: 'cert-7',
            title: 'Supervised Machine Learning Regression and Classification',
            issuer: 'DeepLearning.AI',
            date: '2025-01-01',
            credentialId: 'JEZL7ZL9SADP',
            credentialUrl: 'https://www.coursera.org/account/accomplishments/verify/JEZL7ZL9SADP',
            category: 'certification',
            image: '/certificate/Supervised Machine Learning Regression and Classification.jpeg',
        },
        {
            id: 'cert-8',
            title: 'elevAIte with Dicoding Program 2025',
            issuer: 'Dicoding Indonesia',
            date: '2025-01-01',
            credentialUrl: 'https://learn.microsoft.com/en-us/users/arfazrlll-6195/achievements/8752dbgw',
            category: 'certification',
            image: '/certificate/elevAIte with Dicoding Program 2025.png',
        },
        {
            id: 'cert-9',
            title: 'Data Analytics on Google Cloud',
            issuer: 'Google Cloud Skills Boost',
            date: '2025-01-01',
            credentialId: '13612507',
            credentialUrl: 'https://www.skills.google/public_profiles/241d7451-f9ad-4c87-81e0-affa9d6fed28/badges/13612507?utm_medium=social&utm_source=linkedin&utm_campaign=ql-social-share',
            category: 'certification',
            image: '/certificate/Data Analytics on Google Cloud.png',
        },
        {
            id: 'cert-10',
            title: 'AI Innovation Challenge',
            issuer: 'COMPFEST',
            date: '2024-11-01',
            credentialUrl: 'https://verify.compfest.id/verify/cf-2024-79c13629-a893-47a8-afba-8300ada74e0b',
            category: 'certification',
            image: '/certificate/AI Innovation Challenge.pdf',
        },
        {
            id: 'cert-11',
            title: 'Dasar Pemrograman JavaScript',
            issuer: 'Dicoding Indonesia',
            date: '2025-01-01',
            credentialId: 'MRZMNKG3KPYQ',
            credentialUrl: 'https://www.dicoding.com/certificates/MRZMNKG3KPYQ',
            category: 'certification',
            image: '/certificate/Dasar Pemrograman JavaScript.pdf',
        },
        {
            id: 'cert-12',
            title: 'Fundamental SQL Using SELECT Statement',
            issuer: 'DQLab',
            date: '2024-01-01',
            credentialUrl: 'https://academy.dqlab.id/Certificate_check/result/DQLABSQLT1HCTASH#mycertificate',
            category: 'certification',
            image: '/certificate/Fundamental SQL Using SELECT Statement.pdf',
        },
        {
            id: 'cert-13',
            title: 'Introduction to Generative AI',
            issuer: 'Amazon Web Services',
            date: '2025-01-01',
            credentialId: 'fedcea5d-b7d5-425d-b6b5-fd9d24b7c918',
            credentialUrl: 'https://www.credly.com/badges/fedcea5d-b7d5-425d-b6b5-fd9d24b7c918/linked_in_profile',
            category: 'certification',
            image: '/certificate/Introduction to Generative AI.png',
        },
        {
            id: 'cert-14',
            title: 'Deep Learning Beginner',
            issuer: 'Udemy',
            date: '2025-01-01',
            credentialId: 'UC-7dff40d7-4bif-4213-8928-653d07e72315',
            credentialUrl: 'https://www.udemy.com/certificate/UC-7dff40d7-4b1f-42f3-8928-653d07e7a315/',
            category: 'certification',
            image: '/certificate/Deep Learning Beginner.jpg',
        },
        {
            id: 'cert-15',
            title: 'Machine Learning Foundations',
            issuer: 'Amazon Web Services',
            date: '2024-12-01',
            credentialId: '4fc1c551-1f68-47cc-b371-d2785495ae61',
            credentialUrl: 'https://www.credly.com/badges/60d0828f-021d-4b73-8fef-705eddd8069a/linked_in_profile',
            category: 'certification',
            image: '/certificate/Machine Learning Foundations.png',
        },
        {
            id: 'cert-16',
            title: 'Cloud Practitioner Essentials',
            issuer: 'Dicoding Indonesia',
            date: '2024-12-01',
            credentialId: 'EYX4J4D6OZDL',
            credentialUrl: 'https://www.dicoding.com/certificates/EYX4J4D6OZDL',
            category: 'certification',
            image: '/certificate/Cloud Practitioner Essentials.pdf',
        },
        {
            id: 'cert-17',
            title: 'Pemrograman dengan Dart',
            issuer: 'Dicoding Indonesia',
            date: '2024-10-01',
            credentialId: '2VX34RJ24ZYQ',
            credentialUrl: 'https://www.dicoding.com/certificates/2VX34RJ24ZYQ',
            category: 'certification',
            image: '/certificate/Pemrograman dengan Dart.pdf',
        },
        {
            id: 'cert-18',
            title: 'Mastering Smart Contract',
            issuer: 'ICP HUB Indonesia',
            date: '2024-10-01',
            credentialId: 'IOC-8DeTb',
            credentialUrl: 'https://nwtbe-6iaaa-aaaak-qiqca-cai.icp0.io/student-dashboard/my-certificates',
            category: 'certification',
            image: '/certificate/Mastering Smart Contract.jpg',
        },
        {
            id: 'cert-19',
            title: 'Machine Learning Modeling (Beginner)',
            issuer: 'Dicoding Indonesia',
            date: '2024-10-01',
            credentialId: '1RXY20W6KXVM',
            credentialUrl: 'https://www.dicoding.com/certificates/1RXY20W6KXVM',
            category: 'certification',
            image: '/certificate/Machine Learning Modeling (Beginner).pdf',
        },
        {
            id: 'cert-20',
            title: 'AWS Academy Graduate - Cloud 1',
            issuer: 'Amazon Web Services',
            date: '2024-10-01',
            credentialId: '4fc1c551-1f68-47cc-b371-d2785495ae61',
            credentialUrl: 'https://www.credly.com/badges/4fc1c551-1f68-47cc-b371-d2785495ae61',
            type: 'Course',
            tags: ['AWS', 'Cloud'],
            category: 'certification',
            image: '/certificate/AWS Academy Graduate - AWS Academy Introduction to Cloud 1.pdf',
        },
        {
            id: 'cert-21',
            title: 'React Dasar (Gold)',
            issuer: 'Skilvul',
            date: '2024-09-01',
            credentialId: 'E7jpSPY5S6-x_qr8XR7EFQ',
            credentialUrl: 'https://skilvul.com/courses/react-dasar/student/cm0f41vtl01q501p29y0a45jf/',
            category: 'certification',
            image: '/certificate/React Dasar (Gold).pdf',
        },
        {
            id: 'cert-22',
            title: 'Algorithm & Data Structures with Python',
            issuer: 'Skilvul',
            date: '2024-08-01',
            credentialId: 'g2lBGc8vSMqN0J2ez6BSnA',
            credentialUrl: 'https://skilvul.com/courses/algorithm-and-data-structures-with-python/student/cm0f41vtl01q501p29y0a45jf/',
            category: 'certification',
            image: '/certificate/Algorithm & Data Structures with Python.pdf',
        },
        {
            id: 'cert-23',
            title: 'Python Lanjutan',
            issuer: 'Skilvul',
            date: '2024-08-01',
            credentialId: 'MysWQQTNQvuKl-AXaTUILw',
            credentialUrl: 'https://skilvul.com/courses/python-lanjutan/student/cm0f41vtl01q501p29y0a45jf/',
            category: 'certification',
            image: '/certificate/Python Lanjutan.pdf',
        },
        {
            id: 'cert-24',
            title: 'Docker, Kubernetes dan DevOps',
            issuer: 'Udemy',
            date: '2024-08-01',
            credentialId: 'UC-306a5eba-5acd-4d0d-9fe8-cdd4259d8027',
            credentialUrl: 'https://www.udemy.com/certificate/UC-306a5eba-5acd-4d0d-9fe8-cdd4259d8027/',
            category: 'certification',
            image: '/certificate/Docker, Kubernetes dan DevOps.jpg',
        },
        {
            id: 'cert-25',
            title: 'Store Listing Certificate',
            issuer: 'Google Play',
            date: '2024-07-01',
            credentialId: '110540570',
            credentialUrl: 'https://www.credential.net/ad3d06cc-16c9-4e1a-90db-c36fa3626bc8#acc.SKJ845tp',
            category: 'certification',
            image: '/certificate/Store Listing Certificate.pdf',
        },
        {
            id: 'cert-26',
            title: 'Fullstack Programming Untuk Pemula',
            issuer: 'Udemy',
            date: '2024-07-01',
            credentialId: 'UC-3c8cd3d2-a39f-4e63-8bca-25c1901a1b06',
            credentialUrl: 'https://www.udemy.com/certificate/UC-3c8cd3d2-a39f-4e63-8bca-25c1901a1b06/',
            category: 'certification',
            image: '/certificate/Fullstack Programming Untuk Pemula.jpg',
        },
        {
            id: 'cert-27',
            title: 'Pemrograman dengan Python',
            issuer: 'Dicoding Indonesia',
            date: '2024-07-01',
            credentialId: '4EXGQ83LQZRL',
            credentialUrl: 'https://www.dicoding.com/certificates/4EXGQ83LQZRL',
            category: 'certification',
            image: '/certificate/Pemrograman dengan Python.pdf',
        },
        {
            id: 'cert-28',
            title: 'Dasar Structured Query Language (SQL)',
            issuer: 'Dicoding Indonesia',
            date: '2024-07-01',
            credentialId: 'JLX17RY45X72',
            credentialUrl: 'https://www.dicoding.com/certificates/JLX17RY45X72',
            category: 'certification',
            image: '/certificate/Dasar Structured Query Language (SQL).pdf',
        },
        {
            id: 'cert-29',
            title: 'Visualisasi Data',
            issuer: 'Dicoding Indonesia',
            date: '2024-07-01',
            credentialId: 'L4PQ1Y25QXO1',
            credentialUrl: 'https://www.dicoding.com/certificates/L4PQ1Y25QXO1',
            category: 'certification',
            image: '/certificate/Visualisasi Data.pdf',
        },
        {
            id: 'cert-30',
            title: 'Dasar Artificial Intelligence',
            issuer: 'Dicoding Indonesia',
            date: '2024-07-01',
            credentialId: '6RPN19RV4X2M',
            credentialUrl: 'https://www.dicoding.com/certificates/6RPN19RV4X2M',
            category: 'certification',
            image: '/certificate/Dasar Artificial Intelligence.pdf',
        },
    ],
    techStack: [
        { name: 'Python', icon: 'https://cdn.simpleicons.org/python', category: 'language' },
        { name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript', category: 'language' },
        { name: 'JavaScript', icon: 'https://cdn.simpleicons.org/javascript', category: 'language' },
        { name: 'Solidity', icon: 'https://cdn.simpleicons.org/solidity', category: 'language' },
        { name: 'React', icon: 'https://cdn.simpleicons.org/react', category: 'framework' },
        { name: 'Next.js', icon: 'https://cdn.simpleicons.org/nextdotjs', category: 'framework' },
        { name: 'Node.js', icon: 'https://cdn.simpleicons.org/nodedotjs', category: 'framework' },
        { name: 'TensorFlow', icon: 'https://cdn.simpleicons.org/tensorflow', category: 'library' },
        { name: 'Scikit-learn', icon: 'https://cdn.simpleicons.org/scikitlearn', category: 'library' },
        { name: 'Pandas', icon: 'https://cdn.simpleicons.org/pandas', category: 'library' },
        { name: 'NumPy', icon: 'https://cdn.simpleicons.org/numpy', category: 'library' },
        { name: 'Matplotlib', icon: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Matplotlib_icon.svg', category: 'library' }, // Matplotlib not on simpleicons sometimes or generic
        { name: 'Tailwind CSS', icon: 'https://cdn.simpleicons.org/tailwindcss', category: 'library' },
        { name: 'Redis', icon: 'https://cdn.simpleicons.org/redis', category: 'database' },
        { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql', category: 'database' },
        { name: 'Kubernetes', icon: 'https://cdn.simpleicons.org/kubernetes', category: 'tool' },
        { name: 'Docker', icon: 'https://cdn.simpleicons.org/docker', category: 'tool' },
        { name: 'Terraform', icon: 'https://cdn.simpleicons.org/terraform', category: 'tool' },
        { name: 'LangChain', icon: 'https://cdn.simpleicons.org/langchain', category: 'library' },
        { name: 'Mistral AI', icon: 'https://cdn.simpleicons.org/mistralai', category: 'library' },
        { name: 'PyTorch', icon: 'https://cdn.simpleicons.org/pytorch', category: 'library' },
        { name: 'OpenCV', icon: 'https://cdn.simpleicons.org/opencv', category: 'library' },
        { name: 'FastAPI', icon: 'https://cdn.simpleicons.org/fastapi', category: 'framework' },
        { name: 'Flask', icon: 'https://cdn.simpleicons.org/flask', category: 'framework' },
        { name: 'Hugging Face', icon: 'https://cdn.simpleicons.org/huggingface', category: 'library' },
    ],
    hardSkills: [
        { name: 'System Architecture', level: 'intermediate', category: 'software', description: 'Designing robust, scalable, and high-performance system architectures for complex applications.' },

        { name: 'AI Agents & Autonomy', level: 'beginner', category: 'ai', description: 'Designing autonomous systems with recursive reasoning and decision-making capabilities.' },
        { name: 'Large Language Models (LLM)', level: 'intermediate', category: 'ai', description: 'Expertise in fine-tuning open-source models, RAG architectures, and complex prompt engineering.' },
        { name: 'Data Science', level: 'expert', category: 'ai', description: 'Advanced statistical analysis and predictive modeling to extract actionable insights from big data.' },
        { name: 'Deep Learning (CV/NLP)', level: 'advanced', category: 'ai', description: 'Architecting deep neural networks for complex computer vision and natural language tasks.' },
        { name: 'Computer Vision', level: 'intermediate', category: 'ai', description: 'Developing real-time object detection, pattern recognition, and spatial analysis systems.' },
        { name: 'Machine Learning Ops', level: 'advanced', category: 'ai', description: 'Implementing robust pipelines for model training, deployment, and performance monitoring.' },
        { name: 'DevOps', level: 'advanced', category: 'devops', description: 'Streamlining development workflows and infrastructure management through automation.' },
        { name: 'Full Stack Development', level: 'expert', category: 'software', description: 'Engineering scalable web architectures from pixel-perfect frontends to robust databases.' },
        { name: 'System Analysis', level: 'advanced', category: 'software', description: 'Translating complex stakeholder requirements into efficient and scalable technical blueprints.' },
        { name: 'SDLC', level: 'intermediate', category: 'software', description: 'Governing the entire life cycle of software development with a focus on quality and agility.' },
        { name: 'Software Design', level: 'advanced', category: 'software', description: 'Applying architectural patterns and principles to build maintainable and modular systems.' },
        { name: 'Requirement Specifications', level: 'advanced', category: 'software', description: 'Defining clear, precise, and actionable technical documentation for engineering teams.' },
        { name: 'Data Analytics', level: 'advanced', category: 'data', description: 'Transforming raw data into meaningful visualizations and strategic intelligence.' },
        { name: 'Data Visualization', level: 'expert', category: 'data', description: 'Crafting intuitive and interactive dashboards to communicate complex data findings.' },
        { name: 'SQL & DBMS', level: 'expert', category: 'data', description: 'Architecting and optimizing relational database schemas for high-performance applications.' },
        { name: 'Docker & Kubernetes', level: 'intermediate', category: 'devops', description: 'Containerizing applications for consistent deployment and orchestrating cloud resources.' },

        // Other Technical Skills
        { name: 'Wazuh', level: 'beginner', category: 'other', description: 'Exploring open-source security monitoring for threat detection and compliance.' },
        { name: 'Network Traffic Analysis', level: 'beginner', category: 'other', description: 'Analyzing packet captures to identify anomalies and optimize network performance.' },
        { name: 'Socket Programming', level: 'expert', category: 'other', description: 'Implementing low-level network communication protocols for real-time data transfer.' },
        { name: 'Google Cloud Platform', level: 'beginner', category: 'other', description: 'Utilizing cloud infrastructure and services for scalable application hosting.' },
        { name: 'Solidity', level: 'beginner', category: 'other', description: 'Writing secure smart contracts for decentralized applications on Ethereum.' },
        { name: 'Decentralized Applications (DApps)', level: 'beginner', category: 'other', description: 'Developing web applications that interact with blockchain smart contracts.' },
        { name: 'Blockchain Architecture', level: 'beginner', category: 'other', description: 'Understanding the fundamental principles of distributed ledger technologies.' },
    ],
    softSkills: [
        { name: 'Leadership', description: 'Leading teams and managing complex projects' },
        { name: 'Critical Thinking', description: 'Analytical approach to complex problems' },
        { name: 'Public Speaking', description: 'Workshop facilitation and presentations' },
        { name: 'Teamwork', description: 'Collaborative work in diverse teams' },
        { name: 'Communication', description: 'Clear technical and stakeholder communication' },
        { name: 'Problem Solving', description: 'Innovative solutions for real-world issues' },
        { name: 'Adaptability', description: 'Thriving in changing environments and learning quickly' },
        { name: 'Public Relations', description: 'Brand visibility and community engagement' },
        { name: 'Entrepreneurship', description: 'Visionary approach to value creation' },
        { name: 'Event Management', description: 'Planning and executing successful events' },
        { name: 'Research Skills', description: 'In-depth analysis and academic contribution' },
        { name: 'Mentorship', description: 'Guiding and developing talent' },
    ],
    tools: [
        { name: 'VS Code', icon: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg', category: 'ide' },
        { name: 'Jupyter', icon: 'https://cdn.simpleicons.org/jupyter', category: 'ide' },
        { name: 'Google Colab', icon: 'https://cdn.simpleicons.org/googlecolab', category: 'ide' },
        { name: 'Figma', icon: 'https://cdn.simpleicons.org/figma', category: 'design' },
        { name: 'GitHub', icon: 'https://cdn.simpleicons.org/github', category: 'devops' }, // Default black, handled by dark:invert in component
        { name: 'Git', icon: 'https://cdn.simpleicons.org/git', category: 'devops' },
        { name: 'Docker', icon: 'https://cdn.simpleicons.org/docker', category: 'devops' },
        { name: 'Conda', icon: 'https://cdn.simpleicons.org/anaconda', category: 'devops' },
        { name: 'Linux', icon: 'https://cdn.simpleicons.org/linux', category: 'devops' },
        { name: 'Postman', icon: 'https://cdn.simpleicons.org/postman', category: 'devops' },
    ],
    faqs: [
        {
            question: 'What services do you offer?',
            answer: 'I specialize in Full Stack Development (React, Next.js, Node.js), AI/ML Development (TensorFlow, Computer Vision, NLP), Data Science, and Blockchain/Web3 development (Solidity, Smart Contracts, DApps).',
        },
        {
            question: 'What technologies are you exploring?',
            answer: 'Currently diving deep into AI Agents, Blockchain technology (Solidity, Smart Contracts), and MLOps for production-ready AI systems.',
        },
        {
            question: 'Are you available for opportunities?',
            answer: 'Yes! I\'m open to internships, collaborations, and exciting projects in AI, Data Science, Full Stack Development, and Blockchain. Feel free to reach out!',
        },
    ],
    blogs: [
        {
            id: 'blog-1',
            slug: 'future-of-ai-agents',
            title: 'The Future of AI Agents in Enterprise',
            excerpt: 'How autonomous agents are redefining software architecture and decision-making processes.',
            content: 'Detailed exploration of AI agents...',
            image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop',
            date: '2025-01-15',
            category: 'ai',
            tags: ['AI', 'Agents', 'Enterprise'],
            author: { name: 'Azril', avatar: '/about/arfazrll.jpeg' },
            readTime: '5'
        },
        {
            id: 'blog-2',
            slug: 'web3-ux-challenges',
            title: 'Overcoming Web3 UX Challenges',
            excerpt: 'Strategies for building decentralized applications that feel as smooth as Web2.',
            content: 'UX in Web3 is critical...',
            image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2000&auto=format&fit=crop',
            date: '2025-01-10',
            category: 'web3',
            tags: ['Web3', 'Blockchain', 'UX'],
            author: { name: 'Azril', avatar: '/about/arfazrll.jpeg' },
            readTime: '4'
        },
        {
            id: 'blog-3',
            slug: 'mastering-nextjs-performance',
            title: 'Mastering Next.js Performance',
            excerpt: 'Advanced techniques for optimizing Core Web Vitals in modern React applications.',
            content: 'Performance optimization...',
            image: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=2000&auto=format&fit=crop',
            date: '2025-01-05',
            category: 'coding',
            tags: ['Next.js', 'React', 'Performance'],
            author: { name: 'Azril', avatar: '/about/arfazrll.jpeg' },
            readTime: '6'
        },
        {
            id: 'blog-4',
            slug: 'ai-driven-security',
            title: 'AI-Driven Cybersecurity',
            excerpt: 'Using deep learning to detect and prevent modern network intrusion.',
            content: 'Cybersecurity with AI...',
            image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop',
            date: '2024-12-20',
            category: 'ai',
            tags: ['AI', 'Security', 'Deep Learning'],
            author: { name: 'Azril', avatar: '/about/arfazrll.jpeg' },
            readTime: '7'
        },
        {
            id: 'blog-5',
            slug: 'llm-fine-tuning',
            title: 'Fine-Tuning LLMs locally',
            excerpt: 'A guide to optimizing open-source models using Ollama and LoRA techniques.',
            content: 'Local LLM fine-tuning...',
            image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2000&auto=format&fit=crop',
            date: '2024-12-15',
            category: 'ai',
            tags: ['LLM', 'Python', 'Ollama'],
            author: { name: 'Azril', avatar: '/about/arfazrll.jpeg' },
            readTime: '8'
        },
        {
            id: 'blog-6',
            slug: 'smart-contract-security',
            title: 'Smart Contract Audit Patterns',
            excerpt: 'Common vulnerabilities and how to prevent them in Solidity.',
            content: 'Audit patterns...',
            image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2000&auto=format&fit=crop',
            date: '2024-12-10',
            category: 'web3',
            tags: ['Solidity', 'Ethereum', 'Security'],
            author: { name: 'Azril', avatar: '/about/arfazrll.jpeg' },
            readTime: '5'
        },
        {
            id: 'blog-7',
            slug: 'modern-state-management',
            title: 'Modern State Management in React',
            excerpt: 'Comparing Zustand, Redux Toolkit, and React Context for large-scale apps.',
            content: 'State management...',
            image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2000&auto=format&fit=crop',
            date: '2024-12-05',
            category: 'coding',
            tags: ['React', 'Zustand', 'Architecture'],
            author: { name: 'Azril', avatar: '/about/arfazrll.jpeg' },
            readTime: '4'
        },
        {
            id: 'blog-8',
            slug: 'iot-edge-computing',
            title: 'Edge Computing with ESP32',
            excerpt: 'Implementing real-time data processing at the edge for industrial IoT.',
            content: 'Edge computing...',
            image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop',
            date: '2024-11-25',
            category: 'coding',
            tags: ['IoT', 'ESP32', 'Edge'],
            author: { name: 'Azril', avatar: '/about/arfazrll.jpeg' },
            readTime: '6'
        },
        {
            id: 'blog-9',
            slug: 'ai-in-healthcare',
            title: 'AI Transformation in Healthcare',
            excerpt: 'How computer vision is assisting in medical diagnostics and data analysis.',
            content: 'Healthcare AI...',
            image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2000&auto=format&fit=crop',
            date: '2024-11-20',
            category: 'ai',
            tags: ['Healthcare', 'AI', 'Ethics'],
            author: { name: 'Azril', avatar: '/about/arfazrll.jpeg' },
            readTime: '7'
        }
    ],
    gallery: [
        {
            id: 'gal-1',
            title: 'CPS Lab Research',
            description: 'Deep Learning research workshop at Cyber Physical System Laboratory.',
            date: '2025-01-20',
            type: 'image',
            url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000&auto=format&fit=crop',
            category: 'research'
        },
        {
            id: 'gal-2',
            title: 'Smart City Symposium',
            description: 'Presenting AIoT solutions for sustainable urban development.',
            date: '2024-12-15',
            type: 'video',
            url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder video
            thumbnail: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop',
            category: 'event'
        },
        {
            id: 'gal-3',
            title: 'Neural Network Visualization',
            description: 'Custom visualization of a Convolutional Neural Network architecture.',
            date: '2024-11-30',
            type: 'image',
            url: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=2000&auto=format&fit=crop',
            category: 'technical'
        },
        {
            id: 'gal-4',
            title: 'Blockchain Hackathon',
            description: 'Building decentralized finance solutions in 48 hours.',
            date: '2024-10-25',
            type: 'image',
            url: 'https://images.unsplash.com/photo-1516245834210-c4c142787335?q=80&w=2000&auto=format&fit=crop',
            category: 'event'
        },
        {
            id: 'gal-5',
            title: 'IoT Prototype Demo',
            description: 'Testing real-time sensor integration with cloud platforms.',
            date: '2024-09-15',
            type: 'video',
            url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop',
            category: 'technical'
        }
    ],
};
