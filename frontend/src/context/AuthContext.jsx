"use client"

import { createContext, useState, useEffect } from "react"
import { ENDPOINTS, apiRequest } from "../config/api"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Check if user is logged in
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem("token")

        if (!token) {
          setLoading(false)
          return
        }

        // Fetch user data from backend
        const userData = await apiRequest(ENDPOINTS.DASHBOARD, "GET", null, token)

        setUser(userData)
        setIsAuthenticated(true)
        setError(null)
      } catch (err) {
        console.error("Authentication error:", err.message)
        localStorage.removeItem("token")
      } finally {
        setLoading(false)
      }
    }

    checkLoggedIn()
  }, [])

  // Login user
  const login = async (email, password) => {
    try {
      setLoading(true)
      const data = await apiRequest(ENDPOINTS.LOGIN, "POST", { email, password })

      localStorage.setItem("token", data.token)
      setUser(data)
      setIsAuthenticated(true)
      setError(null)

      return data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Register user
  const register = async (userData) => {
    try {
      setLoading(true)
      const data = await apiRequest(ENDPOINTS.SIGNUP, "POST", userData)

      localStorage.setItem("token", data.token)
      setUser(data)
      setIsAuthenticated(true)
      setError(null)

      return data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Logout user
  const logout = async () => {
    try {
      const token = localStorage.getItem("token")

      if (token) {
        await apiRequest(ENDPOINTS.LOGOUT, "POST", null, token)
      }
    } catch (err) {
      console.error("Logout error:", err.message)
    } finally {
      localStorage.removeItem("token")
      setUser(null)
      setIsAuthenticated(false)
    }
  }

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      setLoading(true)
      const token = localStorage.getItem("token")
      const updatedUser = await apiRequest(ENDPOINTS.DASHBOARD, "PUT", userData, token)

      setUser({ ...user, ...updatedUser })
      setError(null)

      return updatedUser
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Upload profile picture
  const uploadProfilePicture = async (file) => {
    try {
      setLoading(true)
      const token = localStorage.getItem("token")

      // Create form data
      const formData = new FormData()
      formData.append("profilePicture", file)

      // Make request
      const response = await fetch(ENDPOINTS.UPLOAD, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to upload profile picture")
      }

      // Update user state with new profile picture
      setUser({ ...user, profilePicture: data.profilePicture })
      setError(null)

      return data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        error,
        login,
        register,
        logout,
        updateProfile,
        uploadProfilePicture,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext

