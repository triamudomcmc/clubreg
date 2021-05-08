import {ListElement} from "@components/panel/element/ListElement";
import classnames from "classnames"

export const FailedSection = ({display, userData, editable}) => {
  return (
    <div className={classnames(display ? "block" : "hidden")}>
      <div>
        {
          userData && userData.map((item, index) => {
            return <ListElement key={`failed-${index}`} userData={item} editable={editable}/>
          })
        }
      </div>
    </div>
  )
}