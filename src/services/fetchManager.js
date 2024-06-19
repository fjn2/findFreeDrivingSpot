const { getTimeSlot } = require("../api/timeSlots")
const { parseResponse } = require("../utils/parseResponse")

const AMOUNT_OF_RESULTS = 30

const STATUS = {
  RUNNING: 'running',
  STOP: 'stop'
}

function SlotsManager(locationIds = [], amountOfParallelsOperations = 1) {
  let status = STATUS.STOP
  let earliestTimeSlots = []
  let currentLocationIndex = 0
  
  if (locationIds.length === 0) {
    throw new Error('At least one locationId has to be provided')
  }

  this.start = () => {
    status = STATUS.RUNNING
    for (var i = 0; i < amountOfParallelsOperations; i++) lifeCycle(i + 1);
  }

  this.stop = () => {
    status = STATUS.STOP
  }

  function getLocationId() {
    const locId = locationIds[currentLocationIndex] 
    currentLocationIndex ++
    if (currentLocationIndex > locationIds.length - 1) {
      console.log('Moving the index to 0')
      currentLocationIndex = 0
      process.exit(0)
    }
    return locId
  }

  function evaluateResults(slots) {
    // Keep in mind that results might be duplicated after the first round of evaluations
    // TODO check if the slot was not already added.
    const allTimeSlots = [...earliestTimeSlots, ...slots]
    allTimeSlots.sort((a,b) => new Date(a.date) - new Date(b.date) > 0 ? 1 : -1)
    earliestTimeSlots = allTimeSlots.slice(0, AMOUNT_OF_RESULTS)
    
    let newSlotWasAdded = false
    slots.forEach((slot) => {
      if (earliestTimeSlots.includes(slot)) {
        newSlotWasAdded = true
      }
    })
    if (newSlotWasAdded) {
      console.log('New time slot found')
      console.log(earliestTimeSlots)
    }
  }

  function lifeCycle(workerId) {
    if (status === STATUS.RUNNING) {
      const locationId = getLocationId()
      console.log(`Worker ${workerId}: Executing locationId ${locationId} (${currentLocationIndex}/${locationIds.length})`)
      const executeNextOperation = () => {
        setTimeout(() => {
          lifeCycle(workerId)
        }, 10000)
      }
      getTimeSlot(locationId).then(parseResponse).then(evaluateResults).then(executeNextOperation)
    }
  }

  this. getEarliestTimeSlots = () => {
    return earliestTimeSlots
  }
  
  return this
}

module.exports = {
  SlotsManager
}