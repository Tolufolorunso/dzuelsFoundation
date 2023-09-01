export const getOverDue = (data) => {
  console.log('hello')
  console.log(data)
  const currentDate = new Date()
  const overdueItems = data?.filter(
    (item) => new Date(item.dueDate) < currentDate
  )
  return overdueItems
}
