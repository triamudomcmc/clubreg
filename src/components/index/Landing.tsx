import { CountdownStrip } from "@components/index/CountdownStrip"
import { DynamicButtonSet } from "@components/index/DynamicButtonSet"
import type { StateAwareComponentProps } from "@components/index/sharedProps"
import { endOldClub, openTime } from "@config/time"
import IndexSplash from "@vectors/decorations/IndexSplash"
import type { FC } from "react"
import React, { useState } from "react"

export const Landing: FC<StateAwareComponentProps> = (props) => {
  const { timer, pageRenderingType } = props

  const [button] = useState(
    new Date().getTime() >= openTime || new Date().getTime() < endOldClub
  )

  return (
    <div className="flex justify-center">
      <div className="mx-8 flex flex-col items-center px-8 md:w-full md:max-w-6xl md:flex-row-reverse md:justify-between md:py-0 lg:py-20 xl:px-0">
        <IndexSplash className="md:square-450px md:h-420px mt-10 md:ml-12 md:mt-0 md:max-w-sm lg:max-w-none" />
        <div className="my-8 flex flex-col items-center py-0 md:h-full md:max-h-96 md:items-start md:justify-between md:py-5 lg:py-0">
          <div className="flex flex-col items-center px-1 md:mt-10 md:block lg:mt-2">
            <h1 className="whitespace-nowrap text-3xl font-bold tracking-tight text-white md:text-4xl md:tracking-normal lg:text-6xl">
              ระบบลงทะเบียนชมรม
            </h1>
            <h1 className="text-2xl font-normal tracking-normal text-white md:pt-2 md:text-3xl md:tracking-tight lg:pt-4 lg:text-5xl">
              โรงเรียนเตรียมอุดมศึกษา
            </h1>
            <p className="mt-2 tracking-tight text-white md:mt-2 md:text-xl lg:mt-4 lg:text-3xl">
              ปีการศึกษา 2566
            </p>
          </div>
          {!button && (
            <div className="hidden flex-row justify-center space-x-2 text-TUCMC-gray-900 md:flex">
              <CountdownStrip timer={timer} />
            </div>
          )}
          {button && (
            <div className="hidden h-full flex-col justify-end md:flex">
              <DynamicButtonSet type={pageRenderingType} />
            </div>
          )}
          <div className="hidden px-1 font-medium text-white md:block">
            <p>ระบบจะเปิดให้ลงทะเบียนชมรม</p>
            <p>ในวันที่ 22 พ.ค. 2566 เวลา 12.00 น.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
