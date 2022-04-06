import moment from "moment"

export const openTime = 1623043800000
export const editDataTime = 1623690000000
export const announceTime = 1623717000000
export const endRegClubTime = 1623690000000
export const breakUpperBound = 1623889800000
export const breakLowerBound = 1623884400000
export const positionUpdateTime = 1623884400000
export const lastround = 1623949200000
export const endLastRound = 1624035600000

// change this

const _openTime = +new Date(2022, 5 - 1, 17, 11, 30, 0)
const _editDataTime = +new Date(2022, 5 - 1, 24, 23, 59, 59)
const _announceTime = +new Date(2022, 5 - 1, 25, 7, 30, 0)
const _endRegClubTime = +new Date(2022, 5 - 1, 14, 9, 0, 0)
const _breakUpperBound = +new Date(2022, 5 - 1, 14, 9, 0, 0)
const _breakLowerBound = +new Date(2022, 5 - 1, 14, 9, 0, 0)
const _positionUpdateTime = +new Date(2022, 5 - 1, 14, 9, 0, 0)
const _lastround = +new Date(2022, 5 - 1, 14, 9, 0, 0)
const _endLastRound = +new Date(2022, 5 - 1, 14, 9, 0, 0)

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
