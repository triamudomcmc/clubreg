import Modal from "@components/common/Modals";

const ConfirmModal = ({TriggerDep, clubData, onAgree}) => {
  return (
    <Modal CloseID="confirmClose" overlayClassName="fixed top-0 flex bg-gray-500 bg-opacity-50 items-center justify-center w-full h-full z-[60]" TriggerDep={TriggerDep}>
      <div className="bg-white rounded-lg shadow-md mx-10 max-w-sm">
        <div className="pt-6 pb-5 mx-12">
          <h1 className="text-center">{`ต้องการลงชื่อ Audition ${clubData.data.title} ใช่หรือไม่ ?`}</h1>
        </div>
        <div className="bg-gray-50 rounded-b-lg py-3 px-3">
          <div className="flex space-x-1 font-medium" id="confirmClose">
            <div onClick={onAgree} className="flex justify-center rounded-lg cursor-pointer bg-TUCMC-green-400 text-white w-1/2 py-2"><span>ยืนยัน</span></div>
            <div className="flex justify-center rounded-lg cursor-pointer border border-gray-300 bg-white text-gray-700 w-1/2 py-2"><span>ยกเลิก</span></div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmModal