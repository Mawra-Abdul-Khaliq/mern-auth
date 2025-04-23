"use client"

import { useState } from "react"
import { isImageFile, isValidFileSize } from "../utils/fileUpload"

const FileUpload = ({ onFileSelect, maxSizeInMB = 5 }) => {
  const [error, setError] = useState("")

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setError("")

    if (!file) return

    // Validate file type
    if (!isImageFile(file)) {
      setError("Please select an image file (JPEG, PNG, etc.)")
      return
    }

    // Validate file size
    if (!isValidFileSize(file, maxSizeInMB)) {
      setError(`File size should not exceed ${maxSizeInMB}MB`)
      return
    }

    // Pass the valid file to parent component
    onFileSelect(file)
  }

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">Upload Profile Picture</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      <p className="mt-1 text-xs text-gray-500">Max file size: {maxSizeInMB}MB. Supported formats: JPEG, PNG, GIF.</p>
    </div>
  )
}

export default FileUpload

