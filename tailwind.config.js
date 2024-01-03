const withMT = require("@material-tailwind/react/utils/withMT");
/** @type {import('tailwindcss').Config} */

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      eculid: ["Euclid Circular A"],
    },
    backgroundImage: {
      "image-grid-one": "url('/src/assets/images/hl1.png')",
      "image-grid-two": "url('/src/assets/images/hl2.png')",
      "image-grid-three": "url('/src/assets/images/hl3.png')",
      "image-grid-four": "url('/src/assets/images/hl4.png')",
      "image-five": "url('/src/assets/images/bg-01.jpg')",
    },
    boxShadow: {
      "3xl":
        "rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px;",
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("tailwind-scrollbar")],
});

// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }
