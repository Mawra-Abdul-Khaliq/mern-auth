"use client"

import { useState, useContext, useEffect } from "react"
import { User, Eye, EyeOff  } from "lucide-react"
import AuthContext from "../context/AuthContext"

const ProfileModal = ({ user, onClose }) => {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    confirmPassword: "",
  })
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { updateProfile, uploadProfilePicture } = useContext(AuthContext)
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: ""
  })
  // Check if user has a profile picture
  const hasProfilePicture = user?.profilePicture && user.profilePicture !== ""

  // Set the preview URL when the modal opens or when user changes
  useEffect(() => {
    if (hasProfilePicture) {
      // If profile picture exists, set it as the preview
      setPreviewUrl(getProfilePicUrl())
    } else {
      setPreviewUrl(null)
    }
  }, [user])
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }
  const { name, email, password, confirmPassword } = formData

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (e.target.name === 'password') {
      checkPasswordStrength(e.target.value)
    }
  }
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)

      // Create a preview URL
      const fileReader = new FileReader()
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result)
      }
      fileReader.readAsDataURL(file)
    }
  }
  const checkPasswordStrength = (password) => {
    let score = 0
    let feedback = []

    if (password.length < 8) {
      feedback.push('Password should be at least 8 characters')
    } else {
      score += 1
    }

    if (/[A-Z]/.test(password)) score += 1
    else feedback.push('Add uppercase letters')

    if (/[a-z]/.test(password)) score += 1
    else feedback.push('Add lowercase letters')

    if (/[0-9]/.test(password)) score += 1
    else feedback.push('Add numbers')

    if (/[^A-Za-z0-9]/.test(password)) score += 1
    else feedback.push('Add special characters')

    setPasswordStrength({
      score,
      feedback: feedback.join(', ')
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccessMessage("")

    // Validate passwords if provided
    if (password && password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }
    if (passwordStrength.score < 3) {
      setError("Password is too weak. " + passwordStrength.feedback)
      return
    }
    setIsLoading(true)

    try {
      // Update profile information if changed
      if (name !== user.name || email !== user.email || password) {
        const updateData = {
          name,
          email,
        }

        if (password) {
          updateData.password = password
        }

        await updateProfile(updateData)
      }

      // Upload profile picture if selected
      if (selectedFile) {
        await uploadProfilePicture(selectedFile)
      }

      setSuccessMessage("Profile updated successfully")

      // Clear password fields after successful update
      setFormData({
        ...formData,
        password: "",
        confirmPassword: "",
      })
    } catch (err) {
      setError(err.message || "Failed to update profile")
    } finally {
      setIsLoading(false)
    }
  }

  // Get the API URL for profile picture
  const getProfilePicUrl = () => {
    if (previewUrl && previewUrl.startsWith("data:")) return previewUrl
    if (!hasProfilePicture) return null

    // If it's already a full URL, return it
    if (user.profilePicture.startsWith("http")) {
      return user.profilePicture
    }

    // Otherwise, construct the URL to the backend
    return `http://localhost:5000${user.profilePicture}`
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Update Profile</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {successMessage && (
            <div
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
              role="alert"
            >
              <span className="block sm:inline">{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Profile Picture */}
            <div className="mb-4 flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-gray-200 mb-2 overflow-hidden flex items-center justify-center">
                {previewUrl ? (
                  <img
                    src={previewUrl || "/placeholder.svg"}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.style.display = "none"
                      e.target.parentNode.classList.add("flex", "items-center", "justify-center", "bg-gray-200")
                      // Add the icon if image fails to load
                      const icon = document.createElement("div")
                      icon.innerHTML =
                        '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="text-gray-400"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>'
                      e.target.parentNode.appendChild(icon)
                    }}
                  />
                ) : (
                  <User className="h-12 w-12 text-gray-400" />
                )}
              </div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            {/* Name */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={name}
                onChange={onChange}
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={email}
                onChange={onChange}
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                New Password (leave blank to keep current)
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  className=" appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="••••••••"
                  value={password}
                  onChange={onChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  value={confirmPassword}
                  onChange={onChange}
                  disabled={!password}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="mr-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isLoading ? "Updating..." : "Update Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProfileModal

