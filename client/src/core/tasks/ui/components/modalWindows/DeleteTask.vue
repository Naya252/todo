<template>
  <div>
    <v-form ref="form" v-model="valid" @submit.prevent="onSubmit">
      <v-card-text class="pt-0 px-8 pb-2 text-left" style="font-size: 16px">
        <p>
          Are you sure you want to delete the task
          <strong>"{{ title }}"</strong> ?
        </p>
      </v-card-text>

      <v-divider></v-divider>
      <v-card-actions
        class="pa-8"
        style="display: flex; justify-content: center; align-items: center"
      >
        <my-btn :btnTitle="'OK'" @click="success" />

        <my-btn-outlined btnTitle="Cancel" @click="cancel" />
      </v-card-actions>
    </v-form>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "DeleteTask",
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
  created() {},
  data() {
    return {
      valid: true,
    };
  },
  watch: {
    showModal() {
      if (!this.showModal) {
        this.clearForm();
      }
    },
  },
  methods: {
    ...mapMutations([
      "SET_ADD_ALERT",
      "LOADER_INCREMENT",
      "LOADER_DECREMENT",
      "PRE_DELETE_TASK",
    ]),

    async success() {
      const data = {
        parentId: this.parentId,
        id: this.id,
        deleted: true,
      };
      try {
        this.LOADER_INCREMENT();
        this.PRE_DELETE_TASK(data);
        this.SET_ADD_ALERT({
          type: "err",
          text: `Task "${this.title}" deleted`,
          time: 3000,
        });
        this.LOADER_DECREMENT();
        this.clearForm();
        this.$emit("event-success", data);
      } catch (error) {
        console.log(error);
        this.SET_ADD_ALERT({
          type: "err",
          text: "not ok",
          noclose: true,
        });
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
