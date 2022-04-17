import ReactQuill from "react-quill"

const Wrapped = ({ editorRef, ...props }) => {
  return <ReactQuill {...props} ref={editorRef} />
}
export default Wrapped
