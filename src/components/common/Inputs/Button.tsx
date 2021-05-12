import {motion} from "framer-motion"
import {ReactNode} from "react";
import Link from "next/link"
import Router from "next/router";
import classnames from "classnames"

interface props {
  children: ReactNode,
  className?: string,
  type?: "submit" | "reset" | "button",
  href?: string,
  onClick?: () => void | null
}

const defaultAttributes = "appearance-none focus:outline-none"

export const Button = ({children, className = "", type = "button", href = "", onClick = null}: props) => {

  return (
    onClick === null && type === "button" ? <Link href={href}>
      <motion.button type={type} className={classnames(className,defaultAttributes)} whileHover={{scale: 1.05}}>
        {children}
      </motion.button>
    </Link>: href == "" ? <motion.button onClick={onClick} type={type} className={classnames(className,defaultAttributes)} whileHover={{scale: 1.05}}>
      {children}
    </motion.button> : <motion.button onClick={() => {onClick();Router.push(href)}} type={type} className={classnames(className,defaultAttributes)} whileHover={{scale: 1.05}}>
      {children}
    </motion.button>
  )
}