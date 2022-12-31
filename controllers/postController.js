import Post from "../models/Post.js"

export const getPosts = async (req, res, next) => {
	let posts = undefined
	try {
		posts = await Post.find()
	} catch (err) {
		console.error(err)
	}
	if (!posts) return res.status(404).json({ message: "No posts found" })
	return res.status(200).json({ posts: posts })
}

export const addPost = async (req, res, next) => {
	const { imageUrl, caption, views, comments, likes, user } = req.body
	let currentUser = undefined
	try {
		currentUser = await User.findById(user)
	} catch (err) {
		console.error(err)
	}
	if (!currentUser)
		return res.status(500).json({ message: "User does not exist" })
	let newPost = new Post({
		imageUrl,
		caption,
		views,
		comments,
		likes,
		user
	})
	try {
		newPost.save()
	} catch (err) {
		return console.error(err)
	}
	return res.status(200).json({ posts: newPost })
}

export const updatePost = async (req, res, next) => {
	const { imageUrl, caption, views, comments, likes } = req.body
	const postId = req.params.id
	let post = undefined
	try {
		post = await Post.findByIdAndUpdate(postId, {
			imageUrl,
			caption,
			views,
			comments,
			likes
		})
	} catch (err) {
		return console.err(err)
	}
	if (!post) return res.status(500).json({ message: "Cannot Update" })
	return res.status(200).json({ post })
}

export const getUserById = async (req, res, next) => {
	const id = req.params.id
	let post = undefined
	try {
		post = await Post.findById(id)
	} catch (err) {
		console.error(err)
	}
	if (!post)
		return res.status(404).json({ message: "User not found || ID Invalid" })
	return res.status(200).json({ post })
}

export const deletePost = async (req, res, next) => {
	const id = req.params.id
	let post = undefined
	try {
		post = await Post.findByIdAndRemove(id)
	} catch (err) {
		console.error(err)
	}
	if (!post)
		return res
			.status(404)
			.json({ message: "User not found || ID Invalid || Unable to Delete" })
	return res.status(200).json({ message: "Deleted Successfully" })
}
