import Modal from "@components/common/Modals";
import {useEffect, useState} from "react";
import {isEmpty} from "@utilities/object";
import {regClub} from "@client/userAction";
import {useToast} from "@components/common/Toast/ToastContext";

const ConfirmModal = ({TriggerDep, clubData, onAgree, mode = "default", refetcher, setLoader}) => {

  const [data, setData] = useState(clubData.data)
  const {addToast} = useToast()

  useEffect(() => {
    if (!isEmpty(clubData.data)) {
      setData(clubData.data)
    }
  }, [clubData.data])

  const auditionText = data.audition ? " Audition" : "เข้า"

  const confirmText = mode === "confirm" || clubData.data.oldClubConfirm ? "ยืนยันสิทธิ์" : "สละสิทธิ์"

  const confirm = async () => {
    const timeoutID = setTimeout(() => {
      setLoader(true)
    }, 1000)

    if (!clubData.data.oldClubConfirm) {
      const res = await regClub("", "", data.clubID, !!data.oldClubConfirm)
      if (res.status) {
        addToast({
          theme:"modern",
          icon: "tick",
          title: "ลงชื่อ Audition แล้ว",
          text: "ติดตามรายละเอียดการ Audition จากช่องทางประชาสัมพันธ์ของชมรมนั้นโดยตรง และไปทำการ Audition ตามเวลาและสถานที่ที่ชมรมนั้น ๆ กำหนด",
          lifeSpan: 30000
        })
        refetcher()
      }else{
        addToast({
          theme:"modern",
          icon: "cross",
          title: "พบข้อผิดพลาดที่ไม่ทราบสาเหตุ",
          text: "กรุณาลองกรอกข้อมูลใหม่อีกครั้ง หากยังพบข้อผิดพลาดสามารถติดต่อทาง กช."
        })
      }
    }else{
      onAgree()
    }

    clearTimeout(timeoutID)
    setLoader(false)
  }

  return (
    <Modal CloseID="confirmClose" overlayClassName="fixed top-0 flex bg-gray-500 bg-opacity-50 items-center justify-center w-full h-full z-[60]" TriggerDep={TriggerDep}>
      <div className="bg-white rounded-lg shadow-md mx-10 max-w-sm">
        <div className="pt-6 pb-5 mx-12">
          <h1 className="text-center">{mode === "default" && !clubData.data.oldClubConfirm ? `ต้องการลงชื่อ${auditionText} ชมรม${data.title} ใช่หรือไม่ ?` : `ต้องการ${confirmText} ชมรม${data.title} ใช่หรือไม่ ?`}</h1>
        </div>
        <div className="bg-gray-50 rounded-b-lg py-3 px-3">
          <div className="flex space-x-1 font-medium" id="confirmClose">
            <div onClick={confirm} className="flex justify-center rounded-lg cursor-pointer bg-TUCMC-green-400 text-white w-1/2 py-2"><span>ยืนยัน</span></div>
            <div className="flex justify-center rounded-lg cursor-pointer border border-gray-300 bg-white text-gray-700 w-1/2 py-2"><span>ยกเลิก</span></div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmModal