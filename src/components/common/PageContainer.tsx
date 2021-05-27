import Navigation from "@components/common/Navigation";
import Footer from "@components/common/Footer";
import {AnimatePresence, motion} from "framer-motion";
import {useRouter} from "next/router";

const PageContainer = ({children, footer = true}) => {

  const router = useRouter()

  const variants = {
    initial: {y: -20, opacity: 0},
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  return (
    <div className="font-display">
      <Navigation/>
      <motion.div initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={variants}
                  key={router.pathname}>
        {children}
      </motion.div>
      {footer && <Footer/>}
    </div>
  )
}

export default PageContainer