import PageContainer from "@components/common/PageContainer";
import SelectSplash from "@vectors/decorations/SelectSplash";
import {
  ChevronDownIcon, ClipboardCopyIcon,
  SearchIcon,
  SelectorIcon,
  SortAscendingIcon,
  UsersIcon
} from '@heroicons/react/solid'
import ClubList from "@components/select/ClubList";
import ClubModal from "@components/select/ClubModal";
import {useState} from "react";

const Select = () => {

  const [modalState, setModalState] = useState({open: false, data: {}})

  const clearState = () => {
    setModalState({open: false, data: {}})
  }

  return (
    <PageContainer>
      <ClubModal state={modalState} closeAction={clearState}/>
      <div className="flex flex-col items-center py-14 px-4">
        <div className="flex flex-col items-center">
          <h1 className="font-medium text-4xl">เลือกชมรม</h1>
          <span className="text-sm tracking-tight">ภายในวันที่ 24 พ.ค. 64</span>
        </div>
        <div className="mt-6 w-full px-8">
          <SelectSplash />
        </div>
        <div className="space-y-6 mt-10 px-2">
          <div className="flex flex-col rounded-lg shadow-md bg-white p-4 py-6 space-y-4">
            <h1 className="text-lg font-medium tracking-tight">คุณได้ลงชื่อ Audition ชมรมไว้</h1>
            <p className="text-gray-600 tracking-tight">ให้ไปทำการ Audition ตามเวลาและสถานที่ที่ชมรมนั้น ๆ กำหนด โดยติดตามรายละเอียดการ Audition จากช่องทางประชาสัมพันธ์ของชมรมนั้นโดยตรง
              และรอการประกาศผลในวันที่ 25 พ.ค. 2564 เวลา 8.00 น.</p>
            <a className="text-TUCMC-pink-500 tracking-tight">ดูรายชื่อชมรมที่ลงชื่อ Audition ไว้ →</a>
          </div>
          <div className="flex flex-col items-start rounded-lg shadow-md bg-white p-4 py-6 space-y-4">
            <h1 className="text-lg font-medium tracking-tight">โควตายืนยันสิทธิ์ชมรมเดิม</h1>
            <p className="text-gray-600 tracking-tight">นักเรียนสามารถใช้โควตายืนยันสิทธิ์ชมรมเดิมได้ทันที (ชมรม...) *โควตามีจำนวนจำกัด</p>
            <a className="bg-TUCMC-green-400 text-white whitespace-nowrap rounded-3xl shadow-md px-5 py-2.5">ยืนยันสิทธิ์ชมรมเดิม</a>
          </div>
        </div>
        <div className="mt-16">
          <div className="border-b pb-5 mx-4">
            <div>
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
                <button className="-ml-px relative inline-flex items-center space-x-1 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                  <SortAscendingIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  <ChevronDownIcon className="h-5 w-5 text-gray-400"/>
                </button>
              </div>
            </div>
          </div>
          <div className="mt-6 space-y-2">
            <ClubList title="ชมรมสีสรรพ์ภาษาต่างประเทศที่ 2 (French Chorus)" state="full" action={setModalState}/>
            <ClubList title="ชมรมพัฒนาศักยภาพทางวิทยาศาสตร์" state="open" action={setModalState}/>
            <ClubList title="ชมรมสังคมศึกษา (หลากทัศนะประวัติศาสตร์)" audition={true} action={setModalState}/>
            <ClubList title="ชมรมสีสรรพ์ภาษาต่างประเทศที่ 2 (French Chorus)" state="full" action={setModalState}/>
            <ClubList title="ชมรมพัฒนาศักยภาพทางวิทยาศาสตร์" state="open" action={setModalState}/>
            <ClubList title="ชมรมสังคมศึกษา (หลากทัศนะประวัติศาสตร์)" audition={true} action={setModalState}/>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}

export default Select