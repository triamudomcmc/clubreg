import { useEffect, useState } from "react"

export const addZero = (inum) => {
  let num = inum

  if (inum < 0) {
    num = 0
  }

  return `0${num}`.slice(-2)
}

export function convertMiliseconds(miliseconds) {
  const totalSeconds = Math.floor(miliseconds / 1000)
  const totalMinutes = Math.floor(totalSeconds / 60)
  const totalHours = Math.floor(totalMinutes / 60)
  const days = Math.floor(totalHours / 24).toFixed(0)

  const seconds = (totalSeconds % 60).toFixed(0)
  const minutes = (totalMinutes % 60).toFixed(0)
  const hours = (totalHours % 24).toFixed(0)

  return { d: days, h: hours, m: minutes, s: seconds }
}

export interface Timer {
  day: string
  hour: string
  min: string
  sec: string
}

export const useTimer = (countTo): Timer => {
  const [timer, setTime] = useState({})

  useEffect(() => {
    setInterval(() => {
      const ts = countTo - new Date().getTime()
      const t = convertMiliseconds(ts)
      setTime({
        [countTo]: {
          day: addZero(t.d),
          hour: addZero(t.h),
          min: addZero(t.m),
          sec: addZero(t.s)
        }
      })
    }, 1000)
  }, [])

  return timer[countTo] || { day: "00", hour: "00", min: "00", sec: "00" }
}
