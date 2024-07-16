/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: "var(--accent)",
        background: "var(--background)",
        "buttons-primary": "var(--buttons-primary)",
        "buttons-secondary": "var(--buttons-secondary)",
        fillicon: "var(--fillicon)",
        text: "var(--text)",
      },
    },
  },
  plugins: [],
};
