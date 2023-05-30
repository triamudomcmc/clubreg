import { Tooltip } from "@components/dummy/common/Tooltip"
import { CheckCircleIcon, DotsCircleHorizontalIcon, XCircleIcon, InformationCircleIcon } from "@heroicons/react/solid"
import { translateClubID } from "@utilities/object"
import { useState } from "react"

const ClubStatus = ({ data, action, selectTrigger }) => {
  let interaction, status

  const select = (mode: "confirm" | "reject") => {
    action({ open: true, data: { title: translateClubID(data.clubID), clubID: data.clubID, audition: true } })
    selectTrigger({ state: true, mode: mode })
  }

  const [show, setShow] = useState(false)

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
          <span className="flex flex-row leading-6">
            ติดสำรอง ลำดับที่ {data.position} จาก {data.fromPos}
            {data.section && (
              <span className="ml-1 flex flex-row items-center justify-between">
                <span>- ส่วน {data.section}</span>
                <span className="relative ml-2 cursor-pointer">
                  <span
                    onClick={() => {
                      setShow(true)
                    }}
                  >
                    <InformationCircleIcon className="h-5 w-5 text-TUCMC-gray-400" />
                  </span>
                  {show && (
                    <>
                      <div
                        onClick={() => {
                          setShow(false)
                        }}
                        className="fixed top-0 min-h-screen w-full"
                      />
                      <Tooltip type={"top-right"} className="absolute top-[20px] left-[-285px] z-[10] w-[320px]">
                        <div>
                          <span className="text-sm font-bold">ส่วนในชมรมคืออะไร</span> <br /> ลำดับที่ {data.position}{" "}
                          จาก {data.fromPos} หมายถึงนักเรียนได้ลำดับสำรองที่ {data.position} จากทั้งหมด {data.fromPos}{" "}
                          คน ในส่วน {data.section} ของชมรมนี้
                        </div>
                        <br />
                        <div>
                          <span className="font-bold">หากมีนักเรียน</span>ในส่วน {data.section}{" "}
                          สละสิทธิ์ระบบจำเรียกลำดับสำรองในลำดับถัดไปในส่วน {data.section} ขึ้นมา
                        </div>
                      </Tooltip>
                    </>
                  )}
                </span>
              </span>
            )}
          </span>
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
          <span className="leading-6">ไม่ผ่านการ Audition</span>
        </div>
      )
      interaction = <></>
  }
  return (
    <div className="rounded-lg bg-white shadow-md">
      <div className="flex flex-col space-y-0.5 py-[22px] px-6 tracking-tight text-TUCMC-gray-700">
        <h1>ชมรม{translateClubID(data.clubID)}</h1>
        {status}
      </div>
      {interaction}
    </div>
  )
}

export default ClubStatus
