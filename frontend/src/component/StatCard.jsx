const StatCard = ({ title, value, icon, color, textColor }) => {
    return (
      <div className={`${color} ${textColor} rounded-lg shadow p-4`}>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm opacity-80">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
          </div>
          <div className="text-2xl">{icon}</div>
        </div>
      </div>
    )
  }
  
  export default StatCard
  
  