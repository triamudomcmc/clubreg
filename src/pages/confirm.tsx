import PageContainer from "@components/common/PageContainer"
import { endOldClub } from "@config/time"
import { useAuth } from "@handlers/client/auth"
import { fetchClub } from "@client/fetcher/panel"
import { ClubData } from "@interfaces/clubData"
import { AnimateSharedLayout } from "framer-motion"
import { NextPage } from "next"
import Router from "next/router"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { ClipboardCopyIcon, StarIcon } from "@heroicons/react/solid"
import { CatLoader } from "@components/common/CatLoader"
import { AnnounceSplash } from "@vectors/decorations/AnnounceSplash"
import { FC } from "react"
import Modal from "@components/common/Modals"
import { CheckCircleIcon, CheckIcon, ExclamationIcon } from "@heroicons/react/outline"
import { Input } from "@components/auth/Input"
import { regClub } from "@handlers/client/userAction"
import { useToast } from "@components/common/Toast/ToastContext"

// const ModalSection: FC<{ clubName: string; open: boolean; setOpen: Dispatch<SetStateAction<boolean>> }> = ({
//   clubName,
//   open,
//   setOpen,
// }) => {
//   const [modalState, setModalState] = useState(false)
//   const [closeState, setCloseState] = useState(false)

//   const [password, setPassword] = useState("")

//   useEffect(() => {
//     setModalState(open)
//   }, [open])

//   const submitData = async () => {
//     //
//   }

//   return (
//     <Modal
//       overlayClassName="fixed flex flex-col items-center justify-center top-0 left-0 bg-black bg-opacity-20 w-full min-h-screen z-[99]"
//       className="flex min-w-[340px] flex-col items-center rounded-lg bg-white"
//       CloseDep={{
//         dep: closeState,
//         revert: () => {
//           setCloseState(false)
//         },
//       }}
//       TriggerDep={{
//         dep: modalState,
//         revert: () => {
//           setModalState(false)
//           setOpen(false)
//         },
//       }}
//     >
//       <div className="flex w-full flex-col items-center px-4 py-4">
//         <div className="mt-1 mb-2 rounded-full bg-TUCMC-orange-200 p-3">
//           <ExclamationIcon className="h-6 w-6 text-TUCMC-orange-500" />
//         </div>
//         <div className="w-full space-y-1">
//           <h1 className="text-center text-TUCMC-gray-900">ยืนยันสิทธิ์ชมรม{clubName}</h1>
//           <p className="text-center text-sm text-TUCMC-gray-600">
//             หากยืนยันสิทธิ์ชมรมนี้แล้ว
//             <br />
//             จะไม่สามารถเปลี่ยนชมรมได้อีกจนกว่าจะหมดปีการศึกษา
//           </p>
//         </div>
//       </div>
//       <div className="w-full space-y-6 rounded-b-lg bg-TUCMC-gray-100 px-4 py-4">
//         <Input stateUpdate={setPassword} type="password" className="h-10" placeholder="รหัสผ่าน" />
//         <div className="space-y-2">
//           <button
//             onClick={submitData}
//             className="flex w-full items-center justify-center space-x-1 rounded-lg bg-TUCMC-green-400 py-2 text-white"
//           >
//             <CheckCircleIcon className="h-5 w-5" />
//             <span>ยืนยัน</span>
//           </button>
//           <button
//             onClick={() => {
//               setCloseState(true)
//             }}
//             className="text-gray-TUCMC-600 w-full rounded-lg border border-gray-400 bg-white py-2"
//           >
//             ยกเลิก
//           </button>
//         </div>
//       </div>
//     </Modal>
//   )
// }

const BaseData: ClubData = {
  new_count: 0,
  new_count_limit: 0,
  old_count: 0,
  old_count_limit: 0,
  count_limit: 0,
  place: "",
  audition: false,
  message: "",
  contact: { type: "", context: "" },
  contact2: { type: "", context: "" },
  contact3: { type: "", context: "" },
  teacher_count: 0,
  status: "pending",
  title: "",
}

const fetchClubDataAction = async (clubID: string, setClubData: Dispatch<SetStateAction<{}>>) => {
  if (!clubID) return

  const data = await fetchClub(clubID)
  let nid = clubID
  if (clubID.includes("_")) {
    nid = `${clubID.split("_")[0]}_1`
  } else {
    if (clubID.includes("ก30920") && clubID !== "ก30920-8") {
      nid = "ก30920-1"
    }
  }

  //@ts-ignore
  const st: { status: any } = await fetchClub(nid)
  setClubData({ ...data, status: st.status })
}

