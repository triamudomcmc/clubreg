import {ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/solid";

export const ListElement = ({index = 0}) => {
  return (
    <div className="flex items-center justify-between pr-4 py-5 md:py-8 border-b border-TUCMC-gray-300">
      <div className="flex items-center">
        {index > 0 && <div className="text-center bg-black text-white rounded-full w-6 h-6 -mr-2">
          {index}
        </div>}
        <div className="flex flex-col items-start ml-6">
          <h1>นายพีรดนย์ สาเงิน</h1>
          <span className="md:hidden text-TUCMC-gray-600">59574  |  ม.4/931</span>
          <div className="md:hidden bg-TUCMC-gray-800 text-white rounded-full tracking-tight text-sm px-4 py-0.5 -ml-[2px] mt-1">รอการตอบรับ</div>
        </div>
      </div>
      <div className="flex text-TUCMC-gray-600">
        <div className="hidden md:block space-x-16 mr-28">
          <span>59574</span>
          <span>ม.4</span>
          <span>931</span>
        </div>
        {/*<span>เปลี่ยน</span>*/}
        <div className="md:block hidden bg-TUCMC-gray-800 text-white rounded-full tracking-tight text-sm px-4 py-0.5 -ml-[2px] mt-1">รอการตอบรับ</div>
        {/*<div>
          <div className="border rounded-t-md p-1.5">
            <ChevronUpIcon className="w-4 h-4"/>
          </div>
          <div className="border -mt-px rounded-b-md p-1.5">
            <ChevronDownIcon className="w-4 h-4"/>
          </div>
        </div>*/}
      </div>
    </div>
  )
}