const MAX_DATE = new Date(process.env.MAX_DATE)

const parseResponse = (response) => {
  const resp = []
  response.data.bundles.forEach((bundle) => {
    bundle.occasions.forEach((occasion) => {
      resp.push({
        locationName: occasion.locationName,
        date: occasion.date,
        time: occasion.time
      })
    })
  })
  // remove the dates that are after my trip
  return resp.filter(item => new Date(item.date) < MAX_DATE)
}

module.exports = {
  parseResponse
}
