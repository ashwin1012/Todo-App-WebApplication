import {apiClient} from './ApiClient'

export const retriveAllTodosForUsernameApi =(username) => 
     apiClient.get(`/users/${username}/todos`)

export const deleteTodosApi =(username,id) =>
      apiClient.delete(`/users/${username}/todos/${id}`)

export const retriveTodosApi  =(username,id) =>
     apiClient.get(`/users/${username}/todos/${id}`)

export const updateTodosApi =(username, id, todo) =>
      apiClient.put(`/users/${username}/todos/${id}`, todo)

export const createTodoApi = (username, todo) =>
  apiClient.post(`/users/${username}/todos`, todo)


