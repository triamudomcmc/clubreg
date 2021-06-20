export const openTime = 1623043800000
export const editDataTime = 1623690000000
export const announceTime = 1623717000000
export const endRegClubTime = 1623690000000
export const breakUpperBound = 1623889800000
export const breakLowerBound = 1623884400000
export const positionUpdateTime = 1623884400000
export const lastround = 1623949200000
export const endLastRound = 1624035600000


function calcTime(offset) {
  let d = new Date();
  let utc = d.getTime() + (d.getTimezoneOffset() * 60000);
  return new Date(utc + (3600000 * offset))
}

export const getPrevMonday = () => {
  let prevMonday = calcTime(7)
  const offset = prevMonday.getTimezoneOffset()

  prevMonday.setDate(prevMonday.getDate() - (prevMonday.getDay() + 6) % 7);
  const timePart = ((prevMonday.getHours()) * 60 * 60 * 1000) + ((prevMonday.getMinutes()) * 60 * 1000) + ((prevMonday.getSeconds()) * 1000) + prevMonday.getMilliseconds()
  return prevMonday.getTime() - timePart - ((7 * 60 + offset) * 60 * 1000)
}