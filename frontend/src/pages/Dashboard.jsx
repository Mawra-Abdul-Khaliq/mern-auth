"use client"

import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import AuthContext from "../context/AuthContext"
import Sidebar from "../component/Sidebar"
import StatCard from "../component/StatCard"
import BarChart from "../component/BarChart"
import AreaChart from "../component/AreaChart"
import CircleProgress from "../component/CircleProgress"
import ProfileModal from "../component/ProfileModal"

const Dashboard = () => {
  const { user, logout, loading } = useContext(AuthContext)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [dashboardData, setDashboardData] = useState({
    earnings: 628,
    shares: 2434,
    likes: 1259,
    rating: 8.5,
    progress: 45,
  })
  const navigate = useNavigate()
  const handleLogout = async () => {
    await logout()
    navigate("/login")
  }

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar user={user} onLogout={handleLogout} onProfileClick={() => setIsProfileModalOpen(true)} />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-4 md:p-6 lg:p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            {/* <h1 className="text-2xl font-semibold text-gray-800">Dashboard User</h1> */}
            <button className="md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          {/* Welcome Message */}
          <div className="mb-6 bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-medium">Welcome, {user?.name || "User"}!</h2>
            <p className="text-gray-600">Here's what's happening with your account today.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard
              title="Earning"
              value={`$ ${dashboardData.earnings}`}
              icon="💰"
              color="bg-blue-900"
              textColor="text-white"
            />
            <StatCard
              title="Share"
              value={dashboardData.shares.toString()}
              icon="📤"
              color="bg-white"
              textColor="text-gray-800"
            />
            <StatCard
              title="Likes"
              value={dashboardData.likes.toString()}
              icon="👍"
              color="bg-white"
              textColor="text-gray-800"
            />
            <StatCard
              title="Rating"
              value={dashboardData.rating.toString()}
              icon="⭐"
              color="bg-white"
              textColor="text-gray-800"
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Bar Chart */}
            <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-4">
                  <h2 className="font-medium text-gray-700">Result</h2>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-blue-900"></span>
                      <span className="text-gray-600">2020</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-orange-400"></span>
                      <span className="text-gray-600">2019</span>
                    </span>
                  </div>
                </div>
                <button className="bg-orange-400 text-white px-4 py-1 rounded text-sm hover:bg-orange-500 transition-colors">
                  Check Now
                </button>
              </div>
              <BarChart />
            </div>

            {/* Circle Progress */}
            <div className="bg-white p-4 rounded-lg shadow">
              <CircleProgress percentage={dashboardData.progress} />
            </div>

            {/* Area Chart */}
            <div className="lg:col-span-3 bg-white p-4 rounded-lg shadow mt-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-orange-400"></span>
                    <span className="text-gray-600">Lorem ipsum</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-blue-900"></span>
                    <span className="text-gray-600">Dolor Amet</span>
                  </span>
                </div>
              </div>
              <AreaChart />
            </div>
          </div>
        </div>
      </div>

      {/* Profile Update Modal */}
      {isProfileModalOpen && <ProfileModal user={user} onClose={() => setIsProfileModalOpen(false)} />}
    </div>
  )
}

export default Dashboard



