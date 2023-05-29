import classnames from "classnames"
import { DragableList } from "@components/panel/element/DragableEntity"
import { createContext, useContext, useEffect, useRef, useState } from "react"
import LooseTypeObject from "../../../interfaces/LooseTypeObject"
import { submitPending, updatePosition } from "@client/fetcher/panel"
import { useAuth } from "@client/auth"
import { motion, Reorder, useAnimation } from "framer-motion"
import { detectOuside } from "@utilities/document"

const ItemsContext = createContext<[LooseTypeObject<any>[], (setItems: LooseTypeObject<any>) => void]>([
  [],
  (_) => null,
])

export const ReservedSection = ({ display, refetch, userData, editable, editFunc, callCount }) => {
  const [items, setItems] = useState<LooseTypeObject<any>[]>([])
  const [updateEvent, setUpdateEvent] = useState(setTimeout(() => {}, 1000))
  const [blockRerender, setBRrender] = useState(false)
  const [prev, setPrev] = useState([])
  const [dragMode, setDragMode] = useState(false)

  const innerItemRef = useRef(null)

  const { onReady } = useAuth()

  const adminData = onReady((logged, userData) => userData)

  useEffect(() => {
    !blockRerender && setItems(userData.sort((a, b) => a.position - b.position))
    blockRerender && setBRrender(false)
  }, [userData])

  const update = () => {
    let ulist = []
    let nitem = items

    nitem.forEach((val, index) => {
      const obj = userData.find((i) => i.dataRefID === val.dataRefID)
      if (obj.position !== index + 1) {
        setPrev((prev) => {
          const prevData = prev.find((i) => i.dataRefID === val.dataRefID)
          if (prevData) {
            if (prevData.position === index + 1) return prev
          }
          ulist.push({ dataRefID: obj.dataRefID, position: index + 1 })
          return prev
        })
      }

      obj.position = index + 1
    })

    if (ulist.length > 0) {
      setPrev(ulist)
      updatePos(ulist)
    }
  }

  useEffect(() => {
    clearTimeout(updateEvent)
    setUpdateEvent(
      setTimeout(() => {
        update()
      }, 1000)
    )
  }, [items])

  const updatePos = async (tasks) => {
    console.log(tasks)
    const res = await updatePosition(localStorage.getItem("currentPanel"), tasks)
    if (res.status) {
      // setBRrender(true)
      refetch()
    } else {
    }
  }

  detectOuside(innerItemRef, dragMode, () => {
    setDragMode(false)
  })

  return (
    <div ref={innerItemRef} className={classnames("select-none", display ? "block" : "hidden")}>
      <motion.div
        onClick={() => {
          setDragMode(false)
          update()
        }}
        className="fixed top-20 right-6 z-[90] cursor-pointer rounded-full bg-TUCMC-gray-700 bg-opacity-50 px-4 py-1 text-sm text-white"
        animate={dragMode ? { opacity: 1 } : { opacity: 0 }}
      >
        เสร็จสิ้น
      </motion.div>
      <ItemsContext.Provider value={[items, setItems]}>
        <Reorder.Group axis="y" values={items} onReorder={setItems}>
          <DragableList
            editable={editable}
            editFunc={editFunc}
            dragable={dragMode}
            setDragMode={setDragMode}
            callCount={callCount}
          />{" "}
        </Reorder.Group>
      </ItemsContext.Provider>
    </div>
  )
}

export const useItems = () => useContext(ItemsContext)
