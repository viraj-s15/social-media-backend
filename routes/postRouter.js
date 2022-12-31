import express from "express"
import {
	getPosts,
	addPost,
	updatePost,
	getUserById,
	deletePost
} from "../controllers/postController.js"

const postRouter = express.Router()

postRouter.get("/", getPosts)
postRouter.post("/post", addPost)
postRouter.put("/update/:id", updatePost)
postRouter.get("/:id", getUserById)
postRouter.get("/id", deletePost)

export default postRouter
