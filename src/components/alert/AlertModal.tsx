import {ExclamationIcon, ChevronDoubleDownIcon} from "@heroicons/react/solid";
import {useEffect, useState} from "react";
import {useAuth} from "@client/auth";
import {updateTransferStatusBridge} from "@init/transfer";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import {useToast} from "@components/common/Toast/ToastContext";

const AlertModal = () => {

  const {onReady, reFetch} = useAuth()
  const {addToast} = useToast()

  const userData = onReady((logged, userData) => (userData))


  const [confirm, setConfirm] = useState({clicked: false, type: "reject"})

  const update = async () => {
    const fp = await FingerprintJS.load()
    const fingerPrint = await fp.get();
    const response = await updateTransferStatusBridge.call({transactionId: userData.conTasks.id, status: confirm.type, fp: fingerPrint.visitorId})
    if (response.status) {
      reFetch()
      addToast({
        theme: "modern",
        icon: "tick",
        title: "การดำเนินการสำเร็จแล้ว",
        text: confirm.type === "reject" ? "การปฏิเสธคำขอสำเร็จแล้ว" : "การตอบรับคำขอสำเร็จแล้ว"
      })
    }else{
      reFetch()
      addToast({
        theme: "modern",
        icon: "cross",
        title: "พบข้อผิดพลาดที่ไม่ทรายสาเหตุ",
        text: "กรุณาลองใหม่อีกครั้ง",
        crossPage: true
      })
    }
  }

  return (
    userData.conTasks ? <div className="flex fixed top-0 justify-center items-center w-full min-h-screen z-60 bg-TUCMC-gray-800 bg-opacity-50 px-4">
      {confirm.clicked ? <div className="pt-4 py-4 px-6 space-y-2 max-w-md bg-white rounded-lg shadow-md text-TUCMC-gray-900">
        <h1 className="text-lg font-semibold">คุณต้องการ{confirm.type === "reject" ? <span className="text-TUCMC-red-500">ปฏิเสธคำขอนี้</span>: <span className="text-TUCMC-green-500">ตอบรับคำขอนี้</span>}ใช่หรือไม่</h1>
        <div className="space-y-4">
          <p className="text-TUCMC-gray-700">รบกวนอ่านเหตุผลที่ผู้ควบคุมแผงควบคุมคนก่อนหน้าได้ระบุไว้และ<span className="font-medium">พูดคุยกับสมาชิกในชมรมที่เกี่ยวข้องให้ดีก่อนดำเนินการในขั้นถัดไป</span></p>
          <div className="text-TUCMC-orange-500 flex space-x-2 items-start"><ExclamationIcon className="w-6 h-6 animate-pulse flex-shrink-0"/><p>หลังจากกด{confirm.type === "reject" ? <span>ปฏิเสธคำขอ</span>: <span>ตอบรับคำขอ</span>}ไปแล้วจะไม่สามารถย้อนกลับได้</p></div>
        </div>
        <div className="flex space-x-2 justify-end">
          <div onClick={() => {setConfirm({clicked: false, type: "reject"})}} className="flex justify-center border border-TUCMC-gray-700 text-TUCMC-gray-700 font-medium py-2 px-4 rounded-md cursor-pointer hover:bg-TUCMC-gray-700 hover:text-white w-1/2">ย้อนกลับ</div>
          {
            confirm.type === "reject" ? <div onClick={update} className="flex justify-center border border-TUCMC-red-500 text-TUCMC-red-500 font-medium py-2 px-4 rounded-md cursor-pointer hover:bg-TUCMC-red-500 hover:text-white w-1/2">ปฏิเสธคำขอนี้</div> :
              <div onClick={update} className="flex justify-center border border-TUCMC-green-500 text-TUCMC-green-500 font-medium py-2 px-4 rounded-md cursor-pointer hover:bg-TUCMC-green-500 hover:text-white w-1/2">ตอบรับคำขอนี้</div>
          }
        </div>
      </div>: <div className="pt-4 py-6 px-6 space-y-2 max-w-lg bg-white rounded-lg shadow-md text-TUCMC-gray-900">
        <div className="flex items-center space-x-2">
          <ExclamationIcon className="w-8 h-8 text-yellow-500"/>
          <h1 className="text-lg font-semibold">มีการดำเนินการที่รอการยืนยัน</h1>
        </div>
        <div className="space-y-3">
          <p className="text-TUCMC-gray-700">มีคำขอดำเนินการโอนย้ายผู้มีสิทธิ์เข้าถึงแผงควบคุมชมรมคอมพิวเตอร์ และคุณจำเป็นจะต้องเป็นผู้ให้อนุญาตการกระทำนี้</p>
          <div className="flex flex-col justify-center bg-[#1f2937] rounded-md py-4 px-4">
            <div className="mx-auto">
              <span className="font-medium text-gray-300"><span className="font-semibold text-white">ผู้ขอ:</span> {userData.conTasks.from.title}{userData.conTasks.from.firstname} {userData.conTasks.from.lastname} ห้อง {userData.conTasks.from.room} เลขที่ {userData.conTasks.from.number}</span>
              <ChevronDoubleDownIcon className="my-1 mx-auto w-6 h-6 text-red-600 animate-pulse"/>
              <span className="font-medium text-gray-300"><span className="font-semibold text-white">โอนให้:</span> {userData.conTasks.to.title}{userData.conTasks.to.firstname} {userData.conTasks.to.lastname} ห้อง {userData.conTasks.to.room} เลขที่ {userData.conTasks.to.number}</span>
            </div>
          </div>
          <p className="text-TUCMC-gray-700 bg-TUCMC-orange-100 border border-TUCMC-orange-500 rounded-md py-2 px-4">
            <span className="font-medium text-TUCMC-gray-900">เหตุผล:</span> {userData.conTasks.reason}
          </p>
          <div className="flex space-x-2 justify-end">
            <div onClick={() => {setConfirm({clicked: true, type: "reject"})}} className="flex justify-center border border-TUCMC-red-500 text-TUCMC-red-500 font-medium py-2 px-4 rounded-md cursor-pointer hover:bg-TUCMC-red-500 hover:text-white w-1/2">ปฏิเสธคำขอนี้</div>
            <div onClick={() => {setConfirm({clicked: true, type: "accept"})}} className="flex justify-center border border-TUCMC-green-500 text-TUCMC-green-500 font-medium py-2 px-4 rounded-md cursor-pointer hover:bg-TUCMC-green-500 hover:text-white w-1/2">ตอบรับคำขอนี้</div>
          </div>
        </div>
      </div>}
    </div> : <div></div>
  )
}

export default AlertModal
