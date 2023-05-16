import { useAuth } from "@client/auth"
import Footer from "@components/common/Footer"
import Navigation from "@components/common/Navigation"
import classnames from "classnames"
import { motion } from "framer-motion"
import { useRouter } from "next/router"
import type { FC } from "react"

const animationVariantsGenerator = (isInit: boolean) => {
  return {
    initial: !isInit ? { y: -20, opacity: 0 } : {},
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  }
}

interface PageContainerProps {
  footer?: boolean
  hide?: boolean
}

const PageContainer: FC<PageContainerProps> = (props) => {
  const { children, footer = true, hide = false } = props
  const router = useRouter()
  const { isInit } = useAuth()

  return (
    <div className="font-display">
      <div className={classnames(hide && "hidden")}>
        <Navigation />
      </div>
      <motion.div
        initial="initial"
        animate="animate"
        className="min-h-screen"
        variants={animationVariantsGenerator(isInit)}
        key={router.pathname}
      >
        {children}
      </motion.div>
      {/* Conditional rendering footer */}
      {footer && (
        <motion.div layout="position" className={classnames(hide && "hidden")}>
          <Footer />
        </motion.div>
      )}
    </div>
  )
}

export default PageContainer
