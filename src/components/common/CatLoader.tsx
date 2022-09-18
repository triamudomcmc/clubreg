import { motion } from "framer-motion"
import Image from "next/image"

export const CatLoader = () => {
  return (
    <div className="fixed top-0 left-0 flex min-h-screen w-full items-center justify-center">
      <motion.div
        key="cat"
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ type: "tween", duration: 0.15 }}
        className="flex flex-col items-center"
      >
        <Image priority={true} src="/assets/loaders/black_duck.gif" width={124} height={124} />
        <h1 className="font-semibold text-TUCMC-gray-800">Loading...</h1>
      </motion.div>
    </div>
  )
}
