import express from "express"
import dotenv from "dotenv"
import cors from "cors"

//
import connectDB from "./database/db.js"
// routes
import Task from "./routes/task.js"
import User from "./routes/user.js"

// ---------------------------------------------------------------------------
// adding dotenv file
dotenv.config()
// connecting to mongoDb
connectDB()
// connecting to express
const app = express()
// parse the JSON
// it will allow us to accpet Json data in request in body
app.use(express.json())
app.use(cors())

///////////
// routes /
app.use("/", User)
app.use("/tasks", Task)

const PORT = process.env.PORT || DEFAULT_PORT

const server = app.listen(PORT, (err) => {
  if (err) {
    console.log("Error in Server...", err)
  } else {
    console.log("Server Started ", server.address().port)
  }
})
