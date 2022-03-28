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
  },
  computed: {
    layout() {
      return (
        ((this.$route.meta && this.$route.meta.layout) || "default") + "-layout"
      );
    },
  },
  methods: {
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
  },
};
</script>

<style lang="scss" scoped>
@import "~/src/sass/variables.scss";
</style>
