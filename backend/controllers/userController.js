import User from "../models/User.js"
import { asyncHandler } from "../middleware/asyncHandler.js"

export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password")

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})

export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email

    if (req.body.password) {
      user.password = req.body.password
      await user.addActivity("Password updated")
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      profilePicture: updatedUser.profilePicture,
    })
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})

export const uploadProfilePicture = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (!user) {
    res.status(404)
    throw new Error("User not found")
  }

  // Check if file was uploaded
  if (!req.file) {
    res.status(400)
    throw new Error("Please upload a file")
  }

  // Set the profile picture path
  // Make sure this path is accessible from the frontend
  const profilePicturePath = `/uploads/${req.file.filename}`
  user.profilePicture = profilePicturePath

  // Add activity for profile update
  await user.addActivity("Profile picture updated")

  const updatedUser = await user.save()

  res.json({
    _id: updatedUser._id,
    profilePicture: updatedUser.profilePicture,
  })
})

