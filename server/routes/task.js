import express from "express"
//
import Auth from "../middleware/auth.js"
//
import {
  getTask,
  getTasksBySearch,
  createTask,
  deleteTask,
  deleteTasks,
  editTask,
} from "../controllers/task.js"
// ------------------------------------------------------------------------

const router = express.Router()

// const { LOGIN, REGISTER } = require("../utils/config").ROUTES.USER;

router.get("/", Auth, getTask) // '/getTask'
router.get("/search", getTasksBySearch) // Search Task
router.post("/", Auth, createTask) // '/createTask'
router.delete("/:id", Auth, deleteTask) // '/delete single task'
router.delete("/", Auth, deleteTasks) // '/deleteMany tasks'
router.patch("/:id", Auth, editTask) // '/deleteMany tasks'

export default router
