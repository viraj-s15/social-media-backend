import mongoose from "mongoose"

const Schema = mongoose.Schema

const postSchema = new Schema({
	imageUrl: {
		type: String,
		required: true
	},
	caption: {
		type: String,
		required: true
	},
	views: {
		type: Number,
		required: true
	},
	comments: {
		type: [String],
		required: true
	},
	likes: {
		type: Number,
		required: true
	},
	user: {
		type: mongoose.Types.ObjectId,
		required: true,
		ref: "User"
	}
})

export default mongoose.model("Post", postSchema)
