<template>
  <v-container class="mt-10 mx-auto" style="max-width: 1200px">
    <v-row>
      <v-col class="col-12">
        <!-- {{ task }} -->
        <v-card
          flat
          max-width="800"
          class="mx-auto pt-0"
          :class="GET_WINDOW_SIZE.x < 650 ? 'pa-0' : 'pa-10'"
          max-height="80vh"
        >
          <v-row class="ma-0">
            <v-col
              class="pb-10"
              :class="GET_WINDOW_SIZE.x < 650 ? 'px-0' : 'px-5'"
            >
              <v-checkbox
                :disabled="task.deleted ? true : false"
                :hide-details="true"
                color="MainColor"
                class="mt-1 ml-2"
                :input-value="task.completed"
                :key="`${task._id}-${task.deleted}-${task.completed}`"
                @change="changeCompleted(task)"
                label="complete the task"
              ></v-checkbox>
            </v-col>
            <v-col
              class="pb-10 text-right"
              :class="GET_WINDOW_SIZE.x < 650 ? 'px-0' : 'px-5'"
            >
              <my-btn-icon
                v-if="task.deleted"
                :isTooltip="false"
                :id="`deleteTaskBtn-${task._id}`"
                tooltipTitle="Delete"
                :class="`task-${task.parentId}`"
                color="MainColor"
                @click="
                  returnTask({
                    id: task._id,
                    parentId: task.parentId,
                    title: task.title,
                  })
                "
                ><v-icon color="MainColor">mdi-refresh-circle</v-icon>
              </my-btn-icon>

              <my-btn-icon
                v-if="!task.deleted"
                :disabled="task.deleted ? true : false"
                :plain="true"
                :isTooltip="false"
                :id="`deleteTaskBtn-${task._id}`"
                tooltipTitle="Delete"
                :class="`task-${task.parentId}`"
                color="error"
                @click="
                  deleteTask({
                    id: task._id,
                    parentId: task.parentId,
                    title: task.title,
                  })
                "
              >
                <v-icon>mdi-delete-forever-outline</v-icon>
              </my-btn-icon>
            </v-col>
          </v-row>
          <v-form ref="form" v-model="valid" @submit.prevent="onSubmit">
            <v-card-text
              class="pt-0 pb-2 text-left"
              :class="GET_WINDOW_SIZE.x < 650 ? 'px-0' : 'px-8'"
              style="font-size: 16px"
              >Title
              <my-btn-icon :plain="true" @click="changeDisabledTitle">
                <v-icon>mdi-pen</v-icon>
              </my-btn-icon>
              <v-text-field
                :disabled="disabledTitle"
                v-model.trim="controls.Title"
                :rules="rules.title"
                filled
                dense
                required
                autocomplete="off"
                color="MainColor"
              ></v-text-field>
            </v-card-text>
            <v-card-text
              :class="GET_WINDOW_SIZE.x < 650 ? 'px-0' : 'px-8'"
              class="pt-0 pb-2 text-left"
              style="font-size: 16px"
              >Description
              <my-btn-icon :plain="true" @click="changeDisabledDescription">
                <v-icon>mdi-pen</v-icon>
              </my-btn-icon>
              <v-textarea
                :disabled="disabledDescription"
                v-model.trim="controls.Description"
                filled
                dense
                autocomplete="off"
                color="MainColor"
                auto-grow
                class="textarea_body2"
              ></v-textarea>
            </v-card-text>
            <v-divider></v-divider>
            <v-progress-linear
              v-if="task.deleted"
              indeterminate
              striped
              color="deep-orange"
            ></v-progress-linear>
            <v-card-actions
              class="pa-8"
              style="
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              <my-btn v-if="visibleBtn" :btnTitle="'Ok'" @click="onSubmit" />

              <my-btn-outlined
                v-if="visibleBtn"
                btnTitle="Cancel"
                @click="cancel"
              />
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>

    <my-modal-center title="Delete task" :dialog="showDeleteTask">
      <DeleteTask
        :parentId="parentListIdForDelete"
        :id="deleteTaskId"
        :title="deleteTaskTitle"
        :showModal="showDeleteTask"
        @event-success="successDeleteTask"
        @event-cancel="showDeleteTask = false"
      />
    </my-modal-center>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import * as taskRepository from "../../repositories/taskRepository";
