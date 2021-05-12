import React, {useContext, useEffect, useState} from "react";
import ToastElement from "./ToastElement";
import {useWindowDimensions} from "@utilities/document";
import {useToast} from "@components/common/Toast/ToastContext";
import {useRouter} from "next/router";

const Toast = () => {

  const {toastData} = useToast()
  const router = useRouter()

  const { width } = useWindowDimensions()

  const maxToasts = width > 640 ? 5 : 1

  const [toast, setToast] = useState({})
  const [toastElement, setToastElement] = useState(<></>)
  const [toastCount, setToastCount] = useState(0)

  const renderToast = () => {
    const toastele: any = Object.values(toast).map((value) => {
      return value
    })
    setToastElement(toastele)
  }

  const deleteToast = (index) => {
    const data = toast
    delete data[index]
    setToast(data)
    renderToast()
  }

  useEffect(() => {
    Object.keys(toast).forEach((val) => {
      if ("crossPage" in toast[val] && toast[val].crossPage == true) return
      deleteToast(val)
    })
  },[router.pathname])

  useEffect(() => {
    if ("title" in toastData) {
      setToast(Object.assign(toast,
        {
          [toastCount]: <ToastElement key={toastCount} toastData={toastData} index={toastCount} toastDeleteHandler={deleteToast}/>
        }
      ))
      setToastCount(toastCount + 1)
      const activeToasts = Object.keys(toast)
      if(activeToasts.length > maxToasts){
        deleteToast(activeToasts[0])
      }
      renderToast()
    }
  }, [toastData])

  return (
    <div className="fixed z-[100] sm:w-max top-0 right-0 font-display">
      {toastElement}
    </div>
  )
}

export default Toast