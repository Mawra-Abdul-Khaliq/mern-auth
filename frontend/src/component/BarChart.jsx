"use client"

import { useEffect, useRef } from "react"
import Chart from "chart.js/auto"

const BarChart = () => {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
        datasets: [
          {
            label: "2020",
            data: [35, 42, 35, 20, 30, 40, 45, 25, 20],
            backgroundColor: "#1E3A8A",
            borderRadius: 0,
            barPercentage: 0.7,
            categoryPercentage: 0.8,
          },
          {
            label: "2019",
            data: [25, 32, 25, 30, 35, 25, 35, 35, 35],
            backgroundColor: "#FFA500",
            borderRadius: 0,
            barPercentage: 0.7,
            categoryPercentage: 0.8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "top",
            align: "start",
            labels: {
              boxWidth: 8,
              usePointStyle: true,
              pointStyle: "circle",
              padding: 20,
              color: "#64748b",
            },
          },
          tooltip: {
            backgroundColor: "#1E3A8A",
            titleColor: "#fff",
            bodyColor: "#fff",
            padding: 12,
            displayColors: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 50,
            ticks: {
              stepSize: 10,
              font: {
                size: 11,
              },
              color: "#64748b",
            },
            grid: {
              color: "rgba(0, 0, 0, 0.05)",
              drawBorder: false,
            },
            border: {
              display: false,
            },
          },
          x: {
            grid: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              font: {
                size: 11,
              },
              color: "#64748b",
            },
            border: {
              display: false,
            },
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
    <div className="relative">
      <div style={{ height: "240px" }}>
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  )
}

export default BarChart

