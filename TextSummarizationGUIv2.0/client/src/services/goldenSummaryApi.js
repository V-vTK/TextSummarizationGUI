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

const update = (chat_id, summary_id, newObject) => {
  //chat id (int), summary_id (int)
  const request = axios.put(`${baseUrl}/${chat_id}/summaries/${summary_id}`, newObject)
  return request.then(response => response.data)
}

const deleteP = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

const goldenSummaryApi = { getAll, create, update, deleteP }

export default goldenSummaryApi