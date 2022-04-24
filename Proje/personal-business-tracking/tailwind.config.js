module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        tablet: "640px",
        // => @media (min-width: 640px) { ... }

        laptop: "1024px",
        // => @media (min-width: 1024px) { ... }

        desktop: "1280px",
        // => @media (min-width: 1280px) { ... }

        mobile: "320px",
      },
      width: {
        1800: "112rem",
        1450: "90rem",
        1250: "78rem",
        1170: "73rem",
        1000: "62rem",
        950: "61rem",
        800: "50rem",
        768: "48rem",
        700: "44rem",
        680: "42rem",
        650: "40rem",
        625: "39rem",
        500: "31rem",
        350: "22rem",
        150: "5rem",
      },
      colors: {
        buttonColor: "#D44E6E",
        cancelBtn: "#E8E8E8",
        cancelTxt: "#8A8992",
        searchBg: "#F1F4FF",
      },
    },
  },
  plugins: [],
}
