import {motion} from "framer-motion";
import Toggle from "@components/index/FAQ/Toggle";
import React, {useEffect, useRef, useState} from "react";
import {ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/solid";
import FAQElement from "@components/index/FAQ/Element";
import classnames from "classnames";

export const DropDown = ({title, item}) => {

  const [reveal, setReveal] = useState(false)
  const [display, setDisplay] = useState(false)

  const [revealed, setRevealed] = useState(false)

  const container = useRef(null)

  const slide = {
    open: {
      y: 0,
      clipPath: "inset(0% -3% -8% -3%)",
      transition: {
        type: "spring",
        stiffness: 30,
        restDelta: 2
      }
    },
    closed: {
      y:"-100%",
      clipPath: "inset(100% -3% -8% -3%)",
      transition: {
        type: "spring",
        stiffness: 30,
        restDelta: 2
      }
    }
  };

  useEffect(() => {
      if (reveal) {
        setDisplay(true)
      }
    }
    , [reveal])

  const rotate = {
    up: {
      rotate: 180
    },
    down: {
      rotate: 0
    }
  }

  return (
    <motion.div layout="position">
      <div className="relative border-b bg-white border-gray-300 py-4 z-20">
        <motion.div animate={reveal ? "open" : "closed"} className="flex flex-row justify-between text-TUCMC-gray-800">
          <span className="text-lg pr-4">{title}</span>
          <motion.div className="cursor-pointer" variants={rotate} animate={reveal ? "up" : "down"} whileTap={reveal ? "up" : "down"} whileHover={{x: [1,-1,1,-1,0]}} onClick={() => {setReveal(!reveal)}}>
            <ChevronDownIcon className="w-6 h-6"/>
          </motion.div>
        </motion.div>
      </div>
      {<motion.div
          initial="closed"
          className={classnames("relative pb-5 z-0", !display && "hidden")}
          animate={reveal ? "open" : "closed"}
          variants={slide}
          onAnimationComplete={() => {
            setDisplay(reveal)
            reveal ? setRevealed(true) : setRevealed(false)
          }}
      >
          <div ref={container} className="space-y-4 mt-4">
            {
              Object.keys(item.data).map(e => {
                return <FAQElement title={e} revealed={revealed}>
                  <FAQElement.Answer>
                    {item.data[e]}
                  </FAQElement.Answer>
                </FAQElement>
              })
            }
          </div>
      </motion.div>}
    </motion.div>
  )
}