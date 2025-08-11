/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Fiction Category
        fiction: {
          primary: "#4a6fa5",
          secondary: "#5d7bb5",
          accent: "#ff6b9d",
          yellow: "#ffd93d",
          green: "#6bcf7f",
        },
        // Romance Category
        romance: {
          primary: "#667eea",
          secondary: "#764ba2",
          accent: "#ff9a9e",
          pastel: "#fecfef",
          cream: "#ffeaa7",
        },
        // Mystery Category
        mystery: {
          primary: "#56ab2f",
          secondary: "#a8e6cf",
          accent: "#fd79a8",
          orange: "#e17055",
          mustard: "#fdcb6e",
        },
        // Neutral Colors
        neutral: {
          primary: "#2c3e50",
          secondary: "#34495e",
          light: "#ecf0f1",
          accent: "#95a5a6",
        },
        // Global Accents
        accent: {
          yellow: "#ffd93d",
          green: "#6bcf7f",
          pink: "#ff6b9d",
          coral: "#ff9a9e",
          cream: "#ffeaa7",
        },
      },
      fontFamily: {
        handwritten: ["Caveat", "cursive"],
        serif: ["Georgia", "serif"],
        sans: ["Inter", "sans-serif"],
        display: ["Poppins", "sans-serif"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        gradient: "gradient 3s ease infinite",
        "fade-in": "fadeIn 0.5s ease-in",
        "slide-up": "slideUp 0.5s ease-out",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-10px) rotate(5deg)" },
        },
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        glassmorphism: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        float: "0 25px 80px rgba(0,0,0,0.3)",
      },
    },
  },
  plugins: [],
};
