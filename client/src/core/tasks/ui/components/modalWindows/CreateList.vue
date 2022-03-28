<template>
  <div>
    <v-form ref="form" v-model="valid" @submit.prevent="onSubmit">
      <v-card-text class="pt-0 px-8 pb-2 text-left" style="font-size: 16px"
        >Title
        <v-text-field
          v-model.trim="controls.Title"
          :rules="rules.title"
          filled
          dense
          required
          autocomplete="off"
          color="MainColor"
        ></v-text-field>
      </v-card-text>

      <v-divider></v-divider>
      <v-card-actions
        class="pa-8"
        style="display: flex; justify-content: center; align-items: center"
      >
        <my-btn :btnTitle="'Create'" @click="success" />

        <my-btn-outlined btnTitle="Cancel" @click="cancel" />
      </v-card-actions>
    </v-form>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

import * as listRepository from "../../../repositories/listRepository";

export default {
  name: "CreateList",
  components: {},
  props: {
    showModal: Boolean,
  },
  data() {
    return {
      valid: true,

      controls: {
        Title: "",
      },

      rules: {
        title: [
          (v) => !!v || "Required",
          (v) => (v && v.trim().length >= 2 && v.length <= 50) || "2 to 50 symbols",
        ],
      },
    };
  },
  watch: {
    showModal() {
      if (!this.showModal) {
        this.clearForm();
      } else {
        this.setData();
      }
    },
  },
  methods: {
    ...mapMutations(["SET_ADD_ALERT"]),
    ...mapMutations(["LOADER_INCREMENT", "LOADER_DECREMENT"]),

    async success() {
      if (this.$refs.form.validate()) {
        try {
          this.LOADER_INCREMENT();
          listRepository.createToDoList(this.controls.Title).then(() => {
            this.SET_ADD_ALERT({
              type: "suc",
              text: `List "${this.controls.Title}" created successfully`,
              time: 3000,
            });
            this.LOADER_DECREMENT();
            this.clearForm();
            this.$emit("event-success");
          });
        } catch (error) {
          this.SET_ADD_ALERT({
            type: "err",
            text: "not ok",
            noclose: true,
          });
        }
      }
    },

    setData() {
      this.controls.Title = ``;
    },

    clearForm() {
      this.$refs.form.reset();
    },

    cancel() {
      this.clearForm();
      this.$emit("event-cancel");
    },
  },
};
</script>
