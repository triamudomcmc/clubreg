import { Editor } from "@components/panel/element/Editor"
import classnames from "classnames"
import { ArrowLeftIcon, ExclamationIcon } from "@heroicons/react/solid"
import { FilterSearch } from "@components/common/Inputs/Search"
import { PassedSection } from "@components/panel/sections/PassedSection"
import { ReservedSection } from "@components/panel/sections/ReservedSection"
import { FailedSection } from "@components/panel/sections/FailedSection"
import { isEmpty, searchKeyword, sortNumber, sortThaiDictionary } from "@utilities/object"
import { PendingElement } from "@components/panel/element/PendingElement"
import { Button } from "@components/common/Inputs/Button"
import PageContainer from "@components/common/PageContainer"
import { useEffect, useState } from "react"
import { isNumeric } from "@utilities/texts"
import { Ellipsis } from "@vectors/Loaders/Ellipsis"

const PendingSection = ({
  reservedPos,
  setReservedPos,
  clubData,
  memberData,
  setPendingUpdate,
  pendingUpdate,
  setPage,
  submitPendingSection,
  pending,
}) => {
  const [sortMode, setSortMode] = useState("ascending")
  const [searchContext, setSearchContext] = useState("")

  const [rawSorted, setRawSorted] = useState([])
  const [sortedData, setSortedData] = useState([])

  const applySort = () => {
    const data = memberData.waiting || []

    switch (sortMode) {
      case "ascending":
        {
          const sorted = sortThaiDictionary(data, (obj) => obj.firstname)
          setRawSorted(sorted)
        }
        break
      case "descending":
        {
          const sorted = sortThaiDictionary(data, (obj) => obj.firstname, true)
          setRawSorted(sorted)
        }
        break
      case "nascending":
        {
          const sorted = sortNumber(data, (obj) => obj.student_id)
          setRawSorted(sorted)
        }
        break
      case "ndescending":
        {
          const sorted = sortNumber(data, (obj) => obj.student_id, true)
          setRawSorted(sorted)
        }
        break
    }
  }

  useEffect(() => {
    applySort()
  }, [sortMode, memberData])

  useEffect(() => {
    const escaped = searchContext.replace(/ /g, "")
    if (escaped !== "") {
      let searchResult

      if (isNumeric(escaped)) {
        searchResult = searchKeyword(rawSorted, escaped, (obj) => obj.student_id)
      } else {
        searchResult = searchKeyword(rawSorted, escaped, (obj) => obj.firstname + obj.lastname)
      }

      setSortedData(searchResult)
    } else {
      setSortedData(rawSorted)
    }
  }, [searchContext, rawSorted])

  return (
    <>
      <div className="space-y-2">
        <h1 className="text-center text-4xl">รอการตอบรับ</h1>
        <p className="text-center text-TUCMC-gray-700">
          สามารถรับสมาชิกใหม่ได้ทั้งหมด {clubData.new_count_limit} คน จากผู้สมัคร {memberData?.waiting?.length} คน
          (เหลืออีก {clubData.new_count_limit - memberData.passed.length} คน)
        </p>
      </div>
      <div className="w-full max-w-6xl">
        <FilterSearch
          sortMode={sortMode}
          setSortMode={setSortMode}
          setSearchContext={setSearchContext}
          normal={false}
        />
        <div className="mt-4 space-y-4">
          {sortedData.length > 0 ? (
            sortedData.map((item, index) => {
              return (
                <PendingElement
                  key={`pending-${item.student_id}`}
                  userData={item}
                  pendingUpdate={pendingUpdate}
                  setPendingUpdate={setPendingUpdate}
                  reservedPos={reservedPos}
                  setReservedPos={setReservedPos}
                  sections={clubData.sections || null}
                />
              )
            })
          ) : (
            <h1 className="mt-20 mb-20 text-center text-TUCMC-gray-600">ขณะนี้ไม่มีรายชื่อที่รอคำตอบรับ</h1>
          )}
        </div>
        <div className="mt-10 flex items-center justify-between">
          <div
            onClick={() => {
              setPage("panel")
              setPendingUpdate({})
            }}
            className="flex cursor-pointer items-center space-x-1"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            <h1>ย้อนกลับ</h1>
          </div>
          <Button
            disabled={pending}
            onClick={!pending && submitPendingSection}
            className={classnames(
              "rounded-full bg-TUCMC-pink-400 px-10 text-white",
              !pending ? "py-3" : "cursor-default py-[8px]"
            )}
          >
            <span className={classnames(pending && "hidden")}>ยืนยัน</span>
            <Ellipsis className={classnames("h-8 w-[2.4rem]", !pending && "hidden")} />
          </Button>
        </div>
      </div>
    </>
  )
}

export default PendingSection
