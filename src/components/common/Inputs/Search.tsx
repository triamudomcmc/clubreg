import {ChevronDownIcon, SearchIcon, SortAscendingIcon} from "@heroicons/react/solid";
import {useRef} from "react";
import Modal from "@components/common/Modals";

export const FilterSearch = () => {

  const buttonRef = useRef(null)

  return (
    <div className="mt-1 flex rounded-md shadow-sm">
      <div className="relative flex items-stretch flex-grow focus-within:z-10">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <input
          type="text"
          name="email"
          id="email"
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md pl-10 sm:text-sm border-gray-300"
          placeholder="Search"
        />
      </div>
      <div>
        <button ref={buttonRef} className="-ml-px relative inline-flex items-center space-x-1 px-4 py-3 sm:py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none">
          <SortAscendingIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          <ChevronDownIcon className="h-5 w-5 text-gray-400"/>
        </button>
        <Modal className="flex justify-end w-full" TriggerRef={buttonRef}>
          <div style={{minWidth: "260px"}} className="absolute bg-white p-4 space-y-4 shadow-md rounded-lg">
            <h1 className="text-gray-700">มีการ Audition</h1>
            <h1 className="text-gray-700">ไม่มีการ Audition</h1>
            <h1 className="text-gray-700">ก-ฮ</h1>
            <h1 className="text-gray-700">ฮ-ก</h1>
          </div>
        </Modal>
      </div>
    </div>
  )
}