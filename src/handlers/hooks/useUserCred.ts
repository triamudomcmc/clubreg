import { useToast } from "@components/common/Toast/ToastContext"
import { useEffect, useState } from "react"
import { useAuth } from "@handlers/client/auth"
import { fetchUserCred } from "@handlers/client/fetcher/user"

const defaultCred = { email: "", phone: "", authorised: [], safeMode: false, beta: [], verified2FA: false }

export const useUserCred = () => {
  const [userCred, setUserCred] = useState(defaultCred)
  const { addToast } = useToast()
  const { reFetch } = useAuth()

  useEffect(() => {
    fetchCred(setUserCred, commonError)
  }, [])

  const fetchCred = async (setUserCred, errHandler) => {
    const res = await fetchUserCred()
    if (res.status) return setUserCred(res.data)
    errHandler(res.report)
  }

  const commonError = (report) => {
    switch (report) {
      case "sessionError":
        addToast({
          theme: "modern",
          icon: "cross",
          title: "พบข้อผิดพลาดของเซสชั่น",
          text: "กรุณาลองเข้าสู่ระบบใหม่อีกครั้ง",
          crossPage: true,
        })
        reFetch()
        break
    }
  }

  const reFetchCred = () => {
    fetchCred(setUserCred, commonError)
  }

  return { userCred, reFetchCred }
}
