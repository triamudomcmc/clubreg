import React, {useState, useEffect, useContext} from 'react'
import Router from "next/router";
import {fetchUser, logout} from "@client/fetcher/user";
import UserData from "../../interfaces/userData";

interface IAuthContext {
  onReady: ((callback: (logged: boolean, userData: UserData | null) => any) => any),
  signout: () => void
}

const AuthContext = React.createContext<IAuthContext | null>(null)

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({children}) => {

  const auth = useProvideAuth()

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

function useProvideAuth() {

  const onReady = (callback: (logged: boolean, userData: UserData | null) => any) => {
    if (ready) {
      return callback("email" in userData, userData)
    }else{
      return {logged: false, userData: null}
    }
  }

  const [userData, setUserData] = useState(null)

  const ready = (userData !== null)

  const singoutAction = async () => {
    await logout()
    Router.reload()
  }

  const signout = () => {
    singoutAction()
  }

  useEffect(() => {

    const getData = async () => {
      const data = await fetchUser()
      setUserData(data.userData)
    }

    getData()

  }, [])

  return {
    onReady,
    signout
  }
}
