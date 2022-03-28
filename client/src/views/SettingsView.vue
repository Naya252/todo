<template>
  <v-container class="mx-auto" style="max-width: 1200px">
    <v-row>
      <v-col class="col-12">
        <h1>Settings</h1>

        <div style="width: 300px; display: inline-block"></div>
      </v-col>
      <v-col class="col-12">
        <h3>Choose an accent color</h3>
      </v-col>
      <div class="mx-auto" style="width: 300px; display: inline-block">
        <v-color-picker
          class="ma-2"
          show-swatches
          hide-canvas
          hide-inputs
          hide-sliders
          :value="GET_MAIN_COLOR_FOR_STYLE_LIGHT"
          @update:color="changeColor"
        ></v-color-picker>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  name: "SettingsView",
  data: () => ({
    swatches: [],
    color: "hex",
  }),
  computed: {
    ...mapGetters(["GET_MAIN_COLOR_FOR_STYLE_LIGHT"]),
    currentColor() {
      let val = this.changeColor(this.color);
      return val;
    },
  },
  methods: {
    ...mapMutations(["CHANGE_MAIN_COLOR"]),
    changeColor(val) {
      // let newVal = val.slice(0, -2);
      this.CHANGE_MAIN_COLOR(val.hex);
      this.$vuetify.theme.themes.light.MainColor = val.hex;
      this.$vuetify.theme.themes.dark.MainColor = val.hex;
      return val.hex;
    },
  },
};
</script>
