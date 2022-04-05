import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useWindowDimensions } from "@utilities/document"
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/outline"
import { XIcon } from "@heroicons/react/solid"

const ToastElement = ({ toastData, index, toastDeleteHandler, ...restProps }) => {
  const [exit, setExit] = useState(false)
  const [deletable, setDeletable] = useState([])
  const { width } = useWindowDimensions()

  const deleteToast = (index) => {
    setExit(true)
    setDeletable([...deletable, index])
  }

  useEffect(() => {
    if ("lifeSpan" in toastData) {
      if (toastData.lifeSpan > 0) {
        setTimeout(() => {
          deleteToast(index)
        }, toastData.lifeSpan)
      }
    } else {
      setTimeout(() => {
        deleteToast(index)
      }, 10000)
    }
  }, [])

  const calldelete = (index) => {
    setExit(false)
    if (!deletable.includes(index)) return
    toastDeleteHandler(index)
  }

  const icons = "title" in toastData && {
    tick: (
      <svg
        className={`h-8 w-8 text-${toastData.color}-600 mr-4`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    info: (
      <svg
        className={`h-8 w-8 text-${toastData.color}-600 mr-4`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    cross: (
      <svg
        className={`h-8 w-8 text-${toastData.color}-600 mr-4`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  }

  const newIcons = "title" in toastData && {
    tick: <CheckCircleIcon className="h-6 w-6 flex-shrink-0 text-green-400" />,
    info: (
      <svg
        className={`h-8 w-8 text-${toastData.color}-600 mr-4`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    cross: <XCircleIcon className="h-6 w-6 flex-shrink-0 text-red-400" />,
  }

  if (toastData.theme == "default") {
    return (
      <motion.div
        key={index}
        onClick={() => {
          deleteToast(index)
        }}
        initial={{ y: 100 }}
        animate={exit ? { x: 1000, y: 0 } : { y: 0 }}
        onAnimationComplete={() => {
          exit && calldelete(index)
        }}
        transition={exit && { duration: 0.3 }}
        style={width <= 640 && { width: "100%" }}
        className={`bg-${toastData.color}-50 cursor-pointer border-t-4 border-${toastData.color}-300 rounded-b text-${toastData.color}-600 px-4 py-3 shadow-md`}
        role="alert"
        {...restProps}
      >
        <div className="flex">
          {icons[toastData.icon]}
          <div>
            <p className="font-bold">{toastData.title}</p>
            <p className="text-sm">{toastData.text}</p>
          </div>
        </div>
      </motion.div>
    )
  } else {
    return (
      <motion.div
        key={index}
        initial={{ y: 100 }}
        animate={exit ? { x: 1000, y: 0 } : { y: 0 }}
        onAnimationComplete={() => {
          exit && calldelete(index)
        }}
        transition={exit && { duration: 0.3 }}
        style={width <= 340 && { width: "100%", maxWidth: "unset" }}
        className={`max-w-xs cursor-pointer rounded-lg bg-white px-4 py-4 shadow-lg`}
        role="alert"
        {...restProps}
      >
        <div className="flex">
          {newIcons[toastData.icon]}
          <div className="mt-0.5 space-y-1 pl-3">
            <p className="text-sm font-medium text-black">{toastData.title}</p>
            <p className="pr-4 text-[13px] leading-[18px] tracking-tight text-gray-500">{toastData.text}</p>
          </div>
          <XIcon
            onClick={() => {
              deleteToast(index)
            }}
            className="h-5 w-5 flex-shrink-0 cursor-pointer text-gray-400"
          />
        </div>
      </motion.div>
    )
  }
}

export default ToastElement
