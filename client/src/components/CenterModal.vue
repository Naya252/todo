<template>
  <v-row justify="center">
    <v-dialog :value="dialog" persistent max-width="600">
      <v-card class="pa-0 text-left" style="border-radius: 12px">
        <v-card-text
          class="text--left pa-8"
          style="font-weight: 600; font-size: 1.4rem"
        >
          {{ title }}
        </v-card-text>
        <slot></slot>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "CenterModal",
  components: {},
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    title: String,
  },
};
</script>
