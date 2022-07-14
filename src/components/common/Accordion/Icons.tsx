import Toggle from "@components/index/FAQ/Toggle"
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline"
import { motion, Variants } from "framer-motion"
import { FC } from "react"

export type TAccordionIcon = FC<{ expanded: boolean }>

const DURATION = 0.2

const ArrowVariants: Variants = {
  hidden: {
    rotate: "0deg",
    transition: { duration: DURATION, type: "tween" },
  },
  active: {
    rotate: "180deg",
    transition: { duration: DURATION, type: "tween" },
  },
}

const Hamburger: TAccordionIcon = ({ expanded }) => {
  return (
    <motion.div animate={expanded ? "open" : "closed"}>
      <Toggle toggle={() => {}} />
    </motion.div>
  )
}

const Chevron: TAccordionIcon = ({ expanded }) => {
  return (
    <motion.span animate={expanded ? "active" : "hidden"} variants={ArrowVariants}>
      <ChevronDownIcon className="h-5 w-5" />
    </motion.span>
  )
}

export const AccordionIcon: { Hamburger: TAccordionIcon; Chevron: TAccordionIcon } = { Hamburger, Chevron }
