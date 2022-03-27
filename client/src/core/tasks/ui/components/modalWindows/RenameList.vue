<template>
  <div>
    <v-form ref="form" v-model="valid" @submit.prevent="onSubmit">
      <v-card-text class="pt-0 px-8 pb-2 text-left" style="font-size: 16px"
        >Title
        <v-text-field
          v-model="controls.Title"
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

import * as taskRepository from "../../../repositories/taskRepository";

export default {
  name: "RenameList",
  components: {},
  props: {
    showModal: {
      type: Boolean,
      default: false,
    },
    id: {
      type: [String, Number],
      require: true,
    },
    title: {
      type: String,
      require: true,
      default: "",
    },
  },
  created() {
    this.controls.Title = this.title;
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
          (v) => (v && v.length >= 2 && v.length <= 50) || "2 to 50 symbols",
        ],
      },
    };
  },
  watch: {
    showModal() {
      if (this.showModal) {
        this.setData();
      } else {
        this.clearForm();
      }
    },
  },
  methods: {
    ...mapMutations([
      "SET_ADD_ALERT",
      "LOADER_INCREMENT",
      "LOADER_DECREMENT",
      "RENAME_TO_DO_LIST",
    ]),

    async success() {
      if (this.$refs.form.validate() && this.controls.Title != this.title) {
        try {
          this.LOADER_INCREMENT();
          taskRepository
            .renameToDoList({ id: this.id, title: this.controls.Title })
            .then(() => {
              this.RENAME_TO_DO_LIST({
                id: this.id,
                title: this.controls.Title,
              });
              this.SET_ADD_ALERT({
                type: "info",
                text: `List title changed to "${this.controls.Title}"`,
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
      if (this.$refs.form.validate() && this.controls.Title == this.title) {
        this.cancel();
      }
    },

    setData() {
      this.controls.Title = this.title;
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
