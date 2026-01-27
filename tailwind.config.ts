import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: ['class', 'class'],
    theme: {
    	extend: {
    		colors: {
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			border: 'hsl(var(--border))',
    			ring: 'hsl(var(--ring))',
    			glow: {
    				cyan: '#00FFFF',
    				purple: '#A855F7',
    				pink: '#EC4899'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			input: 'hsl(var(--input))',
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			}
    		},
    		fontFamily: {
    			sans: [
    				'var(--font-inter)',
    				'system-ui',
    				'sans-serif'
    			],
    			mono: [
    				'var(--font-jetbrains)',
    				'monospace'
    			]
    		},
    		animation: {
    			'fade-in': 'fadeIn 0.5s ease-out forwards',
    			'fade-up': 'fadeUp 0.6s ease-out forwards',
    			'slide-in-left': 'slideInLeft 0.5s ease-out forwards',
    			'slide-in-right': 'slideInRight 0.5s ease-out forwards',
    			'scale-in': 'scaleIn 0.4s ease-out forwards',
    			'glow-pulse': 'glowPulse 2s ease-in-out infinite',
    			float: 'float 6s ease-in-out infinite',
    			'rotate-slow': 'rotateSlow 20s linear infinite',
    			'gradient-shift': 'gradientShift 8s ease infinite',
    			marquee: 'marquee 30s linear infinite',
    			'marquee-reverse': 'marqueeReverse 30s linear infinite'
    		},
    		keyframes: {
    			fadeIn: {
    				'0%': {
    					opacity: '0'
    				},
    				'100%': {
    					opacity: '1'
    				}
    			},
    			fadeUp: {
    				'0%': {
    					opacity: '0',
    					transform: 'translateY(20px)'
    				},
    				'100%': {
    					opacity: '1',
    					transform: 'translateY(0)'
    				}
    			},
    			slideInLeft: {
    				'0%': {
    					opacity: '0',
    					transform: 'translateX(-30px)'
    				},
    				'100%': {
    					opacity: '1',
    					transform: 'translateX(0)'
    				}
    			},
    			slideInRight: {
    				'0%': {
    					opacity: '0',
    					transform: 'translateX(30px)'
    				},
    				'100%': {
    					opacity: '1',
    					transform: 'translateX(0)'
    				}
    			},
    			scaleIn: {
    				'0%': {
    					opacity: '0',
    					transform: 'scale(0.9)'
    				},
    				'100%': {
    					opacity: '1',
    					transform: 'scale(1)'
    				}
    			},
    			glowPulse: {
    				'0%, 100%': {
    					boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)'
    				},
    				'50%': {
    					boxShadow: '0 0 40px rgba(0, 255, 255, 0.6)'
    				}
    			},
    			float: {
    				'0%, 100%': {
    					transform: 'translateY(0px)'
    				},
    				'50%': {
    					transform: 'translateY(-20px)'
    				}
    			},
    			rotateSlow: {
    				'0%': {
    					transform: 'rotate(0deg)'
    				},
    				'100%': {
    					transform: 'rotate(360deg)'
    				}
    			},
    			gradientShift: {
    				'0%, 100%': {
    					backgroundPosition: '0% 50%'
    				},
    				'50%': {
    					backgroundPosition: '100% 50%'
    				}
    			},
    			marquee: {
    				'0%': {
    					transform: 'translateX(0%)'
    				},
    				'100%': {
    					transform: 'translateX(-50%)'
    				}
    			},
    			marqueeReverse: {
    				'0%': {
    					transform: 'translateX(-50%)'
    				},
    				'100%': {
    					transform: 'translateX(0%)'
    				}
    			}
    		},
    		backgroundImage: {
    			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
    			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
    			'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
    			'mesh-gradient': 'radial-gradient(at 40% 20%, hsla(280,100%,70%,1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(189,100%,56%,1) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(355,100%,93%,1) 0px, transparent 50%)'
    		},
    		backdropBlur: {
    			xs: '2px'
    		},
    		boxShadow: {
    			glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    			'glow-sm': '0 0 10px rgba(0, 255, 255, 0.3)',
    			'glow-md': '0 0 20px rgba(0, 255, 255, 0.4)',
    			'glow-lg': '0 0 40px rgba(0, 255, 255, 0.5)',
    			'inner-glow': 'inset 0 0 20px rgba(0, 255, 255, 0.1)'
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		}
    	}
    },
    plugins: [require("tailwindcss-animate")],
};

export default config;
