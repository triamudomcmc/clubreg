import moment from "moment"
;("2022-05-03T11:30:00.000+07:00")
;("2022-05-03T00:00:00.000+07:00")

export const startOldClubTest = +new Date("2022-05-03T11:30:00.000+07:00")
export const endOldClubTest = +new Date("2022-05-05T00:00:00.000+07:00")

export const startOldClub = +new Date("2022-05-05T11:30:00.000+07:00")
export const startOldClubCountdown = +new Date("2022-05-05T10:30:00.000+07:00")
export const endOldClub = +new Date("2022-05-07T00:00:00.000+07:00")

// export const startOldClub = +new Date("2022-05-05T01:11:00.000+07:00")
// export const startOldClubCountdown = +new Date("2022-05-05T01:10:00.000+07:00")
// export const endOldClub = +new Date("2022-05-05T01:13:00.000+07:00")

export const openTime = +new Date("2022-05-17T12:00:00.000+07:00")
export const editDataTime = +new Date("2022-05-25T06:30:00.000+07:00")
export const endRegClubTime = +new Date("2022-05-25T00:00:00.000+07:00")
export const announceTime = +new Date("2022-05-25T07:30:00.000+07:00") //
export const endAnnounceTime = +new Date("2022-05-26T00:00:00.000+07:00") //
export const firstRoundTime = +new Date("2022-05-26T07:30:00.000+07:00") //
export const endFirstRoundTime = +new Date("2022-05-27T00:00:00.000+07:00")
export const secondRoundTime = +new Date("2022-05-27T07:30:00.000+07:00")
export const endSecondRoundTime = +new Date("2022-05-28T00:00:00.000+07:00")
// rem
export const breakUpperBound = +new Date(2022, 5 - 1, 14, 9, 0, 0)
export const breakLowerBound = +new Date(2022, 5 - 1, 14, 9, 0, 0)
export const positionUpdateTime = editDataTime
// rem
export const lastround = +new Date("2022-05-28T12:00:00.000+07:00")
export const endLastRound = +new Date("2022-05-29T00:00:00.000+07:00")

export const editInitData = +new Date("2023-04-17T00:00:00.000+07:00")

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
