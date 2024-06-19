function extractsLocationIds(locationsData) {
  return locationsData.map(item => item.location.id)
}

module.exports = {
  extractsLocationIds
}