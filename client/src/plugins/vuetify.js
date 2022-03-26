import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import "@mdi/font/css/materialdesignicons.css";
import minifyTheme from "minify-css-string";
import store from "../store";
import { CUSTOM_ICONS } from "./customIcons.js";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdi",
    values: CUSTOM_ICONS,
  },
  theme: {
    options: {
      customProperties: true,
      minifyTheme,
    },
    themes: {
      light: {
        MainColor: store.state.style.styleConfig.mainColorLight,
      },
      dark: {
        MainColor: store.state.style.styleConfig.mainColorDark,
      },
    },
  },
});
