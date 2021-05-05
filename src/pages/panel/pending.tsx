import PageContainer from "@components/common/PageContainer";
import {FilterSearch} from "@components/common/Inputs/Search";
import {CheckCircleIcon, ChevronDownIcon, XCircleIcon} from "@heroicons/react/solid";
import {PendingElement} from "@components/panel/element/PendingElement";
import {Button} from "@components/common/Inputs/Button";
import {useState} from "react";

const Pending = () => {

  const [sortMode, setSortMode] = useState("")
  const [searchContext, setSearchContext] = useState("")

  return (
    <PageContainer>
      <div className="flex flex-col items-center py-10 space-y-10">
        <h1 className="text-4xl">รอการตอบรับ</h1>
        <div>
          <FilterSearch sortMode={sortMode} setSortMode={setSortMode} setSearchContext={setSearchContext}/>
          <div className="mt-4 space-y-4">
            <PendingElement/>
            <PendingElement/>
            <PendingElement/>
            <PendingElement/>
            <PendingElement/>
          </div>
          <div className="flex justify-end mt-10">
            <Button className="bg-TUCMC-pink-400 px-10 py-3 text-white rounded-full">
              <span>ยืนยัน</span>
            </Button>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}

export default Pending