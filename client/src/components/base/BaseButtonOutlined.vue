<template>
  <v-btn
    dark
    :color="color"
    outlined
    class="base-button"
    elevation="0"
    :max-width="GET_WINDOW_SIZE.x < 600 ? `135` : `160`"
    :height="height"
    :disabled="disabled"
    @click="onClick"
  >
    <slot></slot>
    <span style="">{{ btnTitle }}</span>
  </v-btn>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "BaseButtonOutlined",
  props: {
    btnTitle: {
      type: String,
      required: false,
    },
    color: {
      type: String,
      required: false,
      default: "MainColor",
    },
    height: {
      type: [Number, String],
      required: false,
      default: 40,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["GET_WINDOW_SIZE"]),
  },
  methods: {
    onClick(event) {
      this.$emit("click", event);
    },
  },
};
</script>