const Confirm: NextPage = () => {
  const [clubData, setClubData] = useState<ClubData & { loading?: boolean }>({ ...BaseData, loading: true })
  // const [modalOpen, setModalOpen] = useState(false)

  const { onReady, tracker, reFetch } = useAuth()
  const { addToast } = useToast()

  const { userData } = onReady((logged, userData) => {
    if (!logged) {
      Router.push("/auth")
    } else {
      if (new Date().getTime() > endOldClub) {
        Router.push("/")
        return { userData }
      }

      if (userData.club !== "") {
        Router.push("/card")
      } else if (userData.old_club === "") {
        Router.push("/")
      }
    }
    return { userData }
  })

  const refetchData = () => {
    fetchClubDataAction(userData?.old_club, setClubData)
  }

  const confirm = async () => {
    const res = await regClub("", "", userData?.old_club, true)
    console.log(res)
    if (res.status) {
      addToast({
        theme: "modern",
        icon: "tick",
        title: "ยืนยันสิทธิ์ชมรมเดิม",
        text: "ติดตามรายละเอียดการ Audition จากช่องทางประชาสัมพันธ์ของชมรมนั้นโดยตรง และไปทำการ Audition ตามเวลาและสถานที่ที่ชมรมนั้น ๆ กำหนด",
        lifeSpan: 30000,
      })
      // refetcher()
    } else {
      addToast({
        theme: "modern",
        icon: "cross",
        title: "พบข้อผิดพลาดที่ไม่ทราบสาเหตุ",
        text: "กรุณาลองกรอกข้อมูลใหม่อีกครั้ง หากยังพบข้อผิดพลาดสามารถติดต่อทาง กช.",
      })
    }
  }

  useEffect(() => {
    refetchData()
  }, [userData])

  if (clubData.loading) return <CatLoader />
  return (
    <PageContainer>
      <AnimateSharedLayout>
        {/* <ModalSection clubName={clubData.title} open={modalOpen} setOpen={setModalOpen} /> */}

        <div className="flex min-h-screen flex-col items-center space-y-8 py-14 px-4">
          <div className="md:max-w-xs">
            <div className="flex flex-col items-center">
              <h1 className="text-4xl font-medium">ยืนยันสิทธิ์ชมรมเดิม</h1>
              <span className="text-sm tracking-tight">ภายในวันที่ 6 พ.ค. 65</span>
            </div>
            <div className="mt-6 w-full min-w-[300px] px-8">
              <AnnounceSplash />
            </div>
          </div>

          <div className="flex justify-center">
            <div className="rounded-md py-4 px-8 shadow-md">
              <div className="flex flex-col space-y-1">
                <h2>ชมรม{clubData.title}</h2>
                {clubData.audition ? (
                  <div className="flex space-x-1 text-xs text-TUCMC-pink-400">
                    <StarIcon className="mt-1 h-4 w-4" />
                    <span className="leading-6">มีการ Audition</span>
                  </div>
                ) : (
                  <div className="flex space-x-1 text-xs text-TUCMC-blue-400">
                    <ClipboardCopyIcon className="mt-1 h-4 w-4" />
                    <span className="leading-6">ไม่มีการ Audition</span>
                  </div>
                )}

                {clubData.old_count_limit - clubData.old_count > 0 ? (
                  <p className="text-sm text-TUCMC-gray-600">
                    เหลืออีก {clubData.old_count_limit - clubData.old_count} ที่
                  </p>
                ) : (
                  <p className="text-sm text-TUCMC-red-500">ชมรมนี้มีโควตายืนยันชมรมเดิมเต็มแล้ว</p>
                )}
              </div>

              {clubData.old_count_limit - clubData.old_count > 0 && (
                <button
                  onClick={() => {
                    // setModalOpen(true)
                    confirm()
                  }}
                  className="mt-4 rounded-full bg-TUCMC-green-400 py-3 px-6 text-white transition-colors hover:bg-TUCMC-green-500"
                >
                  ยืนยันสิทธิ์ชมรมเดิม
                </button>
              )}
            </div>
          </div>
        </div>
      </AnimateSharedLayout>
    </PageContainer>
  )
}

export default Confirm
