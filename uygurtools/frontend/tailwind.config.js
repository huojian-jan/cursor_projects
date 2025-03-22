/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#f8f9fa',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false, // 避免与antd样式冲突
  },
} 