import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        'text': '#180132',
        'background': '#ffffff',
        'primary': '#612b9e',
        'secondary': '#e0c8fe',
        'accent': '#7505f5',
        dark: {
          'text': '#ffffff',
          'background': '#180132',
          'primary': '#612b9e',
          'secondary': '#15012d',
          'accent': '#c696fd',
        }
      }
    },
  },
  plugins: [],
}
export default config
