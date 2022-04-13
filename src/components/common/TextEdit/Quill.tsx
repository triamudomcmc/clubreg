import dynamic from "next/dynamic"
import { ComponentPropsWithRef, ComponentType, FC, ReactElement, useEffect, useRef, useState } from "react"

export const QuillEditor: FC = () => {
  const [Component, setComponent] = useState<ReactElement | null>(null)
  const quillRef = useRef(null)

  useEffect(() => {
    const ReactQuill = dynamic(() => import("react-quill"))

    setComponent(
      <ReactQuill
        bounds={".mows"}
        // ref={quillRef}
        onChange={(e) => {
          console.log(e)
        }}
        onKeyDown={(e) => {
          e.preventDefault()
          // quill.current.theme.tooltip.edit()
          // quill.current.theme.tooltip.show()
        }}
        modules={{
          toolbar: [
            // [
            //   { header: "1" },
            //   { header: "2" },
            //   false,
            //   // { font: [] }
            // ],
            [{ size: [] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
            [
              "link",
              "image",
              // "video"
            ],
            // ["clean"],
          ],
          clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
          },
        }}
        theme="bubble"
        formats={[
          "header",
          "font",
          "size",
          "bold",
          "italic",
          "underline",
          "strike",
          "blockquote",
          "list",
          "bullet",
          "indent",
          "link",
          "image",
          "video",
        ]}
      />
    )
  }, [])

  return <div className="mows m-6 rounded-md border border-gray-300 px-2 py-4">{Component}</div>
}
