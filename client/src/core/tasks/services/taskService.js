import * as taskRepository from "../repositories/taskRepository";

export async function getActiveTasks() {
  const activeTasks = await taskRepository.getAllTasks();
  return activeTasks;
}
