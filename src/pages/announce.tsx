import PageContainer from "@components/common/PageContainer";
import {AnnounceSplash} from "@vectors/decorations/AnnounceSplash";
import ClubStatus from "@components/announce/ClubStatus";
import {useAuth} from "@client/auth";
import Router from "next/router";
import {isEmpty} from "@utilities/object";
import {useEffect, useState} from "react";
import ConfirmModal from "@components/select/ConfirmModal";
import ClubModal from "@components/select/ClubModal";
import DataModal from "@components/select/DataModal";
import {Loader} from "@components/common/Loader";
import Toast from "@components/common/Toast";

const Announce = () => {
  const {onReady, reFetch} = useAuth()
  const [desc, setDesc] = useState(<></>)
  const [bottomDesc, setBottomDesc] = useState(<></>)

  const [modalState, setModalState] = useState({open: false, data: {}})
  const [select, setSelect] = useState({state: false, mode: "confirm"})
  const [dataModal, setDataModal] = useState(false)
  const [toast, setToast] = useState({})
  const [loader, setLoader] = useState(false)

  const userData = onReady((logged, userData) => {
    if (!logged) {
      Router.push("/auth")
    }
    return userData
  })


  useEffect(() => {
    if (userData.audition && !isEmpty(userData.audition)) {
      setDesc(<></>)
      setBottomDesc(<></>)
      const values = Object.values(userData.audition)
      if (values.includes("passed")) {
        setDesc(<div className="px-6 mt-12 md:mt-20 text-center">
          <p className="text-TUCMC-gray-700">
            กดยืนยันสิทธิ์หรือสละสิทธิ์ชมรมที่ผ่านการ
            คัดเลือกภายในวันนี้ (เหลือเวลาอีก 12 ชั่วโมง 15 นาที)
          </p>
          <p className="text-TUCMC-gray-700">
            หากไม่ดำเนินการใด ๆ ภายในเวลาที่กำหนด
            จะถือว่าสละสิทธิ์ชมรมที่ผ่านการคัดเลือกโดยอัตโนมัติ
          </p>
        </div>)
      }
      if ((values.includes("rejected") || values.includes("failed")) && (!values.includes("passed") && !values.includes("reserved"))) {
        setBottomDesc(
          <p className="text-TUCMC-gray-700 px-16 text-center mt-20 max-w-md mx-auto">
            กรุณารอเลือกเข้าชมรมที่ไม่มีการ Audition
            และยังมีที่นั่งว่างอยู่ ในวันที่ 28 พ.ค. 64
          </p>
        )
      }
      if (values.includes("passed") && values.includes("reserved")) {
        setDesc(prevState => (
          <>
            {prevState}
            <h1 className="text-center text-TUCMC-gray-700 mt-6">หรือ</h1>
          </>
        ))
      }
      if (values.includes("reserved")) {
        setDesc(prevState => (
          <>
            {prevState}
            <div className="px-6 mt-6 flex flex-col items-center space-y-2">
              <p className="text-TUCMC-gray-700">รอลุ้นลำดับสำรอง 2 รอบ</p>
              <div>
                <div className="flex items-center space-x-1">
                  <div
                    className="w-4 h-4 flex items-center justify-center rounded-full bg-TUCMC-gray-500 text-[8px] font-medium text-white">1
                  </div>
                  <span className="text-TUCMC-gray-500">26 พ.ค. 64 เวลา 8.00 น.</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div
                    className="w-4 h-4 flex items-center justify-center rounded-full bg-TUCMC-gray-500 text-[8px] font-medium text-white">2
                  </div>
                  <span className="text-TUCMC-gray-500">27 พ.ค. 64 เวลา 8.00 น.</span>
                </div>
              </div>
            </div>
          </>
        ))
      }
    }
  }, [userData])

  const clearState = () => {
    setModalState({open: false, data: {}})
  }


  return (
    <PageContainer>
      <Loader display={loader}/>
      <Toast newToast={toast}/>
      <ConfirmModal onAgree={() => {
        setDataModal(true)
      }} clubData={modalState} TriggerDep={{
        dep: select.state, revert: () => {
          setSelect(prev => ({state: false, mode: prev.mode}))
        }
      }} mode={select.mode}/>
      <DataModal setLoader={setLoader} state={modalState} refetcher={reFetch} setToast={setToast} closeFunc={clearState}
                 TriggerDep={{
                   dep: dataModal, revert: () => {
                     setDataModal(false)
                   }
                 }} mode={select.mode}/>
      <div className="flex flex-col items-center pt-14 md:pt-20">
        <div className="max-w-md px-4">
          <div className="flex flex-col items-center">
            <h1 className="font-medium text-TUCMC-gray-700 text-4xl">ประกาศผล</h1>
          </div>
          <div className="mt-10 w-full px-14 minClubs:px-20">
            <AnnounceSplash className="w-full"/>
          </div>
          {
            desc
          }
        </div>
        <div className="mt-16 bg-TUCMC-gray-100 w-full pb-20 pt-12">
          <div className="space-y-2 px-4 max-w-md mx-auto">
            {
              (userData.audition && !isEmpty(userData.audition)) && Object.keys(userData.audition)
                                                                          .map((key) => {
                                                                            return <ClubStatus
                                                                              selectTrigger={setSelect}
                                                                              action={setModalState}
                                                                              key={key} data={{
                                                                              clubID: key,
                                                                              status: userData.audition[key]
                                                                            }}/>
                                                                          })
            }
          </div>
          {bottomDesc}
        </div>
      </div>
    </PageContainer>
  )
}

export default Announce