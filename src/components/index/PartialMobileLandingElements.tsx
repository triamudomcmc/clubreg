import { CountdownStrip } from "@components/index/CountdownStrip"
import { DynamicButtonSet } from "@components/index/DynamicButtonSet"
import type { StateAwareComponentProps } from "@components/index/sharedProps"
import { endOldClub, openTime } from "@config/time"
import { InformationCircleIcon } from "@heroicons/react/solid"
import type { FC } from "react"
import React, { useState } from "react"

export const PartialMobileLandingElements: FC<StateAwareComponentProps> = (
  props
) => {
  const { timer, pageRenderingType } = props

  const [button] = useState(
    new Date().getTime() >= openTime || new Date().getTime() < endOldClub
  )

  return (
    <>
      {!button && (
        <div className="relative -top-6 flex flex-row justify-center space-x-2 text-TUCMC-gray-900 md:hidden">
          <CountdownStrip timer={timer} />
        </div>
      )}
      {button && (
        <div className="relative -top-7 flex flex-row justify-center md:hidden">
          <DynamicButtonSet type={pageRenderingType} small={true} />
        </div>
      )}
      <div className="mx-8 mt-6 mb-14 md:hidden">
        <div className="flex flex-row space-x-4 rounded-lg bg-TUCMC-pink-100 p-4 text-TUCMC-pink-500">
          <InformationCircleIcon className="h-6 w-6" />
          <div className="font-medium">
            <p>ระบบจะเปิดให้ลงทะเบียนชมรม</p>
            <p>ในวันที่ 22 พ.ค. 2566 เวลา 12.00 น.</p>
          </div>
        </div>
      </div>
    </>
  )
}
