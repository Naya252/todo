<template>
  <v-container class="mx-auto" style="max-width: 1200px">
    <v-row v-if="$route.name == 'allTasks'">
      <v-col class="col-12">
        <h1>
          Your lists
          <my-btn-icon
            v-if="toDoLists.length > 0"
            :key="toDoLists ? toDoLists.length : '111'"
            :isTooltip="true"
            :id="`addListBtn`"
            tooltipTitle="Add list"
            @click="showCreateList = true"
          >
            <v-icon>mdi-clipboard-plus-outline</v-icon>
          </my-btn-icon>
        </h1>
        <v-spacer></v-spacer>
        <div class="text-right">
          <div style="display: inline-block; width: 180px">
            <v-switch
              class="mt-0"
              color="MainColor"
              v-model="switchShowAllTasks"
              label="Show all tasks"
            ></v-switch>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row v-if="$route.name == 'allTasks'">
      <v-col
        class="col-12"
        :key="toDoLists ? toDoLists.length : '111'"
        v-if="toDoLists.length > 0"
      >
        <Draggable
          class="col-12 pa-0"
          v-model="toDoLists"
          v-bind="dragOptionsToDoList"
          handle=".todoList"
        >
          <v-row
            justify="space-around"
            class="mb-5 ma-0"
            v-for="list in toDoLists"
            :key="list._id"
          >
            <v-col
              cols="12"
              md="3"
              style="overflow-wrap: break-word; white-space: normal"
            >
              <h3 class="text-left list-title">
                {{ list.title }}
              </h3>
              <div class="text-left">
                <my-btn-icon
                  :isTooltip="true"
                  :id="`penBtn-${list._id}`"
                  tooltipTitle="Edit title"
                  @click="openRenameListModal(list._id, list.title)"
                >
                  <v-icon>mdi-pen</v-icon>
                </my-btn-icon>

                <my-btn-icon
                  :isTooltip="true"
                  :id="`addTaskBtn-${list._id}`"
                  tooltipTitle="Add task"
                  @click="openAddTaskModal(list._id, list.title)"
                >
                  <v-icon>mdi-sticker-plus-outline</v-icon>
                </my-btn-icon>

                <my-btn-icon
                  :isTooltip="true"
                  :id="`moveListBtn-${list._id}`"
                  tooltipTitle="Move"
                  class="todoList"
                >
                  <v-icon>mdi-format-line-spacing</v-icon>
                </my-btn-icon>
              </div>
            </v-col>
            <v-col
              cols="12"
              md="9"
              :class="GET_WINDOW_SIZE.x < 650 ? 'px-0' : ''"
            >
              <v-row class="ma-0">
                <v-col cols="12" class="py-0" :class="GET_WINDOW_SIZE.x < 650 ? 'px-0' : ''">
                  <v-list-group
                    style="border-top: 1px solid lightgrey"
                    color="MainColor"
                  >
                    <template v-slot:activator>
                      <v-list-item-title
                        class="pb-2 pt-1"
                        style="
                          font-size: inherit;
                          font-family: inherit;
                          white-space: pre-line;
                          text-align: left;
                          font-weight: 400;
                        "
                      >
                        {{ activeTasks(list.tasks) }} active out of

                        {{ list.tasks.length }}
                        {{ countName(list.tasks.length) }}
                      </v-list-item-title>
                    </template>
                    <v-list-item v-if="list.tasks.length > 0">
                      <TaskCard
                        :tasks="list.tasks"
                        :listId="list._id"
                        :switchShowAllTasks="switchShowAllTasks"
                        @delete="deleteTask"
                        @return="returnTask"
                      />
                    </v-list-item>
                    <v-list-item v-else>
                      you don't have any tasks on this to-do list
                    </v-list-item>
                  </v-list-group>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </Draggable>
      </v-col>
      <v-col v-else :key="toDoLists.length">
        <h3>You haven't created any to-do list yet</h3>

        <my-btn @click="showCreateList = true" class="ma-4">
          <v-icon>mdi-plus</v-icon>
          Create
        </my-btn>
      </v-col>
    </v-row>
    <my-modal-center title="Create to-do list" :dialog="showCreateList">
      <CreateList
        @event-success="successCreateList"
        @event-cancel="showCreateList = false"
      />
    </my-modal-center>
    <my-modal-center title="Rename to-do list" :dialog="showRenameList">
      <RenameList
        :id="renameListId"
        :title="renameListTitle"
        :showModal="showRenameList"
        @event-success="successRenameList"
        @event-cancel="showRenameList = false"
      />
    </my-modal-center>
    <my-modal-center title="Add task" :dialog="showAddTask">
      <AddTask
        :parentId="parentListId"
        :parentTitle="parentListTitle"
        :showModal="showAddTask"
        @event-success="successAddTask"
        @event-cancel="showAddTask = false"
      />
    </my-modal-center>
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

    <router-view></router-view>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import * as taskRepository from "../../repositories/taskRepository";

