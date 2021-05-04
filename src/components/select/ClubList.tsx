import {ClipboardCopyIcon, StarIcon} from "@heroicons/react/solid";
import {Dispatch, SetStateAction} from "react";
import {Tracker} from "@client/tracker/track";
import {useAuth} from "@client/auth";
import LooseTypeObject from "../../interfaces/LooseTypeObject";
import classnames from "classnames"

interface props {
  data: LooseTypeObject<string>,
  action: Dispatch<SetStateAction<{ open: boolean, data: {} }>>,
  setToast: Dispatch<SetStateAction<{}>>

}

const ClubList = ({data, action, setToast}: props) => {

  const { tracker } = useAuth()

  const click = () => {
    if (!data.blocked) {
      action({open: true, data: data})
      tracker && tracker.push("click","select_d>"+data.clubID)
    }else{
      setToast({
        theme:"modern",
        icon: "cross",
        title: "ขออภัยคุณได้เลือกชมรมที่มีการ Audition ไปแล้ว",
        text: "กรุณาเลือกชมรมอื่น เนื่องจากหากลง Audition ไปแล้วจะไม่สามารถเลือกชมรมที่ไม่มีการ Audition ได้"
      })
    }
  }

  return (
    <div className={classnames("rounded-lg custom-shadow cursor-pointer", data.blocked && "bg-TUCMC-gray-100")} onClick={click}>
      <div className="flex flex-col tracking-tight py-6 px-6 space-y-1.5">
        <h1>ชมรม{data.title}</h1>
        {data.audition ? <div className="flex text-TUCMC-red-400 space-x-1"><StarIcon
          className="w-4 h-4 mt-1"/><span className="leading-6">มีการ Audition</span></div>: <div className="flex text-TUCMC-blue-400 space-x-1"><ClipboardCopyIcon
          className="w-4 h-4 mt-1"/><span className="leading-6">ไม่มีการ Audition</span></div>}
      </div>
      {!data.audition && (data.new_count < data.new_count_limit ? <div
        className={classnames("flex justify-center text-sm font-medium rounded-b-lg bg-TUCMC-green-400 text-white py-4", data.blocked && "bg-TUCMC-gray-400")}>
        <span>มีที่นั่งว่าง</span></div> : <div
        className={classnames("flex justify-center text-sm font-medium rounded-b-lg bg-TUCMC-red-400 text-white py-4", data.blocked && "bg-TUCMC-gray-400")}>
        <span>เต็ม</span></div>)}
    </div>
  )
}

export default ClubList