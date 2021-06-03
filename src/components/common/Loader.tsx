import {motion} from "framer-motion"
import {useWindowDimensions} from "@utilities/document";

export const Loader = ({display}) => {

  const {width} = useWindowDimensions()

  return(
    <div style={{zIndex: 9999, display: display ? "flex" : "none"}} className="flex justify-center items-center min-h-screen w-full fixed top-0 left-0 bg-TUCMC-gray-100 bg-opacity-80">
      <div className="absolute top-0 w-full bg-blue-300 h-1.5">
      </div>
      <motion.div initial={{x: -1000}} animate={display && {x: width}} transition={{
        repeat: Infinity,
        duration: 2
      }} className="absolute top-0 left-0 w-full bg-blue-500 h-1.5 w-5/12">
      </motion.div>
      <div className="flex flex-col items-center font-display animate-pulse">
        <img width="128" height="128" src="/assets/1481.gif"/>
        <h1 className="font-bold text-xl">Preparing...</h1>
      </div>
    </div>
  )
}