import Draggable from "vuedraggable";
import CreateList from "../components/modalWindows/CreateList.vue";
import RenameList from "../components/modalWindows/RenameList.vue";
import AddTask from "../components/modalWindows/AddTask.vue";
import DeleteTask from "../components/modalWindows/DeleteTask.vue";
import TaskCard from "../components/TaskCard.vue";
export default {
  name: "TasksPage",
  components: {
    Draggable,
    CreateList,
    RenameList,
    AddTask,
    TaskCard,
    DeleteTask,
  },

  data: () => ({
    showCreateList: false,
    showRenameList: false,
    renameListId: "",
    renameListTitle: "",
    showAddTask: false,
    parentListId: "",
    parentListTitle: "",
    showDeleteTask: false,
    parentListIdForDelete: "",
    deleteTaskId: "",
    deleteTaskTitle: "",
    switchShowAllTasks: true,
  }),
  created() {},
  computed: {
    ...mapGetters([
      "LOADER_SHOW",
      "GET_WINDOW_SIZE",
      "GET_ACTIVE_TO_DO_LISTS",
      "GET_PRE_DELETE_LIST",
    ]),
    toDoLists: {
      get() {
        return this.GET_ACTIVE_TO_DO_LISTS;
      },
      set(value) {
        this.$store.commit("CHANGE_ACTIVE_TO_DO_LISTS", value);
        this.$store.commit("CHANGE_ACTIVE_TO_DO_LISTS_DRAGGABLE");
      },
    },
    dragOptionsToDoList() {
      return {
        animation: 150,
        group: "lists",
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
      "PRE_DELETE_TASK",
      "GET_ACTIVE_TO_DO_LIST_BY_ID",
      "DELETE_TASK",
    ]),
    successCreateList() {
      this.showCreateList = false;
      this.LOADER_INCREMENT();
      this.GET_ALL_TO_DO_LISTS().then(() => {
        this.LOADER_DECREMENT();
      });
    },
    openRenameListModal(id, title) {
      this.renameListId = id;
      this.renameListTitle = title;
      this.showRenameList = true;
    },
    successRenameList() {
      this.showRenameList = false;
    },
    openAddTaskModal(id, title) {
      this.parentListId = id;
      this.parentListTitle = title;
      this.showAddTask = true;
    },
    successAddTask() {
      this.showAddTask = false;
      this.LOADER_INCREMENT();
      this.GET_ALL_TO_DO_LISTS().then(() => {
        this.LOADER_DECREMENT();
      });
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
      this.SET_ADD_ALERT({
        type: "suc",
        text: `Task "${val.title}" returned to work`,
        time: 3000,
      });
    },
    successDeleteTask(data) {
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
                this.DELETE_TASK({ listId: data.parentId, taskId: el._id });
              });
            }
          }
        });
      }, 5000);
    },
    countName(val) {
      let value;
      if (val === 1) {
        value = "task";
      } else {
        value = "tasks";
      }
      return value;
    },
    activeTasks(tasks) {
      let arr = tasks.filter((el) => el.completed == false);
      return arr.length;
    },
  },
};
</script>
<style lang="scss" scoped>
.list-title {
  font-weight: normal;
  font-size: 1.2rem;
  border-left: 3px solid var(--v-MainColor-base);
  padding-top: 5px;
  padding-left: 5px;
}
</style>
