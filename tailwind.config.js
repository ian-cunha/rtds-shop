/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#000000',
        secondary: '#4B5563',
        accent: '#FBBF24',
        bgLight: '#F9FAFB', // Fundo claro
        bgDark: '#1F2937',  // Fundo escuro
        textPrimary: '#111827', // Texto escuro
        textLight: '#FFFFFF',   // Texto claro
        danger: '#EF4444',
      },
      animation: {
        'fade-in-out': 'fadeInOut 3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-btn': 'pulseBtn 0.2s ease-in-out',
        'bounce-btn': 'bounceBtn 0.3s ease-out',
      },
      keyframes: {
        fadeInOut: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '10%': { opacity: '1', transform: 'translateY(0)' },
          '90%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-10px)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseBtn: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
        bounceBtn: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};