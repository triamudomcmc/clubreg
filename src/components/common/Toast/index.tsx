import React, {useEffect, useState} from "react";
import ToastElement from "./ToastElement";
import {useWindowDimensions} from "@utilities/document";


interface ToastProps {
  newToast: {
    theme: "default" | "modern"
    icon: "info" | "cross" | "tick",
    title: string,
    text: string,
    color?: "green" | "yellow" | "red" | "blue",
    lifeSpan?: number
  } | {}
}

const Toast = ({newToast = {}}: ToastProps) => {

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
    if ("title" in newToast) {
      setToast(Object.assign(toast,
        {
          [toastCount]: <ToastElement key={toastCount} toastData={newToast} index={toastCount} toastDeleteHandler={deleteToast}/>
        }
      ))
      setToastCount(toastCount + 1)
      const activeToasts = Object.keys(toast)
      if(activeToasts.length > maxToasts){
        deleteToast(activeToasts[0])
      }
      renderToast()
    }
  }, [newToast])

  return (
    <div className="fixed z-[100] sm:w-max top-0 right-0">
      {toastElement}
    </div>
  )
}

export default Toast