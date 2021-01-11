export default ({ req, reqMask }) => {
  return {
    getWorkshopSchedule (data) {
      return reqMask('gz/cxcjjd', data)
    },
    updateWorkshopSchedule (data) {
      return reqMask('gz/xgcjjd', data)
    },
    getWorkshopScheduleHZJL (data) {
      return reqMask('gz/cxcchzjl', data)
    },
    getWorkshopScheduleHZMX (data) {
      return reqMask('gz/cxcchzmx', data)
    },
    delWorkshopScheduleHZ2 (data) {
      return reqMask('gz/sccchzmx', data)
    }
  }
}
