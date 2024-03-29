import React, { useState, useEffect, useContext } from "react"
import Router, { useRouter } from "next/router"
import { fetchUser, logout } from "@client/fetcher/user"
import UserData from "../../interfaces/userData"
import { Tracker } from "@client/tracker/track"

interface IAuthContext {
  onReady: (callback: (logged: boolean, userData: UserData | null) => any) => any
  signout: () => void
  tracker: Tracker
  reFetch: (cause?: string) => Promise<void>
  isInit: boolean
}

const AuthContext = React.createContext<IAuthContext | null>(null)

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const auth = useProvideAuth()

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

function useProvideAuth() {
  const onReady = (callback: (logged: boolean, userData: UserData | null) => any) => {
    if (userData !== null) return callback("student_id" in userData, userData)
    return { logged: false, userData: null }
  }

  const [userData, setUserData] = useState(null)
  const [tracker, setTracker] = useState(new Tracker())
  const [isInit, setInit] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (router.pathname !== "/auth" && router.pathname !== "/") {
      localStorage.setItem("lastVisited", router.asPath)
    }
  }, [router.pathname])

  const reFetch = async (cause: string = "") => {
    const data = await fetchUser()
    cause !== "" && localStorage.setItem("beforeExit", cause)
    setUserData({...data.userData, expires: data.expires || 0})
    setTracker(await new Tracker().setUserID(data.userID).init())
  }

  const singoutAction = async () => {
    await logout()
    setUserData(null)
    setTracker(new Tracker())
    Router.push("/auth")
  }

  const signout = () => {
    singoutAction()
  }

  useEffect(() => {
    reFetch()

    setInit(false)
  }, [])

  return {
    onReady,
    signout,
    tracker,
    reFetch,
    isInit,
  }
}
