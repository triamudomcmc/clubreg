import {ClipboardCopyIcon, StarIcon} from "@heroicons/react/solid";
import {Dispatch, SetStateAction} from "react";
import {Tracker} from "@client/tracker/track";
import {useAuth} from "@client/auth";
import LooseTypeObject from "../../interfaces/LooseTypeObject";

interface props {
  data: LooseTypeObject<string>,
  state?: "full" | "open",
  action: Dispatch<SetStateAction<{ open: boolean, data: {} }>>
}

const ClubList = ({data, state = "open", action}: props) => {

  const { tracker } = useAuth()

  const click = () => {
    action({open: true, data: {title: data.title}})
    tracker && tracker.push("click","select_display->"+data.title)
  }

  return (
    <div className="rounded-lg custom-shadow cursor-pointer" onClick={click}>
      <div className="flex flex-col tracking-tight py-6 px-6 space-y-1.5">
        <h1>ชมรม{data.title}</h1>
        {data.audition ? <div className="flex text-TUCMC-red-400 space-x-1"><StarIcon
          className="w-4 h-4 mt-1"/><span className="leading-6">มีการ Audition</span></div>: <div className="flex text-TUCMC-blue-400 space-x-1"><ClipboardCopyIcon
          className="w-4 h-4 mt-1"/><span className="leading-6">ไม่มีการ Audition</span></div>}
      </div>
      {!data.audition && (state == "open" ? <div
        className="flex justify-center text-sm font-medium rounded-b-lg bg-TUCMC-green-400 text-white py-4">
        <span>มีที่นั่งว่าง</span></div> : <div
        className="flex justify-center text-sm font-medium rounded-b-lg bg-TUCMC-red-400 text-white py-4">
        <span>เต็ม</span></div>)}
    </div>
  )
}

export default ClubList