import {FilterSearch} from "@components/common/Inputs/Search";
import {ListElement} from "@components/panel/element/ListElement";
import classnames from "classnames"
import {DragableList} from "@components/panel/element/DragableEntity";
import {createContext, useContext, useEffect, useRef, useState} from "react";
import move from "array-move"
import LooseTypeObject from "../../../interfaces/LooseTypeObject";
import {isEmpty} from "@utilities/object";
import {submitPending, updatePosition} from "@client/fetcher/panel";
import {useAuth} from "@client/auth";
import {motion, useAnimation} from "framer-motion"
import {detectOuside} from "@utilities/document";

const ItemsContext = createContext<
  [LooseTypeObject<any>[], (setItems: LooseTypeObject<any>) => void]
  >([[], (_) => null]);

export const ReservedSection = ({display, refetch, userData, editable, editFunc}) => {

  const [items, setItems] = useState<LooseTypeObject<any>[]>([]);
  const [updateEvent, setUpdateEvent] = useState(setTimeout(() => {}, 1000))
  const [blockRerender, setBRrender] = useState(false)
  const [dragMode, setDragMode] = useState(false)

  const innerItemRef = useRef(null)

  const {onReady} = useAuth()

  const adminData = onReady((logged, userData) => (userData))

  useEffect(() => {
    !blockRerender && setItems(userData.sort((a,b) => (a.id > b.id)))
    blockRerender && setBRrender(false)
  }, [userData])

  useEffect(() => {
    clearTimeout(updateEvent)
    setUpdateEvent(
      setTimeout(() => {
        let ulist = []
        items.forEach(val => {
          const obj = userData.find(i => i.dataRefID === val.dataRefID)
          if (obj.position !== val.position) return ulist.push({dataRefID: obj.dataRefID, position: val.position})
        })
        if (ulist.length > 0) {
          updatePos(ulist)
        }
      }, 1000)
    )
  },[items])

  const updatePos = async (tasks) => {
    const res = await updatePosition(adminData.panelID, tasks)
    if (res.status) {
      setBRrender(true)
      refetch()
    }else{

    }
  }

  detectOuside(innerItemRef, dragMode, () => {
    setDragMode(false)
  })

  return (
    <div ref={innerItemRef} className={classnames("select-none", display ? "block" : "hidden")}>
      <motion.div onClick={() => {setDragMode(false)}} className="fixed top-20 px-4 py-1 rounded-full right-6 bg-TUCMC-gray-700 bg-opacity-50 text-white text-sm z-[90] cursor-pointer" animate={dragMode ? {opacity: 1} : {opacity: 0}}>เสร็จสิ้น</motion.div>
      <ItemsContext.Provider value={[items, setItems]}>
          <DragableList editable={editable} editFunc={editFunc} dragable={dragMode} setDragMode={setDragMode}/>
      </ItemsContext.Provider>
    </div>
  )
}

export const useItems = () => useContext(ItemsContext);