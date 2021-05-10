import {motion} from "framer-motion";
import classnames from "classnames"
import {detectOuside} from "@utilities/document";
import {useEffect, useRef, useState} from "react";

const Modal = ({
                 children, overlayClassName = "", className = "", TriggerRef = null, CloseID = "",
                 TriggerDep = null, CloseDep = null, closeClickOutside = true, ToggleDep = null
               }) => {
  const [modalState, setModalState] = useState({comm: false, hide: true})
  const [prevent, setPrevent] = useState(true)
  const panel = useRef(null)

  const trigger = () => {
    setModalState(prevState => ({comm: !prevState.comm, hide: false}))
  }

  useEffect(() => {
    TriggerRef !== null && TriggerRef.current && TriggerRef.current.addEventListener("mousedown", trigger)
  }, [TriggerRef])

  useEffect(() => {
    if (ToggleDep !== null) {
      ToggleDep && open()
      !ToggleDep && close()
    }
  }, [ToggleDep])

  const close = () => {
    setModalState({comm: false, hide: false})
  }

  const open = () => {
    setModalState({comm: true, hide: false})
  }

  useEffect(() => {
    if (CloseID !== "") {
      document.getElementById(CloseID).addEventListener("mousedown", close)
    }
  }, [])

  useEffect(() => {
    if (CloseDep !== null) {
      if (CloseDep.dep) {
        close()
        CloseDep.revert()
      }
    }
  }, [CloseDep])

  const variants = {
    show: {opacity: 1},
    hide: {opacity: 0}
  }

  useEffect(() => {
    if (modalState.comm) {
      setPrevent(false)
    } else {
      setPrevent(true)
    }
  }, [modalState])

  useEffect(() => {
    if (TriggerDep !== null) {
      if (TriggerDep.dep) {
        open()
        TriggerDep.revert()
      }
    }
  }, [TriggerDep])

  closeClickOutside && detectOuside(panel, !prevent, () => {
    close()
  })

  return (
    <div className={classnames(overlayClassName, modalState.hide && "hidden")}>
      <motion.div ref={panel} variants={variants}
                  animate={modalState.comm ? "open" : "hide"}
                  onAnimationComplete={() => {
                    !modalState.comm && setModalState({comm: false, hide: true})
                  }} className={className}>
        {children}
      </motion.div>
    </div>
  )
}

export default Modal