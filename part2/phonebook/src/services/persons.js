import axios from 'axios'

const personsURL = 'http://localhost:3001/persons'

const getAll = () => {

    const request = axios.get(personsURL)

    return request.then(response => {
      return response.data
    })
}

const create = newPerson => {
  return axios.post(personsURL, newPerson)
}

const remove = id => {
  return axios.delete(`${personsURL}/${id}`)
}

const update = (id, newPerson) => {
  return axios.put(`${personsURL}/${id}`, newPerson)
}

export default { getAll, create, remove, update}