import type { NextPage } from "next"
import { FC, useMemo, useState } from "react"
import { createEditor } from "slate"
import { Editable, ReactEditor, Slate, withReact } from "slate-react"

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
]

export const TextEditor: FC = () => {
  const editor = useMemo(() => withReact(createEditor() as ReactEditor), [])

  return (
    <div className="w-[500px] rounded-md border border-gray-300 px-4 py-6">
      <Slate editor={editor} value={initialValue}>
        <Editable placeholder="Type something..." />
      </Slate>
    </div>
  )
}
