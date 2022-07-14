import React, { Dispatch } from "react"
import classnames from "classnames"

interface props {
  title?: string
  type?: "name" | "text" | "number" | "password"
  stateUpdate?: Dispatch<string> | null
  required?: boolean
  placeholder?: string
  className?: string
}
export const Input = ({
  title = "",
  type = "text",
  stateUpdate = null,
  required = false,
  placeholder = "",
  className = "",
}: props) => {
  return (
    <div>
      <span className="tracking-tight text-gray-700">{title}</span>
      <input
        type={type}
        onChange={(event) => {
          stateUpdate && stateUpdate(event.target.value)
        }}
        placeholder={placeholder}
        className={classnames(
          "outline-none w-full appearance-none rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-TUCMC-pink-500 focus:ring-TUCMC-pink-500",
          className !== "" ? className : "text-lg placeholder-gray-500"
        )}
        required={required}
      />
    </div>
  )
}
