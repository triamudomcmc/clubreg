import { Button } from "@components/common/Inputs/Button"
import IndexBottom from "@vectors/decorations/IndexBottom"
import React from "react"
import { useAuth } from "@client/auth"

const Clubs = () => {
  const { tracker } = useAuth()

  return (
    <div className="mx-8 pt-16 pb-24 md:mx-0 md:pt-0 md:pb-0">
      <div className="mx-auto flex max-w-md flex-col items-center rounded-3xl bg-TUCMC-pink-400 md:mx-0 md:max-w-none md:rounded-none">
        <div className="flex flex-col items-center md:flex md:w-full md:max-w-5xl md:flex-row md:items-start md:justify-between md:px-8">
          <div className="my-10 text-white md:mt-20 md:flex md:flex-col md:items-start">
            <h1 className="text-7xl font-bold tracking-tight md:text-8xl md:tracking-normal">ชมรม</h1>
            <h1 className="text-2xl font-medium opacity-0 md:ml-1 md:text-4xl">กว่า 80+ ชมรม</h1>
            <Button
              href="/clubs"
              onClick={() => {
                tracker.push("click", "index_clubs_button")
              }}
              className="ml-21 rounded-5xl mt-10 hidden bg-white px-11 py-4 font-medium text-black shadow-lg md:block"
            >
              <span className="text-2xl">ดูทั้งหมด</span>
            </Button>
          </div>
          <IndexBottom className="md:square-400px mb-16 mt-4 w-80" />
          <Button href="/clubs" className="rounded-5xl py-3_5 relative -bottom-6 bg-white px-10 shadow-lg md:hidden">
            <span className="cursor-pointer text-2xl">ดูทั้งหมด</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Clubs
