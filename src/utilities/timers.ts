import {useEffect, useState} from "react";

const addZero = (inum) => {
  let num = inum

  if (inum < 0) {
    num = 0
  }

  return ('0' + num).slice(-2)
}

export function convertMiliseconds(miliseconds) {
  let days, hours, minutes, seconds, total_hours, total_minutes, total_seconds;

  total_seconds = Math.floor(miliseconds / 1000);
  total_minutes = Math.floor(total_seconds / 60);
  total_hours = Math.floor(total_minutes / 60);
  days = Math.floor(total_hours / 24).toFixed(0);

  seconds = (total_seconds % 60).toFixed(0);
  minutes = (total_minutes % 60).toFixed(0);
  hours = (total_hours % 24).toFixed(0)

  return { d: days, h: hours, m: minutes, s: seconds }
}

export const useTimer = (countTo) => {
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
  },[])

  return timer[countTo] || {day: "00", hour: "00", min: "00", sec: "00"}
}