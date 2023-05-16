import PageContainer from "@components/common/PageContainer"
import React, { useEffect, useState } from "react"
import { DefaultCard } from "@components/common/Cards"
import Router from "next/router"
import LoginSection from "@components/auth/LoginSection"
import { useAuth } from "@client/auth"
import RegisterSection from "@components/auth/RegisterSection"
import { Loader } from "@components/common/Loader"
import { useToast } from "@components/common/Toast/ToastContext"
import { ForgotSection } from "@components/auth/ForgotSection"
import {
  endLastRound,
  endOldClub,
  lastround,
  openRegisterTime,
  openTime,
  startOldClub,
  startOldClubCountdown
} from "@config/time"
import { useTimer } from "@utilities/timers"

const Auth = ({ query }) => {
  const { onReady, signout } = useAuth()
  const { addToast } = useToast()
  const [action, setAction] = useState("register" in query ? "register" : "forgot" in query ? "forgot" : "login")
  const [loader, setLoader] = useState(false)
  const timer = useTimer(startOldClub)
  const regTimer = useTimer(openRegisterTime)

  useEffect(() => {
    if (openRegisterTime < new Date().getTime()) {
      return
    }

    if (action === "register") {
      setAction("r-waiting")
    }
  },[action])

  onReady((logged, userData) => {
    if (logged) {
      // Sussy
      // if (localStorage.getItem("lastVisited").includes("?access")) {
      //   const lastPage = localStorage.getItem("lastVisited")
      //   return Router.push(lastPage)
      // }
      if (userData.student_id.includes("ก")) {
        return Router.push("/panel")
      }
      if (userData.club !== "") {
        return Router.push("/card")
      }
      // if (!userData.club) {
      //   if (new Date().getTime() > lastround && new Date().getTime() < endLastRound) {
      //     Router.push("/select")
      //   } else {
      //     Router.push("/announce")
      //   }
      // }

      if (userData.club === "") {
        if (new Date().getTime() < endOldClub && new Date().getTime() > startOldClub) {
          return Router.push("/confirm")
        }

        Router.push("/account")
      }

      return Router.push("/")
    }
    // if (new Date().getTime() < openTime) {
    //   Router.push("/")
    // }
  })

  const goRegister = () => {
    Router.push(
      {
        pathname: "",
        query: "register",
      },
      undefined,
      { shallow: true }
    )
    setAction("register")
  }

  const goLogin = () => {
    Router.push(
      {
        pathname: "",
        query: "",
      },
      undefined,
      { shallow: true }
    )
    setAction("login")
  }

  const goForgot = () => {
    Router.push(
      {
        pathname: "",
        query: "forgot",
      },
      undefined,
      { shallow: true }
    )
    setAction("forgot")
  }

  useEffect(() => {
    const currentTime = new Date().getTime()
    if (currentTime <= startOldClubCountdown) return
    if (currentTime >= startOldClub) return
    action === "login" && setAction("waiting")
  }, [action])

  useEffect(() => {
    const cause = localStorage.getItem("beforeExit")

    const currentTime = new Date().getTime()

    if (currentTime < startOldClub) {
      setTimeout(() => {
        Router.reload()
      }, startOldClub - currentTime)
    }

    if (currentTime < startOldClubCountdown) {
      setTimeout(() => {
        signout()
      }, startOldClubCountdown - currentTime)
    }

    switch (cause) {
      case "sessionError":
        addToast({
          theme: "modern",
          icon: "cross",
          title: "พบข้อผิดพลาดของเซสชั่น",
          text: "กรุณาลองเข้าสู่ระบบใหม่อีกครั้ง",
        })
        break
      case "sessionRejected":
        addToast({
          theme: "modern",
          icon: "cross",
          title: "เซสชั่นของเบราว์เซอร์นี้ถูกปฏิเสธ",
          text: "กรุณาลองเข้าสู่ระบบใหม่อีกครั้ง หากยังไม่สามารถเข้าสู่ระบบได้กรุณาติดต่อทาง กช. โดยเร็ว",
        })
        break
      case "sessionExpired":
        addToast({
          theme: "modern",
          icon: "info",
          title: "เซสชั่นก่อนหน้าได้หมดอายุไปแล้ว",
          text: "กรุณาลองเข้าสู่ระบบใหม่อีกครั้ง",
        })
        break
      case "missingCookie":
        addToast({
          theme: "modern",
          icon: "info",
          title: "ไม่พบข้อมูลเซสชั่นบนเบราว์เซอร์",
          text: "กรุณาลองเข้าสู่ระบบใหม่อีกครั้ง",
        })
        break
      case "userNotFound":
        addToast({
          theme: "modern",
          icon: "cross",
          title: "ไม่พบข้อมูลผู้ใช้งานนี้บนฐานข้อมูล",
          text: "กรุณาลองเข้าสู่ระบบใหม่อีกครั้ง หากยังไม่สามารถเข้าสู่ระบบได้กรุณาติดต่อทาง กช. โดยเร็ว",
        })
        break
    }
    localStorage.setItem("beforeExit", "")

    if (openRegisterTime > new Date().getTime()) {
      setTimeout(() => {
        Router.reload()
      }, openRegisterTime - new Date().getTime())
    }
  }, [])

  return (
    <PageContainer footer={false}>
      <Loader display={loader} />
      <div style={{ maxWidth: "26rem" }} className="mx-auto my-6 mb-16 min-h-screen space-y-8 md:my-10 md:mb-10">
        {/* <DefaultCard>
          <p className="font-normal">
            นักเรียน ม.5 และ ม.6 จะไม่สามารถล็อกอินเข้าสู่ระบบด้วยบัญชีเดิมในปีการศึกษาที่ผ่านมาได้
            ต้องยืนยันตัวตนและสร้างบัญชีใหม่ทั้งหมด เนื่องจากมีการออกแบบระบบใหม่
          </p>
        </DefaultCard> */}
        <DefaultCard>
          <p className="font-normal">
            นักเรียน ม.5 และ ม.6 ในปีการศึกษา 2566 ที่เข้ามายืนยันสิทธิ์ชมรมเดิม จะต้องใช้บัญชีเดิมในการเข้าสู่ระบบ
          </p>
        </DefaultCard>
        {action == "login" && (
          <LoginSection query={query} primaryAction={goRegister} secAction={goForgot} setLoader={setLoader} />
        )}
        {action == "waiting" && (
          <div className="mt-6 flex flex-col items-center pt-8">
            <h1 className="text-4xl font-bold tracking-tight">เข้าสู่ระบบ</h1>
            <div className="mt-2 mb-6 text-center text-TUCMC-gray-600">
              <p>ระบบลงทะเบียนชมรม</p>
              <p>โรงเรียนเตรียมอุดมศึกษา ปีการศึกษา 2566</p>
            </div>
            <div className="flex flex-row justify-center space-x-2 text-TUCMC-gray-900">
              <div className="flex flex-col items-center">
                <span className="h-[52px] w-[56px] rounded-lg bg-white p-2 text-center text-3xl font-bold shadow-md">
                  {timer.day}
                </span>
                <span className="mt-2 text-xs font-bold text-gray-800">DAY</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="h-[52px] w-[56px] rounded-lg bg-white p-2 text-center text-3xl font-bold shadow-md">
                  {timer.hour}
                </span>
                <span className="mt-2 text-xs font-bold text-gray-800">HOUR</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="h-[52px] w-[56px] rounded-lg bg-white p-2 text-center text-3xl font-bold shadow-md">
                  {timer.min}
                </span>
                <span className="mt-2 text-xs font-bold text-gray-800">MIN</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="h-[52px] w-[56px] rounded-lg bg-white p-2 text-center text-3xl font-bold shadow-md">
                  {timer.sec}
                </span>
                <span className="mt-2 text-xs font-bold text-gray-800">SEC</span>
              </div>
            </div>
            <p className="mt-8 max-w-[300px] text-TUCMC-gray-700">
              ระบบจะเปิดให้เข้าสู่ระบบเพื่อยืนยันสิทธิ์ชมรมเดิมพร้อมกันในวันที่ 5 พ.ค. 2566 เวลา 11.30 น.
            </p>
            <div className="mt-2 flex w-full flex-row justify-center">
              <span onClick={goForgot} className="cursor-pointer text-TUCMC-pink-400">
                ลืมรหัสผ่าน
              </span>
            </div>
          </div>
        )}
        {action == "r-waiting" && (
          <div className="mt-6 flex flex-col items-center pt-8">
            <h1 className="text-4xl font-bold tracking-tight">สร้างบัญชี</h1>
            <div className="mt-2 mb-6 text-center text-TUCMC-gray-600">
              <p>ระบบลงทะเบียนชมรม</p>
              <p>โรงเรียนเตรียมอุดมศึกษา ปีการศึกษา 2566</p>
            </div>
            <div className="flex flex-row justify-center space-x-2 text-TUCMC-gray-900">
              <div className="flex flex-col items-center">
                <span className="h-[52px] w-[56px] rounded-lg bg-white p-2 text-center text-3xl font-bold shadow-md">
                  {regTimer.day}
                </span>
                <span className="mt-2 text-xs font-bold text-gray-800">DAY</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="h-[52px] w-[56px] rounded-lg bg-white p-2 text-center text-3xl font-bold shadow-md">
                  {regTimer.hour}
                </span>
                <span className="mt-2 text-xs font-bold text-gray-800">HOUR</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="h-[52px] w-[56px] rounded-lg bg-white p-2 text-center text-3xl font-bold shadow-md">
                  {regTimer.min}
                </span>
                <span className="mt-2 text-xs font-bold text-gray-800">MIN</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="h-[52px] w-[56px] rounded-lg bg-white p-2 text-center text-3xl font-bold shadow-md">
                  {regTimer.sec}
                </span>
                <span className="mt-2 text-xs font-bold text-gray-800">SEC</span>
              </div>
            </div>
            <p className="mt-8 max-w-[300px] text-TUCMC-gray-700 text-center">
              ระบบจะเปิดให้นักเรียนสร้างบัญชีใหม่ในวันที่ 16 พฤษภาคม 2566 เวลา 12.00 น.
            </p>
            <div className="mt-2 flex w-full flex-row justify-center">
              <span onClick={goLogin} className="cursor-pointer text-TUCMC-pink-400">
                เข้าสู่ระบบ
              </span>
            </div>
          </div>
        )}
        {action == "register" && (
          <RegisterSection
            swapFunction={() => {
              setAction("login")
            }}
            setLoader={setLoader}
          />
        )}
        {action == "forgot" && (
          <ForgotSection
            swapFunction={() => {
              setAction("login")
            }}
            setLoader={setLoader}
          />
        )}
      </div>
    </PageContainer>
  )
}

Auth.getInitialProps = ({ query }) => {
  return { query }
}

export default Auth
