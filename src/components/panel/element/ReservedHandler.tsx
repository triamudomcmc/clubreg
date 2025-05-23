import React from "react"
import { QuestionMarkCircleIcon } from "@heroicons/react/solid"
import classnames from "classnames"
import css from "@components/panel/element/bubble.module.css"

const ReservedHandler = ({ reserved, registered }) => {
  // console.log(registered)
  return (
    <div className="flex items-center justify-center space-x-2">
      <p>
        ({Object.keys(reserved).length} / {Math.floor(registered * 0.2)})
      </p>
      <div className="relative h-5 w-5">
        <div className="absolute z-30 h-5 w-5 opacity-0 hover:opacity-100">
          <div className="absolute -top-14 left-[-5.5rem]">
            <div
              className={classnames("w-[200px] rounded-md bg-white p-2 text-xs text-black shadow-md", css.tooltip2)}
            >
                <div className="text-center">
                <p>{`โปรดใส่จำนวนสำรองอย่างน้อย ${Math.floor(registered * 0.2)} คน`}</p>
                <p>(20% ของจำนวนสมาชิกที่จะรับใหม่)</p>
                </div>
            </div>
          </div>
          <QuestionMarkCircleIcon className="h-5 w-5 text-TUCMC-gray-600" />
        </div>
        <QuestionMarkCircleIcon className="absolute z-[29] h-5 w-5 text-TUCMC-gray-600" />
      </div>
    </div>
  )
}

export default ReservedHandler
