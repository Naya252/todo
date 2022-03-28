import axios from "axios";

const apiRoute = "/api/tasks/";

export async function createTask(data) {
  return await axios
    .post(`${apiRoute}createTask`, {
      data,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function getAllTasks() {
  return await axios
    .get(`${apiRoute}getAllTasks`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function draggableActiveToDoListById(data) {
  data.forEach((el) => {
    return axios
      .put(`${apiRoute}moveTask/${el._id}`, {
        order: el.order,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  });
}

export async function deleteTask(id) {
  return await axios
    .delete(`${apiRoute}deleteTask/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function changeTaskCompleted(data) {
  return await axios
    .put(`${apiRoute}completeTask/${data.id}`, {
      completed: data.completed,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}
