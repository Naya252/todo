<template>
  <v-app v-resize="onResize">
    <MenuSideBar />

    <MenuAppBar />

    <v-main>
      <router-view />
    </v-main>

    <MenuFooter />

    <Preloader v-if="LOADER_SHOW" />
  </v-app>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import MenuAppBar from "../components/menu/MenuAppBar.vue";
import MenuSideBar from "../components/menu/MenuSideBar.vue";
import MenuFooter from "../components/menu/MenuFooter.vue";

import Preloader from "../components/PreloaderComponent.vue";

export default {
  data() {
    return {
      windowSize: {
        x: 0,
        y: 0,
      },
    };
  },
  components: {
    MenuAppBar,
    MenuSideBar,
    MenuFooter,
    Preloader,
  },
  async mounted() {
    this.onResize();
  },
  methods: {
    ...mapMutations([
      "LOADER_INCREMENT",
      "LOADER_DECREMENT",
      "SET_WINDOW_SIZE",
    ]),
    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight };
      this.SET_WINDOW_SIZE(this.windowSize);
    },
  },
  computed: {
    ...mapGetters(["LOADER_SHOW"]),
  },
  watch: {},
};
</script>

<style lang="scss">
.v-toolbar__content,
.v-toolbar__extension {
  padding: 0 !important;
}
body {
  box-sizing: border-box;
}
</style>
