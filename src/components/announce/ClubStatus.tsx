import {
  CheckCircleIcon,
  DotsCircleHorizontalIcon,
  XCircleIcon,
  InformationCircleIcon
} from "@heroicons/react/solid";
import {translateClubID} from "@utilities/object";



const ClubStatus = ({ data, action , selectTrigger}) => {
  let interaction, status;

  const select = (mode: "confirm" | "reject") => {
    action({open: true, data: {title: translateClubID(data.clubID), clubID: data.clubID, audition: true}})
    selectTrigger({state: true, mode: mode})
  }

  switch (data.status) {
    case "passed":
      interaction = <div className="flex">
        <div
          onClick={() => {select("confirm")}}
          className="flex justify-center text-sm font-medium cursor-pointer rounded-bl-lg bg-TUCMC-green-400 space-x-2 text-white py-4 w-1/2">
          <CheckCircleIcon className="w-5 h-5"/><span>ยืนยันสิทธิ์</span></div>
        <div
          onClick={() => {select("reject")}}
          className="flex justify-center text-sm font-medium cursor-pointer border-l border-white rounded-br-lg bg-TUCMC-red-400 space-x-2 text-white py-4 w-1/2">
          <XCircleIcon className="w-5 h-5"/><span>สละสิทธิ์</span></div>
      </div>
      status = <div className="flex text-TUCMC-green-400 space-x-1"><CheckCircleIcon
        className="w-5 h-5 mt-0.5"/><span className="leading-6">ผ่านการ Audition</span></div>
      break
    case "failed":
      status = <div className="flex text-TUCMC-red-400 space-x-1"><XCircleIcon
        className="w-5 h-5 mt-0.5"/><span className="leading-6">ไม่ผ่านการ Audition</span></div>
      interaction = <></>
      break
    case "reserved":
      status = <div className="flex text-TUCMC-orange-400 space-x-1"><DotsCircleHorizontalIcon
        className="w-5 h-5 mt-0.5"/><span className="leading-6">ติดสำรอง</span></div>
      interaction = <></>
      break
    case "confirmed":
      status = <div className="flex text-TUCMC-green-400 space-x-1"><CheckCircleIcon
        className="w-5 h-5 mt-0.5"/><span className="leading-6">ยืนยันสิทธิ์ชมรมแล้ว</span></div>
      interaction = <></>
      break
    case "rejected":
      status = <div className="flex text-TUCMC-red-400 space-x-1"><XCircleIcon
        className="w-5 h-5 mt-0.5"/><span className="leading-6">สละสิทธิ์ชมรมแล้ว</span></div>
      interaction = <></>
      break
    default:
      status = <div className="flex text-TUCMC-red-400 space-x-1"><InformationCircleIcon
        className="w-5 h-5 mt-0.5"/><span className="leading-6">ยังไม่ข้อมูลบนระบบ</span></div>
      interaction = <></>
  }
  return(
    <div className="rounded-lg shadow-md bg-white">
      <div className="flex flex-col tracking-tight text-TUCMC-gray-700 py-[22px] px-6 space-y-0.5">
        <h1>ชมรม{translateClubID(data.clubID)}</h1>
        {status}
      </div>
      {interaction}
    </div>
  )
}

export default ClubStatus