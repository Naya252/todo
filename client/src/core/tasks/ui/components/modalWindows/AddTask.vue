<template>
  <div>
    <v-form ref="form" v-model="valid" @submit.prevent="onSubmit">
      <v-card-text class="pt-0 px-8 pb-2 text-left" style="font-size: 16px"
        >To-do List
        <v-text-field
          v-model="controls.ParentTitle"
          disabled
          filled
          dense
          required
          autocomplete="off"
          color="MainColor"
        ></v-text-field>
      </v-card-text>
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

      <v-card-text class="pt-0 px-8 pb-2 text-left" style="font-size: 16px"
        >Description
        <v-textarea
          v-model.trim="controls.Description"
          filled
          dense
          autocomplete="off"
          color="MainColor"
          rows="1"
          auto-grow
          class="textarea_body"
        ></v-textarea>
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
  name: "AddTask",
  components: {},
  props: {
    showModal: {
      type: Boolean,
      default: false,
    },
    parentId: {
      type: [String, Number],
      require: true,
    },
    parentTitle: {
      type: String,
      require: true,
      default: "",
    },
  },
  created() {
    this.setData();
  },
  data() {
    return {
      valid: true,

      controls: {
        Title: "",
        Description: "",
        ParentTitle: "",
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
    ...mapMutations(["SET_ADD_ALERT", "LOADER_INCREMENT", "LOADER_DECREMENT"]),
    setData() {
      this.controls.ParentTitle = this.parentTitle;
    },

    async success() {
      if (this.$refs.form.validate()) {
        const data = {
          title: this.controls.Title,
          description: this.controls.Description,
          parentId: this.parentId,
          parentTitle: this.parentTitle,
        };
        try {
          this.LOADER_INCREMENT();
          taskRepository.createTask(data).then(() => {
            this.SET_ADD_ALERT({
              type: "suc",
              text: `Task "${this.controls.Title}" created`,
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

<style lang="scss">
.textarea_body {
  textarea {
    max-height: 150px !important;
    overflow: auto !important;
  }
}
</style>
