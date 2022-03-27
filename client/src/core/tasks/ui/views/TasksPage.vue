<template>
  <v-container>
    <v-row>
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
            <v-icon>mdi-sticker-plus-outline</v-icon>
          </my-btn-icon>
        </h1>
      </v-col>
    </v-row>
    <v-row>
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
              sm="3"
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
            <v-col cols="12" sm="9">
              <v-row class="ma-0">
                <v-col cols="12" class="py-0">
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
                        {{ list.tasks.length }}
                        {{ countName(list.tasks.length) }}
                      </v-list-item-title>
                    </template>
                    <v-list-item v-if="list.tasks.length > 0">
                      <TaskCard :tasks="list.tasks" :listId="list._id" />
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
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import Draggable from "vuedraggable";
import CreateList from "../components/modalWindows/CreateList.vue";
import RenameList from "../components/modalWindows/RenameList.vue";
import AddTask from "../components/modalWindows/AddTask.vue";
import TaskCard from "../components/TaskCard.vue";
export default {
  name: "TasksPage",
  components: {
    Draggable,
    CreateList,
    RenameList,
    AddTask,
    TaskCard,
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
    ...mapGetters([
      "LOADER_SHOW",
      "GET_WINDOW_SIZE",
      "GET_ACTIVE_TO_DO_LISTS",
      "GET_ACTIVE_TO_DO_LIST_BY_ID",
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
    ...mapMutations(["LOADER_INCREMENT", "LOADER_DECREMENT", "SET_ADD_ALERT"]),
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
    countName(val) {
      let value;
      if (val === 1) {
        value = "task";
      } else {
        value = "tasks";
      }
      return value;
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
