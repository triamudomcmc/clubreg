import {CheckCircleIcon, ChevronDownIcon, SortAscendingIcon, XCircleIcon} from "@heroicons/react/solid";
import {Button} from "@components/common/Inputs/Button";
import {useEffect, useState} from "react";
import classnames from "classnames"
import Modal from "@components/common/Modals";
import {Input} from "@components/auth/Input";

export const PendingElement = ({userData, pendingUpdate, setPendingUpdate, reservedPos, setReservedPos}) => {

  const [action, setAction] = useState(userData.dataRefID in pendingUpdate ? pendingUpdate[userData.dataRefID] : {action: "", pos: 0})
  const [pos, setPos] = useState(0)
  const [warning, setWarning] = useState(false)

  useEffect(() => {
    setWarning(false)
    setReservedPos(prev => {
      delete prev[userData.dataRefID]
      return prev
    })
    if (pos > 0) {
      if(!Object.values(reservedPos).includes(pos)) {
        setAction({action: "reserved", pos: pos})
        setReservedPos(prev => ({...prev, ...{[userData.dataRefID]: pos}}))
      }else{
        setWarning(true)
      }
    }else{
      if (action.action === "reserved") {
        reset()
      }
    }
  }, [pos])

  const reset = () => {
    setAction({action: "", pos: 0})
    setPos(0)
  }

  useEffect(() => {
    if (action.action !== "") return setPendingUpdate(prevState => ({...prevState, ...{[userData.dataRefID]: action}}))
    setPendingUpdate(prevState => {
      delete prevState[userData.dataRefID]
      return prevState
    })
  }, [action])

  useEffect(() => {
    if (userData.dataRefID in pendingUpdate) return
    reset()
  }, [pendingUpdate])

  const clickAction = (actionType) => {
    setAction({action: actionType, pos: 0}); setPos(0)
  }

  return (
    <div className="bg-white p-5 rounded-lg shadow-md">
      <h1>{userData.title}{userData.firstname} {userData.lastname}</h1>
      <span className="text-TUCMC-gray-600">{userData.student_id} |  ม.{userData.level}/{userData.room}</span>
      <div className="flex space-x-2 mt-3">
        <div onClick={() => {
          action.action !== "passed" ? clickAction("passed") : reset()
        }}
             className={classnames("flex items-center space-x-1 border rounded-md px-6 py-1 cursor-pointer", action.action === "passed" && "bg-TUCMC-green-400 text-white")}>
          <CheckCircleIcon className={classnames("w-5 h-5", action.action === "passed" ? "text-white" : "text-TUCMC-green-400")}/>
          <span>รับ</span>
        </div>
        <div className={classnames("flex items-center space-x-1 border rounded-md px-3 py-1", (action.action === "reserved" && !warning) && "bg-TUCMC-orange-400 cursor-pointer text-white", warning && "bg-TUCMC-red-400 text-white")}>
          <input style={{width: "60px"}} value={pos > 0 ? pos : ""} onChange={event => {setPos(parseInt(event.target.value))}} className={classnames("text-center appearance-none outline-none",(action.action === "reserved" && !warning) && "bg-TUCMC-orange-400 ", warning && "bg-TUCMC-red-400 text-white")} placeholder="สำรอง"/>
        </div>
        <div onClick={() => {
          action.action !== "failed" ? clickAction("failed") : reset()
        }}
             className={classnames("flex items-center space-x-1 border rounded-md px-4 py-1 cursor-pointer", action.action === "failed" && "bg-TUCMC-red-400 text-white")}>
          <XCircleIcon className={classnames("w-5 h-5", action.action === "failed" ? "text-white" : "text-TUCMC-red-400")}/>
          <span>ไม่รับ</span>
        </div>
      </div>
    </div>
  )
}