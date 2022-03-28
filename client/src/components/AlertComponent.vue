<template>
  <v-alert
    v-model="alert"
    class="pa-2 text-left"
    style="border-radius: 8px"
    :color="
      item.type == 'suc'
        ? '#DFF4E8'
        : item.type == 'info'
        ? '#E1E7F7'
        : item.type == 'warn'
        ? '#FFF5E9'
        : '#FFEDED'
    "
    dismissible
    width="300"
  >
    <div class="mr-2">
      <span
        style="
          color: #101828;
          font-size: 0.8rem;
          line-height: 100%;
          font-weight: 600;
        "
      >
        {{ item.text }}
      </span>
    </div>
    <div class="mr-2 my-1" v-if="item.subtype == 'order'">
      <span style="color: #101828; font-size: 0.8rem; line-height: 100%">
        {{ item.subtype }}
      </span>
    </div>

    <template v-slot:prepend>
      <v-icon
        v-if="item.type == 'suc'"
        color="#2dda76"
        class="mr-3 myAlertIcon"
        size="20"
        >mdi-check-circle</v-icon
      >
      <v-icon
        v-if="item.type == 'info'"
        color="#4474F1"
        class="mr-3 myAlertIcon"
        size="20"
        >mdi-information</v-icon
      >
      <v-icon
        v-if="item.type == 'warn'"
        color="#FFD779"
        class="mr-3 myAlertIcon"
        size="20"
        >mdi-alert-circle</v-icon
      >
      <v-icon
        v-if="item.type == 'err'"
        color="#FF9191"
        class="mr-3 myAlertIcon"
        size="20"
        >mdi-close-circle</v-icon
      >
    </template>
    <template v-slot:close>
      <v-btn
        :color="
          item.type == 'suc'
            ? '#DFF4E8'
            : item.type == 'info'
            ? '#E1E7F7'
            : item.type == 'warn'
            ? '#FFF5E9'
            : '#FFEDED'
        "
        @click="close"
        class="px-0 closeAlert"
        elevation="0"
        min-width="24"
        max-width="24"
        width="24"
        height="24"
        style="border-radius: 8px; align-self: flex-start"
      >
        <v-icon color="#101828" size="18">mdi-close</v-icon>
      </v-btn>
    </template>
  </v-alert>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "AlertComponent",
  components: {},
  props: {
    item: Object,
  },
  data: () => ({
    alert: true,
  }),
  created() {
    if (!this.item.noclose) {
      if (!this.item.time) {
        setTimeout(this.close, 5000);
      }
      if (this.item.time) {
        setTimeout(this.close, this.item.time);
      }
    }
  },
  mounted() {},
  computed: {},
  methods: {
    ...mapMutations(["SET_REMOVE_ALERT"]),
    close() {
      this.alert = false;
      this.SET_REMOVE_ALERT(this.item.numIndex);
    },
  },
  watch: {},
};
</script>
<style lang="scss" scoped>
.myAlertIcon {
  align-self: flex-start;
  margin-top: 2px;
}
</style>