import taskMixins from "../../mixins/taskMixins";

import DeleteTask from "../components/modalWindows/DeleteTask.vue";

export default {
  name: "TaskPage",
  components: {
    DeleteTask,
  },
  mixins: [taskMixins],

  data: () => ({
    showDeleteTask: false,
    parentListIdForDelete: "",
    deleteTaskId: "",
    deleteTaskTitle: "",

    disabledTitle: true,
    disabledDescription: true,
    task: {},

    valid: true,

    controls: {
      Title: "",
      Description: "",
    },

    rules: {
      title: [
        (v) => !!v || "Required",
        (v) =>
          (v && v.trim().length >= 2 && v.length <= 50) || "2 to 50 symbols",
      ],
    },
  }),
  created() {
    this.fetch();
  },
  computed: {
    ...mapGetters([
      "LOADER_SHOW",
      "GET_WINDOW_SIZE",
      "GET_ACTIVE_TO_DO_LISTS",
      "GET_PRE_DELETE_LIST",
    ]),
    visibleBtn() {
      let val;
      if (!this.disabledTitle || !this.disabledDescription) {
        if (
          this.task.title !== this.controls.Title ||
          this.task.description !== this.controls.Description
        ) {
          val = true;
        } else {
          val = false;
        }
      } else {
        val = false;
      }
      return val;
    },
  },
  methods: {
    ...mapActions(["GET_ALL_TO_DO_LISTS"]),
    ...mapMutations([
      "LOADER_INCREMENT",
      "LOADER_DECREMENT",
      "SET_ADD_ALERT",
      "PRE_DELETE_TASK",
      "GET_ACTIVE_TO_DO_LIST_BY_ID",
      "DELETE_TASK",
      "UPDATE_TASK",
    ]),
    async fetch() {
      this.LOADER_INCREMENT();
      let data = await taskRepository.getTask(this.$route.params.id);
      this.task = data[0];
      this.controls.Title = this.task.title;
      this.controls.Description = this.task.description;
      this.LOADER_DECREMENT();
    },

    changeDisabledTitle() {
      this.disabledTitle = false;
    },
    changeDisabledDescription() {
      this.disabledDescription = false;
    },
    cancel() {
      this.controls.Title = this.task.title;
      this.controls.Description = this.task.description;
      this.disabledTitle = true;
      this.disabledDescription = true;
    },
    onSubmit() {
      if (this.$refs.form.validate()) {
        const data = {
          title: this.controls.Title,
          description: this.controls.Description,
          parentId: this.task.parentId,
          id: this.task._id,
        };
        try {
          taskRepository.updateTask(data).then(() => {
            this.UPDATE_TASK(data);
            this.disabledTitle = true;
            this.disabledDescription = true;
            this.SET_ADD_ALERT({
              type: "suc",
              text: `Task "${this.controls.Title}" updated`,
              time: 3000,
            });
            this.fetch();
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

    deleteTask(val) {
      this.parentListIdForDelete = val.parentId;
      this.deleteTaskId = val.id;
      this.deleteTaskTitle = val.title;
      this.showDeleteTask = true;
    },
    returnTask(val) {
      const data = {
        parentId: val.parentId,
        id: val.id,
        deleted: false,
      };
      this.PRE_DELETE_TASK(data);
      this.task.deleted = false;
      this.SET_ADD_ALERT({
        type: "suc",
        text: `Task "${val.title}" returned to work`,
        time: 3000,
      });
    },
    successDeleteTask(data) {
      this.task.deleted = true;
      this.showDeleteTask = false;
      this.afterDeleteTask(data);
    },
    afterDeleteTask(data) {
      setTimeout(() => {
        this.GET_ACTIVE_TO_DO_LIST_BY_ID(data.parentId);
        this.GET_PRE_DELETE_LIST.tasks.forEach((el) => {
          if (el._id == data.id) {
            if (el.deleted) {
              taskRepository.deleteTask(el._id).then(() => {
                if (this.$route.name == "oneTask") {
                  this.$router.push("/");
                }

                this.DELETE_TASK({ listId: data.parentId, taskId: el._id });
              });
            }
          }
        });
      }, 5000);
    },
  },
};
</script>

<style lang="scss">
.textarea_body2 {
  textarea {
    max-height: 400px !important;
    overflow: auto !important;
  }
}
</style>
