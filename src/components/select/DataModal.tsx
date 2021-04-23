import Modal from "@components/common/Modals";
import {ExclamationIcon} from "@heroicons/react/outline";
import {CheckCircleIcon} from "@heroicons/react/solid";

const DataModal = ({TriggerDep, setToast}) => {
  return (
    <Modal overlayClassName="fixed top-0 flex flex-col bg-gray-500 bg-opacity-50 items-center justify-center w-full h-full max-h-screen py-10 z-[60]" className="flex flex-col overflow-y-auto mx-6" TriggerDep={TriggerDep} CloseID="dataModalClose">
      <div className="bg-white rounded-lg shadow-md pt-6 max-w-sm">
        <div className="mx-auto flex justify-center items-center w-12 h-12 rounded-full bg-TUCMC-orange-200">
          <ExclamationIcon className="text-TUCMC-orange-500 w-6 h-6"/>
        </div>
        <div className="pt-3 pb-5 mx-10 md:mx-12">
          <h1 className="text-center text-[20px] font-medium">ลงทะเบียนชมรม...</h1>
          <div className="text-sm mt-2">
            <p className="text-gray-500 text-center">หากลงทะเบียนแล้ว จะถือว่านักเรียนอยู่ชมรมนี้แล้ว จะไม่สามารถขอเปลี่ยนชมรม</p>
            <p className="text-gray-500 text-center">
              หรือไป Audition ชมรมอื่นได้อีก</p>
          </div>
        </div>
        <div className="bg-gray-50 rounded-b-lg pt-3 pb-4 px-4">
          <div className="flex flex-col space-y-6 font-medium">
            <div className="flex flex-col space-y-3">
              <div>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 flex items-center">
                    <label htmlFor="country" className="sr-only">
                      Country
                    </label>
                    <select
                      id="country"
                      name="country"
                      className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-3 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                    >
                      <option>TH</option>
                      <option>TH</option>
                      <option>DE</option>
                    </select>
                  </div>
                  <input
                    type="text"
                    name="phone_number"
                    id="phone_number"
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-16 sm:text-sm border-gray-300 rounded-md"
                    placeholder="+66"
                  />
                </div>
              </div>
              <div>
                <div>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="รหัสผ่าน"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-3">
              <div onClick={() => {setToast({
                theme:"modern",
                icon: "tick",
                title: "ลงชื่อ Audition แล้ว",
                text: "ติดตามรายละเอียดการ Audition จากช่องทางประชาสัมพันธ์ของชมรมนั้นโดยตรง และไปทำการ Audition ตามเวลาและสถานที่ที่ชมรมนั้น ๆ กำหนด",
                lifeSpan: 30000
              })}} className="flex justify-center cursor-pointer items-center space-x-2 text-lg bg-TUCMC-green-400 text-white py-2 rounded-md">
                <CheckCircleIcon className="w-5 h-5"/>
                <span>ลงทะเบียน</span>
              </div>
              <div id="dataModalClose" className="flex justify-center rounded-md cursor-pointer border border-gray-300 bg-white text-gray-700 py-2"><span>ยกเลิก</span></div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default DataModal