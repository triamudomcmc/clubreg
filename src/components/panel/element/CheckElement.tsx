import {
  CheckCircleIcon,
  ChevronDownIcon,
  ExclamationCircleIcon,
  SortAscendingIcon,
  XCircleIcon,
} from "@heroicons/react/solid"
import { useEffect, useState } from "react"
import classnames from "classnames"
import Modal from "@components/common/Modals"
import css from "./bubble.module.css"
import { motion, useAnimation } from "framer-motion"

export const CheckElement = ({ userData, pendingUpdate, setPendingUpdate }) => {
  const [action, setAction] = useState(
    userData.student_id in pendingUpdate ? pendingUpdate[userData.student_id] : { action: "" }
  )

  const reset = () => {
    setAction({ action: "" })
  }

  useEffect(() => {
    if (action.action !== "")
      return setPendingUpdate((prevState) => ({ ...prevState, ...{ [userData.student_id]: action } }))
    setPendingUpdate((prevState) => {
      delete prevState[userData.student_id]
      return prevState
    })
  }, [action])

  useEffect(() => {
    if (action.action !== pendingUpdate[userData.student_id]?.action) {
      setAction({ action: pendingUpdate[userData.student_id]?.action })
    }
    if (userData.student_id in pendingUpdate) return
    reset()
  }, [pendingUpdate])

  const clickAction = (actionType) => {
    setAction({ action: actionType })
  }

  return (
    <div className="flex flex-col rounded-lg bg-white p-5 shadow-md md:flex-row md:items-center md:justify-between">
      <div className="flex flex-shrink-0 flex-col md:flex-row md:items-center">
        <h1>
          {userData.title}
          {userData.firstname} {userData.lastname}
        </h1>
        <span className="text-TUCMC-gray-600 md:hidden">
          {userData.student_id} | ม.{userData.level}/{userData.room}
        </span>
      </div>
      <div className="flex items-center justify-between text-TUCMC-gray-600 md:ml-10">
        <div className="mr-14 hidden w-[240px] flex-shrink justify-between md:flex">
          <span className="w-1/3 flex justify-center">{userData.student_id}</span>
          <span className="w-1/3 flex justify-center">ม.{userData.level}</span>
          <span className="w-1/3 flex justify-center">{userData.room}</span>
        </div>
        <div className="mt-3 flex flex-shrink-0 space-x-2 md:mt-0">
          <div
            onClick={() => {
              action.action !== "passed" ? clickAction("passed") : reset()
            }}
            className={classnames(
              "flex cursor-pointer items-center space-x-1 rounded-md border px-6 py-1",
              action.action === "passed" && "bg-TUCMC-green-400 text-white"
            )}
          >
            <CheckCircleIcon
              className={classnames("h-5 w-5", action.action === "passed" ? "text-white" : "text-TUCMC-green-400")}
            />
            <span>มา</span>
          </div>
          <div
            onClick={() => {
              action.action !== "failed" ? clickAction("failed") : reset()
            }}
            className={classnames(
              "flex cursor-pointer items-center space-x-1 rounded-md border px-4 py-1",
              action.action === "failed" && "bg-TUCMC-red-400 text-white"
            )}
          >
            <XCircleIcon
              className={classnames("h-5 w-5", action.action === "failed" ? "text-white" : "text-TUCMC-red-400")}
            />
            <span>ขาด</span>
          </div>
        </div>
      </div>
    </div>
  )
}
