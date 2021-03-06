import { motion } from "framer-motion"
import React, { useEffect, useRef, useState } from "react"
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid"
import FAQElement from "@components/index/FAQ/Element"
import classnames from "classnames"

export const DropDown = ({ title, item, triggerDep }) => {
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
        restDelta: 2,
      },
    },
    closed: {
      y: "-100%",
      clipPath: "inset(100% -3% -8% -3%)",
      transition: {
        type: "spring",
        stiffness: 30,
        restDelta: 2,
      },
    },
  }

  useEffect(() => {
    if (triggerDep) {
      setReveal(true)
    }
  }, [triggerDep])

  useEffect(() => {
    if (reveal) {
      setDisplay(true)
    }
  }, [reveal])

  const rotate = {
    up: {
      rotate: 180,
    },
    down: {
      rotate: 0,
    },
  }

  return (
    <motion.div layout="position">
      <div className="relative z-20 border-b border-gray-300 bg-white py-4">
        <motion.div animate={reveal ? "open" : "closed"} className="flex flex-row justify-between text-TUCMC-gray-800">
          <span className="pr-4 text-lg">{title}</span>
          <motion.div
            id="re"
            className="cursor-pointer"
            variants={rotate}
            animate={reveal ? "up" : "down"}
            whileTap={reveal ? "up" : "down"}
            whileHover={{ x: [1, -1, 1, -1, 0] }}
            onClick={() => {
              setReveal(!reveal)
            }}
          >
            <ChevronDownIcon className="h-6 w-6" />
          </motion.div>
        </motion.div>
      </div>
      {
        <motion.div
          initial="closed"
          className={classnames("relative z-0 pb-5", !display && "hidden")}
          animate={reveal ? "open" : "closed"}
          variants={slide}
          onAnimationComplete={() => {
            setDisplay(reveal)
            reveal ? setRevealed(true) : setRevealed(false)
          }}
        >
          <div ref={container} className="mt-4 space-y-4">
            {Object.keys(item.data).map((e) => {
              return (
                <FAQElement key={e} title={e} revealed={revealed}>
                  <FAQElement.Answer>{item.data[e]}</FAQElement.Answer>
                </FAQElement>
              )
            })}
          </div>
        </motion.div>
      }
    </motion.div>
  )
}
