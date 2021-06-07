import {motion} from "framer-motion"
import {ReactNode} from "react";
import Link from "next/link"
import Router, {useRouter} from "next/router";
import classnames from "classnames"
import {useAuth} from "@client/auth";

interface props {
  children: ReactNode,
  className?: string,
  type?: "submit" | "reset" | "button" | "div",
  href?: string,
  onClick?: () => void | null
}

const defaultAttributes = "cursor-pointer appearance-none focus:outline-none"

export const Button = ({children, className = "", type = "button", href = "", onClick = null}: props) => {

  const {tracker} = useAuth()
  const router = useRouter()

  const trackedClick = () => {
    tracker.push("click",`Button@${router.pathname}->${href}`)
    onClick && onClick()
  }

  return (
    type === "div" ? href == "" ?<motion.div onClick={trackedClick} className={classnames(className,defaultAttributes)} whileHover={{scale: 1.05}} whileTap={{scale: 0.95}}>
      {children}
    </motion.div>: <motion.div onClick={() => {trackedClick();Router.push(href)}} className={classnames(className,defaultAttributes)} whileHover={{scale: 1.05}} whileTap={{scale: 0.95}}>
      {children}
    </motion.div> : onClick === null && type === "button" ?
      <motion.button onClick={() => {trackedClick();Router.push(href)}} type={type} className={classnames(className,defaultAttributes)} whileHover={{scale: 1.05}} whileTap={{scale: 0.95}}>
        {children}
      </motion.button> : href == "" ? <motion.button onClick={trackedClick} type={type} className={classnames(className,defaultAttributes)} whileHover={{scale: 1.05}} whileTap={{scale: 0.95}}>
        {children}
      </motion.button> : <motion.button onClick={() => {trackedClick();Router.push(href)}} type={type} className={classnames(className,defaultAttributes)} whileHover={{scale: 1.05}} whileTap={{scale: 0.95}}>
        {children}
      </motion.button>
  )
}