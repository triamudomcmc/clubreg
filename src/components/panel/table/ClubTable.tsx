import { CheckIcon, XIcon } from "@heroicons/react/outline"
import { PencilIcon } from "@heroicons/react/solid"
import { isEmpty } from "@utilities/object"
import classNames from "classnames"
import { FC, useState } from "react"

/*
which type of input
placeholder
enabled to edit?
which action to take when done editing
default value
*/

const TableRow: FC<{ title: string; initialValue: string }> = ({ title, initialValue }) => {
  const [beforeValue, setBeforeValue] = useState(initialValue)
  const [value, setValue] = useState(initialValue)
  const [mode, setMode] = useState<"view" | "edit">("view")

  return (
    <div className="grid grid-cols-1 border-b border-gray-200 py-4 md:grid-cols-[2fr,3fr] md:items-center md:py-6">
      <p className="text-TUCMC-gray-500">{title}</p>
      {mode === "view" && (
        <div className="flex items-start space-x-2">
          <div className="block">{value}</div>
          <button onClick={() => setMode("edit")}>
            <PencilIcon className="h-5 w-5 text-gray-900" />
          </button>
        </div>
      )}

      {mode === "edit" && (
        <div className="flex items-center space-x-2">
          <input
            className="rounded-md border border-gray-300"
            type="text"
            onChange={(e) => setValue(e.target.value)}
            value={value}
            placeholder="placeholder"
          />
          <div className="flex space-x-2">
            <button
              className="rounded-md bg-green-400 p-2 transition-colors hover:bg-green-500"
              onClick={() => {
                setBeforeValue(value)
                setMode("view")
              }}
            >
              <CheckIcon className="h-5 w-5 text-white" />
            </button>
            <button
              className="rounded-md bg-red-400 p-2 transition-colors hover:bg-red-500"
              onClick={() => {
                setValue(beforeValue)
                setMode("view")
              }}
            >
              <XIcon className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export const ClubTable: FC = () => {
  return (
    <div>
      <h1 className="border-b border-gray-200 pb-4 text-xl">ข้อมูลชมรม</h1>

      <TableRow title="ประเภทการรับสมัคร" initialValue={"Audition"} />
      <TableRow title="ข้อความถึงสมาชิกชมรม" initialValue={"Audition"} />
      <TableRow title="ช่องทางการติดต่อชมรม" initialValue={"Audition"} />
      <TableRow title="สถานที่ทำการเรียนการสอน" initialValue={"Audition"} />
    </div>
  )
}
