import Modal from "@components/common/Modals";
import {ExclamationIcon} from "@heroicons/react/outline";
import {CheckCircleIcon, XCircleIcon} from "@heroicons/react/solid";
import {useEffect, useState} from "react";
import {confirmClub, regClub, rejectClub} from "@client/userAction";
import {isEmpty} from "@utilities/object";
import {useToast} from "@components/common/Toast/ToastContext";

const DataModal = ({state, setLoader, TriggerDep, closeFunc, refetcher, mode = "default"}) => {

  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [closingState, setClosingState] = useState(false)
  const [data, setData] = useState(state.data)
  const {addToast} = useToast()

  useEffect(() => {
    if (!isEmpty(state.data)) {
      setData(state.data)
    }
  }, [state.data])


  const submit = async (action: "register" | "confirm" | "reject" = "register") => {

    const timeoutID = setTimeout(() => {
      setLoader(true)
    }, 1000)

    try {
      let res;
      if (action === "register") {res = await regClub(phone, password, state.data.clubID, !!state.data.oldClubConfirm)}
      if (action === "confirm") {res = await confirmClub(phone, password, state.data.clubID)}
      if (action === "reject") {res = await rejectClub(password, state.data.clubID)}

      if(res.status) {
        if (action === "register") {
          addToast({
            theme:"modern",
            icon: "tick",
            title: "ลงเบียนเสร็จสิ้น",
            text: "ขอให้มีความสุขกับกิจกรรมชมรม",
            lifeSpan: 30000
          })
        }
        if (action === "confirm") {
          addToast({
            theme:"modern",
            icon: "tick",
            title: "ยืนยันสิทธิ์ชมรมแล้ว",
            text: "ขอให้มีความสุขกับกิจกรรมชมรม",
            lifeSpan: 30000
          })
        }
        if (action === "reject") {
          addToast({
            theme:"modern",
            icon: "tick",
            title: "สละสิทธิ์ชมรมแล้ว",
            text: "การสละสิทธิ์เสร็จสมบูรณ์",
            lifeSpan: 30000
          })
        }
        closeFunc()
        setClosingState(true)
        setPhone("")
        setPassword("")
        refetcher()
      }else{
        switch (res.report) {
          case "sessionError":
            addToast({
              theme:"modern",
              icon: "cross",
              title: "พบข้อผิดพลาดของเซสชั่น",
              text: "กรุณาลองเข้าสู่ระบบใหม่อีกครั้ง",
              crossPage: true
            })
            refetcher()
            break
          case "invalid_password":
            addToast({
              theme:"modern",
              icon: "cross",
              title: "รหัสผ่านไม่ถูกต้อง",
              text: "กรุณาลองกรอกข้อมูลใหม่อีกครั้งหรือ หากลืมรหัสผ่านสามารถติดต่อทาง กช. เพื่อขอเปลี่ยนรหัสผ่านได้"
            })
            break
          case "invalid_phone":
            addToast({
              theme:"modern",
              icon: "cross",
              title: "เบอร์โทรศัพท์ ที่ระบุไม่ถูกต้อง",
              text: "กรุณาลองกรอกข้อมูลใหม่อีกครั้งหรือหากยังพบการแจ้งเตือนนี้อีกในขณะที่ข้อมูลที่กรอกถูกต้องแล้วให้ติดต่อทาง กช."
            })
            break
          case "club_full":
            if (!!state.data.oldClubConfirm) {
              addToast({
                theme:"modern",
                icon: "cross",
                title: "ขออภัยในขณะนี้โควต้าสมาชิกเก่าของชมรมนี้เต็มแล้ว",
                text: "กรุณาลองเลือกชมรมนี้ในฐานะสมาชิกใหม่หรือเลือกชมรมอื่นที่ยังว่างอยู่ในตอนนี้"
              })
            }else{
              addToast({
                theme:"modern",
                icon: "cross",
                title: "ขออภัยในขณะนี้ชมรมที่เลือกเต็มแล้ว",
                text: "กรุณาเลือกชมรมอื่นที่ยังว่างอยู่ในตอนนี้"
              })
            }
            closeFunc()
            setClosingState(true)
            setPhone("")
            setPassword("")
            refetcher()
            break
          case "in_club":
            addToast({
              theme:"modern",
              icon: "cross",
              title: "ขออภัยคุณได้เลือกชมรมนี้ไปแล้ว",
              text: "กรุณาเลือกชมรมอื่นที่ยังว่างอยู่ในตอนนี้"
            })
            break
          case "in_audition":
            addToast({
              theme:"modern",
              icon: "cross",
              title: "ขออภัยคุณได้เลือกชมรมที่มีการ Audition ไปแล้ว",
              text: "กรุณาเลือกชมรมอื่น เนื่องจากหากลง Audition ไปแล้วจะไม่สามารถเลือกชมรมที่ไม่มีการ Audition ได้"
            })
            break

        }
      }
    } catch (error) {
      addToast({
        theme:"modern",
        icon: "cross",
        title: "พบข้อผิดพลาดที่ไม่ทราบสาเหตุ",
        text: "กรุณาลองกรอกข้อมูลใหม่อีกครั้ง หากยังพบข้อผิดพลาดสามารถติดต่อทาง กช."
      })
    }

    clearTimeout(timeoutID)
    setLoader(false)

  }

  let headingText =
    <div className="pt-3 pb-5 mx-10 md:mx-12">
      <h1 className="text-center text-[20px] font-medium">ลงทะเบียนชมรม{data.title}</h1>
      <div className="text-sm mt-2">
        <p className="text-gray-500 text-center">หากลงทะเบียนแล้ว จะถือว่านักเรียนอยู่ชมรมนี้แล้ว จะไม่สามารถขอเปลี่ยนชมรม</p>
        <p className="text-gray-500 text-center">
          หรือไป Audition ชมรมอื่นได้อีก</p>
      </div>
    </div>
  let actionButt = <div onClick={() => {submit("register")}} className="flex justify-center cursor-pointer items-center space-x-2 text-lg bg-TUCMC-green-400 text-white py-2 rounded-md">
    <CheckCircleIcon className="w-5 h-5"/>
    <span>ลงทะเบียน</span>
  </div>

  if (mode !== "default") {
    headingText = mode === "confirm" ? <div className="pt-3 pb-5 mx-10 md:mx-12">
      <h1 className="text-center text-[20px] font-medium">ยืนยันสิทธิ์ชมรม{data.title}</h1>
      <div className="text-sm mt-2">
        <p className="text-gray-500 text-center">หากยืนยันสิทธิ์ชมรมนี้แล้ว</p>
        <p className="text-gray-500 text-center">จะไม่สามารถเปลี่ยนชมรมได้อีกจนกว่าจะหมดปีการศึกษา</p>
      </div>
    </div> : <div className="pt-3 pb-5 mx-10 md:mx-12">
      <h1 className="text-center text-[20px] font-medium">สละสิทธิ์ชมรม{data.title}</h1>
      <div className="text-sm mt-2">
        <p className="text-gray-500 text-center">หากสละสิทธิ์ชมรมนี้แล้ว</p>
        <p className="text-gray-500 text-center">จะไม่สามารถเปลี่ยนใจกลับมาขอยืนยันสิทธิ์ได้อีก</p>
      </div>
    </div>

    actionButt = mode === "confirm" ? <div onClick={() => {submit("confirm")}} className="flex justify-center cursor-pointer items-center space-x-2 text-lg bg-TUCMC-green-400 text-white py-2 rounded-md">
      <CheckCircleIcon className="w-5 h-5"/>
      <span>ยืนยันสิทธิ์</span>
    </div> : <div onClick={() => {submit("reject")}} className="flex justify-center cursor-pointer items-center space-x-2 text-lg bg-TUCMC-red-400 text-white py-2 rounded-md">
      <XCircleIcon className="w-5 h-5"/>
      <span>สละสิทธิ์</span>
    </div>

  }

  return (
    <Modal overlayClassName="fixed top-0 flex flex-col bg-gray-500 bg-opacity-50 items-center justify-center w-full h-full max-h-screen py-10 z-[60]" className="flex flex-col overflow-y-auto mx-6" TriggerDep={TriggerDep} CloseDep={{
      dep: closingState, revert: () => {
        setClosingState(false)
      }
    }} CloseID="dataModalClose">
      <div className="bg-white rounded-lg shadow-md pt-6 max-w-sm">
        <div className="mx-auto flex justify-center items-center w-12 h-12 rounded-full bg-TUCMC-orange-200">
          <ExclamationIcon className="text-TUCMC-orange-500 w-6 h-6"/>
        </div>
        {headingText}
        <div className="bg-gray-50 rounded-b-lg pt-3 pb-4 px-4">
          <div className="flex flex-col space-y-6 font-medium">
            <div className="flex flex-col space-y-3">
              {mode !== "reject" && <div>
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
                    value={phone}
                    onChange={(event) => {
                      setPhone(event.target.value)
                    }}
                  />
                </div>
              </div>}
              <div>
                <div>
                  <input
                    type="password"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="รหัสผ่าน"
                    value={password}
                    onChange={(event) => {setPassword(event.target.value)}}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-3">
              {actionButt}
              <div id="dataModalClose" className="flex justify-center rounded-md cursor-pointer border border-gray-300 bg-white text-gray-700 py-2"><span>ยกเลิก</span></div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default DataModal