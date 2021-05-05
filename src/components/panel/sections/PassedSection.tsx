import {FilterSearch} from "@components/common/Inputs/Search";
import {ListElement} from "@components/panel/element/ListElement";
import classnames from "classnames"

export const PassedSection = ({display, sortMode, setSortMode, setSearchContext}) => {
  return (
    <div className={classnames(display ? "block" : "hidden")}>
      <div className="mt-8 mb-4">
        <FilterSearch sortMode={sortMode} setSortMode={setSortMode} setSearchContext={setSearchContext}/>
      </div>
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