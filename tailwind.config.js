/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      "caption-sm": ["12px", "18px"],
      "caption-lg": ["14px", "21px"],
      "body-sm": ["16px", "24px"],
      "body-lg": ["18px", "28px"],
      "h-6": ["20px", "28px"],
      "h-5": ["24px", "36px"],
      "h-4": ["30px", "40px"],
      "h-3": ["36px", "44px"],
      "h-2": ["48px", "56px"],
      "h-1": ["60px", "72px"],
    },
    boxShadow: {
      "primary-card": [
        "0px 22px 46px rgba(57, 57, 57, 0.03)",
        "0px 8.03036px 16.7908px rgba(62, 62, 62, 0.03)",
      ],
      "elevation-3": [
        "0px 8px 40px rgba(0, 0, 0, 0.2)",
        "0px 0px 4px rgba(0, 0, 0, 0.1)",
      ],
      "elevation-2": [
        "0px 4px 20px rgba(0, 0, 0, 0.15)",
        "0px 0px 3px rgba(0, 0, 0, 0.1)",
      ],
      "elevation-1": [
        "0px 2px 10px rgba(0, 0, 0, 0.1)",
        "0px 0px 2px rgba(0, 0, 0, 0.2)",
      ],
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        neutral: {
          10: "#FFFFFF",
          20: "#E5E7EB",
          30: "#D1D5DB",
          40: "#9CA3AF",
          50: "#6B7280",
          60: "#4B5563",
          70: "#374151",
          80: "#1F2937",
          90: "#111827",
          100: "#030712",
        },
        primary: {
          surface: "#ECFDF5",
          border: "#D1FAE5",
          DEFAULT: "#10B981",
          hover: "#047857",
          pressed: "#064E3B",
        },
        error: {
          surface: "#FEF2F2",
          border: "#FEE2E2",
          DEFAULT: "#EF4444",
          hover: "#B91C1C",
          pressed: "#7F1D1D",
        },
        warning: {
          surface: "#FFF7ED",
          border: "#FFEDD5",
          DEFAULT: "#F97316",
          hover: "#C2410C",
          pressed: "#7C2D12",
        },
        success: {
          surface: "#F0FDF4",
          border: "#DCFCE7",
          DEFAULT: "#22C55E",
          hover: "#15803D",
          pressed: "#14532D",
        },
        info: {
          surface: "#EFF6FF",
          border: "#DBEAFE",
          DEFAULT: "#3B82F6",
          hover: "#1D4ED8",
          pressed: "#1E3A8A",
        },
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
