<template>
  <v-overlay :value="LOADER_SHOW" style="z-index: 9">
    <v-progress-circular width="3" indeterminate color="MainCOlor" size="80">
      <v-progress-circular
        indeterminate
        width="3"
        color="MainColor"
        rotate="45"
        size="40"
      ></v-progress-circular>
    </v-progress-circular>
  </v-overlay>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "PreloaderComponent",
  computed: {
    ...mapGetters(["LOADER_SHOW"]),
  },
  methods: {},
};
</script>
