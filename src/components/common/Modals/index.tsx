import {motion} from "framer-motion";
import classnames from "classnames"
import {detectOuside} from "@utilities/document";
import {useEffect, useRef, useState} from "react";

const Modal = ({children, className, TriggerRef, CloseID = ""}) => {
  const [modalState, setModalState] = useState({comm: false, hide: true})
  const [prevent, setPrevent] = useState(true)
  const panel = useRef(null)

  const trigger = () => {
    setModalState(prevState => ({comm: !prevState.comm, hide: false}))
  }

  useEffect(() => {
    TriggerRef.current && TriggerRef.current.addEventListener("mousedown", trigger)
    return () => {
      TriggerRef.current.removeEventListener("mousedown", trigger);
    };
  }, [TriggerRef])

  const close = () => {
    console.log("cllose")
    setModalState({comm: false, hide: false})
  }

  useEffect(() => {
    if(CloseID !== ""){
      document.getElementById(CloseID).addEventListener("mousedown", close)
      return () => {
        document.getElementById(CloseID).removeEventListener("mousedown", close)
      };
    }
  }, [])

  const variants = {
    show: {opacity: 1},
    hide: {opacity: 0}
  }

  useEffect(() => {
    if(modalState.comm){
      setPrevent(false)
    }else{
      setPrevent(true)
    }
  }, [modalState])

  detectOuside(panel, !prevent, () => {
    close()
  })

  return (
    <motion.div ref={panel} variants={variants}
                animate={modalState.comm ? "open" : "hide"}
                onAnimationComplete={() => {
                  !modalState.comm && setModalState({comm: false, hide: true})
                }} className={classnames(className, modalState.hide && "hidden")}>
      {children}
    </motion.div>
  )
}

export default Modal