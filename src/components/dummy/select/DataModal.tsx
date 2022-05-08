import Modal from "@components/common/Modals"
import { ExclamationIcon } from "@heroicons/react/outline"
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/solid"
import { useEffect, useState } from "react"
import { confirmClub, regClub, rejectClub } from "@client/userAction"
import { isEmpty } from "@utilities/object"
import { useToast } from "@components/common/Toast/ToastContext"
import classnames from "classnames"
import { Ellipsis } from "@vectors/Loaders/Ellipsis"
import  Router  from "next/router"

const DataModal = ({ state, setLoader, TriggerDep, closeFunc, refetcher, mode = "default" }) => {
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [closingState, setClosingState] = useState(false)
  const [data, setData] = useState(state.data)
  const [pending, setPending] = useState(false)
  const { addToast } = useToast()

  useEffect(() => {
    if (!isEmpty(state.data)) {
      setData(state.data)
    }
  }, [state.data])

  const submit = async (action: "register" | "confirm" | "reject" = "register") => {
    setPending(true)

    const timeoutID = setTimeout(() => {
      setLoader(true)
    }, 1000)

    try {
      let res
      if (action === "register") {
        localStorage.setItem("dummyClub" , state.data.clubID)
        res = {status: true, report: "success", data: {}}
        Router.push("/dummy/card")
      }
      if (action === "confirm") {
        localStorage.setItem("dummyClub" , state.data.clubID)
        res = {status: true, report: "success", data: {}}
        Router.push("/dummy/card")
      }
      if (action === "reject") {
        const it = JSON.parse(localStorage.getItem("dummyExState") || "{}")
        it[state.data.clubID as string] = "rejected"

        localStorage.setItem("dummyExState", JSON.stringify(it))
        res = {status: true, report: "success", data: {}}
      }

      if (res.status) {
        if (action === "register") {
          addToast({
            theme: "modern",
            icon: "tick",
            title: "ลงเบียนเสร็จสิ้น",
            text: "ขอให้มีความสุขกับกิจกรรมชมรม",
            lifeSpan: 30000,
          })
        }
        if (action === "confirm") {
          addToast({
            theme: "modern",
            icon: "tick",
            title: "ยืนยันสิทธิ์ชมรมแล้ว",
            text: "ขอให้มีความสุขกับกิจกรรมชมรม",
            lifeSpan: 30000,
          })
        }
        if (action === "reject") {
          addToast({
            theme: "modern",
            icon: "tick",
            title: "สละสิทธิ์ชมรมแล้ว",
            text: "การสละสิทธิ์เสร็จสมบูรณ์",
            lifeSpan: 30000,
          })
        }
        closeFunc()
        setClosingState(true)
        setPhone("")
        setPassword("")
        refetcher()
      } else {
        switch (res.report) {
          case "sessionError":
            addToast({
              theme: "modern",
              icon: "cross",
              title: "พบข้อผิดพลาดของเซสชั่น",
              text: "กรุณาลองเข้าสู่ระบบใหม่อีกครั้ง",
              crossPage: true,
            })
            refetcher()
            break
          case "invalid_password":
            addToast({
              theme: "modern",
              icon: "cross",
              title: "รหัสผ่านไม่ถูกต้อง",
              text: "กรุณาลองกรอกข้อมูลใหม่อีกครั้งหรือ หากลืมรหัสผ่านสามารถติดต่อทาง กช. เพื่อขอเปลี่ยนรหัสผ่านได้",
            })
            break
          case "invalid_phone":
            addToast({
              theme: "modern",
              icon: "cross",
              title: "เบอร์โทรศัพท์ ที่ระบุไม่ถูกต้อง",
              text: "กรุณาลองกรอกข้อมูลใหม่อีกครั้งหรือหากยังพบการแจ้งเตือนนี้อีกในขณะที่ข้อมูลที่กรอกถูกต้องแล้วให้ติดต่อทาง กช.",
            })
            break
          case "club_full":
            if (!!state.data.oldClubConfirm) {
              addToast({
                theme: "modern",
                icon: "cross",
                title: "ขออภัยในขณะนี้โควต้าสมาชิกเก่าของชมรมนี้เต็มแล้ว",
                text: "กรุณาลองเลือกชมรมนี้ในฐานะสมาชิกใหม่หรือเลือกชมรมอื่นที่ยังว่างอยู่ในตอนนี้",
              })
            } else {
              addToast({
                theme: "modern",
                icon: "cross",
                title: "ขออภัยในขณะนี้ชมรมที่เลือกเต็มแล้ว",
                text: "กรุณาเลือกชมรมอื่นที่ยังว่างอยู่ในตอนนี้",
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
              theme: "modern",
              icon: "cross",
              title: "ขออภัยคุณได้เลือกชมรมนี้ไปแล้ว",
              text: "กรุณาเลือกชมรมอื่นที่ยังว่างอยู่ในตอนนี้",
            })
            break
          case "in_audition":
            addToast({
              theme: "modern",
              icon: "cross",
              title: "ขออภัยคุณได้เลือกชมรมที่มีการ Audition ไปแล้ว",
              text: "กรุณาเลือกชมรมอื่น เนื่องจากหากลง Audition ไปแล้วจะไม่สามารถเลือกชมรมที่ไม่มีการ Audition ได้",
            })
            break
        }
      }
    } catch (error) {
      addToast({
        theme: "modern",
        icon: "cross",
        title: "พบข้อผิดพลาดที่ไม่ทราบสาเหตุ",
        text: "กรุณาลองกรอกข้อมูลใหม่อีกครั้ง หากยังพบข้อผิดพลาดสามารถติดต่อทาง กช.",
      })
    }

    clearTimeout(timeoutID)
    setLoader(false)
    setTimeout(() => {
      setPending(false)
    }, 500)
  }

  let headingText = (
    <div className="mx-10 pt-3 pb-5 md:mx-12">
      <h1 className="text-center text-[20px] font-medium">ลงทะเบียนชมรม{data.title}</h1>
      <div className="mt-2 text-sm">
        <p className="text-center text-gray-500">
          หากลงทะเบียนแล้ว จะถือว่านักเรียนอยู่ชมรมนี้แล้ว จะไม่สามารถขอเปลี่ยนชมรม
        </p>
        <p className="text-center text-gray-500">หรือไป Audition ชมรมอื่นได้อีก</p>
      </div>
    </div>
  )
  let actionButt = (
    <div
      onClick={() => {
        !pending && submit("register")
      }}
      className={classnames(
        "flex items-center justify-center space-x-2 rounded-md bg-TUCMC-green-400 text-lg text-white",
        pending ? "cursor-default py-[1px]" : "cursor-pointer py-2"
      )}
    >
      <div className={classnames(pending && "hidden", "flex items-center space-x-2")}>
        <CheckCircleIcon className="h-5 w-5" />
        <span>ลงทะเบียน</span>
      </div>
      <Ellipsis className={classnames("h-10 w-[3rem]", !pending && "hidden")} />
    </div>
  )

  if (mode !== "default") {
    headingText =
      mode === "confirm" ? (
        <div className="mx-10 pt-3 pb-5 md:mx-12">
          <h1 className="text-center text-[20px] font-medium">ยืนยันสิทธิ์ชมรม{data.title}</h1>
          <div className="mt-2 text-sm">
            <p className="text-center text-gray-500">หากยืนยันสิทธิ์ชมรมนี้แล้ว</p>
            <p className="text-center text-gray-500">จะไม่สามารถเปลี่ยนชมรมได้อีกจนกว่าจะหมดปีการศึกษา</p>
          </div>
        </div>
      ) : (
        <div className="mx-10 pt-3 pb-5 md:mx-12">
          <h1 className="text-center text-[20px] font-medium">สละสิทธิ์ชมรม{data.title}</h1>
          <div className="mt-2 text-sm">
            <p className="text-center text-gray-500">หากสละสิทธิ์ชมรมนี้แล้ว</p>
            <p className="text-center text-gray-500">จะไม่สามารถเปลี่ยนใจกลับมาขอยืนยันสิทธิ์ได้อีก</p>
          </div>
        </div>
      )

    actionButt =
      mode === "confirm" ? (
        <div
          onClick={() => {
            !pending && submit("confirm")
          }}
          className={classnames(
            "flex cursor-pointer items-center justify-center space-x-2 rounded-md bg-TUCMC-green-400 text-lg text-white",
            pending ? "cursor-default py-[1px]" : "cursor-pointer py-2"
          )}
        >
          <div className={classnames(pending && "hidden", "flex items-center space-x-2")}>
            <CheckCircleIcon className="h-5 w-5" />
            <span>ยืนยันสิทธิ์</span>
          </div>
          <Ellipsis className={classnames("h-10 w-[3rem]", !pending && "hidden")} />
        </div>
      ) : (
        <div
          onClick={() => {
            !pending && submit("reject")
          }}
          className={classnames(
            "flex cursor-pointer items-center justify-center space-x-2 rounded-md bg-TUCMC-red-400 text-lg text-white",
            pending ? "cursor-default py-[1px]" : "cursor-pointer py-2"
          )}
        >
          <div className={classnames(pending && "hidden", "flex items-center space-x-2")}>
            <XCircleIcon className="h-5 w-5" />
            <span>สละสิทธิ์</span>
          </div>
          <Ellipsis className={classnames("h-10 w-[3rem]", !pending && "hidden")} />
        </div>
      )
  }

  return (
    <Modal
      overlayClassName="fixed top-0 flex flex-col bg-gray-500 bg-opacity-50 items-center justify-center w-full h-full max-h-screen py-10 z-[60]"
      className="mx-6 flex flex-col overflow-y-auto"
      TriggerDep={TriggerDep}
      CloseDep={{
        dep: closingState,
        revert: () => {
          setClosingState(false)
        },
      }}
      CloseID="dataModalClose"
    >
      <div className="max-w-sm rounded-lg bg-white pt-6 shadow-md">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-TUCMC-orange-200">
          <ExclamationIcon className="h-6 w-6 text-TUCMC-orange-500" />
        </div>
        {headingText}
        <div className="rounded-b-lg bg-gray-50 px-4 pt-3 pb-4">
          <div className="flex flex-col space-y-6 font-medium">
            <div className="flex flex-col space-y-3">
              {mode !== "reject" && (
                <div>
                  <div className="relative mt-1 rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 flex items-center">
                      <label htmlFor="country" className="sr-only">
                        Country
                      </label>
                      <select
                        id="country"
                        name="country"
                        className="h-full rounded-md border-transparent bg-transparent py-0 pl-3 pr-7 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      >
                        <option>TH</option>
                      </select>
                    </div>
                    <input
                      type="text"
                      name="phone_number"
                      id="phone_number"
                      className="block w-full rounded-md border-gray-300 pl-16 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="0935353535"
                      value={phone}
                      onChange={(event) => {
                        setPhone(event.target.value)
                      }}
                    />
                  </div>
                </div>
              )}
              <div>
                <div>
                  <input
                    type="password"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="รหัสผ่าน"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value)
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-3">
              {actionButt}
              <div
                id="dataModalClose"
                className="flex cursor-pointer justify-center rounded-md border border-gray-300 bg-white py-2 text-gray-700"
              >
                <span>ยกเลิก</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default DataModal
