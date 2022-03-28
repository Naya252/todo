// import * as taskService from "../services/taskService";
import * as listService from "../services/listService";
// import * as taskRepository from "../repositories/taskRepository";
export default {
  state: () => ({
    allToDoLists: [],
    activeToDoLists: [],
    archiveToDoLists: [],
    preDeleteList: {},
  }),
  actions: {
    GET_ALL_TO_DO_LISTS({ commit }) {
      listService.getAllToDoLists().then((response) => {
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
      state.activeToDoLists = listService.getActiveToDoLists(data);
    },
    SET_ARCHIVE_TO_DO_LISTS: (state, data) => {
      state.archiveToDoLists = listService.getArchiveToDoLists(data);
    },
    CHANGE_ACTIVE_TO_DO_LISTS: (state, data) => {
      let value = listService.changeActiveToDoListsForDraggable(
        state.activeToDoLists,
        data
      );
      state.activeToDoLists = value;
    },
    CHANGE_ACTIVE_TO_DO_LIST: (state, data) => {
      let value = listService.changeActiveToDoListByIdForDraggable(
        state.activeToDoLists,
        data
      );
      state.activeToDoLists = value;
    },
    CHANGE_ACTIVE_TO_DO_LISTS_DRAGGABLE: (state) => {
      listService.draggableActiveToDoLists(state.activeToDoLists);
    },
    CHANGE_ACTIVE_TO_DO_LIST_DRAGGABLE: (state, id) => {
      listService.draggableActiveToDoListById(state.activeToDoLists, id);
    },
    RENAME_TO_DO_LIST: (state, data) => {
      state.activeToDoLists.forEach((el) => {
        if (el._id == data.id) {
          el.title = data.title;
        }
      });
    },
    UPDATE_TASK: (state, data) => {
      let value = listService.updateTask(state.activeToDoLists, data);
      state.activeToDoLists = value;
    },
    UPDATE_COMPLETE_TASK: (state, data) => {
      let value = listService.completeTask(state.activeToDoLists, data);
      state.activeToDoLists = value;
    },
    PRE_DELETE_TASK: (state, data) => {
      let value = listService.preDeleteTask(state.activeToDoLists, data);
      state.activeToDoLists = value;
    },
    GET_ACTIVE_TO_DO_LIST_BY_ID: (state, id) => {
      let list = state.activeToDoLists.filter((el) => el._id == id);
      state.preDeleteList = list[0];
    },
    DELETE_TASK: (state, data) => {
      let value = listService.deleteTask(state.activeToDoLists, data);
      state.activeToDoLists = value;
    },
  },
  getters: {
    GET_ACTIVE_TO_DO_LISTS(state) {
      return state.activeToDoLists;
    },
    GET_ARCHIVE_TO_DO_LISTS(state) {
      return state.archiveToDoLists;
    },
    GET_PRE_DELETE_LIST(state) {
      return state.preDeleteList;
    },
  },
};
