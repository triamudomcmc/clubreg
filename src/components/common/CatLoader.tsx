import { motion } from "framer-motion"
import Image from "next/image"

export const CatLoader = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="flex flex-col items-center space-y-4">
        <Image src="/assets/loaders/cat.gif" width={85} height={69}/>
        <h1 className="animate-pulse text-TUCMC-gray-800 font-semibold">Loading...</h1>
      </div>
    </div>
  )
}