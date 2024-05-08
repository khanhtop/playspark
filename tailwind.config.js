/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        titan: ["var(--font-titan)"],
        roboto: ["var(--font-roboto)"],
        neon: ["var(--font-tilt-neon)"],
        pixel: ["var(--font-pixel)"],
        anton: ["var(--font-anton)"],
        octo: ["var(--font-octo)"],
        octolight: ["var(--font-octolight)"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
