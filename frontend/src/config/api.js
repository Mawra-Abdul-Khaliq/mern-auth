// Base URL for API calls
const API_URL = "http://localhost:5000/api"

// API endpoints
export const ENDPOINTS = {
  SIGNUP: `${API_URL}/auth/signup`,
  LOGIN: `${API_URL}/auth/login`,
  LOGOUT: `${API_URL}/auth/logout`,
  DASHBOARD: `${API_URL}/user/dashboard`,
  UPLOAD: `${API_URL}/user/upload`,
}

// Helper function for making API requests
export const apiRequest = async (endpoint, method = "GET", data = null, token = null) => {
  const headers = {
    "Content-Type": "application/json",
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  const config = {
    method,
    headers,
  }

  if (data) {
    config.body = JSON.stringify(data)
  }

  try {
    const response = await fetch(endpoint, config)
    const responseData = await response.json()

    if (!response.ok) {
      throw new Error(responseData.message || "Something went wrong")
    }

    return responseData
  } catch (error) {
    throw error
  }
}

// File upload helper
export const uploadFile = async (endpoint, file, token) => {
  const formData = new FormData()
  formData.append("profilePicture", file)

  const headers = {
    Authorization: `Bearer ${token}`,
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers,
      body: formData,
    })

    const responseData = await response.json()

    if (!response.ok) {
      throw new Error(responseData.message || "Something went wrong")
    }

    return responseData
  } catch (error) {
    throw error
  }
}

