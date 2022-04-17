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
import { submitPending, updateUser } from "@client/fetcher/panel"
import { useAuth } from "@client/auth"
import { useToast } from "@components/common/Toast/ToastContext"
import { isEmpty } from "@utilities/object"
import { Ellipsis } from "@vectors/Loaders/Ellipsis"

const getRandomTransformOrigin = () => {
  const value = (16 + 40 * Math.random()) / 100
  const value2 = (15 + 36 * Math.random()) / 100
  return {
    originX: value,
    originY: value2,
  }
}

const getRandomDelay = () => -(Math.random() * 0.7 + 0.05)

const randomDuration = () => Math.random() * 0.07 + 0.23

const variants = {
  start: (i) => ({
    rotate: i % 2 === 0 ? [-1, 1.3, 0] : [1, -1.4, 0],
    transition: {
      delay: getRandomDelay(),
      repeat: Infinity,
      duration: randomDuration(),
    },
  }),
  reset: {
    rotate: 0,
  },
}

export const Editor = ({ userData, reservedPos, setReservedPos, TriggerDep, refetch }) => {
  const [action, setAction] = useState({ action: "", pos: 0 })
  const [pos, setPos] = useState(0)
  const [warning, setWarning] = useState(false)
  const [closeDep, setCloseDep] = useState(false)
  const [pending, setPending] = useState(false)
  const controls = useAnimation()

  const { onReady, reFetch } = useAuth()
  const { addToast } = useToast()

  const adminData = onReady((logged, userData) => userData)

  useEffect(() => {
    reset()
  }, [userData])

  useEffect(() => {
    setWarning(false)
    setReservedPos((prev) => {
      delete prev[userData.dataRefID]
      return prev
    })
    if (pos > 0) {
      const highest = !isEmpty(reservedPos)
        ? Number(
            Object.values(reservedPos).reduce((a, b) => {
              return Math.max(Number(a), Number(b))
            })
          )
        : 0
      if (pos <= highest + 1) {
        setAction({ action: "reserved", pos: pos })
      } else {
        setWarning(true)
      }
    } else {
      if (action.action === "reserved") {
        reset()
      }
    }
  }, [pos])

  const reset = () => {
    setAction({ action: "", pos: 0 })
    setPos(0)
  }

  const clickAction = (actionType) => {
    setAction({ action: actionType, pos: 0 })
    setPos(0)
  }

  useEffect(() => {
    if (warning) {
      controls.start("start")
    } else {
      controls.stop()
      controls.set("reset")
    }
  }, [warning])

  const update = async () => {
    if (!pending) {
      setPending(true)
      if (action.action === "") return setPending(false)
      try {
        const res = await updateUser(localStorage.getItem("currentPanel"), userData.dataRefID, action)
        if (res.status) {
          refetch()
          addToast({
            theme: "modern",
            icon: "tick",
            title: "อัพเดทข้อมูลสำเร็จแล้ว",
            text: "ข้อมูลที่ถูกส่งไป ได้รับการอัพเดทบนฐานข้อมูลแล้ว",
          })
          setCloseDep(true)
        } else {
          switch (res.report) {
            case "sessionError":
              addToast({
                theme: "modern",
                icon: "cross",
                title: "พบข้อผิดพลาดของเซสชั่น",
                text: "กรุณาลองเข้าสู่ระบบใหม่อีกครั้ง",
              })
              reFetch("sessionError")
              break
            case "invalidPermission":
              addToast({
                theme: "modern",
                icon: "cross",
                title: "คุณไม่ได้รับอนุญาตในการกระทำนี้",
                text: "กรุณาลองเข้าสู่ระบบใหม่อีกครั้งหรือ หากยังไม่สามารถแก้ไขได้ให้ติดต่อทาง กช.",
              })
              break
            case "quota_exceeded":
              addToast({
                theme: "modern",
                icon: "cross",
                title: "จำนวนผู้ที่ผ่านการคัดเลือกจะต้องไม่เกินจำนวนที่ได้ขอมา",
                text: "กรุณาทำให้มีที่ว่างในช่องผู้ผ่านการคัดเลือกก่อน จึงนำสมาชิกคนใหม่ใส่เข้าไป",
              })
              break
          }
        }
      } catch (e) {
        addToast({
          theme: "modern",
          icon: "cross",
          title: "พบข้อผิดพลาดที่ไม่ทราบสาเหตุ",
          text: "กรุณาลองกรอกข้อมูลใหม่อีกครั้ง หากยังพบข้อผิดพลาดสามารถติดต่อทาง กช.",
        })
      }
      setTimeout(() => {
        setPending(false)
      }, 500)
    }
  }

  return (
    <Modal
      TriggerDep={TriggerDep}
      CloseDep={{
        dep: closeDep,
        revert: () => {
          setCloseDep(false)
        },
      }}
      CloseID="closeEdit"
      className="flex w-full flex-col px-4"
      overlayClassName="flex justify-center items-center fixed top-0 w-full min-h-screen z-50 bg-gray-500 bg-opacity-50"
    >
      <div className="mx-auto min-w-full max-w-[390px] md:max-w-none xs:min-w-[380px]">
        <div className="rounded-t-md bg-white p-5 shadow-md md:min-w-[380px]">
          <h1>
            {userData.title}
            {userData.firstname} {userData.lastname}
          </h1>
          <span className="text-TUCMC-gray-600">
            {userData.student_id} | ม.{userData.level}/{userData.room}
          </span>
          <div className="mt-3 flex">
            <div
              onClick={() => {
                action.action !== "passed" ? clickAction("passed") : reset()
              }}
              className={classnames(
                "mr-2 flex cursor-pointer items-center space-x-1 rounded-md border px-6 py-1",
                action.action === "passed" && "bg-TUCMC-green-400 text-white",
                userData.status === "passed" && "hidden"
              )}
            >
              <CheckCircleIcon
                className={classnames("h-5 w-5", action.action === "passed" ? "text-white" : "text-TUCMC-green-400")}
              />
              <span>รับ</span>
            </div>
            <motion.div
              custom={1}
              variants={variants}
              animate={controls}
              style={getRandomTransformOrigin()}
              className={classnames(
                "relative mr-2 flex items-center space-x-1 rounded-md border px-3 py-1",
                warning && "border-TUCMC-red-400 text-TUCMC-gray-500",
                userData.status === "reserved" && "hidden"
              )}
            >
              <input
                style={{ width: "60px" }}
                value={pos > 0 ? pos : ""}
                onChange={(event) => {
                  setPos(parseInt(event.target.value))
                }}
                className={classnames("outline-none appearance-none text-center")}
                placeholder="สำรอง"
              />
              <Modal className="absolute top-1.5 right-1.5 h-5 w-5" ToggleDep={warning} closeClickOutside={false}>
                <div className="absolute z-10 h-5 w-5 opacity-0 hover:opacity-100">
                  <div className="absolute -top-10 -left-11">
                    <div
                      className={classnames("w-28 rounded-md bg-white p-2 text-xs text-black shadow-md", css.tooltip)}
                    >
                      <h1 className="text-center">ลำดับมากเกินไป</h1>
                    </div>
                  </div>
                  <ExclamationCircleIcon className="h-5 w-5 text-TUCMC-red-400" />
                </div>
                <ExclamationCircleIcon className="absolute z-[9] h-5 w-5 text-TUCMC-red-400" />
              </Modal>
            </motion.div>
            <div
              onClick={() => {
                action.action !== "failed" ? clickAction("failed") : reset()
              }}
              className={classnames(
                "flex cursor-pointer items-center space-x-1 rounded-md border px-4 py-1",
                action.action === "failed" && "bg-TUCMC-red-400 text-white",
                userData.status === "failed" && "hidden"
              )}
            >
              <XCircleIcon
                className={classnames("h-5 w-5", action.action === "failed" ? "text-white" : "text-TUCMC-red-400")}
              />
              <span>ไม่รับ</span>
            </div>
          </div>
        </div>
        <div className="rounded-b-lg bg-gray-50 py-3 px-3">
          <div className="flex space-x-1 font-medium">
            <div
              onClick={update}
              className={classnames(
                "flex w-1/2 justify-center rounded-lg text-white",
                action.action === "" ? "cursor-default bg-TUCMC-gray-300" : "bg-TUCMC-green-400",
                pending ? "cursor-default py-0" : "cursor-pointer py-2"
              )}
            >
              <span className={classnames(action.action === "" && "text-gray-500", pending && "hidden")}>ยืนยัน</span>
              <Ellipsis className={classnames("h-10 w-[3rem]", !pending && "hidden")} />
            </div>
            <div
              id="closeEdit"
              className="flex w-1/2 cursor-pointer justify-center rounded-lg border border-gray-300 bg-white py-2 text-gray-700"
            >
              <span>ยกเลิก</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
