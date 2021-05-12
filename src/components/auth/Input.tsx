import React, {Dispatch} from "react";
import classnames from "classnames"

interface props {
  title?: string,
  type?: "name" | "text" | "number" | "password",
  stateUpdate?: Dispatch<string> | null,
  required?: boolean,
  placeholder?: string,
  className?: string
}
export const Input = ({title = "", type = "text", stateUpdate = null, required = false, placeholder = "", className = ""}: props) => {
  return (
    <div>
      <span className="text-gray-700 tracking-tight">{title}</span>
      <input
        type={type}
        onChange={event => {stateUpdate && stateUpdate(event.target.value)}}
        placeholder={placeholder}
        className={classnames("appearance-none outline-none border shadow-sm border-gray-300 rounded-md px-4 py-2 w-full focus:ring-TUCMC-pink-500 focus:border-TUCMC-pink-500", className !== "" ? className : "text-lg placeholder-gray-500")} required={required}/>
    </div>
  )
}