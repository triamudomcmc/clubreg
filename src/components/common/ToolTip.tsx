import {AnimatePresence, motion} from "framer-motion";
import {useState} from "react";
import classnames from "classnames";
import css from "@components/panel/element/bubble.module.css";
import {ExclamationCircleIcon} from "@heroicons/react/solid";

export const ToolTip = ({text, tooltip}) => {

  return (
    <div className="relative w-14 h-5">
      <div className="absolute w-14 h-5 opacity-0 z-30 hover:opacity-100">
        <div className="absolute -top-9 left-[-8.13rem]">
          <div
            className={classnames("bg-white text-xs text-black shadow-md rounded-md p-2", css.tooltip2)}>
            <h1 className="text-center">{tooltip}</h1></div>
        </div>
        <h1>{text}</h1>
      </div>
      <h1>{text}</h1>
    </div>
  )
}