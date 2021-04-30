import React, {Dispatch} from "react";

interface props {
  title: string,
  type?: "name" | "text" | "number" | "password",
  stateUpdate?: Dispatch<string> | null,
  required?: boolean
}
export const Input = ({title, type = "text", stateUpdate = null, required = false}: props) => {
  return (
    <div>
      <span className="text-gray-700 tracking-tight">{title}</span>
      <input
        type={type}
        onChange={event => {stateUpdate && stateUpdate(event.target.value)}}
        className="appearance-none outline-none border shadow-sm border-gray-300 rounded-md px-4 py-2 placeholder-gray-500 text-lg w-full focus:ring-TUCMC-pink-500 focus:border-TUCMC-pink-500" required={required}/>
    </div>
  )
}