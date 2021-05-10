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

const ItemsContext = createContext<
  [LooseTypeObject<any>[], (setItems: LooseTypeObject<any>) => void]
  >([[], (_) => null]);

export const ReservedSection = ({display, refetch, userData, editable}) => {

  const [items, setItems] = useState<LooseTypeObject<any>[]>([]);
  const [updateEvent, setUpdateEvent] = useState(setTimeout(() => {}, 1000))
  const [blockRerender, setBRrender] = useState(false)

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

  return (
    <div className={classnames(display ? "block" : "hidden")}>
      <ItemsContext.Provider value={[items, setItems]}>
        <DragableList />
      </ItemsContext.Provider>
    </div>
  )
}

export const useItems = () => useContext(ItemsContext);