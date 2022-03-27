import axios from "axios";

const apiRoute = "/api/tasks/";

export async function getAllToDoLists() {
  return await axios
    .get(`${apiRoute}getAllLists`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function createToDoList(data) {
  return await axios
    .post(`${apiRoute}createList`, {
      data,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function draggableActiveToDoLists(data) {
  data.forEach((el) => {
    return axios
      .put(`${apiRoute}moveList/${el._id}`, {
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
