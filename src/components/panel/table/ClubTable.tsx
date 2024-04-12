import { Input } from "@components/auth/Input"
import { Card, CustomCard } from "@components/Card"
import { Button } from "@components/common/Inputs/Button"
import Modal from "@components/common/Modals"
import { useToast } from "@components/common/Toast/ToastContext"
import { useAuth } from "@handlers/client/auth"
import { ExclamationIcon, TrashIcon } from "@heroicons/react/outline"
import {CheckCircleIcon, LockClosedIcon} from "@heroicons/react/solid"
import { ClubData } from "@interfaces/clubData"
import UserData from "@interfaces/userData"
import { useWindowDimensions } from "@utilities/document"
import { request } from "https"
import { FC, Fragment, MouseEvent, useEffect, useState } from "react"
import { stringify } from "remark"
import { TableContactRow, TableRow, TableWebDataRow } from "./TableRow"
import { IContactType } from "./valueTypes"
import {useTimer} from "@utilities/timers"
import { editInitData, endEditInitData, EXCEPT, THAI_MONTH } from "@config/time"
import classnames from "classnames"

export type TUpdateFieldFunction = (field: string, data: any) => Promise<{ status: boolean; report: string }>

interface IClubData {
  status: "pending" | "accepted" | "declined"
  reason?: string
  audition: string
  message: string
  contact: IContactType | {}
  contact2: IContactType | {}
  contact3: IContactType | {}
  place: string
}

export const ClubDataTable: FC<{
  data: IClubData
  clubData: any
  getCurrPanel: () => string
  width
  updateField: TUpdateFieldFunction
}> = ({ data, getCurrPanel, updateField, clubData, width }) => {
  const [currPanel, setCurrPanel] = useState("")

  useEffect(() => {
    setCurrPanel(getCurrPanel())
  }, [clubData])

  let cardWidth,
    padding = 18,
    maxWidth = 480

  if (width < maxWidth) {
    cardWidth = width - 2 * padding
  } else {
    cardWidth = maxWidth - 2 * padding
  }

  return (
    <div>
      <h1 className="border-b border-gray-200 pb-4 text-xl">ข้อมูลชมรม</h1>

      <TableWebDataRow getCurrPanel={getCurrPanel} status={data.status} reason={data.reason} />

      <TableRow
        field="audition"
        title="ประเภทการรับสมัคร"
        initialData={{ type: "string", value: data.audition }}
        updateField={updateField}
      />
      <TableRow
        field="message"
        title="ข้อความถึงสมาชิกชมรม"
        editable
        initialData={{
          type: "string",
          value: data.message,
        }}
        updateField={updateField}
      />
      <TableContactRow
        title="ช่องทางการติดต่อชมรม"
        initialData={{
          contact: data.contact,
          contact2: data.contact2,
          contact3: data.contact3,
        }}
        updateField={updateField}
      />
      <TableRow
        field="place"
        title="สถานที่ทำการเรียนการสอน"
        editable
        initialData={{ type: "string", value: data.place }}
        updateField={updateField}
      />

      <div className="flex flex-col items-center space-y-4 pt-6">
        <p className="text-TUCMC-gray-700">Preview การ์ดลงทะเบียนชมรม</p>
        <CustomCard width={cardWidth} panelID={currPanel} clubData={clubData} />
      </div>
    </div>
  )
}

interface IProportion {
  count_limit: number
  old_count_limit: number
  teacher_count: number
  committee_count: number
}

const Counter: FC<{ target: number }> = ({ target }) => {
  const counter = useTimer(target)
  return (
    <span className="mt-1 text-center text-sm">
      (อีก {counter.day} วัน {counter.hour} ชั่วโมง {counter.min} นาที)
    </span>
  )
}

