/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "OPPO Sans 4.0",
          "OPPO Sans",
          "Helvetica Neue",
          "Arial",
          "PingFang SC",
          "Microsoft YaHei",
          "sans-serif",
        ],
      },
      colors: {
        ink: "#090909",
        soft: "#080808",
        line: "#252525",
      },
    },
  },
  plugins: [],
};
