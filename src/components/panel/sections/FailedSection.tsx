import {ListElement} from "@components/panel/element/ListElement";
import classnames from "classnames"

export const FailedSection = ({display}) => {
  return (
    <div className={classnames(display ? "block" : "hidden")}>
      <div>
        <ListElement/>
        <ListElement/>
        <ListElement/>
        <ListElement/>
        <ListElement/>
      </div>
    </div>
  )
}