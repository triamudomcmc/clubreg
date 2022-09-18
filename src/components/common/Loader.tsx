import { motion } from "framer-motion"
import { useWindowDimensions } from "@utilities/document"
import { useEffect, useState } from "react"

export const Loader = ({ display }) => {
  const { width } = useWindowDimensions()

  const genRandomQuote = () => {
    
    const quotes = ["Quackk...", "Quuaack!", "Quack Quack", "Qquack??"]
    const possibility = [60, 15, 20 ,5]
    let samples = []
    possibility.forEach((value, index) => {
      samples = [...samples, ...[...Array(value)].map(() => (quotes[index]))]
    })

    const result = samples[Math.floor(Math.random()*samples.length)];

    return result
  }

  const [quote, setQuote] = useState(genRandomQuote())

  return (
    <div
      style={{ zIndex: 9999, display: display ? "flex" : "none" }}
      className="fixed top-0 left-0 flex min-h-screen w-full items-center justify-center bg-TUCMC-gray-800 backdrop-blur bg-opacity-60"
    >
      <div className="absolute top-0 h-1.5 w-full bg-blue-300"></div>
      <motion.div
        initial={{ x: -1000 }}
        animate={display && { x: width }}
        transition={{
          repeat: Infinity,
          duration: 2,
        }}
        className="absolute top-0 left-0 h-1.5 w-full w-5/12 bg-blue-500"
      ></motion.div>
      <div className="flex flex-col items-center font-display">
        <img width="128" height="128" src="/assets/loaders/duck.gif" />
        <h1 className="text-lg font-semibold text-TUCMC-gray-100 animate-pulse -mt-2">{quote}</h1>
      </div>
    </div>
  )
}
