import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark theme colors
        PrimaryDark: "#B91C1C", //(Primary)
        SecondaryDark: "#F59E0B", //(amber)
        BackgroundDark: "#000000", //(black)
        BackgroundDark2: "#151518", //(very dark grey)
        // BackgroundDark2: "#151518", //(very dark grey)
        BackgroundDark3: "#0C0D0E",
        BackgroundDark4: "#0C0D0E",
        TextDark1: "#FAFAFA", //(almost white)
        TextDark2: "#DADADA", //(soft white)
        AccentDark: "#0A74DA", //(deep blue)
        BorderDark: "#393939", //(medium grey)

        // Light theme colors
        Primary: "#E11C49", //(Primary)
        SecondaryLight: "#FF6B00", //(vivid orange)
        BackgroundLight: "#FFFFFF", //(white)
        BackgroundLight2: "#f5f5f5", //(very light grey)
        TextLight1: "#1A1A1A", //(almost black)
        TextLight2: "#3C3C3C", //(dark grey)
        AccentLight: "#0070D1", //(bright blue)
        BorderLight: "#E0E0E0", //(light grey)
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
export default config;
