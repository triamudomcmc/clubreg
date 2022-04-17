import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import classnames from "classnames"
import css from "@components/panel/element/bubble.module.css"
import { ExclamationCircleIcon } from "@heroicons/react/solid"

export const ToolTip = ({ text, tooltip }) => {
  return (
    <div className="relative h-5 w-14">
      <div className="absolute z-30 h-5 w-14 opacity-0 hover:opacity-100">
        <div className="absolute -top-9 left-[-8.13rem]">
          <div className={classnames("rounded-md bg-white p-2 text-xs text-black shadow-md", css.tooltip2)}>
            <h1 className="text-center">{tooltip}</h1>
          </div>
        </div>
        <h1>{text}</h1>
      </div>
      <h1>{text}</h1>
    </div>
  )
}
