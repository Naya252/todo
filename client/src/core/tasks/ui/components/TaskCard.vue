<template>
  <v-row>
    <Draggable
      class="col-12 pa-0 pt-3 pb-6"
      v-model="dragTasks"
      v-bind="dragOptionsTasks"
      :handle="`.task-${listId}`"
    >
      <template v-for="task in dragTasks">
        <v-col
          :key="`${task._id}-${task.deleted}-${task.completed}`"
          v-if="
            switchShowAllTasks
              ? task.completed == true || task.completed == false
              : task.completed == false
          "
        >
          <template>
            <v-hover v-slot="{ hover }">
              <v-card
                :key="task.completed"
                :elevation="hover ? 5 : 0"
                style="transition: all 0.3s ease; border: 1px dashed #ccc"
              >
                <v-progress-linear
                  v-if="task.deleted"
                  indeterminate
                  striped
                  color="deep-orange"
                ></v-progress-linear>
                <v-row class="ma-0">
                  <v-col class="col-auto pa-0">
                    <v-card-actions :style="task.deleted ? 'opacity: 0.5' : ''">
                      <v-checkbox
                        :disabled="task.deleted ? true : false"
                        :hide-details="true"
                        color="MainColor"
                        class="mt-1 ml-2"
                        :input-value="task.completed"
                        :key="`${task._id}-${task.deleted}-${task.completed}`"
                        @change="changeCompleted(task)"
                      ></v-checkbox>
                    </v-card-actions>
                  </v-col>
                  <v-col
                    class="pa-0"
                    @click="$router.push(`/${task._id}`)"
                    style="cursor: pointer"
                  >
                    <v-card-text
                      class="pb-2 text-left"
                      :style="
                        task.deleted
                          ? 'opacity: 0.5'
                          : task.completed
                          ? 'text-decoration: line-through; opacity: 0.5'
                          : ''
                      "
                    >
                      {{ task.title }}
                    </v-card-text>
                  </v-col>
                  <v-col class="col-auto pa-0">
                    <v-card-actions>
                      <my-btn-icon
                        v-if="task.deleted"
                        :isTooltip="false"
                        :id="`deleteTaskBtn-${task._id}`"
                        tooltipTitle="Delete"
                        :class="`task-${task.parentId}`"
                        color="MainColor"
                        @click="
                          $emit('return', {
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
                          $emit('delete', {
                            id: task._id,
                            parentId: task.parentId,
                            title: task.title,
                          })
                        "
                      >
                        <v-icon>mdi-delete-forever-outline</v-icon>
                      </my-btn-icon>
                      <my-btn-icon
                        v-if="!task.deleted"
                        :disabled="task.deleted ? true : false"
                        :isTooltip="false"
                        :id="`moveTaskBtn-${task._id}`"
                        tooltipTitle="Move"
                        :class="`task-${task.parentId}`"
                      >
                        <v-icon>mdi-format-line-spacing</v-icon>
                      </my-btn-icon>
                    </v-card-actions>
                  </v-col>
                </v-row>
              </v-card>
            </v-hover>
          </template>
        </v-col>
      </template>
    </Draggable>
  </v-row>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import Draggable from "vuedraggable";
import CreateList from "../components/modalWindows/CreateList.vue";
import RenameList from "../components/modalWindows/RenameList.vue";
import AddTask from "../components/modalWindows/AddTask.vue";
import * as taskRepository from "../../repositories/taskRepository";

export default {
  name: "TasksCard",
  components: {
    Draggable,
    CreateList,
    RenameList,
    AddTask,
  },
  props: {
    tasks: {
      type: Array,
    },
    listId: {
      type: [String, Number],
    },
    switchShowAllTasks: {
      type: Boolean,
      default: true,
    },
  },

  data: () => ({
    showCreateList: false,
    showRenameList: false,
    renameListId: "",
    renameListTitle: "",
    showAddTask: false,
    parentListId: "",
    parentListTitle: "",

    checkbox: false,
  }),
  created() {},
  computed: {
    ...mapGetters(["LOADER_SHOW", "GET_WINDOW_SIZE", "GET_ACTIVE_TO_DO_LISTS"]),
    dragTasks: {
      get() {
        return this.tasks;
      },
      set(value) {
        let obj = { val: value, id: this.listId };
        this.CHANGE_ACTIVE_TO_DO_LIST(obj);
        this.CHANGE_ACTIVE_TO_DO_LIST_DRAGGABLE(this.listId);
      },
    },
    dragOptionsTasks() {
      return {
        animation: 150,
        group: `tasks-${this.listId}`,
        disabled: false,
        ghostClass: "ghost",
        forceFallback: true,
      };
    },
  },
  methods: {
    ...mapActions(["GET_ALL_TO_DO_LISTS"]),
    ...mapMutations([
      "LOADER_INCREMENT",
      "LOADER_DECREMENT",
      "SET_ADD_ALERT",
      "CHANGE_ACTIVE_TO_DO_LIST",
      "CHANGE_ACTIVE_TO_DO_LIST_DRAGGABLE",
    ]),
    changeCompleted(task) {
      task.completed = !task.completed;
      taskRepository
        .changeTaskCompleted({ id: task._id, completed: task.completed })
        .then(() => {
          if (task.completed) {
            this.SET_ADD_ALERT({
              type: "suc",
              text: `The task "${task.title}" completed`,
            });
          } else {
            this.SET_ADD_ALERT({
              type: "info",
              text: `The task "${task.title}" returned to work`,
            });
          }
        });
    },
  },
};
</script>
