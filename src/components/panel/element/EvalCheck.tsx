import {
  CheckCircleIcon,
  ChevronDownIcon,
  ExclamationCircleIcon,
  LogoutIcon,
  MoonIcon,
  SortAscendingIcon,
  XCircleIcon,
} from "@heroicons/react/solid"
import { useEffect, useState } from "react"
import classnames from "classnames"
import Modal from "@components/common/Modals"
import css from "./bubble.module.css"
import { motion, useAnimation } from "framer-motion"

export const EvalCheck = ({ userData, pendingUpdate, setPendingUpdate }) => {
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
    <div className="flex flex-shrink-0 space-x-2">
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
        <span>ผ่าน</span>
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
        <span>ไม่ผ่าน</span>
      </div>
      <div
        onClick={() => {
          action.action !== "break" ? clickAction("break") : reset()
        }}
        className={classnames(
          "flex cursor-pointer items-center space-x-1 rounded-md border px-4 py-1",
          action.action === "break" && "bg-TUCMC-gray-500 text-white"
        )}
      >
        <MoonIcon className={classnames("h-5 w-5", action.action === "break" ? "text-white" : "text-TUCMC-gray-500")} />
        <span>ลาพัก</span>
      </div>
      <div
        onClick={() => {
          action.action !== "resign" ? clickAction("resign") : reset()
        }}
        className={classnames(
          "flex cursor-pointer items-center space-x-1 rounded-md border px-4 py-1",
          action.action === "resign" && "bg-TUCMC-gray-500 text-white"
        )}
      >
        <LogoutIcon
          className={classnames("h-5 w-5", action.action === "resign" ? "text-white" : "text-TUCMC-gray-500")}
        />
        <span>ลาออก</span>
      </div>
    </div>
  )
}
