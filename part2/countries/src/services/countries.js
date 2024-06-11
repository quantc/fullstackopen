import axios from "axios"

const getAllUrl = "https://studies.cs.helsinki.fi/restcountries/api/all"
const getSingleUrl = "https://studies.cs.helsinki.fi/restcountries/api/name"

const getAll = () => {
  const promise = axios.get(getAllUrl)
  return promise.then((resp) => resp.data)
}

const getSingle = (country) => {
  const promise = axios.get(`${getSingleUrl}/${country}`)
  return promise.then((resp) => resp.data)
}

export default {
  getAll,
  getSingle,
}
