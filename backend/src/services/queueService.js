const calculateEstimatedWait = async (farmersAhead, activeCounters, avgProcessingTime = 6) => {
  if (!farmersAhead || !activeCounters) {
    return 0;
  }
  const estimatedWait = Math.ceil((farmersAhead * avgProcessingTime) / activeCounters);
  return estimatedWait;
};

const getQueuePosition = async (centreQueue, currentBookingId) => {
  const position = centreQueue.findIndex(q => q.booking_id === currentBookingId);
  return position >= 0 ? position + 1 : null;
};

const calculateCapacityUtilization = (booked, total) => {
  if (!total) return 0;
  return Math.round((booked / total) * 100);
};

module.exports = {
  calculateEstimatedWait,
  getQueuePosition,
  calculateCapacityUtilization
};
