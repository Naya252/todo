import * as taskRepository from "../repositories/taskRepository";
import * as listRepository from "../repositories/listRepository";

//All To Do Lists
export async function getAllToDoLists() {
  let allTasks = await taskRepository.getAllTasks();
  let allLists = await listRepository.getAllToDoLists();
  allTasks.sort((a, b) => {
    if (a.order > b.order) {
      return 1;
    }
    if (a.order < b.order) {
      return -1;
    }
    if (a.order == b.order) {
      return 0;
    }
  });
  allLists.sort((a, b) => {
    if (a.order > b.order) {
      return 1;
    }
    if (a.order < b.order) {
      return -1;
    }
    if (a.order == b.order) {
      return 0;
    }
  });
  if (allTasks.length > 0) {
    allTasks.forEach((el) => {
      allLists.forEach((elem) => {
        if (el.parentId == elem._id) {
          elem.tasks.push(el);
        }
      });
    });
  }

  return allLists;
}

//Active To Do Lists
export function getActiveToDoLists(allLists) {
  let arr = allLists.filter((el) => el.isArchived == false);
  return arr;
}

//Archive To Do Lists
export function getArchiveToDoLists(allLists) {
  let arr = allLists.filter(
    (el) => el.isArchived == true || el.hasArchivedTasks == true
  );
  return arr;
}

export function draggableActiveToDoLists(lists) {
  let order = 1;
  let arr = [];
  lists.forEach((el) => {
    arr.push({ _id: el._id, order: order++ });
  });
  return listRepository.draggableActiveToDoLists(arr);
}

export function draggableActiveToDoListById(lists, id) {
  let element;
  lists.forEach((el) => {
    if (el._id == id) {
      element = el;
    }
  });
  let order = 1;
  let arr = [];
  element.tasks.forEach((el) => {
    arr.push({ _id: el._id, order: order++ });
  });
  return taskRepository.draggableActiveToDoListById(arr);
}

export function changeActiveToDoListsForDraggable(
  stateToDoLists,
  newToDoLists
) {
  return newToDoLists;
}

export function changeActiveToDoListByIdForDraggable(stateToDoLists, data) {
  stateToDoLists.forEach((el) => {
    if (el._id == data.id) {
      el.tasks = data.val;
    }
  });
  return stateToDoLists;
}

export function preDeleteTask(lists, data) {
  lists.forEach((el) => {
    if (el._id == data.parentId) {
      el.tasks.forEach((elem) => {
        if (elem._id == data.id) {
          elem.deleted = data.deleted;
        }
      });
    }
  });

  return lists;
}
