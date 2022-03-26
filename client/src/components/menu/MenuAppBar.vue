<template>
  <v-app-bar app dense class="pa-0">
    <v-btn
      height="48"
      width="48"
      color="MainColor"
      tile
      elevation="0"
      @click="TOGGLE_DRAWER(true)"
      v-if="GET_WINDOW_SIZE.x < 1024"
      class="mr-6"
    >
      <v-icon color="#fff">$menu</v-icon>
    </v-btn>

    <v-toolbar-title class="pl-0">
      <v-img
        max-height="40"
        contain
        alt="Logo"
        :src="require('../../assets/logo6.svg')"
      />
    </v-toolbar-title>
    <v-spacer></v-spacer>
  </v-app-bar>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "MenuAppBar",
  data: () => ({}),
  computed: {
    ...mapGetters(["GET_THEME", "GET_MINI", "GET_DRAWER", "GET_WINDOW_SIZE"]),
  },
  methods: {
    ...mapMutations(["TOGGLE_DRAWER"]),
  },
};
</script>

<style lang="scss" scoped>
.v-toolbar__content,
.v-toolbar__extension {
  padding: 0 !important;
}

.menuTop {
  display: none !important;
}

.menuLeft {
  display: block !important;
}

@media screen and (min-width: 768px) {
  .menuTop {
    display: block !important;
  }
  .menuLeft {
    display: none !important;
  }
}
</style>
