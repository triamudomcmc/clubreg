import {CheckCircleIcon, ChevronDownIcon, ExclamationCircleIcon, SortAscendingIcon, XCircleIcon} from "@heroicons/react/solid";
import {Button} from "@components/common/Inputs/Button";
import {useEffect, useState} from "react";
import classnames from "classnames"
import Modal from "@components/common/Modals";
import {Input} from "@components/auth/Input";
import css from "./bubble.module.css"
import {motion, useAnimation} from "framer-motion"

const getRandomTransformOrigin = () => {
  const value = (16 + 40 * Math.random()) / 100;
  const value2 = (15 + 36 * Math.random()) / 100;
  return {
    originX: value,
    originY: value2
  };
};

const getRandomDelay = () => -(Math.random() * 0.7 + 0.05);

const randomDuration = () => Math.random() * 0.07 + 0.23;

const variants = {
  start: (i) => ({
    rotate: i % 2 === 0 ? [-1, 1.3, 0] : [1, -1.4, 0],
    transition: {
      delay: getRandomDelay(),
      repeat: Infinity,
      duration: randomDuration()
    }
  }),
  reset: {
    rotate: 0
  }
};

export const PendingElement = ({userData, pendingUpdate, setPendingUpdate, reservedPos, setReservedPos}) => {

  const [action, setAction] = useState(userData.dataRefID in pendingUpdate ? pendingUpdate[userData.dataRefID] : {action: "", pos: 0})
  const [pos, setPos] = useState(0)
  const [warning, setWarning] = useState(false)
  const controls = useAnimation();

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

  useEffect(() => {
    if (warning) {
      controls.start("start")
    }else{
      controls.stop();
      controls.set("reset");
    }
  }, [warning])

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
        <motion.div custom={1}
                    variants={variants}
                    animate={controls}
                    style={getRandomTransformOrigin()}
                    className={classnames("flex items-center space-x-1 relative border rounded-md px-3 py-1", warning && "border-TUCMC-red-400 text-TUCMC-gray-500")}>
          <input style={{width: "60px"}} value={pos > 0 ? pos : ""} onChange={event => {setPos(parseInt(event.target.value))}} className={classnames("text-center appearance-none outline-none")} placeholder="สำรอง"/>
          <Modal className="absolute top-1.5 right-1.5 w-5 h-5" ToggleDep={warning} closeClickOutside={false}>
            <div className="absolute w-5 h-5 opacity-0 z-10 hover:opacity-100">
              <div className="absolute -top-10 -left-11">
                <div className={classnames("bg-white text-xs text-black w-28 shadow-md rounded-md p-2", css.tooltip)}><h1 className="text-center">ลำดับนี้ถูกใช้แล้ว</h1></div>
              </div>
              <ExclamationCircleIcon className="w-5 h-5 text-TUCMC-red-400"/>
            </div>
            <ExclamationCircleIcon className="absolute w-5 h-5 z-[9] text-TUCMC-red-400"/>
          </Modal>
        </motion.div>
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