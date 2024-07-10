// Importação dos tokens para customizar o tema.
import { colors } from "./src/styles/colors"
import { fontFamily } from "./src/styles/fontFamily"

module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
      extend: {
        colors,
        fontFamily,
      },
    },
    plugins: [],
  }