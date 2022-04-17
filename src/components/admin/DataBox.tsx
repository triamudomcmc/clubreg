import { ChevronDownIcon, TrashIcon } from "@heroicons/react/solid"

export const DataBox = ({ data, setEdit }) => {
  return (
    <div className="rounded-md bg-white px-4 py-4 text-sm shadow-md">
      <span className="text-[10px] text-TUCMC-gray-700">ID: {data.userID}</span>
      <div className="flex space-x-2">
        <div className="flex items-center">
          <span className="font-medium">audition</span>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
        <span className="font-medium">
          club:{" "}
          <span
            onClick={() => {
              setEdit({ refID: data.refID, field: "club", data: data.club })
            }}
            className="cursor-pointer font-normal text-TUCMC-gray-700"
          >
            {data.club}
          </span>
        </span>
        <span className="font-medium">
          old_club:{" "}
          <span
            onClick={() => {
              setEdit({ refID: data.refID, field: "old_club", data: data.old_club })
            }}
            className="cursor-pointer font-normal text-TUCMC-gray-700"
          >
            {data.old_club}
          </span>
        </span>
      </div>
      <div className="space-x-2">
        <span className="font-medium">
          name:{" "}
          <span
            onClick={() => {
              setEdit({ refID: data.refID, field: "title", data: data.title })
            }}
            className="cursor-pointer font-normal text-TUCMC-gray-700"
          >
            {data.title}
          </span>{" "}
          <span
            onClick={() => {
              setEdit({ refID: data.refID, field: "firstname", data: data.firstname })
            }}
            className="cursor-pointer font-normal text-TUCMC-gray-700"
          >
            {data.firstname}
          </span>{" "}
          <span
            onClick={() => {
              setEdit({ refID: data.refID, field: "lastname", data: data.lastname })
            }}
            className="cursor-pointer font-normal text-TUCMC-gray-700"
          >
            {data.lastname}
          </span>
        </span>
        <span className="font-medium">
          level:{" "}
          <span
            onClick={() => {
              setEdit({ refID: data.refID, field: "level", data: data.level })
            }}
            className="cursor-pointer font-normal text-TUCMC-gray-700"
          >
            {data.level}
          </span>
        </span>
      </div>
      <div className="space-x-2">
        <span className="font-medium">
          student_id:{" "}
          <span
            onClick={() => {
              setEdit({ refID: data.refID, field: "student_id", data: data.student_id })
            }}
            className="cursor-pointer font-normal text-TUCMC-gray-700"
          >
            {data.student_id}
          </span>
        </span>
        <span className="font-medium">
          room:{" "}
          <span
            onClick={() => {
              setEdit({ refID: data.refID, field: "room", data: data.room })
            }}
            className="cursor-pointer font-normal text-TUCMC-gray-700"
          >
            {data.room}
          </span>
        </span>
        <span className="font-medium">
          number:{" "}
          <span
            onClick={() => {
              setEdit({ refID: data.refID, field: "number", data: data.number })
            }}
            className="cursor-pointer font-normal text-TUCMC-gray-700"
          >
            {data.number}
          </span>
        </span>
      </div>
      <div className="mt-2 space-x-2">
        <span className="font-medium">
          email:{" "}
          <span
            onClick={() => {
              setEdit({ refID: data.userID, field: "email", data: data.email })
            }}
            className="cursor-pointer font-normal text-TUCMC-gray-700"
          >
            {data.email}
          </span>
        </span>
      </div>
      <div className="flex items-center justify-between space-x-2">
        <span className="font-medium">
          phone:{" "}
          <span
            onClick={() => {
              setEdit({ refID: data.userID, field: "phone", data: data.phone })
            }}
            className="cursor-pointer font-normal text-TUCMC-gray-700"
          >
            {data.phone}
          </span>
        </span>
        <div>
          <TrashIcon className="h-5 w-5 text-TUCMC-gray-600" />
        </div>
      </div>
    </div>
  )
}
