import {ClipboardCopyIcon, StarIcon} from "@heroicons/react/solid";

export const ClubCard = ({audition = false}) => {
  return(
    <div className="flex flex-col rounded-lg minClubs2:mx-1 my-1 mx-10 shadow-md w-full minClubs2:w-175px minClubs:w-185px">
      <img className="object-cover rounded-t-lg w-full" width="185" height="102" src="/assets/images/placeholder/thumb1.png"/>
      <div className="px-2 bg-white rounded-b-lg py-2 space-y-2.5">
        <h1 className="text-sm tracking-tight">ชมรมสีสรรพ์ภาษาต่างประเทศที่ 2 (French Chorus)</h1>
        {audition ? <div className="flex text-xs text-TUCMC-red-400 space-x-1"><StarIcon
          className="w-4 h-4 mt-1"/><span className="leading-6">มีการ Audition</span></div>:<div className="flex text-xs text-TUCMC-blue-400 space-x-1"><ClipboardCopyIcon
          className="w-4 h-4 mt-1"/><span className="leading-6">ไม่มีการ Audition</span></div>}
      </div>
    </div>
  )
}