import axios from "axios";

const apiRoute = "/api/tasks/";

export async function getAllTasks() {
  return await axios
    .get(apiRoute)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function getTaskById(id) {
  return await axios
    .get(`${apiRoute}${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function createTask(data) {
  return await axios
    .post(apiRoute, {
      data,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}
