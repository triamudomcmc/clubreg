import { Button } from "@components/common/Inputs/Button"
import { ExclamationIcon } from "@heroicons/react/solid"
import type { PageRenderingType } from "@interfaces/index/PageRenderingType"
import type { FC } from "react"
import React from "react"

interface DynamicButtonSetProps {
  type: PageRenderingType
  small?: boolean
}

export const DynamicButtonSet: FC<DynamicButtonSetProps> = (props) => {
  const { type, small = false } = props

  const smallButtonClass =
    "mb-4 rounded-full bg-white px-[4.5rem] py-3.5 text-2xl font-bold text-TUCMC-pink-600 shadow-lg"
  const bigButtonClass =
    "mb-4 rounded-full bg-white px-12 py-3 text-xl font-bold text-TUCMC-pink-600 shadow-lg lg:px-[4.5rem] lg:py-3.5 lg:text-2xl"
  const defaultButtonClass = small ? smallButtonClass : bigButtonClass

  switch (type) {
    case "no_login":
      return (
        <Button href="/auth" className={defaultButtonClass}>
          <span>เข้าสู่ระบบ</span>
        </Button>
      )
    case "club":
      return (
        <Button href="/card" className={defaultButtonClass}>
          <span>ดูชมรมของคุณ</span>
        </Button>
      )
    case "before_old_club":
      return (
        <div className="mb-6 flex items-center space-x-4 rounded-lg bg-white py-3 pl-4 pr-5 font-semibold text-gray-900 shadow-lg">
          <ExclamationIcon className="mt-1 h-10 w-10 text-yellow-500" />
          <div>
            <h1 className="text-left text-lg">
              ระบบจะเปิดให้ยืนยันสิทธิ์ชมรมเดิม
            </h1>
            <h1 className="font-medium text-TUCMC-gray-700">
              ในวันที่ 5 พฤษภาคม 2566 เวลา 11.30 น.
            </h1>
          </div>
        </div>
      )
    case "no_club":
      return (
        <Button href="/select" className={defaultButtonClass}>
          <span>เลือกชมรม</span>
        </Button>
      )

    case "old_club":
      return (
        <Button href="/confirm" className={defaultButtonClass}>
          <span>ยืนยันสิทธิ์ชมรมเดิม</span>
        </Button>
      )

    default:
      return <></>
  }
}
