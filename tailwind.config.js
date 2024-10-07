import flowbite from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
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
        Sans : ["var(--font-DM Sans)"]
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        free : "#11F87B",
        back: "#3EF8ED",
        work : "#2FE5A7",
        button_level : "#55FFF5",
        power_bg : "#F7F7F7",
        liner : "#55FFF5",
        footer : "#484A4A"
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
