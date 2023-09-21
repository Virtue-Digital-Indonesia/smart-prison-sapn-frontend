export const getTimeZoneOffset = () => {
  let date = new Date()
  let timezoneOffsetInMinutes = date.getTimezoneOffset()

  return Math.abs(timezoneOffsetInMinutes / -60)
}
