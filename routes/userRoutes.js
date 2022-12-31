import express from "express"
import { getAllUsers, signin, login } from "../controllers/userController.js"

const router = express.Router()

router.get("/admin", getAllUsers)
router.post("/signin", signin)
router.post("/login", login)

export default router
