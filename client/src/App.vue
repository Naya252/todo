<template>
  <v-theme-provider root>
    <div>
      <component :is="layout">
        <router-view />
      </component>
    </div>
  </v-theme-provider>
</template>

<script>
import DefaultLayout from "./layouts/DefaultLayout.vue";
import ErrorLayout from "./layouts/ErrorLayout.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "App",
  components: {
    DefaultLayout,
    ErrorLayout,
  },

  data: () => ({
    //
  }),
  created() {
    this.dataTheme();
    this.changeColor();
  },
  computed: {
    ...mapGetters([
      "GET_MAIN_COLOR_FOR_STYLE_LIGHT",
      "GET_MAIN_COLOR_FOR_STYLE_DARK",
    ]),
    layout() {
      return (
        ((this.$route.meta && this.$route.meta.layout) || "default") + "-layout"
      );
    },
  },
  methods: {
    ...mapMutations(["GET_MAIN_COLOR"]),
    dataTheme() {
      if (localStorage.getItem("userDarkTheme")) {
        if (localStorage.getItem("userDarkTheme") == "false") {
          this.$vuetify.theme.dark = false;
        }
        if (localStorage.getItem("userDarkTheme") == "true") {
          this.$vuetify.theme.dark = true;
        }
      }
      return this.$vuetify.theme.dark;
    },
    changeColor() {
      this.GET_MAIN_COLOR();
      this.$vuetify.theme.themes.light.MainColor =
        this.GET_MAIN_COLOR_FOR_STYLE_LIGHT;
      this.$vuetify.theme.themes.dark.MainColor =
        this.GET_MAIN_COLOR_FOR_STYLE_DARK;
    },
  },
};
</script>

