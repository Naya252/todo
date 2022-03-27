<template>
  <v-row>
    <Draggable
      class="col-12 pa-0 pt-3 pb-6"
      v-model="dragTasks"
      v-bind="dragOptionsTasks"
      :handle="`.task-${listId}`"
    >
      <v-col v-for="task in dragTasks" :key="task._id">
        <v-hover v-slot="{ hover }">
          <v-card
            :elevation="hover ? 5 : 0"
            style="transition: all 0.3s ease; border: 1px dashed #ccc"
          >
            <v-row class="ma-0">
              <v-col class="col-auto pa-0">
                <v-card-actions>
                  <v-checkbox
                    :hide-details="true"
                    color="MainColor"
                    class="mt-1 ml-2"
                    :value="task.isArchived"
                    @change="changeIsArchived(task)"
                  ></v-checkbox>
                </v-card-actions>
              </v-col>
              <v-col class="pa-0">
                <v-card-text class="pb-2 text-left">
                  {{ task.title }}
                </v-card-text>
              </v-col>
              <v-col class="col-auto pa-0">
                <v-card-actions>
                  <my-btn-icon
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
      </v-col>
    </Draggable>
  </v-row>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import Draggable from "vuedraggable";
import CreateList from "../components/modalWindows/CreateList.vue";
import RenameList from "../components/modalWindows/RenameList.vue";
import AddTask from "../components/modalWindows/AddTask.vue";
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
    changeIsArchived(task) {
      task.isArchived = !task.isArchived;
      if (task.isArchived) {
        this.SET_ADD_ALERT({
          type: "suc",
          text: `The task ${task.title} completed`,
        });
      } else {
        this.SET_ADD_ALERT({
          type: "info",
          text: `The task ${task.title} returned to work`,
        });
      }
    },
  },
};
</script>
