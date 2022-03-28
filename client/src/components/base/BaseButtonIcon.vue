<template>
  <div style="display: inline-block">
    <v-btn
      :plain="plain"
      dark
      :id="id"
      :color="hover ? color : baseColor"
      icon
      class="base-button ma-1"
      elevation="0"
      :disabled="disabled"
      @click="onClick"
      @mouseover="onMouseover"
      @mouseleave="onMouseleave"
    >
      <slot></slot>
    </v-btn>
    <v-tooltip bottom v-model="showToolTip" :attach="`#${id}`" :position-y="30">
      <span>{{ tooltipTitle }}</span>
    </v-tooltip>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "BaseButtonIcon",
  props: {
    color: {
      type: String,
      required: false,
      default: "MainColor",
    },
    baseColor: {
      type: String,
      required: false,
      default: "#666",
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    plain: {
      type: Boolean,
      required: false,
      default: false,
    },
    isTooltip: {
      type: Boolean,
      required: false,
      default: false,
    },
    id: {
      type: String,
      required: false,
    },
    tooltipTitle: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      hover: false,
      showToolTip: false,
    };
  },
  computed: {
    ...mapGetters(["GET_WINDOW_SIZE"]),
  },
  methods: {
    onClick(event) {
      this.$emit("click", event);
    },
    onMouseover(event) {
      this.$emit("mouseover", event);
      this.hover = true;
      if (this.isTooltip) {
        this.showToolTip = true;
      }
    },
    onMouseleave(event) {
      this.$emit("mouseleave", event);
      this.hover = false;
      if (this.isTooltip) {
        this.showToolTip = false;
      }
    },
  },
};
</script>
