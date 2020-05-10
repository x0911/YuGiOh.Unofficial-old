import Vue from "vue";
import Vuetify from "vuetify/lib";
import ar from "@/langs/ar";
import en from "@/langs/en";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    dark: false,
    themes: {
      light: {
        primary: "#1976D2",
        secondary: "#424242",
        // anchor: "#1976D2",
        accent: "#82B1FF",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107",
        // Editions
        white: "#FFFFFF",
        girly: "#F764b2"
      },
      dark: {
        primary: "#FFFF00",
        secondary: "#CACACA",
        // anchor: "#FFFF00",
        accent: "#82B1FF",
        error: "#FF5252",
        info: "#FFC107",
        success: "#4CAF50",
        warning: "#FFC107",
        // Editions
        white: "#000000",
        girly: "#F764b2"
      }
    }
  },
  lang: {
    locales: { ar, en },
    current: "en"
  },
  rtl: false,
  icons: {
    iconfont: "mdi"
  }
});
