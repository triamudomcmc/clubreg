import {FilterSearch} from "@components/common/Inputs/Search";
import {ListElement} from "@components/panel/element/ListElement";
import classnames from "classnames"

export const PassedSection = ({display, sortMode, setSortMode, setSearchContext, userData, editable}) => {
  return (
    <div className={classnames(display ? "block" : "hidden")}>
      <div className="mt-8 mb-4">
        <FilterSearch sortMode={sortMode} setSortMode={setSortMode} setSearchContext={setSearchContext}/>
      </div>
      <div>
        {
          userData && userData.map((item, index) => {
            return <ListElement key={`passed-${index}`} userData={item} editable={editable}/>
          })
        }
      </div>
    </div>
  )
}