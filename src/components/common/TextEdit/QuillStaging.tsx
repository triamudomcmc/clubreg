import dynamic from "next/dynamic"
import React, { useState, useRef, useEffect, FC, MutableRefObject, ComponentType } from "react"

const ReactQuill: any = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill")

    //@ts-ignore
    return ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} />
  },
  {
    ssr: false,
  }
)

export function QuillStaging() {
  const [value, setValue] = useState("")
  const quillRef = useRef()

  useEffect(() => {
    const init = (quill) => {
      // console.log(quill)
    }

    const check = () => {
      if (quillRef.current) {
        init(quillRef.current)
        return
      }
      setTimeout(check, 200)
    }

    check()
  }, [quillRef])

  return (
    <ReactQuill
      formats={[
        "header",
        // "font",
        // "size",
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
      modules={{
        toolbar: [
          [
            { header: ["1", "2", false] },
            // { font: [] }
          ],
          // [{ size: [] }],
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
      forwardedRef={quillRef}
      theme="bubble"
      value={value}
      onChange={setValue}
    />
  )
}
