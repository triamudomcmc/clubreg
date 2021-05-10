import {CheckCircleIcon, ChevronDownIcon, SortAscendingIcon, XCircleIcon} from "@heroicons/react/solid";
import {Button} from "@components/common/Inputs/Button";
import {useEffect, useState} from "react";
import classnames from "classnames"
import Modal from "@components/common/Modals";
import {Input} from "@components/auth/Input";
import css from "./bubble.module.css"
import {motion, useAnimation} from "framer-motion"
import {submitPending, updateUser} from "@client/fetcher/panel";
import {useAuth} from "@client/auth";

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

export const Editor = ({userData, reservedPos, setReservedPos, TriggerDep, refetch}) => {

  const [action, setAction] = useState({action: "", pos: 0})
  const [pos, setPos] = useState(0)
  const [warning, setWarning] = useState(false)
  const [closeDep, setCloseDep] = useState(false)
  const controls = useAnimation();

  const {onReady} = useAuth()

  const adminData = onReady((logged, userData) => (userData))

  useEffect(() => {
    reset()
  }, [userData])

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

  const update = async () => {
    if (action.action === "") return
    const res = await updateUser(adminData.panelID, userData.dataRefID, action)
    if(res.status) {
      refetch()
      setCloseDep(true)
    }
  }

  return (
    <Modal TriggerDep={TriggerDep} CloseDep={{dep: closeDep, revert: () => {setCloseDep(false)}}} CloseID="closeEdit" className="flex flex-col px-4" overlayClassName="flex justify-center items-center fixed top-0 w-full min-h-screen z-50 bg-gray-500 bg-opacity-50">
      <div className="bg-white p-5 rounded-t-md shadow-md" style={{minWidth: "340px"}}>
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
                      className={classnames("flex items-center space-x-1 relative border rounded-md px-3 py-1", warning && "border-TUCMC-red-400 text-TUCMC-gray-500", userData.status === "reserved" && "hidden")}>
            <input style={{width: "60px"}} value={pos > 0 ? pos : ""} onChange={event => {setPos(parseInt(event.target.value))}} className={classnames("text-center appearance-none outline-none")} placeholder="สำรอง"/>
            <Modal className="absolute top-1.5 right-1.5 w-5 h-5" ToggleDep={warning} closeClickOutside={false}>
              <div className="absolute w-5 h-5 opacity-0 z-10 hover:opacity-100">
                <div className="absolute -top-10 -left-11">
                  <div className={classnames("bg-white text-xs text-black w-28 shadow-md rounded-md p-2", css.tooltip)}><h1 className="text-center">ลำดับนี้ถูกใช้แล้ว</h1></div>
                </div>
                <XCircleIcon className="w-5 h-5 text-TUCMC-red-400"/>
              </div>
              <XCircleIcon className="absolute w-5 h-5 z-[9] text-TUCMC-red-400"/>
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
      <div className="bg-gray-50 rounded-b-lg py-3 px-3">
        <div className="flex space-x-1 font-medium">
          <div onClick={update} className={classnames("flex justify-center rounded-lg cursor-pointer text-white w-1/2 py-2", action.action === "" ? "bg-TUCMC-gray-300" : "bg-TUCMC-green-400")}><span className={classnames(action.action === "" && "text-gray-500")}>ยืนยัน</span></div>
          <div id="closeEdit" className="flex justify-center rounded-lg cursor-pointer border border-gray-300 bg-white text-gray-700 w-1/2 py-2"><span>ยกเลิก</span></div>
        </div>
      </div>
    </Modal>
  )
}