export const ProportionTable: FC<{ data: IProportion; updateField: TUpdateFieldFunction }> = ({
  data,
  updateField,
}) => {
  // fetch value from api as intialValue
  // then every accept just upxate the api and then update the v alues idk just find a way to update the values as the apis update

  // const disable = new Date().getTime() < editInitData
  const [exception, setException] = useState(false)
  useEffect(() => {
    const id = localStorage.getItem("currentPanel")

    setException(EXCEPT.includes(id))
  }, [data])
  const disable = !(exception || (new Date().getTime() < endEditInitData && new Date().getTime() >= editInitData))

  return (
    <div>
      <h1 className="border-b border-gray-200 pb-4 text-xl">สัดส่วนชมรม</h1>

      <div className="relative">
        {disable && new Date().getTime() < editInitData && (
          <div className="absolute flex h-full w-full items-center justify-center backdrop-blur-[2px]">
            <div className="flex w-full flex-col items-center rounded-lg bg-white px-8 py-6 text-gray-900 shadow-md">
              <h1 className="text-lg">ส่วนแก้ไขสัดส่วนจำนวนนักเรียน</h1>
              <h1 className="text-lg">
                จะเปิดให้แก้ไขในวันที่{" "}
                <span className="font-medium">
                  {new Date(editInitData).getDate()} {THAI_MONTH[new Date(editInitData).getMonth()]}{" "}
                  {new Date(editInitData).getFullYear() + 543}
                </span>
              </h1>
              <Counter target={editInitData} />
            </div>
          </div>
        )}
        <TableRow
          field="teacher_count"
          title="จำนวนครูที่ปรึกษาชมรม"
          editable={!disable}
          initialData={{ type: "number", value: data.teacher_count }}
          updateField={updateField}
          validateFunc={() => {
            return null
          }}
        />

        <TableRow
          field="count_limit"
          title="จำนวนนักเรียนทั้งหมดที่คาดว่าจะรับ"
          editable={!disable}
          description="จำนวนนักเรียนทั้งหมดในชมรม รวมถึงนักเรียนเก่าและกรรมการชมรม"
          initialData={{ type: "number", value: data.count_limit }}
          updateField={updateField}
          validateFunc={(c) => {
            if (data.teacher_count === 0 || c.value / data.teacher_count < 26.5) {
              return { reason: "teacher_to_student" }
            } else return null
          }}
        />
        <div className="grid grid-cols-1 border-b border-gray-200 py-4 md:grid-cols-[2fr,3fr] md:items-center md:py-6">
          <p className="text-TUCMC-gray-600">จำนวนสมาชิกใหม่ที่จะรับเข้าชมรม</p>
          <div className="flex items-start space-x-2">
            <div className="block">{data.count_limit - data.old_count_limit - data.committee_count}</div>
          </div>
        </div>
        <TableRow
          field="old_count_limit"
          title="จำนวนสมาชิกเก่าที่สามารถยืนยันสิทธิ์ชมรมเดิมได้"
          description="จำนวนสมาชิกเก่าในชมรม ไม่รวมจำนวนกรรมการชมรม"
          initialData={{ type: "number", value: data.old_count_limit }}
          updateField={updateField}
          editable={!disable}
          declineVal={true}
          validateFunc={(c) => {
            if (c.value > Math.ceil((33 * data.count_limit) / 100)) {
              return { reason: "limit_exceded" }
            } else return null
          }}
        />
        {/* <div className="grid grid-cols-1 border-b border-gray-200 py-4 md:grid-cols-[2fr,3fr] md:items-center md:py-6">
        <p className="text-TUCMC-gray-600">จำนวนสมาชิกใหม่ที่จะรับเข้าชมรม</p>

        <div className="flex items-start space-x-2">
          <div className="block">{data.new_count_limit}</div>
        </div>
      </div> */}
      </div>
    </div>
  )
}

