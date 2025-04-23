"use client"

import { useEffect, useRef } from "react"

const CircleProgress = ({ percentage }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = 60

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Calculate angles
    const fullCircle = 2 * Math.PI
    const percentageToRadians = (percentage / 100) * fullCircle
    const startAngle = -0.5 * Math.PI // Start at top
    const progressEndAngle = startAngle + percentageToRadians
    const remainingEndAngle = startAngle + fullCircle

    // Draw remaining portion (orange)
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, startAngle + percentageToRadians, remainingEndAngle)
    ctx.strokeStyle = "#FFA500"
    ctx.lineWidth = 18
    ctx.lineCap = "butt"
    ctx.stroke()

    // Draw progress portion (blue)
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, startAngle, progressEndAngle)
    ctx.strokeStyle = "#1E3A8A"
    ctx.lineWidth = 18
    ctx.lineCap = "butt"
    ctx.stroke()

    // Draw percentage text
    ctx.font = "bold 28px Arial"
    ctx.fillStyle = "#1E3A8A"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(`${percentage}%`, centerX, centerY)
  }, [percentage])

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[160px] h-[160px]">
        <canvas ref={canvasRef} width="160" height="160"></canvas>
      </div>
      <div className="mt-6 text-center text-gray-500 text-sm space-y-2 w-full">
        <p className="text-gray-400">Lorem ipsum</p>
        <p className="text-gray-400">Lorem ipsum</p>
        <p className="text-gray-400">Lorem ipsum</p>
        <p className="text-gray-400">Lorem ipsum</p>
      </div>
      <button className="w-full mt-6 bg-orange-400 text-white py-2 rounded-md text-sm hover:bg-orange-500 transition-colors">
        Check Now
      </button>
    </div>
  )
}

export default CircleProgress

