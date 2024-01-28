import Task from "../models/task.js"
import User from "../models/user.js"

// ///////
// Task //
// //////////////
// Get All Task /
/////////////////
export const getTask = async (req, resp) => {
  const { page } = req.query
  try {
    // console.log(req.user._id);
    // const tasks = await Task.find({ owner: req.user._id });
    // resp.send(tasks);
    // or
    /* 
        Document#populate() now returns a promise and is now no longer chainable.
        https://mongoosejs.com/docs/migrating_to_6.html#removed-execpopulate
        */
    // tasks is hidden field of user model
    // using populate to select it
    const numOfTasks = await req.user.populate("tasks")
    // console.log("numOfTasks.task", numOfTasks)
    // const LIMIT = 2
    // const skipNumOfDoc = (Number(page) - 1) * LIMIT
    // const numPages = Math.ceil(numOfTasks.tasks.length / LIMIT)
    // // await req.user.populate({
    // const { tasks } = await req.user.populate({
    //   path: "tasks",
    //   options: {
    //     limit: LIMIT,
    //     skip: skipNumOfDoc,
    //   },
    // })

    // await req.user.populate("tasks", "description completed");
    // console.log("req.user^^^^", req.user.tasks);
    // console.log("tasks", tasks)
    // resp.status(200).send(req.user.tasks);

    //
    // const total = await req.user.tasks.countDocuments({});
    // const numOfPages = Math.ceil(total / LIMIT);
    resp.status(200).send({
      data: numOfTasks.tasks,
      // currentPage: Number(page),
      // numberOfPages: numPages,
    })
  } catch (error) {
    resp.status(500).send({ message: error })
  }
}

/////////////////////
// getTaskBySearch //
/////////////////////
export const getTasksBySearch = async (req, resp) => {
  const { searchQuery } = req.query
  console.log("searchQuery", searchQuery)
  if (searchQuery === "") {
    return resp.status(404).json({ message: "search not found" })
  }

  try {
    const title = new RegExp(searchQuery, "i")
    // console.log("title::", title)
    const filterTask = await Task.find({
      description: title,
    })

    console.log("filterTask", filterTask.length)
    if (!!filterTask.length <= 0)
      resp.status(404).send({ message: "Task not found" })
    else {
      resp.status(200).send(filterTask)
    }
  } catch (error) {
    resp.status(500).send({ message: error })
  }
}

/////////////////
// Create Task //
/////////////////
/* 
{ description: 'asdasdad', completed: false }
{
  description: 'asdasdad',
  completed: false,
  _id: new ObjectId("61e7bda6b3c68fdcd5a49d3c")
} 
*/
export const createTask = async (req, resp) => {
  console.log("createTask", req.user)
  const task = new Task({ ...req.body, owner: req.user._id })
  // console.log(task)
  try {
    await task.save()
    resp.status(201).send(task)
  } catch (error) {
    resp.status(500).send({ message: error.message })
  }
}

////////////
// DELETE //
//////////// ////////////
// delete single tasks //
/////////////////////////
export const deleteTask = async (req, resp) => {
  try {
    // const task = await Task.findByIdAndDelete(req.params.id)
    // owner must be the only one who can delete ID
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    })

    if (!task) {
      return resp.status(404).send({ message: "Task not found." })
    }
    resp.send(task)
  } catch (error) {
    resp.status(500).send({ message: error })
  }
}

//////////////////////
// delete many task //
//////////////////////
export const deleteTasks = async (req, resp) => {
  console.log("deleteTasks", req.body)
  const { _id } = req.body
  try {
    // const task = await Task.findByIdAndDelete(req.params.id)
    const task = await Task.deleteMany({
      _id: {
        $in: _id,
      },
    })

    if (!task) {
      return resp.status(404).send({ message: "Task not found" })
    }
    resp.send(task)
  } catch (error) {
    resp.status(500).send({ message: error })
  }
}

/////////////////
// Patch      ///
/////////////////
export const editTask = async (req, resp) => {
  // update
  // console.log("editTask", req.body);
  const updates = Object.keys(req.body)
  const allowedUpdates = ["description", "completed"]
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  )

  if (!isValidOperation) {
    return resp.status(404).send({ message: "Invalid updates!" })
  }

  try {
    // const task =  await Task.findByIdAndUpdate( req.params.id, req.body, {
    //     new: true, runValidators: true
    // })

    // const task = await Task.findById(req.params.id);
    const task = await Task.findOne({
      _id: req.params.id, // matching id to delete selected task
      owner: req.user._id,
      // checking user only who made created task is deleting it
    })

    if (!task) {
      return resp.status(404).send({ message: "Task not found." })
    }
    updates.forEach((update) => (task[update] = req.body[update]))
    await task.save()
    resp.send(task)
  } catch (error) {
    resp.status(400).send({ message: error })
  }
}
