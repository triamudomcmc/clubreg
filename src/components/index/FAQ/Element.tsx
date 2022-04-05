import React, { useEffect, useState } from "react"
import Toggle from "@components/index/FAQ/Toggle"
import { motion } from "framer-motion"

const FAQElement = ({ children, title, revealed = true }) => {
  const [reveal, setReveal] = useState(false)
  const [display, setDisplay] = useState(false)
  const answer = React.Children.map(children, (child) => (child.type.displayName === "Answer" ? child : null))

  useEffect(() => {
    if (reveal) {
      setDisplay(true)
    }
  }, [reveal])

  const sidebar = {
    open: (height = 1000) => ({
      y: 0,
      clipPath: "inset(0% -3% -8% -3%)",
      transition: {
        type: "spring",
        stiffness: 50,
        restDelta: 2,
      },
    }),
    closed: {
      y: "-100%",
      clipPath: "inset(100% -3% -8% -3%)",
      transition: {
        type: "spring",
        stiffness: 50,
        restDelta: 2,
      },
    },
  }

  useEffect(() => {
    if (reveal) return

    setTimeout(() => {
      setDisplay(false)
    }, 450)
  }, [reveal])

  return (
    <motion.div layout={revealed ? "position" : false}>
      <div className="relative z-20 rounded-lg bg-white px-6 py-6 shadow-md">
        <motion.div animate={reveal ? "open" : "closed"} className="flex flex-row justify-between">
          <span className="pr-4">{title}</span>
          <Toggle
            toggle={() => {
              setReveal(!reveal)
            }}
          />
        </motion.div>
      </div>
      {display && (
        <motion.div
          initial="closed"
          className="relative z-0 rounded-b-lg bg-white px-6 pb-5 shadow-md"
          animate={reveal ? "open" : "closed"}
          variants={sidebar}
        >
          <p
            dangerouslySetInnerHTML={{ __html: answer[0].props.children }}
            className="mr-12 pt-4 text-TUCMC-gray-600"
          ></p>
        </motion.div>
      )}
    </motion.div>
  )
}

const Answer = ({ children }) => children
Answer.displayName = "Answer"
FAQElement.Answer = Answer

export default FAQElement
