import { FeatureBox } from "@components/index/Features/FeatureBox"
import React from "react"

const doubleLineContentFormatter = (line1: string, line2: string) => {
  return (
    <>
      <div className="md:hidden">
        <h1 className="text-6xl font-bold leading-10 tracking-tighter text-white">
          {line1}
        </h1>
        <h1 className="mt-3 align-text-bottom text-3xl font-normal leading-6 tracking-tight text-white">
          {line2}
        </h1>
      </div>
      <div className="hidden text-TUCMC-pink-400 md:block">
        <h1 className="text-6xl font-bold leading-10 tracking-tighter md:text-5xl">
          {line1}
        </h1>
        <h1 className="mt-3 whitespace-nowrap align-text-bottom text-3xl font-normal leading-6 tracking-tight md:text-2xl md:leading-3">
          {line2}
        </h1>
      </div>
    </>
  )
}

export const Features = () => {
  return (
    <div className="bg-TUCMC-gray-100 py-14">
      <div className="md:flex md:justify-center">
        <div className="mx-6 space-y-8 md:flex md:w-full md:max-w-6xl md:flex-col md:items-center xl:flex-row xl:items-center xl:space-y-0 xl:space-x-4">
          <div className="space-y-8 md:flex md:flex-row md:space-x-4 md:space-y-0">
            <FeatureBox
              url={"/TUCMC"}
              content={doubleLineContentFormatter("กช.", "คืออะไร ?")}
              image={"/assets/images/menu1.png"}
              smallImage={"/assets/images/menu1-2.png"}
            />
            <FeatureBox
              url={"/dummy"}
              content={"ลองใช้"}
              image={"/assets/images/menu2.png"}
            />
          </div>
          <div className="space-y-8 md:flex md:flex-row md:space-x-4 md:space-y-0">
            <FeatureBox
              url={"/clubs"}
              content={"ชมรม"}
              image={"/assets/images/menu3.png"}
              customClassName={"px-7 pb-4 pt-2"}
            />
            <FeatureBox
              url={"/FAQ"}
              content={"FAQ"}
              image={"/assets/images/menu4.png"}
              customClassName={"px-7 py-5"}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
