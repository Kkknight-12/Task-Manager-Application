import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

//
import Task from "./task.js"

// ---------------------------------------------------------------------

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
      minlength: 7,
    },
    // logintime: { type: Date, default: new Date() },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
)

userSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "owner",
})

// check if user name and password exist in database
userSchema.statics.findByCredentials = async function (email, password) {
  const user = await User.findOne({ email })

  if (!user) {
    throw new Error("Unable to login")
  }
  const isMatch = await bcrypt.compare(password, user.password)
  // console.log(isMatch);

  if (!isMatch) {
    throw new Error("Unable to login")
  }
  return user
}

//

userSchema.methods.generateAuthToken = async function () {
  const user = this

  // console.log(user._id.toString());
  /* 
    user._id --->   _id: new ObjectId("61cfeba7e9ee5197fc51a4b8"),

    user._id.toString() ----> 61cfeba7e9ee5197fc51a4b8
    */
  const token = jwt.sign({ _id: user._id.toString() }, "learningNode")
  user.tokens = user.tokens.concat({ token: token })
  await user.save()

  return token
}

// before each save this function run to check if the password
// is changed we will hash it
// this will also run while creating user
userSchema.pre("save", async function (next) {
  const user = this

  const salt = await bcrypt.genSalt(10)
  // will be true when the user is created/updated ( password)
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, salt)
  }

  next()
})

// Delete user tasks when user is removed
userSchema.pre("remove", async function (next) {
  const user = this
  await Task.deleteMany({ owner: user._id })
  next()
})

const User = mongoose.model("User", userSchema)

export default User
