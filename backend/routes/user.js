import express from "express"
import { getUserProfile, updateUserProfile, uploadProfilePicture } from "../controllers/userController.js"
import { protect } from "../middleware/authMiddleware.js"
import upload from "../utils/fileUpload.js"

const router = express.Router()

// Protect all routes
router.use(protect)

router.get("/dashboard", getUserProfile)
router.put("/dashboard", updateUserProfile)

// Use the multer middleware for file uploads
router.post("/upload", upload.single("profilePicture"), uploadProfilePicture)

export default router

