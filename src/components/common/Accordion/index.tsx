import { Children, FC, ReactElement, useEffect } from "react"
import { ChevronUpIcon } from "@heroicons/react/outline"
import { motion, Variants } from "framer-motion"
import { useState } from "react"
import Toggle from "@components/index/FAQ/Toggle"
import { AccordionIcon, TAccordionIcon } from "./Icons"

const DURATION = 0.4

const DivVariants: Variants = {
  hidden: {
    height: 0,
    paddingTop: 0,
    paddingBottom: 0,
    overflow: "hidden",
    transition: { duration: DURATION, type: "tween" },
  },
  active: {
    overflow: "auto",
    transition: { duration: DURATION, type: "tween" },
  },
}

export const Accordion: FC<{ defaultExpanded?: boolean; title: string; id?: string; Icon?: TAccordionIcon }> & {
  Answer: FC
  NestedAnswer: FC
} = ({ defaultExpanded, children, title, id, Icon = AccordionIcon.Chevron }) => {
  const [expanded, setExpand] = useState(defaultExpanded ?? false)

  return (
    <div className="mb-2 w-full rounded-lg bg-white" id={id ? `${id}-parent` : null}>
      <button
        aria-expanded={expanded}
        aria-controls={id ? `${id}-panel` : id}
        onClick={(e) => {
          e.preventDefault()
          setExpand((e) => !e)
        }}
        id={id ? `${id}-header` : null}
        className="mb-1 flex w-full items-start justify-between rounded-lg bg-white px-8 py-6 shadow-md"
      >
        <p className="mr-3 text-left" id={id}>
          {title}
        </p>
        <Icon expanded={expanded} />
      </button>
      <motion.div
        role="region"
        id={id ? `${id}-panel` : null}
        aria-labelledby={id ? `${id}-header` : null}
        animate={expanded ? "active" : "hidden"}
        variants={DivVariants}
        className="rounded-lg rounded-t-none bg-white shadow-md"
      >
        {children}
      </motion.div>
    </div>
  )
}

const Answer: FC = ({ children }) => (
  <div className="px-8 py-4 text-TUCMC-gray-600" dangerouslySetInnerHTML={{ __html: String(children) }}></div>
)
Answer.displayName = "Answer"
Accordion.Answer = Answer

const NestedAnswer: FC = ({ children }) => <div className="">{children}</div>
Answer.displayName = "NestedAnswer"
Accordion.NestedAnswer = NestedAnswer
