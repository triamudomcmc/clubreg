import {Editor} from "@components/panel/element/Editor";
import classnames from "classnames";
import {ArrowLeftIcon, ExclamationIcon} from "@heroicons/react/solid";
import {FilterSearch} from "@components/common/Inputs/Search";
import {PassedSection} from "@components/panel/sections/PassedSection";
import {ReservedSection} from "@components/panel/sections/ReservedSection";
import {FailedSection} from "@components/panel/sections/FailedSection";
import {isEmpty, searchKeyword, sortNumber, sortThaiDictionary} from "@utilities/object";
import {PendingElement} from "@components/panel/element/PendingElement";
import {Button} from "@components/common/Inputs/Button";
import PageContainer from "@components/common/PageContainer";
import {useEffect, useState} from "react";
import {isNumeric} from "@utilities/texts";

const PendingSection = ({reservedPos, setReservedPos, clubData,memberData, setPendingUpdate, pendingUpdate, setPage, submitPendingSection}) => {

  const [sortMode, setSortMode] = useState("ascending")
  const [searchContext, setSearchContext] = useState("")

  const [rawSorted, setRawSorted] = useState([])
  const [sortedData, setSortedData] = useState([])

  const applySort = () => {

    const data = memberData.waiting || []

    switch (sortMode) {
      case "ascending": {
        const sorted = sortThaiDictionary( data, obj => (obj.firstname))
        setRawSorted(sorted)
      }
        break
      case "descending": {
        const sorted = sortThaiDictionary(data, obj => (obj.firstname), true)
        setRawSorted(sorted)
      }
        break
      case "nascending": {
        const sorted = sortNumber(data, obj => (obj.student_id))
        setRawSorted(sorted)
      }
        break
      case "ndescending": {
        const sorted = sortNumber(data, obj => (obj.student_id), true)
        setRawSorted(sorted)
      }
        break
    }
  }

  useEffect(() => {
    applySort()
  },[sortMode, memberData])

  useEffect(() => {
    const escaped = searchContext.replace(/ /g,"")
    if (escaped !== "") {
      let searchResult;

      if(isNumeric(escaped)){
        searchResult = searchKeyword(rawSorted, escaped, (obj) => (obj.student_id))
      }else{
        searchResult = searchKeyword(rawSorted, escaped, (obj) => (obj.firstname + obj.lastname))
      }

      setSortedData(searchResult)
    } else {
      setSortedData(rawSorted)
    }
  }, [searchContext, rawSorted])

  return (
    <>
      <div className="space-y-2">
        <h1 className="text-4xl text-center">รอการตอบรับ</h1>
        <p className="text-TUCMC-gray-700 text-center">สามารถรับสมาชิกใหม่ได้ทั้งหมด {clubData.new_count_limit} คน (เหลืออีก {clubData.new_count_limit - clubData.new_count} คน)</p>
      </div>
      <div className="w-full max-w-6xl">
        <FilterSearch sortMode={sortMode} setSortMode={setSortMode} setSearchContext={setSearchContext} normal={false}/>
        <div className="mt-4 space-y-4">
          {
            sortedData.length > 0 ? sortedData.map((item, index) => {
              return <PendingElement key={`pending-${index}`} userData={item} pendingUpdate={pendingUpdate}
                                     setPendingUpdate={setPendingUpdate} reservedPos={reservedPos} setReservedPos={setReservedPos}/>
            }) : <h1 className="text-center mt-20 mb-20 text-TUCMC-gray-600">ขณะนี้ไม่มีรายชื่อที่รอคำตอบรับ</h1>
          }
        </div>
        <div className="flex items-center justify-between mt-10">
          <div onClick={() => {
            setPage("panel");
            setPendingUpdate({})
          }} className="flex cursor-pointer items-center space-x-1">
            <ArrowLeftIcon className="w-4 h-4"/>
            <h1>ย้อนกลับ</h1>
          </div>
          <Button onClick={submitPendingSection} className="bg-TUCMC-pink-400 px-10 py-3 text-white rounded-full">
            <span>ยืนยัน</span>
          </Button>
        </div>
      </div>
    </>
  )
}

export default PendingSection