import {FilterSearch} from "@components/common/Inputs/Search";
import {ListElement} from "@components/panel/element/ListElement";
import classnames from "classnames"

export const ReservedSection = ({display, userData, editable}) => {
  return (
    <div className={classnames(display ? "block" : "hidden")}>
      <div>
        {
          userData && userData.map((item, index) => {
            return <ListElement key={`reserved-${index}`} userData={item} index={item.position} editable={editable}/>
          })
        }
      </div>
    </div>
  )
}