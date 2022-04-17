import { ChevronDownIcon, SearchIcon, SortAscendingIcon } from "@heroicons/react/solid"
import { useRef } from "react"
import Modal from "@components/common/Modals"
import classnames from "classnames"

export const FilterSearch = ({ sortMode, setSortMode, setSearchContext, normal = true }) => {
  const buttonRef = useRef(null)

  return (
    <div className="mt-1 flex rounded-md shadow-sm">
      <div className="relative flex flex-grow items-stretch focus-within:z-10">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <input
          type="text"
          name="search"
          id="email"
          onChange={(event) => {
            setSearchContext(event.target.value)
          }}
          className="block w-full rounded-none rounded-l-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder={normal ? "ค้นหาชื่อชมรม" : "ค้นหาชื่อ หรือ รหัสนักเรียน"}
        />
      </div>
      <div>
        <button
          ref={buttonRef}
          className="focus:outline-none relative -ml-px inline-flex items-center space-x-1 rounded-r-md border border-gray-300 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 sm:py-2"
        >
          <SortAscendingIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          <ChevronDownIcon className="h-5 w-5 text-gray-400" />
        </button>
        <Modal className="z-60 relative flex w-full justify-end" TriggerRef={buttonRef}>
          <div style={{ minWidth: "260px" }} className="absolute rounded-lg bg-white py-2 text-gray-700 shadow-md">
            {normal ? (
              <>
                <h1
                  onClick={() => {
                    setSortMode("hasAudition")
                  }}
                  className={classnames(
                    sortMode == "hasAudition" ? "bg-TUCMC-pink-100" : "hover:bg-gray-50",
                    "cursor-pointer px-4 py-2"
                  )}
                >
                  มีการ Audition
                </h1>
                <h1
                  onClick={() => {
                    setSortMode("notHasAudition")
                  }}
                  className={classnames(
                    sortMode == "notHasAudition" ? "bg-TUCMC-pink-100" : "hover:bg-gray-50",
                    "cursor-pointer px-4 py-2"
                  )}
                >
                  ไม่มีการ Audition
                </h1>
              </>
            ) : (
              <>
                <h1
                  onClick={() => {
                    setSortMode("nascending")
                  }}
                  className={classnames(
                    sortMode == "nascending" ? "bg-TUCMC-pink-100" : "hover:bg-gray-50",
                    "cursor-pointer px-4 py-2"
                  )}
                >
                  เลขประจำตัวน้อยไปมาก
                </h1>
                <h1
                  onClick={() => {
                    setSortMode("ndescending")
                  }}
                  className={classnames(
                    sortMode == "ndescending" ? "bg-TUCMC-pink-100" : "hover:bg-gray-50",
                    "cursor-pointer px-4 py-2"
                  )}
                >
                  เลขประจำตัวมากไปน้อย
                </h1>
              </>
            )}
            <h1
              onClick={() => {
                setSortMode("ascending")
              }}
              className={classnames(
                sortMode == "ascending" ? "bg-TUCMC-pink-100" : "hover:bg-gray-50",
                "cursor-pointer px-4 py-2"
              )}
            >
              {!normal && "ชื่อ"} ก-ฮ
            </h1>
            <h1
              onClick={() => {
                setSortMode("descending")
              }}
              className={classnames(
                sortMode == "descending" ? "bg-TUCMC-pink-100" : "hover:bg-gray-50",
                "cursor-pointer px-4 py-2"
              )}
            >
              {!normal && "ชื่อ"} ฮ-ก
            </h1>
          </div>
        </Modal>
      </div>
    </div>
  )
}
