import jwt from "jsonwebtoken"
import User from "../models/User.js"
import { asyncHandler } from "../middleware/asyncHandler.js"

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  })
}

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  // Check if user exists
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error("User already exists")
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
  })

  if (user) {
    // Add first activity
    await user.addActivity("Account created")

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePicture: user.profilePicture,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error("Invalid user data")
  }
})

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Find user by email
  const user = await User.findOne({ email })

  // Check if user exists and password matches
  if (user && (await user.matchPassword(password))) {
    // Add login activity
    await user.addActivity("Logged in")

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePicture: user.profilePicture,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error("Invalid email or password")
  }
})

export const logoutUser = asyncHandler(async (req, res) => {
  // Add logout activity
  await req.user.addActivity("Logged out")

  res.json({ message: "Logged out successfully" })
})

