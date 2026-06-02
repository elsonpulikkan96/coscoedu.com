/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bricolage Grotesque"', "system-ui", "sans-serif"],
        sans: ['"Hanken Grotesk"', "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          50: "#FFF1F1", 100: "#FFDFDF", 200: "#FFC2C2", 300: "#FF9A9A",
          400: "#FB5C5C", 500: "#EE2B2B", 600: "#D10A12", 700: "#AE0810",
          800: "#8F0A12", 900: "#761016", 950: "#420507",
        },
        ink: {
          50: "#F6F6F7", 100: "#E9E9EC", 200: "#C9C9D1", 300: "#A2A2AE",
          400: "#61616E", 500: "#4A4A57", 600: "#33333E", 700: "#23232B",
          800: "#17171D", 900: "#0E0E12", 950: "#08080B",
        },
        paper: "#FBF8F6",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(14,14,18,0.04), 0 8px 24px -12px rgba(14,14,18,0.12)",
        card: "0 2px 4px rgba(14,14,18,0.04), 0 18px 40px -20px rgba(14,14,18,0.18)",
        lift: "0 8px 16px rgba(14,14,18,0.06), 0 30px 60px -24px rgba(14,14,18,0.28)",
        glow: "0 10px 40px -12px rgba(209,10,18,0.45)",
      },
      borderRadius: { "4xl": "2rem" },
      keyframes: {
        "fade-up": { "0%": { opacity: "0", transform: "translateY(16px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
        marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
        shimmer: { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } },
        aurora: {
          "0%,100%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(30px,-20px) scale(1.1)" },
          "66%": { transform: "translate(-20px,20px) scale(0.95)" },
        },
        wiggle: { "0%,100%": { transform: "rotate(-3deg)" }, "50%": { transform: "rotate(3deg)" } },
        "pop-in": { "0%": { opacity: "0", transform: "scale(0.8)" }, "60%": { transform: "scale(1.05)" }, "100%": { opacity: "1", transform: "scale(1)" } },
        "spin-slow": { to: { transform: "rotate(360deg)" } },
        "gradient-x": { "0%,100%": { backgroundPosition: "0% 50%" }, "50%": { backgroundPosition: "100% 50%" } },
        "bounce-subtle": { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-4px)" } },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.22,1,0.36,1) both",
        float: "float 6s ease-in-out infinite",
        marquee: "marquee 32s linear infinite",
        shimmer: "shimmer 2.5s linear infinite",
        aurora: "aurora 18s ease-in-out infinite",
        wiggle: "wiggle 0.4s ease-in-out",
        "pop-in": "pop-in 0.5s cubic-bezier(0.22,1,0.36,1) both",
        "spin-slow": "spin-slow 14s linear infinite",
        "gradient-x": "gradient-x 6s ease infinite",
        "bounce-subtle": "bounce-subtle 2.5s ease-in-out infinite",
      },
      backgroundImage: {
        "grid-ink": "linear-gradient(to right, rgba(14,14,18,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(14,14,18,0.05) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
