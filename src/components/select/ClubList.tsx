import {ClipboardCopyIcon, StarIcon} from "@heroicons/react/solid";

interface props {
  title: string,
  audition?: boolean,
  state?: "full" | "open",
  action: (value: {open: boolean, data: {}}) => {}
}

const ClubList = ({title, audition = false, state = "open", action}: props) => {

  const click = () => {
    action({open: true, data: {title: title}})
  }

  return (
    <div className="rounded-lg custom-shadow cursor-pointer" onClick={click}>
      <div className="flex flex-col tracking-tight py-6 px-6 space-y-1.5">
        <h1>{title}</h1>
        {audition ? <div className="flex text-TUCMC-red-400 space-x-1"><StarIcon
          className="w-4 h-4 mt-1"/><span className="leading-6">มีการ Audition</span></div>: <div className="flex text-TUCMC-blue-400 space-x-1"><ClipboardCopyIcon
          className="w-4 h-4 mt-1"/><span className="leading-6">ไม่มีการ Audition</span></div>}
      </div>
      {!audition && (state == "open" ? <div
        className="flex justify-center text-sm font-medium rounded-b-lg bg-TUCMC-green-400 text-white py-4">
        <span>มีที่นั่งว่าง</span></div> : <div
        className="flex justify-center text-sm font-medium rounded-b-lg bg-TUCMC-red-400 text-white py-4">
        <span>เต็ม</span></div>)}
    </div>
  )
}

export default ClubList