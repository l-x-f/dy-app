const parse = query => {
  if (!query) return
  const queryList = query.split('&')
  const data = {}
  queryList.forEach(item => {
    const temp = item.split('=')
    data[temp[0]] = temp[1]
  })
  console.log(data)
  return data
}

export { parse }
