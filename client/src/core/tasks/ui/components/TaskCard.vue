<template>
  <v-row>
    <Draggable
      class="col-12 pa-0"
      v-model="dragTasks"
      v-bind="dragOptionsTasks"
      :handle="`.task-${listId}`"
    >
      <v-col v-for="task in dragTasks" :key="task._id">
        <v-card>
          <v-card-text>
            {{ task.title }}
            {{ task }}
          </v-card-text>
          <v-card-actions>
            <my-btn-icon
              :isTooltip="true"
              :id="`moveTaskBtn-${task._id}`"
              tooltipTitle="Move"
              :class="`task-${task.parentId}`"
            >
              <v-icon>mdi-format-line-spacing</v-icon>
            </my-btn-icon>
          </v-card-actions>
        </v-card>
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
  },
};
</script>
