import {ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/solid";

export const ListElement = ({index = 0, userData, editable, editFunc}) => {

  let statusBar = <div
    className="bg-TUCMC-gray-800 text-white rounded-full tracking-tight text-sm px-4 py-0.5">รอการตอบรับ</div>
  if (userData.status === "confirmed") {
    statusBar = <div
      className="bg-TUCMC-green-400 text-white rounded-full tracking-tight text-sm px-4 py-0.5">ยืนยันสิทธิ์แล้ว</div>
  }
  if (userData.status === "rejected") {
    statusBar = <div
      className="bg-TUCMC-red-400 text-white rounded-full tracking-tight text-sm px-4 py-0.5">สละสิทธิ์แล้ว</div>
  }

  return (
    <div className="flex items-center justify-between pr-4 py-5 md:py-8 border-b border-TUCMC-gray-300 bg-white">
      <div className="flex items-center">
        {index > 0 && <div className="text-center bg-black text-white rounded-full w-6 h-6 -mr-2">
          {index}
        </div>}
        <div className="flex flex-col items-start ml-6">
          <h1>{userData.title}{userData.firstname} {userData.lastname}</h1>
          <span className="md:hidden text-TUCMC-gray-600">{userData.student_id}  |  ม.{userData.level}/{userData.room}</span>
          {!editable && <div className="md:hidden mt-1 -ml-[2px]">{statusBar}</div>}
        </div>
      </div>
      <div className="flex text-TUCMC-gray-600">
        <div className="hidden md:block space-x-16 mr-28">
          <span>{userData.student_id}</span>
          <span>ม.{userData.level}</span>
          <span>{userData.room}</span>
        </div>
        {editable && <span onClick={() => {editFunc(userData)}}>เปลี่ยน</span>}
        {!editable && <div className="hidden md:block">{statusBar}</div>}
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