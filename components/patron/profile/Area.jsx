import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

function groupDataByWeek(data) {
  const groupedData = {}
  data.forEach((item) => {
    const checkoutDate = new Date(item.checkoutDate)
    const weekNumber = checkoutDate.getWeek() // Assuming you have a function to get the week number
    if (!groupedData[weekNumber]) {
      groupedData[weekNumber] = 0
    }
    groupedData[weekNumber]++
  })
  return Object.keys(groupedData).map((week) => ({
    week: week,
    borrowings: groupedData[week],
  }))
}

// Function to get the week number
Date.prototype.getWeek = function () {
  const date = new Date(this.getTime())
  date.setHours(0, 0, 0, 0)
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7))
  const week1 = new Date(date.getFullYear(), 0, 4)
  return (
    1 +
    Math.round(((date - week1) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7)
  )
}

function AreaChartComponent(props) {
  const weeklyData = groupDataByWeek(props.data)

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={weeklyData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <XAxis dataKey="checkoutDate" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="checkoutDate"
          name="Checkout Date"
          fill="#8884d8"
          stroke="#8884d8"
        />
        <Area
          type="monotone"
          dataKey="dueDate"
          name="Due Date"
          fill="#82ca9d"
          stroke="#82ca9d"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default AreaChartComponent
