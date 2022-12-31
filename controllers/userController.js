import User from "../models/User.js"
import bcrypt from "bcryptjs"

export const getAllUsers = async (res, req, next, err) => {
	let user
	try {
		user = await User.find()
	} catch (err) {
		console.error(err)
		process.exit(1)
	}
	if (!user) return res.status(404).json({ message: "No users found" })
	return res.status(200).json({ user: user })
}

export const signin = async (req, res, next) => {
	const { name, email, password, username, profilePicture } = req.body
	let currentUser = undefined
	try {
		currentUser = await User.findOne({ email, username })
	} catch (err) {
		console.error(err)
		process.exit(1)
	}
	if (currentUser)
		return res.status(400).json({ message: "Username is already in use" })
	const cryptedPassword = bcrypt.hashSync(password)
	const newUser = new User({
		name,
		username,
		email,
		cryptedPassword,
		profilePicture,
		blogs: []
	})
	try {
		await newUser.save()
	} catch (err) {
		console.error(err)
	}
	return res.status(200).json({ user: newUser })
}

export const login = async (req, res, next) => {
	const { email, password } = req.body
	let currentUser = undefined
	try {
		currentUser = await User.findOne({ email, username })
	} catch (err) {
		console.error(err)
		process.exit(1)
	}
	if (!currentUser)
		return res
			.status(400)
			.json({ message: "Username does not exist, Sign in instead" })

	const matchPassword = bcrypt.compareSync(password, currentUser.password)
	if (!matchPassword)
		return res.status(400).json({ message: "Incorrect password" })
	return res.status(200).json({ message: "Login successful" })
}
