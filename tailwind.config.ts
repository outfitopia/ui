import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      poppins: ["poppins", "sans-serif"],
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        outfitopia: {
          primary: "#90caf9",
          secondary: "#a5778a",
          text: "#000000",
          subtext: "#8f8de8",
          product: "#debdbf",
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
}
export default config