export const ClubCommitteeTable: FC<{
  getStudentID: (studentID: string) => Promise<{ status: boolean; report: string; data?: UserData }>
  addCommittee: (studentID: string, password: string) => Promise<{ status: boolean; report: string }>
  removeCommittee: (studentID: string, password: string) => Promise<{ status: boolean; report: string }>
  committee: UserData[]
}> = ({ getStudentID, addCommittee, removeCommittee, committee }) => {
  const [modalState, setModalState] = useState(false)
  const [closeState, setCloseState] = useState(false)
  const [modalState2, setModalState2] = useState(false)
  const [closeState2, setCloseState2] = useState(false)
  const [modalState3, setModalState3] = useState(false)
  const [closeState3, setCloseState3] = useState(false)
  const [password, setPassword] = useState("")

  const [studentID, setStudentID] = useState("44444")
  const [studentData, setStudentData] = useState<null | UserData>(null)
  const [exception, setException] = useState(false)
  useEffect(() => {
    const id = localStorage.getItem("currentPanel")

    setException(EXCEPT.includes(id))
  }, [committee])

  const disable = !(exception || (new Date().getTime() < endEditInitData && new Date().getTime() >= editInitData))

  const { addToast } = useToast()
  const { onReady } = useAuth()

  const userData = onReady((logged, userData) => userData)

  const enableModal = (e: MouseEvent<HTMLButtonElement>) => {
    if (disable) return
    setModalState(true)
  }

  const nextSection = async () => {
    if (disable) return
    const studentContext = await getStudentID(studentID)

    if (studentContext.status) {
      setStudentData(studentContext.data)
      setCloseState(true)
      setModalState2(true)
    } else {
      switch (studentContext.report) {
        case "student_not_found":
          addToast({
            theme: "modern",
            icon: "cross",
            title: "ไม่พบนักเรียนที่มีรหัสนักเรียนดังกล่าวในฐานข้อมูล",
            text: "กรุณาลองกรอกใหม่อีกครั้ง หากยังไม่ได้ให้ติดต่อทาง กช.",
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

  const submitData = async () => {
    if (disable) return
    const out = await addCommittee(studentID, password)

    if (out.status) {
      setCloseState2(true)
      addToast({
        theme: "modern",
        icon: "tick",
        title: "เพิ่มนักเรียนดังกล่าวเป็นกรรมการชมรมเรียบร้อย",
        text: "",
      })
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

  const removeCommitteeData = async (committeeID) => {
    if (disable) return
    const out = await removeCommittee(committeeID, password)

    if (out.status) {
      setCloseState3(true)
      addToast({
        theme: "modern",
        icon: "tick",
        title: "ลบนักเรียนดังกล่าวออกจากการเป็นกรรมการชมรมเรียบร้อย",
        text: "",
      })
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

        case "cannot_remove_self":
          addToast({
            theme: "modern",
            icon: "cross",
            title: "ไม่สามารถลบตนเองออกจากการเป็นกรรมการชมรมได้",
            text: "",
          })
          break

        case "not_in_committee":
          addToast({
            theme: "modern",
            icon: "cross",
            title: "นักเรียนดังกล่าวไม่ได้เป็นกรรมการชมรม",
            text: "",
          })
          break

        default:
          break
      }
    }
  }

  const enableRemoveModal = async (committeeID) => {
    if (disable) return
    const studentContext = await getStudentID(committeeID)

    if (studentContext.status) {
      setStudentData(studentContext.data)
      setModalState3(true)
    } else {
      switch (studentContext.report) {
        case "student_not_found":
          addToast({
            theme: "modern",
            icon: "cross",
            title: "ไม่พบนักเรียนที่มีรหัสนักเรียนดังกล่าวในฐานข้อมูล",
            text: "กรุณาลองกรอกใหม่อีกครั้ง หากยังไม่ได้ให้ติดต่อทาง กช.",
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
    <div>
      <Modal
        overlayClassName="fixed flex flex-col items-center justify-center top-0 left-0 bg-black bg-opacity-20 w-full min-h-screen z-[99]"
        className="flex min-w-[340px] flex-col items-center rounded-lg bg-white"
        CloseDep={{
          dep: closeState,
          revert: () => {
            setCloseState(false)
          },
        }}
        TriggerDep={{
          dep: modalState,
          revert: () => {
            setModalState(false)
          },
        }}
      >
        <div className="flex flex-col items-center px-4 py-4">
          <div className="mt-1 mb-2 rounded-full bg-TUCMC-orange-200 p-3">
            <ExclamationIcon className="h-6 w-6 text-TUCMC-orange-500" />
          </div>
          <div className="space-y-1">
            <h1 className="text-center text-TUCMC-gray-900">เพิ่มกรรมการชมรม</h1>
            <p className="text-center text-sm text-TUCMC-gray-500">โปรดกรอกข้อมูลด้วยความระมัดระวัง</p>
          </div>
        </div>
        <div className="w-full space-y-6 rounded-b-lg bg-TUCMC-gray-100 px-4 py-4">
          <Input stateUpdate={(v) => setStudentID(v)} type="text" className="h-10" placeholder="เลขประจำตัวนักเรียน" />
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
          },
        }}
        TriggerDep={{
          dep: modalState2,
          revert: () => {
            setModalState2(false)
          },
        }}
      >
        <div className="flex w-full flex-col items-center px-4 py-4">
          <div className="mt-1 mb-2 rounded-full bg-TUCMC-orange-200 p-3">
            <ExclamationIcon className="h-6 w-6 text-TUCMC-orange-500" />
          </div>
          <div className="w-full space-y-1">
            <h1 className="text-center text-TUCMC-gray-900">เพิ่มกรรมการชมรม</h1>
            <p className="text-center text-sm text-TUCMC-gray-600">คุณกำลังจะเพิ่ม</p>
            <div className="flex w-full flex-col items-center rounded-md border border-TUCMC-gray-400 py-2 text-sm text-TUCMC-gray-600">
              <span>
                {studentData?.title}
                {studentData?.firstname} {studentData?.lastname}
              </span>
              <span>
                ชั้น ม.{studentData?.level} ห้อง {studentData?.room} เลขประจำตัว {studentData?.student_id}
              </span>
            </div>
            <p className="text-center text-sm text-TUCMC-gray-600">เป็นกรรมการชมรม</p>
          </div>
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
      </Modal>
      {/* Modal 3 */}
      <Modal
        overlayClassName="fixed flex flex-col items-center justify-center top-0 left-0 bg-black bg-opacity-20 w-full min-h-screen z-[99]"
        className="flex min-w-[340px] flex-col items-center rounded-lg bg-white"
        CloseDep={{
          dep: closeState3,
          revert: () => {
            setCloseState3(false)
          },
        }}
        TriggerDep={{
          dep: modalState3,
          revert: () => {
            setModalState3(false)
          },
        }}
      >
        <div className="flex w-full flex-col items-center px-4 py-4">
          <div className="mt-1 mb-2 rounded-full bg-TUCMC-red-400 p-3">
            <ExclamationIcon className="h-6 w-6 text-TUCMC-gray-200" />
          </div>
          <div className="w-full space-y-1">
            <h1 className="text-center text-TUCMC-gray-900">ลบกรรมการชมรม</h1>
            <p className="text-center text-sm text-TUCMC-gray-600">คุณกำลังจะลบ</p>
            <div className="flex w-full flex-col items-center rounded-md border border-TUCMC-gray-400 py-2 text-sm text-TUCMC-gray-600">
              <span>
                {studentData?.title}
                {studentData?.firstname} {studentData?.lastname}
              </span>
              <span>
                ชั้น ม.{studentData?.level} ห้อง {studentData?.room} เลขประจำตัว {studentData?.student_id}
              </span>
            </div>
            <p className="text-center text-sm text-TUCMC-gray-600">ออกจากการเป็นกรรมการชมรม</p>
          </div>
        </div>
        <div className="w-full space-y-6 rounded-b-lg bg-TUCMC-gray-100 px-4 py-4">
          <Input stateUpdate={setPassword} type="password" className="h-10" placeholder="รหัสผ่าน" />
          <div className="space-y-2">
            <button
              onClick={() => removeCommitteeData(studentData?.student_id)}
              className="flex w-full items-center justify-center space-x-1 rounded-lg bg-TUCMC-red-400 py-2 text-white"
            >
              <TrashIcon className="h-5 w-5" />
              <span>ยืนยัน</span>
            </button>
            <button
              onClick={() => {
                setCloseState3(true)
              }}
              className="text-gray-TUCMC-600 w-full rounded-lg border border-gray-400 bg-white py-2"
            >
              ยกเลิก
            </button>
          </div>
        </div>
      </Modal>

      <div className="relative">
        <div className="flex flex-col items-center justify-between sm:flex-row">
          <div>
            <h1 className="text-xl">กรรมการชมรม</h1>
            <p className="text-sm text-TUCMC-gray-600">กรรมการชมรม เช่น ประธานชมรม รองประธานชมรม เลขานุการ</p>
          </div>
          <button
            onClick={enableModal}
            className={classnames(
              "mt-3 min-w-[200px] rounded-full px-8 py-2 text-white transition-colors sm:mt-0",
              disable ? "cursor-not-allowed bg-TUCMC-gray-400" : "bg-TUCMC-pink-400 hover:bg-TUCMC-pink-500"
            )}
          >
            เพิ่มกรรมการชมรม
          </button>
        </div>

        <hr className="my-6" />

        <div className="relative">
          {disable && new Date().getTime() < editInitData && (
            <div className="absolute flex h-full w-full items-center justify-center backdrop-blur-[2px]">
              <div className="flex w-full flex-col items-center rounded-lg bg-white px-8 py-6 text-gray-900 shadow-md">
                <h1 className="text-lg">ส่วนแก้ไขรายชื่อกรรมการชมรม</h1>
                <h1 className="text-lg">
                  จะเปิดให้แก้ไขในวันที่{" "}
                  <span className="font-medium">
                    {new Date(editInitData).getDate()} {THAI_MONTH[new Date(editInitData).getMonth()]}{" "}
                    {new Date(editInitData).getFullYear() + 543}
                  </span>
                </h1>
                <Counter target={editInitData} />
              </div>
            </div>
          )}
          <div className="flex flex-col space-y-6">
            {committee?.map((user) => {
              if (!user) return
              return (
                <Fragment key={user.student_id}>
                  <div className="flex flex-col items-start justify-between px-2 sm:flex-row sm:items-center sm:px-4">
                    <div>
                      <p>
                        {user.title}
                        {user.firstname} {user.lastname}
                      </p>
                    </div>
                    <div className="flex items-center justify-between space-x-12">
                      <p className="">{user.student_id}</p>

                      <p>ม.{user.level}</p>

                      <p className="w-[28px] text-center">{user.room}</p>

                      {disable ? (
                        <button className="w-24 cursor-not-allowed rounded-md border border-gray-300 bg-gray-100 py-2 text-gray-600 transition-colors">
                          ลบ
                        </button>
                      ) : (
                        <button
                          onClick={() => enableRemoveModal(user.student_id)}
                          className="w-24 rounded-md border border-gray-300 bg-white py-2 text-gray-600 transition-colors hover:bg-gray-100"
                        >
                          ลบ
                        </button>
                      )}
                    </div>
                  </div>

                  <hr className="my-2" />
                </Fragment>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
