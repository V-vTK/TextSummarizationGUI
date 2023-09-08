import axios from 'axios'

const baseUrl = "http://localhost:5000/chats"

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}/summaries`, newObject)
  return request.then(response => response.data)
}

const deleteP = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

const summaryApi = { getAll, create, update, deleteP }

export default summaryApi