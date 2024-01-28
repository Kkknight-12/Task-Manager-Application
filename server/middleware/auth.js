import jwt from "jsonwebtoken"
import User from "../models/user.js"

const Auth = async function (req, resp, next) {
  try {
    let tokenBearer = req.headers.authorization

    const token = tokenBearer.split(" ")[1]

    const isCustomAuth = token.length < 1000 // jwt toke

    let user
    let decoded
    if (token && isCustomAuth) {
      decoded = jwt.verify(token, "learningNode")
      // console.log("DECODED", decoded)
      user = await User.findOne({
        _id: decoded._id,
        "tokens.token": token,
      }).select("-password")
      // console.log("USER", user)

      req.token = token
      req.user = user
    } else {
      decoded = jwt.decode(token)
      user = await User.findOne({
        email: decoded.email,
      }).select("-password")

      req.token = token
      req.user = user
    }

    next()
  } catch (error) {
    resp.status(401).send({ message: "Please Authenticate" })
  }
}

export default Auth
