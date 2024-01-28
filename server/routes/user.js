import express from "express"
//
import { login, register, registerGoogle } from "../controllers/user.js"
// ------------------------------------------------------------------------

const router = express.Router()

router.post("/login", login) // '/login'
router.post("/register", register) // '/register'
router.post("/registerGoogle", registerGoogle) // '/register'

export default router
