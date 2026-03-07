import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Cinzel', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'lol-gradient': 'linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--secondary)) 50%, hsl(var(--background)) 100%)',
        'hextech-gradient': 'linear-gradient(135deg, hsl(var(--border)), hsl(var(--primary)), hsl(var(--border)))',
        'arcane-gradient': 'linear-gradient(135deg, hsl(var(--accent)), hsl(var(--chart-3)), hsl(var(--accent)))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        // LoL specific colors
        gold: {
          DEFAULT: '#C89B3C',
          light: '#F0E6D2',
          dark: '#785A28',
          bright: '#CDBE91',
        },
        hextech: {
          DEFAULT: '#0AC8B9',
          dark: '#0A323C',
          light: '#0FE1D0',
        },
        arcane: {
          DEFAULT: '#8B5CF6',
          dark: '#4C1D95',
          light: '#A78BFA',
        },
        runic: {
          blue: '#0A1428',
          navy: '#091428',
          surface: '#1E2328',
        },
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'gold-shimmer': {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'hextech-pulse': {
          '0%, 100%': {
            boxShadow: '0 0 5px hsl(var(--primary) / 0.3), 0 0 15px hsl(var(--primary) / 0.1)',
          },
          '50%': {
            boxShadow: '0 0 10px hsl(var(--primary) / 0.5), 0 0 30px hsl(var(--primary) / 0.2), 0 0 50px hsl(var(--primary) / 0.1)',
          },
        },
        'arcane-float': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)', opacity: '0.7' },
          '50%': { transform: 'translateY(-15px) rotate(3deg)', opacity: '1' },
        },
        'rune-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'gold-shimmer': 'gold-shimmer 3s linear infinite',
        'hextech-pulse': 'hextech-pulse 3s ease-in-out infinite',
        'arcane-float': 'arcane-float 4s ease-in-out infinite',
        'rune-spin': 'rune-spin 20s linear infinite',
        'fade-up': 'fade-up 0.6s ease-out',
      },
      boxShadow: {
        'hextech': '0 0 15px hsl(var(--primary) / 0.3), 0 0 30px hsl(var(--primary) / 0.1)',
        'hextech-lg': '0 0 25px hsl(var(--primary) / 0.4), 0 0 50px hsl(var(--primary) / 0.15)',
        'arcane': '0 0 15px hsl(var(--accent) / 0.3), 0 0 30px hsl(var(--accent) / 0.1)',
        'arcane-lg': '0 0 25px hsl(var(--accent) / 0.4), 0 0 50px hsl(var(--accent) / 0.15)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
