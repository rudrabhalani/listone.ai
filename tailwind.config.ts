import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          indigo: "#4F46E5",
          violet: "#7C3AED",
          pink: "#EC4899",
          cyan: "#06B6D4",
          orange: "#F97316",
        },
        dark: {
          bg: "#0B0B14",
          card: "#12121F",
          cardHover: "#18182B",
          border: "rgba(255, 255, 255, 0.08)",
          subtle: "rgba(255, 255, 255, 0.04)",
        },
        light: {
          bg: "#F8F7FF",
          card: "#FFFFFF",
          border: "rgba(79, 70, 229, 0.12)",
        },
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #EC4899 100%)",
        "brand-gradient-hover": "linear-gradient(135deg, #4338CA 0%, #6D28D9 50%, #DB2777 100%)",
        "warm-gradient": "linear-gradient(135deg, #F97316 0%, #EC4899 100%)",
        "cool-gradient": "linear-gradient(135deg, #06B6D4 0%, #4F46E5 100%)",
        "dark-radial": "radial-gradient(circle at 50% 0%, rgba(124, 58, 237, 0.18) 0%, rgba(11, 11, 20, 0) 70%)",
        "mesh-glow": "radial-gradient(at 40% 20%, hsla(245,80%,65%,0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(330,85%,60%,0.12) 0px, transparent 50%)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-jakarta)", "sans-serif"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        marquee: "marquee 35s linear infinite",
        "pulse-glow": "pulse-glow 6s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
