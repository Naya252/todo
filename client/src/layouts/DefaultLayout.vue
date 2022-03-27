<template>
  <v-app v-if="$browserDetect.isIE"> ОЙ </v-app>
  <v-app v-else>
    <MenuSideBar />

    <MenuAppBar />

    <v-main v-resize="onResize">
      <router-view />

      <div
        class="ma-0"
        style="
            position: fixed;
            top: 80px;
            z-index: 210;
            min-height: 0px
            transition: all 0.3s ease;
          "
        :style="$browserDetect.isIE ? 'right: 0px;' : 'right: 24px;'"
      >
        <transition-group name="scroll-y-reverse-transition">
          <Alert v-for="item in GET_ALERTS" :key="item.numIndex" :item="item" />
        </transition-group>
      </div>
    </v-main>

    <MenuFooter />

    <Preloader v-if="LOADER_SHOW" />
  </v-app>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import MenuAppBar from "../components/menu/MenuAppBar.vue";
import MenuSideBar from "../components/menu/MenuSideBar.vue";
import MenuFooter from "../components/menu/MenuFooter.vue";
import Alert from "../components/AlertComponent.vue";
import taskRepository from "../core/tasks/repositories/taskRepository";
import taskService from "../core/tasks/services/taskService";

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
    Alert,
  },
  created() {
    this.LOADER_INCREMENT();
    this.GET_ALL_TO_DO_LISTS().then(() => {
      this.LOADER_DECREMENT();
    });
  },
  async mounted() {
    this.onResize();
  },
  methods: {
    ...mapActions(["GET_ALL_TO_DO_LISTS"]),
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
    ...mapGetters(["LOADER_SHOW", "GET_ALERTS"]),
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
