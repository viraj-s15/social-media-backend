import express from "express"
import mongoose from "mongoose"
import router from "./routes/userRoutes.js"
import postRouter from "./routes/postRouter.js"

const app = express()

mongoose.set("strictQuery", false)

app.use(express.json())

app.use("/admin", router)

app.use("/admin/post", postRouter)
const dbUri = "InsertURLHere"

async function mongoConnect() {
	try {
		app.listen(8080)
		await mongoose.connect(dbUri, {})
		console.log("Connected to MongoDB")
	} catch (e) {
		console.error(e)
		process.exit(1)
	}
}

mongoConnect()
