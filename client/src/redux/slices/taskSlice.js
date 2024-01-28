import { createSlice } from "@reduxjs/toolkit"
// utils
import axios from "../../utils/axios"
// import axios from "axios"
//
import { dispatch } from "../store"

// ----------------------------------------------------------------------

const initialState = {
  tasks: [],
  currentPage: 1,
  numberOfPages: 1,
  isLoading: false,
  error: null,
}

const slice = createSlice({
  name: "UserTask",
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true
      state.error = null
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false
      state.error = action.payload
    },

    getTask(state, action) {
      state.tasks = action.payload.data
      // state.currentPage = action.payload.currentPage
      // state.numberOfPages = action.payload.numberOfPages
      state.isLoading = false
    },

    addTask(state, action) {
      state.tasks = [...state.tasks, action.payload]
      state.isLoading = false
    },

    editTask(state, action) {
      state.tasks = state.tasks.map((task) =>
        task._id === action.payload._id ? action.payload : task
      )
      state.isLoading = false
    },

    deleteTask(state, action) {
      state.isLoading = false
    },

    deleteTasks(state, action) {
      state.isLoading = false
    },

    clearTasks(state, action) {
      state.tasks = []
    },
  },
})

// Reducer
export default slice.reducer

// Actions
export const { clearTasks, hasError } = slice.actions

// ----------------------------------------------------------------------

export function getTask(page = 1) {
  return async () => {
    dispatch(slice.actions.startLoading())
    try {
      //   const config = {
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      //     },
      //   }
      const { data } = await axios.get(`/tasks?page=${page}`)

      return dispatch(slice.actions.getTask(data))
    } catch (error) {
      return dispatch(slice.actions.hasError(error))
    }
  }
}

export function addTask(taskData) {
  // console.log("taskDataaa", taskData)
  return async () => {
    dispatch(slice.actions.startLoading())

    const { description, completed } = taskData

    // try {
    const { data } = await axios.post(`/tasks`, { description, completed })

    return dispatch(slice.actions.addTask(data))
    // } catch (error) {
    // return dispatch(slice.actions.hasError(error.message))
    // }
  }
}

export function editTask(id, edit) {
  console.log("editTask", edit)
  console.log("editTask id", id)
  return async () => {
    dispatch(slice.actions.startLoading())

    // try {
    const { data } = await axios.patch(`/tasks/${id}`, edit)
    console.log("data after Edit Task", data)

    return dispatch(slice.actions.editTask(data))
    // } catch (error) {
    // dispatch(slice.actions.hasError(error))
    // }
  }
}

export function deleteTask(id) {
  return async () => {
    dispatch(slice.actions.startLoading())
    try {
      await axios.delete(`/tasks/${id}`)

      dispatch(slice.actions.deleteTask())
    } catch (error) {
      dispatch(slice.actions.hasError(error))
    }
  }
}

export function deleteTasks(_id) {
  return async () => {
    dispatch(slice.actions.startLoading())
    try {
      await axios.delete(`/tasks`, { data: { _id } })
      // await axios({
      //   url: `/tasks`,
      //   method: "delete",
      //   data: { _id },
      // })

      dispatch(slice.actions.deleteTasks())
    } catch (error) {
      dispatch(slice.actions.hasError(error))
    }
  }
}
