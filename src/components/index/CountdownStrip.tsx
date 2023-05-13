import type { Timer } from "@utilities/timers"
import type { FC } from "react"
import React from "react"

interface CountdownStripProps {
  timer: Timer
}
export const CountdownStrip: FC<CountdownStripProps> = (props) => {
  const { timer } = props

  return (
    <>
      <div className="flex flex-col items-center">
        <span className="h-[52px] w-[56px] rounded-lg bg-white p-2 text-center text-3xl font-bold shadow-md">
          {timer.day}
        </span>
        <span className="mt-2 text-xs font-bold text-white">DAY</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="h-[52px] w-[56px] rounded-lg bg-white p-2 text-center text-3xl font-bold shadow-md">
          {timer.hour}
        </span>
        <span className="mt-2 text-xs font-bold text-white">HOUR</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="h-[52px] w-[56px] rounded-lg bg-white p-2 text-center text-3xl font-bold shadow-md">
          {timer.min}
        </span>
        <span className="mt-2 text-xs font-bold text-white">MIN</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="h-[52px] w-[56px] rounded-lg bg-white p-2 text-center text-3xl font-bold shadow-md">
          {timer.sec}
        </span>
        <span className="mt-2 text-xs font-bold text-white">SEC</span>
      </div>
    </>
  )
}
