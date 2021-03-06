import { ClipboardCopyIcon, StarIcon } from "@heroicons/react/solid"
import { Dispatch, SetStateAction } from "react"
import { useAuth } from "@client/auth"
import classnames from "classnames"
import { Full, Vacant } from "@vectors/texts/ClubStates"
import { useToast } from "@components/common/Toast/ToastContext"
import LooseTypeObject from "@interfaces/LooseTypeObject"

interface props {
  data: LooseTypeObject<any>
  action: Dispatch<SetStateAction<{ open: boolean; data: {} }>>
}

const ClubList = ({ data, action }: props) => {
  const { tracker } = useAuth()

  const { addToast } = useToast()

  const click = () => {
    if (!data.blocked) {
      action({ open: true, data: data })
      tracker && tracker.push("click", "select_d>" + data.clubID)
    } else {
      addToast({
        theme: "modern",
        icon: "cross",
        title: "ขออภัยคุณได้เลือกชมรมที่มีการ Audition ไปแล้ว",
        text: "กรุณาเลือกชมรมอื่น เนื่องจากหากลง Audition ไปแล้วจะไม่สามารถเลือกชมรมที่ไม่มีการ Audition ได้",
      })
    }
  }

  return (
    <div
      className={classnames(
        "custom-shadow flex cursor-pointer rounded-lg bg-white",
        data.blocked && "bg-TUCMC-gray-100"
      )}
      onClick={click}
    >
      {!data.audition &&
        (data.new_count < data.new_count_limit ? (
          <div
            className={classnames(
              "flex w-3 items-center rounded-l-lg bg-TUCMC-green-400 pl-[1px] font-medium text-white",
              data.blocked && "bg-TUCMC-gray-400"
            )}
          >
            <Vacant />
          </div>
        ) : (
          <div
            className={classnames(
              "flex w-3 items-center rounded-l-lg bg-TUCMC-red-400 pl-[3px] font-medium text-white",
              data.blocked && "bg-TUCMC-gray-400"
            )}
          >
            <Full />
          </div>
        ))}
      <div className="flex flex-col space-y-1.5 py-6 px-6 tracking-tight">
        <h1>ชมรม{data.title}</h1>
        {data.audition ? (
          <div className="flex space-x-1 text-TUCMC-pink-400">
            <StarIcon className="mt-1 h-4 w-4" />
            <span className="leading-6">มีการ Audition</span>
          </div>
        ) : (
          <div className="flex space-x-1 text-TUCMC-blue-400">
            <ClipboardCopyIcon className="mt-1 h-4 w-4" />
            <span className="leading-6">ไม่มีการ Audition</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default ClubList
