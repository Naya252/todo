<template>
  <v-footer app absolute padless>
    <v-card color="#ccc" class="flex pa-0 mx-auto" flat tile width="100%">
      <v-card-title class="py-1" style="font-size: 0.88rem">
        <v-spacer></v-spacer>
        &copy;2022 <strong class="ml-2">N_&_N </strong>

        <v-spacer></v-spacer>
      </v-card-title>
    </v-card>
  </v-footer>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "MenuFooter",
  data() {
    return {
      icons: [
        // {
        //   img: 'mdi-email-open',
        //   link: '/feedback',
        // },
      ],
      padless: true,
    };
  },
  components: {},
  async mounted() {},
  methods: {},
  computed: {
    ...mapGetters(["GET_WINDOW_SIZE"]),
  },
  watch: {},
};
</script>
