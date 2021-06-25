import {ChevronDownIcon, TrashIcon} from "@heroicons/react/solid";

export const DataBox = ({ data, setEdit }) => {
  return (
    <div className="bg-white px-4 py-4 shadow-md rounded-md text-sm">
      <span className="text-[10px] text-TUCMC-gray-700">ID: {data.userID}</span>
      <div className="flex space-x-2">
        <div className="flex items-center">
          <span className="font-medium">audition</span>
          <ChevronDownIcon className="w-5 h-5"/>
        </div>
        <span className="font-medium">club: <span onClick={() => {setEdit({refID: data.refID, field: "club", data: data.club})}} className="text-TUCMC-gray-700 font-normal cursor-pointer">{data.club}</span></span>
        <span className="font-medium">old_club: <span onClick={() => {setEdit({refID: data.refID, field: "old_club", data: data.old_club})}} className="text-TUCMC-gray-700 font-normal cursor-pointer">{data.old_club}</span></span>
      </div>
      <div className="space-x-2">
        <span className="font-medium">name: <span onClick={() => {setEdit({refID: data.refID, field: "title", data: data.title})}} className="text-TUCMC-gray-700 font-normal cursor-pointer">{data.title}</span> <span onClick={() => {setEdit({refID: data.refID, field: "firstname", data: data.firstname})}} className="text-TUCMC-gray-700 font-normal cursor-pointer">{data.firstname}</span> <span onClick={() => {setEdit({refID: data.refID, field: "lastname", data: data.lastname})}} className="text-TUCMC-gray-700 font-normal cursor-pointer">{data.lastname}</span></span>
        <span className="font-medium">level: <span onClick={() => {setEdit({refID: data.refID, field: "level", data: data.level})}} className="text-TUCMC-gray-700 font-normal cursor-pointer">{data.level}</span></span>
      </div>
      <div className="space-x-2">
        <span className="font-medium">student_id: <span onClick={() => {setEdit({refID: data.refID, field: "student_id", data: data.student_id})}} className="text-TUCMC-gray-700 font-normal cursor-pointer">{data.student_id}</span></span>
        <span className="font-medium">room: <span onClick={() => {setEdit({refID: data.refID, field: "room", data: data.room})}} className="text-TUCMC-gray-700 font-normal cursor-pointer">{data.room}</span></span>
        <span className="font-medium">number: <span onClick={() => {setEdit({refID: data.refID, field: "number", data: data.number})}} className="text-TUCMC-gray-700 font-normal cursor-pointer">{data.number}</span></span>
      </div>
      <div className="space-x-2 mt-2">
        <span className="font-medium">email: <span onClick={() => {setEdit({refID: data.userID, field: "email", data: data.email})}} className="text-TUCMC-gray-700 font-normal cursor-pointer">{data.email}</span></span>
      </div>
      <div className="flex justify-between items-center space-x-2">
        <span className="font-medium">phone: <span onClick={() => {setEdit({refID: data.userID, field: "phone", data: data.phone})}} className="text-TUCMC-gray-700 font-normal cursor-pointer">{data.phone}</span></span>
        <div>
          <TrashIcon className="w-5 h-5 text-TUCMC-gray-600"/>
        </div>
      </div>
    </div>
  )
}