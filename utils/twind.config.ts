import { apply } from "twind"
import { Options } from "$fresh/plugins/twind.ts"
import * as colors from "twind/colors"

export default {
  selfURL: import.meta.url,
  preflight: {
    body: apply`bg-gray-900 text-white`,
    // h1: apply`text(gray-800 uppercase)`, // Grouping syntax
    a: apply`text-indigo text-underline visited:text-violet hover:text-blue`,
  },
  theme: {
    extend: {
      boxShadow: {
        "red": "0 35px 60px -15px rgba(210,81,153, 1)",
      },
    },
    fontFamily: {
      "cherry-swash": ['"Cherry Swash"', "cursive"],
    },
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      // Build your palette here
      red: "rgb(210,81,153)",
      orange: "rgb(249,108,98)",
      yellow: "rgb(254,245,121)",
      green: "rgb(160,235,177)",
      blue: "rgb(0,190,211)",
      indigo: "rgb(0,153,212)",
      violet: "rgb(150,117,180)",
      dark: "rgb(15,15,15)",
      white: colors.white,
      black: colors.black,
      gray: colors.gray,
    },
  },
} as Options
