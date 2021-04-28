import {motion} from "framer-motion"
import {ReactNode} from "react";
import Link from "next/link"

interface props {
  children: ReactNode,
  className?: string,
  type?: "submit" | "reset" | "button",
  href?: string,
  onClick?: () => void | null
}

export const Button = ({children, className = "", type = "button", href = "", onClick = null}: props) => {
  return (
    onClick === null && type === "button" ? <Link href={href}>
      <motion.button type={type} className={className} whileHover={{scale: 1.05}}>
        {children}
      </motion.button>
    </Link>: <motion.button onClick={onClick} type={type} className={className} whileHover={{scale: 1.05}}>
      {children}
    </motion.button>
  )
}