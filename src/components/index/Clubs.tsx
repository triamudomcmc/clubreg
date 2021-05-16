import {Button} from "@components/common/Inputs/Button";
import IndexBottom from "@vectors/decorations/IndexBottom";
import Link from "next/link";
import React from "react";
import {useAuth} from "@client/auth";

const Clubs = () => {

  const {tracker} = useAuth()

  return (
    <div className="mx-8 pt-16 pb-24 md:mx-0 md:pt-0 md:pb-0">
      <div
        className="flex flex-col items-center rounded-3xl mx-auto max-w-md md:mx-0 md:max-w-none md:rounded-none bg-TUCMC-pink-400">
        <div
          className="flex flex-col items-center md:flex-row md:w-full md:max-w-5xl md:flex md:items-start md:justify-between md:px-8">
          <div className="md:flex md:flex-col md:items-start text-white my-10 md:mt-20">
            <h1
              className="font-bold tracking-tight text-7xl md:tracking-normal md:text-8xl">ชมรม</h1>
            <h1 className="font-medium text-2xl md:text-4xl md:ml-1">กว่า 80+ ชมรม</h1>
            <Button href="/clubs" onClick={() => {tracker.push("click", "index_clubs_button")}} className="hidden md:block mt-10 text-black font-medium ml-21 shadow-lg bg-white rounded-5xl px-11 py-4">
              <span className="text-2xl">ดูทั้งหมด</span>
            </Button>
          </div>
          <IndexBottom className="w-80 md:square-400px mb-16 mt-4"/>
          <div
            className="md:hidden relative -bottom-6 shadow-lg bg-white rounded-5xl px-10 py-3_5">
            <Link href="/clubs">
              <span className="cursor-pointer text-2xl">ดูทั้งหมด</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Clubs