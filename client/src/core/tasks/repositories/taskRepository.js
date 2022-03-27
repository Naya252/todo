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
