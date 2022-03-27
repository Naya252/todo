// import * as taskService from "../services/taskService";
import * as listService from "../services/listService";
// import * as taskRepository from "../repositories/taskRepository";
export default {
  state: () => ({
    allToDoLists: [],
    activeToDoLists: [],
    archiveToDoLists: [],
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
    CHANGE_ACTIVE_TO_DO_LISTS_DRAGGABLE: (state) => {
      listService.draggableActiveToDoLists(state.activeToDoLists);
    },
    RENAME_TO_DO_LIST: (state, data) => {
      state.activeToDoLists.forEach((el) => {
        if (el._id == data.id) {
          el.title = data.title;
        }
      });
    },
    // ADD_TASK_TO_DO_LIST: (state, data) => {
    //     state.activeToDoLists.forEach((el) => {
    //       if (el._id == data.id) {
    //         el.title = data.title;
    //       }
    //     });
    //   },
  },
  getters: {
    GET_ACTIVE_TO_DO_LISTS(state) {
      return state.activeToDoLists;
    },
    GET_ARCHIVE_TO_DO_LISTS(state) {
      return state.archiveToDoLists;
    },
  },
};
