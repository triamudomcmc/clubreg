import React, {useEffect, useState} from "react";
import Toggle from "@components/index/FAQ/Toggle";
import {motion} from "framer-motion";

const FAQ = ({children, title}) => {

  const [reveal, setReveal] = useState(false)
  const [display, setDisplay] = useState(false)
  const answer = React.Children.map(children, child =>
    child.type.displayName === 'Answer' ? child : null
  )

  useEffect(() => {
      if (reveal) {
        setDisplay(true)
      }
    }
    , [reveal])

  const sidebar = {
    open: (height = 1000) => ({
      y: 0,
      clipPath: "inset(0% -3% -8% -3%)",
      transition: {
        type: "spring",
        stiffness: 40,
        restDelta: 2
      }
    }),
    closed: {
      y:-155,
      clipPath: "inset(100% -3% -8% -3%)",
      transition: {
        type: "spring",
        stiffness: 40,
        restDelta: 2
      }
    }
  };

  return (
    <div>
      <div className="relative bg-white shadow-md rounded-lg px-6 py-6 z-20">
        <motion.div animate={reveal ? "open" : "closed"} className="flex flex-row justify-between">
          <span className="pr-4">{title}</span>
          <Toggle toggle={() => {
            setReveal(!reveal)
          }}/>
        </motion.div>
      </div>
      {display && <motion.div
          initial={{y: -155,clipPath: "inset(100% -3% -8% -3%)"}}
          className="relative bg-white shadow-md px-6 rounded-b-lg pb-5 z-0"
          animate={reveal ? "open" : "closed"}
          variants={sidebar}
          onAnimationComplete={() => {
            setDisplay(reveal)
          }}
      >
          <p className="pt-4 mr-12 text-TUCMC-gray-600">{answer}</p>
      </motion.div>}
    </div>
  )
}

const Answer = ({children}) => children
Answer.displayName = 'Answer'
FAQ.Answer = Answer

export default FAQ