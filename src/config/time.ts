import moment from "moment"
;("2022-05-03T11:30:00.000+07:00")
;("2022-05-03T00:00:00.000+07:00")

// export const startOldClubTest = +new Date("2022-05-03T11:30:00.000+07:00")
// export const endOldClubTest = +new Date("2022-05-05T00:00:00.000+07:00")

export const schoolYear = +new Date("2025")
// all club data update start
export const editInitData = +new Date("2025-04-07T00:00:00.000+07:00")
// all club data update deadline
export const endEditInitData = +new Date("2025-04-18T23:59:00.000+07:00")

// initiate the dialogue before old club confirmation starts
export const beforeOldClub = +new Date("2025-05-02T00:00:00.000+07:00")
// starts old club confirmation
export const startOldClub = +new Date("2025-05-06T08:00:00.000+07:00")
// start counting down before old club confirmation
export const startOldClubCountdown = +new Date("2025-05-06T00:00:00.000+07:00")
// end old club confirmation
export const endOldClub = +new Date("2025-05-06T20:00:00.000+07:00")

// export const startOldClub = +new Date("2023-05-05T11:30:00.000+07:00")
// export const startOldClubCountdown = +new Date("2023-05-05T10:30:00.000+07:00")
// export const endOldClub = +new Date("2023-05-07T00:00:00.000+07:00")

// start register time countdown (usually, this will be updated before PAE) *optional
export const openRegisterTime = +new Date("2025-05-14T14:00:00.000+07:00")
// registration open time
export const openTime = +new Date("2025-05-16T12:00:00.000+07:00")
// start audition time *optional
export const auditionTime = +new Date("2025-05-19T08:00:00.000+07:00")
// end audition time
export const endAuditionTime = +new Date("2025-05-23T20:00:00.000+07:00")
// end of data editing time for updating positions and audition result.
// ! Spare time for a day for checking and validation process. 
export const editDataTime = +new Date("2025-05-25T23:59:00.000+07:00")
// registration close 1st round.
export const endRegClubTime = +new Date("2025-05-21T23:59:00.000+07:00")
// announce audition result. (user can select either to accept or reject)
export const announceTime = +new Date("2025-05-26T07:30:00.000+07:00")
// end announce time. Dicisions are no longer accepted
export const endAnnounceTime = +new Date("2025-05-26T23:59:00.000+07:00")
/*
Checking Process (Day by Day)
(usually, 00.00 - 08.00)

- auto reject
- fill reserved position
- update status (pass, fail)
*/

// announce first round audition result. (user can select either to accept or reject)
export const firstRoundTime = +new Date("2025-05-27T07:30:00.000+07:00")
// end announce time. Dicisions are no longer accepted
// ! Recommend to close confirmation time before 20:00 for our supervision.
export const endFirstRoundTime = +new Date("2025-05-27T23:59:00.000+07:00")
// announce second round audition result. (user can select either to accept or reject)
export const secondRoundTime = +new Date("2025-05-28T07:30:00.000+07:00")
// end announce time. Dicisions are no longer accepted
// ! Recommend to close confirmation time before 20:00 for our supervision.
export const endSecondRoundTime = +new Date("2025-05-28T23:59:00.000+07:00")

// position update time (club admin might be able to update the position after exceeded editDataTime)
export const positionUpdateTime = editDataTime

export const lastround = +new Date("2025-05-29T07:30:00.000+07:00")
export const endLastRound = +new Date("2025-05-29T23:59:59.000+07:00")
export const firstClubPeroid = +new Date("2025-06-09")

// attendance period
export const startAttendance = +new Date("2025-06-09T00:00:00.000+07:00")
export const endAttendance = +new Date("2025-09-08T23:59:59.000+07:00")

// evaluation period)
export const startEval = +new Date("2025-09-17T00:00:00.000+07:00")
export const endEval = +new Date("2025-09-26T20:00:00.000+07:00")

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
  const lowest = startAttendance
  const highest = endAttendance
  let prev = getPrevMonday(),
    round = 1;
  let arr = [];

  const ignored = new Set([
    new Date("2025-07-21T00:00:00.000+07:00").getTime(),
    new Date("2025-07-28T00:00:00.000+07:00").getTime(),
    new Date("2025-08-11T00:00:00.000+07:00").getTime(),
  ]);

  while (prev >= lowest) {
    if (prev <= highest && !ignored.has(prev)) {
      arr.push(prev);
    }
    prev = getPrevMonday(round * (7 * 24 * 60 * 60 * 1000));
    round++;
  }

  return arr;
};


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

export const THAI_MONTH_INITIALS = Object.values({
  1: "ม.ค.",
  2: "ก.พ.",
  3: "มี.ค.",
  4: "เม.ย.",
  5: "พ.ค.",
  6: "มิ.ย.",
  7: "ก.ค.",
  8: "ส.ค.",
  9: "ก.ย.",
  10: "ต.ค.",
  11: "พ.ย.",
  12: "ธ.ค.",
})

export const getFullDate = (date, showTime = true) => {
  return `${new Date(date).getDate()} ${THAI_MONTH_INITIALS[new Date(date).getMonth()]} ${
    new Date(date).getFullYear() + 543
  }${
    showTime ?
    " เวลา " +
      `${new Date(date).getHours().toString().padStart(2, "0")}` +
      "." +
      `${new Date(date).getMinutes().toString().padStart(2, "0")}` +
      " น.":""
  }`
}


export const setGMT = (_date: string) => {
  if (process.env.VERCEL_ENV !== "production") return _date
  const [date, time] = _date.split(" เวลา ")

  const [day, month, year] = date.split(" ")
  const [hours, minutes] = time.split(".").map(part => parseInt(part, 10))

  let newHours = (hours + 7) % 24
  let newDay = Number(day)

  const fmtDate = `${newDay.toString().padStart(2, "0")} ${month} ${year}`
  const fmtTime = `${newHours.toString().padStart(2, "0")}.${minutes.toString().padStart(2, '0')} น.`

  return `${fmtDate} เวลา ${fmtTime}`;
}
