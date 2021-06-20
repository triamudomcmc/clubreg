import {CheckCircleIcon, ChevronDownIcon, ExclamationCircleIcon, SortAscendingIcon, XCircleIcon} from "@heroicons/react/solid";
import {useEffect, useState} from "react";
import classnames from "classnames"
import Modal from "@components/common/Modals";
import css from "./bubble.module.css"
import {motion, useAnimation} from "framer-motion"

export const CheckElement = ({userData, pendingUpdate, setPendingUpdate}) => {

  const [action, setAction] = useState(userData.student_id in pendingUpdate ? pendingUpdate[userData.student_id] : {action: ""})

  const reset = () => {
    setAction({action: ""})
  }

  useEffect(() => {
    if (action.action !== "") return setPendingUpdate(prevState => ({...prevState, ...{[userData.student_id]: action}}))
    setPendingUpdate(prevState => {
      delete prevState[userData.student_id]
      return prevState
    })
  }, [action])

  useEffect(() => {
    if (action.action !== pendingUpdate[userData.student_id]?.action) {
      setAction({action: pendingUpdate[userData.student_id]?.action})
    }
    if (userData.student_id in pendingUpdate) return
    reset()
  }, [pendingUpdate])

  const clickAction = (actionType) => {
    setAction({action: actionType})
  }

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-white p-5 rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row md:items-center flex-shrink-0">
        <h1>{userData.title}{userData.firstname} {userData.lastname}</h1>
        <span className="text-TUCMC-gray-600 md:hidden">{userData.student_id} | ม.{userData.level}/{userData.room}</span>
      </div>
      <div className="flex items-center justify-between text-TUCMC-gray-600 md:w-[620px] md:ml-10">
        <div className="justify-between w-[200px] hidden md:flex mr-14 flex-shrink">
          <span>{userData.student_id}</span>
          <span>ม.{userData.level}</span>
          <span>{userData.room}</span>
        </div>
        <div className="flex space-x-2 mt-3 md:mt-0 flex-shrink-0">
          <div onClick={() => {
            action.action !== "passed" ? clickAction("passed") : reset()
          }}
               className={classnames("flex items-center space-x-1 border rounded-md px-6 py-1 cursor-pointer", action.action === "passed" && "bg-TUCMC-green-400 text-white")}>
            <CheckCircleIcon className={classnames("w-5 h-5", action.action === "passed" ? "text-white" : "text-TUCMC-green-400")}/>
            <span>มา</span>
          </div>
          <div onClick={() => {
            action.action !== "failed" ? clickAction("failed") : reset()
          }}
               className={classnames("flex items-center space-x-1 border rounded-md px-4 py-1 cursor-pointer", action.action === "failed" && "bg-TUCMC-red-400 text-white")}>
            <XCircleIcon className={classnames("w-5 h-5", action.action === "failed" ? "text-white" : "text-TUCMC-red-400")}/>
            <span>ขาด</span>
          </div>
        </div>
      </div>
    </div>
  )
}