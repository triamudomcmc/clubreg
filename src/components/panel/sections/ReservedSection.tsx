import {FilterSearch} from "@components/common/Inputs/Search";
import {ListElement} from "@components/panel/element/ListElement";
import classnames from "classnames"

export const ReservedSection = ({display}) => {
  return (
    <div className={classnames(display ? "block" : "hidden")}>
      <div>
        <ListElement index={1}/>
        <ListElement index={2}/>
        <ListElement index={3}/>
        <ListElement index={4}/>
        <ListElement index={5}/>
      </div>
    </div>
  )
}