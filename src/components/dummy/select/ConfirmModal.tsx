import Modal from "@components/common/Modals"
import { useEffect, useState } from "react"
import { isEmpty } from "@utilities/object"
import { useToast } from "@components/common/Toast/ToastContext"

const ConfirmModal = ({ TriggerDep, clubData, onAgree, mode = "default", refetcher = () => { }, setLoader = null }) => {
  const [data, setData] = useState(clubData.data)
  const { addToast } = useToast()

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

    if (!clubData.data.oldClubConfirm && data.audition && mode == "default") {
      const res = { status: true, report: "success", data: {} }
      if (res.status) {
        addToast({
          theme: "modern",
          icon: "tick",
          title: "ลงชื่อ Audition แล้ว",
          text: "ติดตามรายละเอียดการ Audition จากช่องทางประชาสัมพันธ์ของชมรมนั้นโดยตรง และไปทำการ Audition ตามเวลาและสถานที่ที่ชมรมนั้น ๆ กำหนด",
          lifeSpan: 30000,
        })
        localStorage.setItem("dummyAuditions", JSON.stringify([...JSON.parse(localStorage.getItem("dummyAuditions") || "[]"), data.clubID]))
        refetcher()
      } else {
        addToast({
          theme: "modern",
          icon: "cross",
          title: "พบข้อผิดพลาดที่ไม่ทราบสาเหตุ",
          text: "กรุณาลองกรอกข้อมูลใหม่อีกครั้ง หากยังพบข้อผิดพลาดสามารถติดต่อทาง กช.",
        })
      }
    } else {
      onAgree()
    }

    clearTimeout(timeoutID)
    setLoader(false)
  }

  return (
    <Modal
      CloseID="confirmClose"
      overlayClassName="fixed top-0 flex bg-gray-500 bg-opacity-50 items-center justify-center w-full h-full z-[60]"
      TriggerDep={TriggerDep}
    >
      <div className="mx-10 max-w-sm rounded-lg bg-white shadow-md">
        <div className="mx-12 pt-6 pb-5">
          <h1 className="text-center">
            {mode === "default" && !clubData.data.oldClubConfirm
              ? `ยืนยันการ${auditionText} ชมรม${data.title}`
              : `ต้องการ${confirmText} ชมรม${data.title}`
            }
          </h1>
        </div>
        <div className="rounded-b-lg bg-gray-50 py-3 px-3">
          <div className="flex space-x-1 font-medium" id="confirmClose">
            <div
              onClick={confirm}
              className="flex w-1/2 cursor-pointer justify-center rounded-lg bg-TUCMC-green-400 py-2 text-white hover:bg-TUCMC-green-400/80 transition-colors duration-200"
            >
              <span>ยืนยัน</span>
            </div>
            <div className="flex w-1/2 cursor-pointer justify-center rounded-lg border bg-TUCMC-red-400 py-2 text-white hover:bg-TUCMC-red-400/80 transition-colors duration-200">
              <span>ยกเลิก</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmModal
