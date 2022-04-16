import dynamic from "next/dynamic"
import { ComponentPropsWithRef, ComponentType, FC, ReactElement, useCallback, useEffect, useRef, useState } from "react"

function useHookWithRefCallback() {
  const ref = useRef(null)
  const setRef = useCallback(node => {
    if (ref.current) {
      // Make sure to cleanup any events/references added to the last instance
    }
    
    if (node) {
      // Check if a node is actually passed. Otherwise node would be null.
      // You can now do what you need to, addEventListeners, measure, etc.
    }
    
    // Save a reference to the node
    ref.current = node
  }, [])
  
  return [setRef]
}

export const QuillEditor: FC = () => {
  const [Component, setComponent] = useState<ReactElement | null>(null)
  const [value, setValue] = useState("")
  const [ref] = useHookWithRefCallback()

  useEffect(() => {
    const ReactQuill = dynamic(() => import("react-quill"), {
      ssr: false,
    })

    setComponent(
      <ReactQuill
        placeholder="Type something..."
        value={value}
        bounds={".mows"}
        ref={ref}
        onChange={(v) => setValue(v)}
        // onKeyDown={(e) => {
        //   e.preventDefault()
        //   // quill.current.theme.tooltip.edit()
        //   // quill.current.theme.tooltip.show()
        // }}
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
        theme="bubble"
        // theme="snow"
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
      />
    )

    attachQuillRefs()
  }, [])

  return <div className="mows m-6 rounded-md border border-gray-300 px-2 py-4">{Component}</div>
}
