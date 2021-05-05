import PageContainer from "@components/common/PageContainer";
import {motion} from "framer-motion";
import {DocumentTextIcon, ExclamationIcon} from "@heroicons/react/solid";
import {FilterSearch} from "@components/common/Inputs/Search";
import {useState} from "react";
import {PassedSection} from "@components/panel/sections/PassedSection";
import classnames from "classnames"
import {ReservedSection} from "@components/panel/sections/ReservedSection";
import {FailedSection} from "@components/panel/sections/FailedSection";
import Link from "next/link"
import {Button} from "@components/common/Inputs/Button";

const Index = () => {
  const [sortMode, setSortMode] = useState("")
  const [searchContext, setSearchContext] = useState("")
  const [section, setSection] = useState("passed")

  return (
    <PageContainer>
      <div className="px-2 py-10 mx-auto max-w-6xl">
        <div
          className={`bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg text-yellow-800 px-4 py-4`}>
          <div className="flex space-x-3">
            <ExclamationIcon className="flex-shrink-0 w-6 h-6 text-yellow-400"/>
            <div>
              <p className="text-[15px]">การประกาศผล Audition ก่อนชมรมอื่น
                และการกดดันให้นักเรียนเลือกยืนยันสิทธิ์ชมรม ถือเป็นการละเมิด<span
                  className="underline whitespace-nowrap cursor-pointer">ข้อกำหนด</span></p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center text-TUCMC-gray-700 my-10">
          <h1 className="text-4xl tracking-tight">ผลการ Audition</h1>
          <div className="tracking-tight text-center mt-6 mb-8">
            <p>สรุปผลการ Audition ให้เสร็จสิ้น </p>
            <p>ภายในวันที่ 24 พ.ค. 64 เวลา 23.59 น. </p>
            <p>(เหลืออีก 12 ชั่วโมง 27 นาที)</p>
          </div>
          <Button href="/panel/pending" className="flex items-center space-x-1 bg-TUCMC-pink-400 cursor-pointer text-white shadow-md px-14 py-3.5 rounded-full">
            <DocumentTextIcon className="w-5 h-5"/>
            <span>รอการตอบรับ</span>
          </Button>
        </div>
        <div className="flex flex-col px-3 mt-14">
          <div className="flex w-full text-TUCMC-gray-400 font-medium px-3">
            <div onClick={() => {setSection("passed")}} className={classnames("border-b w-1/3 py-2 border-TUCMC-gray-400 cursor-pointer text-center", section === "passed" && "bg-TUCMC-green-100 text-TUCMC-green-500 border-TUCMC-green-500")}>ผ่าน</div>
            <div onClick={() => {setSection("reserved")}} className={classnames("border-b w-1/3 py-2 border-TUCMC-gray-400 cursor-pointer text-center", section === "reserved" && "bg-TUCMC-orange-100 text-TUCMC-orange-500 border-TUCMC-orange-500")}>สำรอง</div>
            <div onClick={() => {setSection("failed")}} className={classnames("border-b w-1/3 py-2 border-TUCMC-gray-400 cursor-pointer text-center", section === "failed" && "bg-TUCMC-red-100 text-TUCMC-red-500 border-TUCMC-red-500")}>ไมผ่าน</div>
          </div>
          <PassedSection display={section === "passed"} sortMode={sortMode} setSortMode={setSortMode} setSearchContext={setSearchContext}/>
          <ReservedSection display={section === "reserved"} />
          <FailedSection display={section === "failed"} />
        </div>
      </div>
    </PageContainer>
  )
}

export default Index