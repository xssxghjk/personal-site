const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      slate: colors.slate,
      fuchsia: colors.fuchsia,
      teal: colors.teal,
    },
    keyframes: {
      shake: {
        "0%, 100%": { transform: "translateX(0)" },
        "10%, 30%, 50%, 70%": {
          transform: "translateX(-5px)",
        },
        "20%, 40%, 60% ": {
          transform: "translateX(5px)",
        },
        "80%": {
          transform: "translateX(4px)",
        },
        "90%": {
          transform: "translateX(-4px)",
        },
      },
    },
    animation: {
      shake: "shake .7s ease 0s 1 normal forwards",
    },
  },
};
