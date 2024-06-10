import axios from "axios"

const baseUrl = "http://localhost:3001/persons"

const getAll = () => {
  var promise = axios.get(baseUrl)
  return promise.then((response) => response.data)
}

const create = (newObject) => {
  const promise = axios.post(baseUrl, newObject)
  return promise.then((response) => response.data)
}

export default {
  getAll,
  create,
}
