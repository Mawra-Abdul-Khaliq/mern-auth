"use client"

import { useEffect, useRef } from "react"
import Chart from "chart.js/auto"

const AreaChart = () => {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")

    // Create gradients
    const orangeGradient = ctx.createLinearGradient(0, 0, 0, 200)
    orangeGradient.addColorStop(0, "rgba(255, 165, 0, 0.4)") 
    orangeGradient.addColorStop(1, "rgba(255, 165, 0, 0)")

    const blueGradient = ctx.createLinearGradient(0, 0, 0, 200)
    blueGradient.addColorStop(0, "rgba(30, 58, 138, 0.4)") 
    blueGradient.addColorStop(1, "rgba(30, 58, 138, 0)")

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
        datasets: [
          {
            label: "Lorem ipsum",
            data: [40, 30, 45, 35, 50, 35, 45, 35, 45], 
            borderColor: "#FFA500",
            backgroundColor: orangeGradient,
            tension: 0.4,
            fill: true,
            pointRadius: 0,
            borderWidth: 2,
          },
          {
            label: "Dolor Amet",
            data: [25, 35, 30, 45, 30, 40, 30, 40, 30], 
            borderColor: "#1E3A8A",
            backgroundColor: blueGradient,
            tension: 0.4,
            fill: true,
            pointRadius: 0,
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false,
          },
        },
        interaction: {
          intersect: false,
          mode: "index",
        },
        scales: {
          y: {
            display: false,
            beginAtZero: true,
          },
          x: {
            display: false,
          },
        },
        elements: {
          line: {
            tension: 0.4,
          },
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [])

  return (
    <div className="flex gap-4">
      <div className="flex-1" style={{ height: "150px" }}>
        <canvas ref={chartRef}></canvas>
      </div>

      {/* Calendar Widget */}
      <div className="hidden lg:block w-48 bg-white rounded-lg p-4">
        <div className="grid grid-cols-7 gap-1 text-xs text-center">
          {/* Calendar header */}
          {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
            <div key={i} className="font-medium text-gray-400">
              {day}
            </div>
          ))}

          {/* Calendar days */}
          {Array.from({ length: 31 }, (_, i) => (
            <div
              key={i}
              className={`p-1 ${
                i + 1 === 15
                  ? "bg-blue-900 text-white rounded"
                  : i + 1 === 25
                    ? "bg-orange-400 text-white rounded"
                    : "text-gray-600"
              }`}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AreaChart

