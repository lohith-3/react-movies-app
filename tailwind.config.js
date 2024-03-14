/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      flex: {
        2: "0 1 50%",
        3: "1 0 auto",
      },
    },
  },
  plugins: [],
};
