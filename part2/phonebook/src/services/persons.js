import axios from "axios"

const baseUrl = "http://localhost:3001/api/persons"

const getAll = () => {
  var promise = axios.get(baseUrl)
  return promise.then((response) => response.data)
}

const create = (newObject) => {
  const promise = axios.post(baseUrl, newObject)
  return promise.then((response) => response.data)
}

const deleteItem = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((response) => response.data)
}

const update = (id, newObject) => {
  return axios
    .put(`${baseUrl}/${id}`, newObject)
    .then((response) => response.data)
}

export default {
  getAll,
  create,
  deleteItem,
  update,
}
