/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#10B981",
          secondary: "#a4fca4",
          accent: "#e897fc",
          neutral: "#ffffff",
          "base-100": "#ffffff",
          info: "#3B82F6",
          success: "#22C55E",
          warning: "#F97316",
          error: "#EF4444",
        },
      },
    ],
    base: false,
  },
};
