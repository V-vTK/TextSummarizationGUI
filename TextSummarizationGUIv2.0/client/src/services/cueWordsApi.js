import axios from 'axios'

const baseUrl = "http://localhost:5000/cueWords"

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const update = (newObject) => {
  const request = axios.put(`${baseUrl}`, newObject)
  return request.then(response => response.data)
}

const cueWordsApi = { getAll, update }

export default cueWordsApi