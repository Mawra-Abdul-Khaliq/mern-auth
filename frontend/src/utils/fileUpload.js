// Helper function to handle file uploads
export const uploadFile = async (file, endpoint, token) => {
    try {
      const formData = new FormData()
      formData.append("file", file)
  
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })
  
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Upload failed")
      }
  
      return await response.json()
    } catch (error) {
      throw error
    }
  }
  
  // Function to check if file is an image
  export const isImageFile = (file) => {
    return file && file.type.startsWith("image/")
  }
  
  // Function to check file size
  export const isValidFileSize = (file, maxSizeInMB = 5) => {
    return file && file.size <= maxSizeInMB * 1024 * 1024
  }
  
  