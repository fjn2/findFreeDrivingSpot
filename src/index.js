require('dotenv').config()
const { SlotsManager } = require("./services/fetchManager");
const locationsData = require('../assets/locationsData.json');
const { extractsLocationIds } = require("./utils/extractsLocationIds");

const EXECUTION_TIME_HOURS = 24

function main() {
  console.log('Initializing...')
  const locationIds = extractsLocationIds(locationsData)
  // randomize sorting
  locationIds.sort(() => Math.random() > 0.5 ? 1 : -1)
  console.log(`Found ${locationIds.length} locations`)
  const slotManager = new SlotsManager(locationIds, 1)

  slotManager.start()


  setTimeout(() => {
    console.log('Stopping the executor...')
    slotManager.stop()
    console.log(slotManager.getEarliestTimeSlots())
  }, EXECUTION_TIME_HOURS * 60 * 60 * 1000)
}

main()