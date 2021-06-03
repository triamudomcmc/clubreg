import {ListElement} from "@components/panel/element/ListElement";
import classnames from "classnames"

export const PassedSection = ({display, editFunc, userData, editable}) => {
  return (
    <div className={classnames(display ? "block" : "hidden")}>
      <div>
        {
          userData && userData.map((item, index) => {
            return <ListElement key={`passed-${index}`} userData={item} editable={editable} editFunc={editFunc}/>
          })
        }
      </div>
    </div>
  )
}