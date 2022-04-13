import HoveringMenuExample from "@components/common/TextEdit/HoveringToolBarExample"
import { HoveringToolTip } from "@components/common/TextEdit/HoveringToolTip"
import type { NextPage } from "next"

const TextEditPage: NextPage = () => {
  return (
    <div className="flex items-center justify-center p-6">
      <HoveringMenuExample />
    </div>
  )
}

export default TextEditPage
