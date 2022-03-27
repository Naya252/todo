import * as taskRepository from "../repositories/taskRepository";

//All To Do Lists
export async function getAllToDoLists() {
  let allLists = await taskRepository.getAllToDoLists();
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
  let order = 0;
  let arr = [];
  lists.forEach((el) => {
    arr.push({ _id: el._id, order: order++ });
  });
  return taskRepository.draggableActiveToDoLists(arr);
}

export function changeActiveToDoListsForDraggable(
  stateToDoLists,
  newToDoLists
) {
  return newToDoLists;
}
