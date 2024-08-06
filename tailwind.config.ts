import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'pink': '#FD82B0',
        'purple': '#B82EB7',
        'blue-sky': '#01AFD2',
        'green-light': '#89E2A4',
        'ocre': '#F6DC99',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-50%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        spin: {
          '0%': { transform: 'translateY(-50%) rotate(0deg)' },
          '50%': { transform: 'translateY(-50%) rotate(360deg)' },
          '100%': { transform: 'translateY(-50%) rotate(720deg)' },
        },
        'reverse-spin': {
          '0%': { transform: 'translateY(-50%) rotate(0deg)' },
          '10%': { transform: 'translateY(-50%) rotate(72deg)' },
          '20%': { transform: 'translateY(-50%) rotate(144deg)' },
          '30%': { transform: 'translateY(-50%) rotate(216deg)' },
          '40%': { transform: 'translateY(-50%) rotate(288deg)' },
          '50%': { transform: 'translateY(-50%) rotate(360deg)' },
          '60%': { transform: 'translateY(-50%) rotate(432deg)' },
          '70%': { transform: 'translateY(-50%) rotate(504deg)' },
          '80%': { transform: 'translateY(-50%) rotate(576deg)' },
          '90%': { transform: 'translateY(-50%) rotate(648deg)' },
          '100%': { transform: 'translateY(-50%) rotate(720deg)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-out',
        slideUp: 'slideUp 1.5s ease-out',
        'slide-in': 'slideIn 1.5s ease-out forwards',
        'slide-left': 'slideLeft 1.5s ease-out forwards',
        'slide-right': 'slideRight 1.5s ease-out forwards',
        spin: 'spin 6s linear infinite',
        'reverse-spin': 'reverse-spin 6s linear infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};

export default config;
