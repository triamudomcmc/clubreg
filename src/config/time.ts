import moment from "moment"
;("2022-05-03T11:30:00.000+07:00")
;("2022-05-03T00:00:00.000+07:00")

// export const startOldClubTest = +new Date("2022-05-03T11:30:00.000+07:00")
// export const endOldClubTest = +new Date("2022-05-05T00:00:00.000+07:00")

// all club data update start
export const editInitData = +new Date("2024-04-14T00:00:00.000+07:00")
// all club data update deadline
export const endEditInitData = +new Date("2024-04-28T00:00:00.000+07:00")

// initiate the dialogue before old club confirmation starts
export const beforeOldClub = +new Date("2024-05-02T00:00:00.000+07:00")
// starts old club confirmation
export const startOldClub = +new Date("2024-05-03T08:00:00.000+07:00")
// start counting down before old club confirmation
export const startOldClubCountdown = +new Date("2024-05-03T00:00:00.000+07:00")
// end old clun confirmation
export const endOldClub = +new Date("2024-05-04T00:00:00.000+07:00")

// export const startOldClub = +new Date("2023-05-05T11:30:00.000+07:00")
// export const startOldClubCountdown = +new Date("2023-05-05T10:30:00.000+07:00")
// export const endOldClub = +new Date("2023-05-07T00:00:00.000+07:00")


// start register time countdown (usually, this will be updated before PAE) *optional
export const openRegisterTime = +new Date("2024-05-08T12:00:00.000+07:00")
// registration open time
export const openTime = +new Date("2024-05-17T11:00:00.000+07:00")
// end of data editing time for updating positions and audition result.
export const editDataTime = +new Date("2024-05-25T07:00:00.000+07:00")
// registration close 1st round.
export const endRegClubTime = +new Date("2024-05-25T00:00:00.000+07:00")
// announce audition result. (user can select either to accept or reject)
export const announceTime = +new Date("2024-05-27T07:30:00.000+07:00")
// end announce time. Dicisions are no longer accepted
export const endAnnounceTime = +new Date("2024-05-28T00:00:00.000+07:00")
/*
Maintainance Break
(usually, 00.00 - 08.00)

- auto reject
- fill reserved position
- update status (pass, fail)
*/

// announce first round audition result. (user can select either to accept or reject)
export const firstRoundTime = +new Date("2024-05-28T07:30:00.000+07:00")
// end announce time. Dicisions are no longer accepted
export const endFirstRoundTime = +new Date("2024-05-29T00:00:00.000+07:00")
// announce second round audition result. (user can select either to accept or reject)
export const secondRoundTime = +new Date("2024-05-29T07:30:00.000+07:00")
// end announce time. Dicisions are no longer accepted
export const endSecondRoundTime = +new Date("2024-05-30T00:00:00.000+07:00")

// position update time (club admin might be able to update the position after exceeded editDataTime)
export const positionUpdateTime = editDataTime


export const lastround = +new Date("2024-05-30T07:30:00.000+07:00")
export const endLastRound = +new Date("2024-05-31T00:00:00.000+07:00")

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

// export const EXCEPT = ["ก30903-3_1", "ก30903-3_2", "ก30905-2_1","ก30905-2_2","ก30905-2_6","ก30905-2_7","ก30905-2_9","ก30915_1","ก30915_2","ก30915_4","ก30902","ก30921_1","ก30921_1","ก30952-2","ก30902"]

export const EXCEPT = []

export const THAI_MONTH = Object.values({
  1: "มกราคม",
  2: "กุมภาพันธ์",
  3: "มีนาคม",
  4: "เมษายน",
  5: "พฤษภาคม",
  6: "มิถุนายน",
  7: "กรกฎาคม",
  8: "สิงหาคม",
  9: "กันยายน",
  10: "ตุลาคม",
  11: "พฤศจิกายน",
  12: "ธันวาคม",
})