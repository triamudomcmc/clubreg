import moment from "moment"

// change this

export const openTime = 1623043800000
export const editDataTime = 1623690000000
export const announceTime = 1623717000000
export const endRegClubTime = 1623690000000
export const breakUpperBound = 1623889800000
export const breakLowerBound = 1623884400000
export const positionUpdateTime = 1623884400000
export const lastround = 1623949200000
export const endLastRound = 1624035600000

export const getUNIXTimeStamp = () => {
  return moment().unix() * 1000
}

export const getPrevMonday = (offset = 0) => {
  const utcOffset = moment().utcOffset()
  let prevMonday = new Date(moment().unix() * 1000 + (7 * 60 * 60 * 1000 - utcOffset * 60 * 1000) - offset)

  prevMonday.setDate(prevMonday.getDate() - ((prevMonday.getDay() + 6) % 7))
  const timePart =
    prevMonday.getHours() * 60 * 60 * 1000 +
    prevMonday.getMinutes() * 60 * 1000 +
    prevMonday.getSeconds() * 1000 +
    prevMonday.getMilliseconds()
  return prevMonday.getTime() - timePart - (7 * 60 + prevMonday.getTimezoneOffset()) * 60 * 1000
}

export const getRecentMondays = () => {
  const lowest = 1624208400000
  let prev = getPrevMonday(),
    round = 1
  let arr = [prev]

  while (prev > lowest) {
    prev = getPrevMonday(round * (7 * 24 * 60 * 60 * 1000))
    arr.push(prev)
    round++
  }

  return arr
}
