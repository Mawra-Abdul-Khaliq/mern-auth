"use client"

import { Home, FileText, MessageSquare, Bell, MapPin, BarChart2, User, LogOut, Settings } from "lucide-react"

const Sidebar = ({ user, onLogout, onProfileClick }) => {
  const menuItems = [
    { icon: Home, label: "Home" },
    { icon: FileText, label: "Files" },
    { icon: MessageSquare, label: "Messages" },
    { icon: Bell, label: "Notifications" },
    { icon: MapPin, label: "Location" },
    { icon: BarChart2, label: "Analytics" },
  ]

  // Check if user has a profile picture
  const hasProfilePicture = user?.profilePicture && user.profilePicture !== ""

  // Get the API URL for profile picture
  const getProfilePicUrl = () => {
    if (!hasProfilePicture) return null

    // If it's already a full URL, return it
    if (user.profilePicture.startsWith("http")) {
      return user.profilePicture
    }

    // Otherwise, construct the URL to the backend with the correct path
    return `http://localhost:5000${user.profilePicture}`
  }

  return (
    <div className="w-64 bg-blue-900 text-white flex flex-col h-full">
      {/* User Profile */}
      <div className="flex flex-col items-center p-6 border-b border-blue-800">
        <div
          className="w-20 h-20 rounded-full bg-blue-800 mb-4 overflow-hidden cursor-pointer flex items-center justify-center"
          onClick={onProfileClick}
        >
          {hasProfilePicture ? (
            <img
              src={getProfilePicUrl() || "/placeholder.svg"}
              alt="Profile"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null
                // If image fails to load, show the icon instead
                e.target.style.display = "none"
                e.target.parentNode.classList.add("flex", "items-center", "justify-center", "bg-blue-800")
              }}
            />
          ) : (
            <User className="h-12 w-12 text-blue-300" />
          )}
        </div>
        <h2 className="text-xl font-bold uppercase">{user?.name || "USER"}</h2>
        <p className="text-sm text-blue-300">{user?.email || "user@example.com"}</p>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className="mb-4">
              <a
                href="#"
                className="flex items-center text-blue-300 hover:text-white group transition-all duration-200"
              >
                <item.icon className="mr-3 h-5 w-5 group-hover:scale-110" />
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
        {/* Action buttons moved below profile info */}
        <div className="flex mt-4 space-x-3 pt-72">
          <button
            onClick={onProfileClick}
            className="p-2 bg-blue-800 hover:bg-blue-700 rounded-full text-center transition-all duration-200 hover:scale-110"
            title="Update Profile"
          >
            <Settings className="h-5 w-5 text-blue-300" />
          </button>
          <button
            onClick={onLogout}
            className="p-2 bg-red-700 hover:bg-red-600 rounded-full text-center transition-all duration-200 hover:scale-110"
            title="Logout"
          >
            <LogOut className="h-5 w-5 text-white" />
          </button>
        </div>
      </nav>
    </div>
  )
}

export default Sidebar

