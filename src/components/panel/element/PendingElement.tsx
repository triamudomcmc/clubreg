import {CheckCircleIcon, ChevronDownIcon, XCircleIcon} from "@heroicons/react/solid";
import {Button} from "@components/common/Inputs/Button";

export const PendingElement = () => {
  return (
    <div className="bg-white p-5 rounded-lg shadow-md">
      <h1>นายพีรดนย์ สาเงิน</h1>
      <span className="text-TUCMC-gray-600">59574  |  ม.4/931</span>
      <div className="flex space-x-2 mt-3">
        <div className="flex items-center space-x-1 border rounded-md px-6 py-1">
          <CheckCircleIcon className="w-5 h-5 text-TUCMC-green-400"/>
          <span>รับ</span>
        </div>
        <div className="flex items-center space-x-1 border rounded-md px-3 py-1">
          <span>สำรอง</span>
          <ChevronDownIcon className="w-5 h-5"/>
        </div>
        <div className="flex items-center space-x-1 border rounded-md px-4 py-1">
          <XCircleIcon className="w-5 h-5 text-TUCMC-red-400"/>
          <span>ไม่รับ</span>
        </div>
      </div>
    </div>
  )
}