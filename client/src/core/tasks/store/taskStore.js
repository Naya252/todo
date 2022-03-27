import * as taskService from "../services/taskService";
import * as taskRepository from "../repositories/taskRepository";
export default {
  state: () => ({
    allToDoLists: [],
    activeToDoLists: [],
    archiveToDoLists: [],
  }),
  actions: {
    GET_ALL_TO_DO_LISTS({ commit }) {
        taskService.getAllToDoLists().then((response) => {
        commit("SET_ALL_TO_DO_LISTS", response);
        commit("SET_ACTIVE_TO_DO_LISTS", response);
        commit("SET_ARCHIVE_TO_DO_LISTS", response);
      });
    },
  },
  mutations: {
    SET_ALL_TO_DO_LISTS: (state, data) => {
      state.allToDoLists = data;
    },
    SET_ACTIVE_TO_DO_LISTS: (state, data) => {
      state.activeToDoLists = taskService.getActiveToDoLists(data);
    },
    SET_ARCHIVE_TO_DO_LISTS: (state, data) => {
      state.archiveToDoLists = taskService.getArchiveToDoLists(data);
    },
    CHANGE_ACTIVE_TO_DO_LISTS: (state, data) => {
      let value = taskService.changeActiveToDoListsForDraggable(
        state.activeToDoLists,
        data
      );
      state.activeToDoLists = value;
    },
    CHANGE_ACTIVE_TO_DO_LISTS_DRAGGABLE: (state) => {
      taskService.draggableActiveToDoLists(state.activeToDoLists);
    },
  },
  getters: {
    GET_ACTIVE_TO_DO_LISTS_LENGTH(state) {
      return state.activeToDoLists.length;
    },
    GET_ARCHIVE_TO_DO_LISTS_LENGTH(state) {
      return state.archiveToDoLists.length;
    },
    GET_ACTIVE_TO_DO_LISTS(state) {
      return state.activeToDoLists;
    },
    GET_ARCHIVE_TO_DO_LISTS(state) {
      return state.archiveToDoLists;
    },
  },
};
