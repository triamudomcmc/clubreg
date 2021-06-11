import { motion } from "framer-motion"
import Image from "next/image"

export const CatLoader = () => {
  return (
    <div className="fixed top-0 left-0 min-h-screen w-full flex justify-center items-center">
      <motion.div key="cat" exit={{scale: 0.5, opacity: 0}} transition={{type: "tween", duration: 0.15}} className="flex flex-col items-center space-y-4">
        <Image priority={true} src="/assets/loaders/cat.gif" width={85} height={69}/>
        <h1 className="animate-pulse text-TUCMC-gray-800 font-semibold">Loading...</h1>
      </motion.div>
    </div>
  )
}