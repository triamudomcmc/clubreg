import PageContainer from "@components/common/PageContainer";
import React, {useEffect, useState} from "react";
import {DefaultCard} from "@components/common/Cards";
import Router from "next/router";
import LoginSection from "@components/auth/LoginSection";
import {useAuth} from "@client/auth";
import RegisterSection from "@components/auth/RegisterSection";
import {Loader} from "@components/common/Loader"
import {useToast} from "@components/common/Toast/ToastContext";
import {ForgotSection} from "@components/auth/ForgotSection";
import {endLastRound, lastround, openTime} from "@config/time";


const Auth = ({query}) => {

  const {onReady} = useAuth()
  const {addToast} = useToast()
  const [action, setAction] = useState(("register" in query) ? "register" : "login")
  const [loader, setLoader] = useState(false)


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
    }
    // if (new Date().getTime() < openTime) {
    //   Router.push("/")
    // }
  })

  const goRegister = () => {
    Router.push({
        pathname: '',
        query: "register"
      },
      undefined, {shallow: true}
    )
    setAction("register")
  }

  useEffect(() => {
    if ("verify" in query) {
      addToast({
        theme: "modern",
        icon: "tick",
        title: "เบราซ์เซอร์นี้ได้รับอนุญาตให้เข้าสู่ระบบชั่วคราวแล้ว",
        text: "กรุณาลองเข้าสู่ระบบใหม่อีกครั้ง"
      })
    }
    const cause = localStorage.getItem("beforeExit")

    switch (cause) {
      case "sessionError" :
        addToast({
          theme: "modern",
          icon: "cross",
          title: "พบข้อผิดพลาดของเซสชั่น",
          text: "กรุณาลองเข้าสู่ระบบใหม่อีกครั้ง"
        })
        break
      case "sessionRejected" :
        addToast({
          theme: "modern",
          icon: "cross",
          title: "เซสชั่นของเบราว์เซอร์นี้ถูกปฏิเสธ",
          text: "กรุณาลองเข้าสู่ระบบใหม่อีกครั้ง หากยังไม่สามารถเข้าสู่ระบบได้กรุณาติดต่อทาง กช. โดยเร็ว"
        })
        break
      case "sessionExpired" :
        addToast({
          theme: "modern",
          icon: "info",
          title: "เซสชั่นก่อนหน้าได้หมดอายุไปแล้ว",
          text: "กรุณาลองเข้าสู่ระบบใหม่อีกครั้ง"
        })
        break
      case "missingCookie" :
        addToast({
          theme: "modern",
          icon: "info",
          title: "ไม่พบข้อมูลเซสชั่นบนเบราว์เซอร์",
          text: "กรุณาลองเข้าสู่ระบบใหม่อีกครั้ง"
        })
        break
      case "userNotFound" :
        addToast({
          theme: "modern",
          icon: "cross",
          title: "ไม่พบข้อมูลผู้ใช้งานนี้บนฐานข้อมูล",
          text: "กรุณาลองเข้าสู่ระบบใหม่อีกครั้ง หากยังไม่สามารถเข้าสู่ระบบได้กรุณาติดต่อทาง กช. โดยเร็ว"
        })
        break
    }
    localStorage.setItem("beforeExit", "")
  }, [])

  return (
    <PageContainer footer={false}>
      <Loader display={loader}/>
      <div style={{maxWidth: "26rem"}} className="mx-auto my-6 mb-16 md:my-10 md:mb-10 space-y-8 min-h-screen">
        <DefaultCard>
          <p className="font-normal">นักเรียน ม.5 และ ม.6 จะไม่สามารถล็อกอินเข้าสู่ระบบด้วยบัญชีเดิมในปีการศึกษาที่ผ่านมาได้
            ต้องยืนยันตัวตนและสร้างบัญชีใหม่ทั้งหมด เนื่องจากมีการออกแบบระบบใหม่</p>
        </DefaultCard>
        {action == "login" && <LoginSection query={query} primaryAction={goRegister} secAction={() => {
          setAction("forgot")
        }} setLoader={setLoader}/>}
        {action == "register" && <RegisterSection swapFunction={() => {
          setAction("login")
        }} setLoader={setLoader}/>}
        {action == "forgot" && <ForgotSection swapFunction={() => {
          setAction("login")
        }} setLoader={setLoader}/>}
      </div>
    </PageContainer>
  )
}

Auth.getInitialProps = ({query}) => {
  return {query}
}

export default Auth
