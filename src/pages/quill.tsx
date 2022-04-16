import { QuillEditor } from "@components/common/TextEdit/Quill"
import { QuillStaging } from "@components/common/TextEdit/QuillStaging"
import { NextPage } from "next"
import { useState } from "react"

const Quill: NextPage = () => {
  const [value, setValue] = useState("")
  return <QuillEditor value={value} onChange={setValue} />
  // return <QuillStaging />
}

export default Quill
