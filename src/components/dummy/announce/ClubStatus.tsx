import { CheckCircleIcon, DotsCircleHorizontalIcon, XCircleIcon, InformationCircleIcon } from "@heroicons/react/solid"
import { useWindowDimensions } from "@utilities/document"
import { translateClubID } from "@utilities/object"
import { Tooltip } from "../common/Tooltip"

const ClubStatus = ({ data, action, selectTrigger }) => {
  let interaction, status
  const { width } = useWindowDimensions()

  const select = (mode: "confirm" | "reject") => {
    action({ open: true, data: { title: translateClubID(data.clubID), clubID: data.clubID, audition: true } })
    selectTrigger({ state: true, mode: mode })
  }

  switch (data.status) {
    case "passed":
      interaction = (
        <div className="flex">
          <div
            onClick={() => {
              select("confirm")
            }}
            className="flex w-1/2 cursor-pointer justify-center space-x-2 rounded-bl-lg bg-TUCMC-green-400 py-4 text-sm font-medium text-white"
          >
            <CheckCircleIcon className="h-5 w-5" />
            <span>ยืนยันสิทธิ์</span>
          </div>
          <div
            onClick={() => {
              select("reject")
            }}
            className="flex w-1/2 cursor-pointer justify-center space-x-2 rounded-br-lg border-l border-white bg-TUCMC-red-400 py-4 text-sm font-medium text-white"
          >
            <XCircleIcon className="h-5 w-5" />
            <span>สละสิทธิ์</span>
          </div>
        </div>
      )
      status = (
        <div className="flex space-x-1 text-TUCMC-green-400">
          <CheckCircleIcon className="mt-0.5 h-5 w-5" />
          <span className="leading-6">ผ่านการ Audition</span>
        </div>
      )
      break
    case "failed":
      status = (
        <div className="flex space-x-1 text-TUCMC-red-400">
          <XCircleIcon className="mt-0.5 h-5 w-5" />
          <span className="leading-6">ไม่ผ่านการ Audition</span>
        </div>
      )
      interaction = <></>
      break
    case "reserved":
      status = (
        <div className="flex space-x-1 text-TUCMC-orange-400">
          <DotsCircleHorizontalIcon className="mt-0.5 h-5 w-5" />
          <span className="leading-6">ติดสำรอง ลำดับที่ 1 จาก 23 - ส่วนผู้จัดหาอาหาร</span>
        </div>
      )
      interaction = <></>
      break
    case "confirmed":
      status = (
        <div className="flex space-x-1 text-TUCMC-green-400">
          <CheckCircleIcon className="mt-0.5 h-5 w-5" />
          <span className="leading-6">ยืนยันสิทธิ์ชมรมแล้ว</span>
        </div>
      )
      interaction = <></>
      break
    case "rejected":
      status = (
        <div className="flex space-x-1 text-TUCMC-red-400">
          <XCircleIcon className="mt-0.5 h-5 w-5" />
          <span className="leading-6">สละสิทธิ์ชมรมแล้ว</span>
        </div>
      )
      interaction = <></>
      break
    default:
      status = (
        <div className="flex space-x-1 text-TUCMC-red-400">
          <InformationCircleIcon className="mt-0.5 h-5 w-5" />
          <span className="leading-6">ยังไม่ข้อมูลบนระบบ</span>
        </div>
      )
      interaction = <></>
  }
  return (
    <div className="relative">
      <div className="rounded-lg bg-white shadow-md">
        <div className="flex flex-col space-y-0.5 py-[22px] px-6 tracking-tight text-TUCMC-gray-700">
          <h1>ชมรม{translateClubID(data.clubID)}</h1>
          {status}
        </div>
        {interaction}
      </div>
      {data.clubID.includes("ก400") && data.status === "passed" && (
        <Tooltip type={width < 1024 ? "top" : "left"} className="relative mt-4 lg:absolute lg:top-4 lg:right-[-300px]">
          <span className="font-semibold">หากยืนยันสิทธิ์ชมรม</span>แล้วจะถือว่าอยู่ชมรมนั้นทันที <br />
          และจะไม่สามารถเปลี่ยนชมรมได้ <br />
          <br />
          <span className="font-semibold">หากสละสิทธิ์ชมรม</span>จะถือว่าสละสิทธิ์จากชมรมนั้นแล้ว <br />
          จะไม่สามารถกลับมายืนยันสิทธิ์ชมรมนั้นได้อีก
        </Tooltip>
      )}
      {data.clubID.includes("ก400") && data.status === "reserved" && (
        <Tooltip type={width < 1024 ? "top" : "left"} className="relative mt-2 lg:absolute lg:top-4 lg:right-[-314px]">
          หากมีสถานะเป็นติดสำรอง นักเรียนสามารถรอลุ้นผล
          <br />
          วันประกาศลำดับสำรองได้ โดยถ้าหากถูกเรียก
          <br />
          ลำดับสำรองระบบจะเปลี่ยนสถานะเป็น ผ่านการคัดเลือก
        </Tooltip>
      )}
    </div>
  )
}

export default ClubStatus
