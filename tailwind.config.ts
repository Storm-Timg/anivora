import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'orbitron': ['Orbitron', 'monospace'],
				'russo': ['Russo One', 'sans-serif'],
				'electrolize': ['Electrolize', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				anime: {
					blue: 'hsl(var(--anime-blue))',
					purple: 'hsl(var(--anime-purple))',
					pink: 'hsl(var(--anime-pink))',
					green: 'hsl(var(--anime-green))'
				}
			},
			backgroundImage: {
				'gradient-hero': 'var(--gradient-hero)',
				'gradient-card': 'var(--gradient-card)',
				'gradient-glow': 'var(--gradient-glow)',
				'gradient-cyber': 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%)',
				'gradient-neon': 'linear-gradient(45deg, #ff006e, #8338ec, #3a86ff, #06ffa5)',
				'gradient-pulse': 'radial-gradient(circle at 50% 50%, rgba(255, 0, 110, 0.3) 0%, transparent 70%)'
			},
			boxShadow: {
				'glow': 'var(--shadow-glow)',
				'card': 'var(--shadow-card)',
				'hover': 'var(--shadow-hover)',
				'neon': '0 0 20px rgba(255, 0, 110, 0.5), 0 0 40px rgba(131, 56, 236, 0.3)',
				'cyber': '0 0 30px rgba(58, 134, 255, 0.4), inset 0 0 30px rgba(6, 255, 165, 0.1)'
			},
			transitionTimingFunction: {
				'smooth': 'var(--transition-smooth)',
				'bounce': 'var(--transition-bounce)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'pulse-glow': {
					'0%, 100%': { 
						boxShadow: '0 0 20px rgba(255, 0, 110, 0.5), 0 0 40px rgba(131, 56, 236, 0.3)',
						transform: 'scale(1)' 
					},
					'50%': { 
						boxShadow: '0 0 30px rgba(255, 0, 110, 0.8), 0 0 60px rgba(131, 56, 236, 0.5)',
						transform: 'scale(1.05)' 
					}
				},
				'neon-flicker': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' },
					'75%': { opacity: '0.9' }
				},
				'cyber-spin': {
					'0%': { transform: 'rotate(0deg) scale(1)' },
					'50%': { transform: 'rotate(180deg) scale(1.1)' },
					'100%': { transform: 'rotate(360deg) scale(1)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				'neon-flicker': 'neon-flicker 3s ease-in-out infinite',
				'cyber-spin': 'cyber-spin 4s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
