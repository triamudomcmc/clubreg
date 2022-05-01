import { Dispatch, FC, SetStateAction, useEffect, useState } from "react"
import Modal from "@components/common/Modals"
import { CheckCircleIcon, ExclamationIcon } from "@heroicons/react/outline"
import { Input } from "@components/auth/Input"
import classNames from "classnames"
import { useToast } from "@components/common/Toast/ToastContext"
import { changeClubDisplayStatus } from "@handlers/client/fetcher/club"

export const ModalSection: FC<{
  refetch: () => void
  clubID
  action: "accepted" | "declined" | null
  setAction: Dispatch<SetStateAction<"accepted" | "declined" | null>>
  newData: null | { description: string; reviews: any[] }
}> = ({ refetch, clubID, setAction, action, newData }) => {
  const [reason, setReason] = useState("")
  const [password, setPassword] = useState("")

  const [modalState, setModalState] = useState(false)
  const [closeState, setCloseState] = useState(false)
  const [modalState2, setModalState2] = useState(false)
  const [closeState2, setCloseState2] = useState(false)

  const { addToast } = useToast()

  useEffect(() => {
    if (action === "accepted") {
      setModalState2(true)
    } else if (action === "declined") {
      setModalState(true)
    }
  }, [action])

  const nextSection = async () => {
    setCloseState(true)
    setModalState2(true)
  }

  const submitData = async () => {
    const out = await changeClubDisplayStatus(clubID, password, action, newData, reason === "" ? null : reason)

    if (out.status) {
      setCloseState(true)
      setCloseState2(true)
      setAction(null)

      setPassword("")
      setReason("")

      addToast({
        theme: "modern",
        icon: "tick",
        title: "แก้ไขสถานะข้อมูลชมรมดังกล่าวเรียบร้อย",
        text: "",
      })
      refetch()
    } else {
      switch (out.report) {
        case "user_not_found":
          addToast({
            theme: "modern",
            icon: "cross",
            title: "ไม่พบข้อมูลผู้ใช้ดังกล่าวในฐานข้อมูล",
            text: "",
          })
          break
        case "student_not_found":
          addToast({
            theme: "modern",
            icon: "cross",
            title: "ไม่พบนักเรียนที่มีรหัสนักเรียนดังกล่าวในฐานข้อมูล",
            text: "กรุณาลองกรอกใหม่อีกครั้ง หากยังไม่ได้ให้ติดต่อทาง กช.",
          })
          break
        case "club_not_found":
          addToast({
            theme: "modern",
            icon: "cross",
            title: "ไม่พบข้อมูลชมรมดังกล่าวในฐานข้อมูล",
            text: "",
          })
          break

        case "invalid_password":
          addToast({
            theme: "modern",
            icon: "cross",
            title: "รหัสผ่านไม่ถูกต้อง",
            text: "กรุณาลองกรอกข้อมูลใหม่อีกครั้งหรือ หากลืมรหัสผ่านสามารถติดต่อทาง กช. เพื่อขอเปลี่ยนรหัสผ่านได้",
          })
          break

        case "already_is_committee":
          addToast({
            theme: "modern",
            icon: "cross",
            title: "สมาชิกดังกล่าวเป็นกรรมการชมรมอยู่แล้ว",
            text: "",
          })
          break

        case "cannot_add_self":
          addToast({
            theme: "modern",
            icon: "cross",
            title: "ไม่สามารถเพิ่มตนเองเป็นกรรมการชมรมได้",
            text: "",
          })
          break

        default:
          break
      }
    }
  }

  return (
    <>
      <Modal
        overlayClassName="fixed flex flex-col items-center justify-center top-0 left-0 bg-black bg-opacity-20 w-full min-h-screen z-[99]"
        className="flex min-w-[340px] flex-col items-center rounded-lg bg-white"
        CloseDep={{
          dep: closeState,
          revert: () => {
            setCloseState(false)
            setAction(null)
          },
        }}
        TriggerDep={{
          dep: modalState,
          revert: () => {
            setModalState(false)
            setAction(null)
          },
        }}
      >
        <div className="flex flex-col items-center px-4 py-4">
          <div className="mt-1 mb-2 rounded-full bg-TUCMC-orange-200 p-3">
            <ExclamationIcon className="h-6 w-6 text-TUCMC-orange-500" />
          </div>
          <div className="space-y-1">
            <h1 className="text-center text-TUCMC-gray-900">เปลี่ยนสถานะข้อมูลชมรม</h1>
            <p className="text-center text-sm text-TUCMC-gray-500">
              เปลี่ยนสถานะเป็น{" "}
              <span className={classNames(action === "declined" ? "text-TUCMC-red-400" : "text-TUCMC-green-400")}>
                {action === "declined" ? "ปฏิเสธ" : "อนุมัติ"}
              </span>
            </p>
            <p className="pt-2 text-center text-sm text-TUCMC-gray-600">ใส่เหตุผลในการปฏิเสธข้อมูลชมรมดังกล่าว</p>
          </div>
        </div>
        <div className="w-full space-y-6 rounded-b-lg bg-TUCMC-gray-100 px-4 py-4">
          <Input stateUpdate={(v) => setReason(v)} type="text" className="h-10" placeholder="สาเหตุการปฏิเสธ" />
          <div className="space-y-2">
            <button onClick={nextSection} className="w-full rounded-lg bg-TUCMC-green-400 py-2 text-white">
              ถัดไป
            </button>
            <button
              onClick={() => {
                setCloseState(true)
              }}
              className="text-gray-TUCMC-600 w-full rounded-lg border border-gray-400 bg-white py-2"
            >
              ยกเลิก
            </button>
          </div>
        </div>
      </Modal>
      {/* modal 2 */}
      <Modal
        overlayClassName="fixed flex flex-col items-center justify-center top-0 left-0 bg-black bg-opacity-20 w-full min-h-screen z-[99]"
        className="flex min-w-[340px] flex-col items-center rounded-lg bg-white"
        CloseDep={{
          dep: closeState2,
          revert: () => {
            setCloseState2(false)
            setAction(null)
          },
        }}
        TriggerDep={{
          dep: modalState2,
          revert: () => {
            setModalState2(false)
            setAction(null)
          },
        }}
      >
        <div className="flex w-full flex-col items-center px-4 py-4">
          <div className="mt-1 mb-2 rounded-full bg-TUCMC-orange-200 p-3">
            <ExclamationIcon className="h-6 w-6 text-TUCMC-orange-500" />
          </div>
          <div className="w-full space-y-1">
            <h1 className="text-center text-TUCMC-gray-900">เปลี่ยนสถานะข้อมูลชมรม</h1>
            <p className="text-center text-sm text-TUCMC-gray-500">
              เปลี่ยนสถานะเป็น{" "}
              <span className={classNames(action === "declined" ? "text-TUCMC-red-400" : "text-TUCMC-green-400")}>
                {action === "declined" ? "ปฏิเสธ" : "อนุมัติ"}
              </span>
            </p>
            <p className="pt-2 text-center text-sm text-TUCMC-gray-600">โปรดยืนยันรหัสผ่านงับ</p>
          </div>
          <div className="w-full space-y-6 rounded-b-lg bg-TUCMC-gray-100 px-4 py-4">
            <Input stateUpdate={setPassword} type="password" className="h-10" placeholder="รหัสผ่าน" />
            <div className="space-y-2">
              <button
                onClick={submitData}
                className="flex w-full items-center justify-center space-x-1 rounded-lg bg-TUCMC-green-400 py-2 text-white"
              >
                <CheckCircleIcon className="h-5 w-5" />
                <span>ยืนยัน</span>
              </button>
              <button
                onClick={() => {
                  setCloseState2(true)
                }}
                className="text-gray-TUCMC-600 w-full rounded-lg border border-gray-400 bg-white py-2"
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}
