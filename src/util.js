export function toUTCValue(current) {
  const dateTime = new Date(current)
  const year = dateTime.getFullYear()
  const month = dateTime.getMonth()
  const date = dateTime.getDate()
  const hours = dateTime.getHours()
  const minutes = dateTime.getMinutes()
  const seconds = dateTime.getSeconds()
  return Date.UTC(year, month, date, hours, minutes, seconds)
}
