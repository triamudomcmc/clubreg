import {
  CheckCircleIcon,
  DotsCircleHorizontalIcon,
  XCircleIcon
} from "@heroicons/react/solid";


interface props {
  title: string,
  state: "pass" | "failed" | "waiting"
}

const ClubStatus = ({title, state}: props) => {
  let interaction, status;
  switch (state) {
    case "pass":
      interaction = <div className="flex">
        <div
          className="flex justify-center text-sm font-medium cursor-pointer rounded-bl-lg bg-TUCMC-green-400 space-x-2 text-white py-4 w-1/2">
          <CheckCircleIcon className="w-5 h-5"/><span>ยืนยันสิทธิ์</span></div>
        <div
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
    case "waiting":
      status = <div className="flex text-TUCMC-orange-400 space-x-1"><DotsCircleHorizontalIcon
        className="w-5 h-5 mt-0.5"/><span className="leading-6">ติดสำรอง</span></div>
  }
  return(
    <div className="rounded-lg custom-shadow bg-white">
      <div className="flex flex-col tracking-tight py-6 px-6 space-y-1.5">
        <h1>{title}</h1>
        {status}
      </div>
      {interaction}
    </div>
  )
}

export default ClubStatus