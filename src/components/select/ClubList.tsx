import {ClipboardCopyIcon, StarIcon} from "@heroicons/react/solid";
import {Dispatch, SetStateAction} from "react";
import {useAuth} from "@client/auth";
import LooseTypeObject from "../../interfaces/LooseTypeObject";
import classnames from "classnames"
import {Full, Vacant} from "@vectors/texts/ClubStates";
import {useToast} from "@components/common/Toast/ToastContext";

interface props {
  data: LooseTypeObject<string>,
  action: Dispatch<SetStateAction<{ open: boolean, data: {} }>>

}

const ClubList = ({data, action}: props) => {

  const { tracker } = useAuth()

  const { addToast } = useToast()

  const click = () => {
    if (!data.blocked) {
      action({open: true, data: data})
      tracker && tracker.push("click","select_d>"+data.clubID)
    }else{
      addToast({
        theme:"modern",
        icon: "cross",
        title: "ขออภัยคุณได้เลือกชมรมที่มีการ Audition ไปแล้ว",
        text: "กรุณาเลือกชมรมอื่น เนื่องจากหากลง Audition ไปแล้วจะไม่สามารถเลือกชมรมที่ไม่มีการ Audition ได้"
      })
    }
  }

  return (
    <div className={classnames("flex rounded-lg custom-shadow bg-white cursor-pointer", data.blocked && "bg-TUCMC-gray-100")} onClick={click}>
      {!data.audition && (data.new_count < data.new_count_limit ? <div
        className={classnames("flex items-center font-medium rounded-l-lg bg-TUCMC-green-400 text-white w-3 pl-[1px]", data.blocked && "bg-TUCMC-gray-400")}>
        <Vacant/></div> : <div
        className={classnames("flex items-center font-medium rounded-l-lg bg-TUCMC-red-400 text-white w-3 pl-[3px]", data.blocked && "bg-TUCMC-gray-400")}>
        <Full/></div>)}
      <div className="flex flex-col tracking-tight py-6 px-6 space-y-1.5">
        <h1>ชมรม{data.title}</h1>
        {data.audition ? <div className="flex text-TUCMC-pink-400 space-x-1"><StarIcon
          className="w-4 h-4 mt-1"/><span className="leading-6">มีการ Audition</span></div>: <div className="flex text-TUCMC-blue-400 space-x-1"><ClipboardCopyIcon
          className="w-4 h-4 mt-1"/><span className="leading-6">ไม่มีการ Audition</span></div>}
      </div>
    </div>
  )
}

export default ClubList