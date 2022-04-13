import { css, cx } from "@emotion/css"
import { FC, forwardRef, PropsWithChildren, Ref } from "react"
import { BaseProps, OrNull } from "./Components"

const FormatBold = forwardRef(
  ({ className, color, children, ...props }: PropsWithChildren<BaseProps>, ref: Ref<OrNull<SVGSVGElement>>) => (
    <svg
      {...props}
      fill={color as string}
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path fill="none" d="M0 0h24v24H0z"></path>
      <path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"></path>
    </svg>
  )
)

const FormatItalic = forwardRef(
  ({ className, color, children, ...props }: PropsWithChildren<BaseProps>, ref: Ref<OrNull<SVGSVGElement>>) => (
    <svg
      {...props}
      fill={color as string}
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path fill="none" d="M0 0h24v24H0z"></path>
      <path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z"></path>
    </svg>
  )
)

const FormatUnderlined = forwardRef(
  ({ className, color, children, ...props }: PropsWithChildren<BaseProps>, ref: Ref<OrNull<SVGSVGElement>>) => (
    <svg
      {...props}
      fill={color as string}
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path fill="none" d="M0 0h24v24H0z"></path>
      <path d="M12 17c3.31 0 6-2.69 6-6V3h-2.5v8c0 1.93-1.57 3.5-3.5 3.5S8.5 12.93 8.5 11V3H6v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2H5z"></path>
    </svg>
  )
)

// const FormatBold: FC = () => {
//   return (
//     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
//       <path fill="none" d="M0 0h24v24H0z"></path>
//       <path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"></path>
//     </svg>
//   )
// }

// const FormatItalic: FC = () => {
//   return (
//     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
//       <path fill="none" d="M0 0h24v24H0z"></path>
//       <path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z"></path>
//     </svg>
//   )
// }

// const FormatUnderlined: FC = () => {
//   return (
//     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
//       <path fill="none" d="M0 0h24v24H0z"></path>
//       <path d="M12 17c3.31 0 6-2.69 6-6V3h-2.5v8c0 1.93-1.57 3.5-3.5 3.5S8.5 12.93 8.5 11V3H6v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2H5z"></path>
//     </svg>
//   )
// }

// export const IconSwitcher: FC<{ type: string }> = ({ type }) => {
//   switch (type) {
//     case "format_bold":
//       return <FormatBold />
//     case "format_italic":
//       return <FormatItalic />
//     case "format_underlined":
//       return <FormatUnderlined />
//     default:
//       return <></>
//   }
// }

const getColor = (active, reversed) => {
  console.log(active, reversed)

  return reversed ? (active ? "white" : "#aaa") : active ? "black" : "#ccc"
}

export const IconSwitcher = forwardRef(
  (
    { type, className, active, reversed, children, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<OrNull<SVGSVGElement>>
  ) => (
    <>
      {type === "format_bold" && <FormatBold color={getColor(active, reversed)} {...props} ref={ref} />}
      {type === "format_italic" && <FormatItalic color={getColor(active, reversed)} {...props} ref={ref} />}
      {type === "format_underlined" && <FormatUnderlined color={getColor(active, reversed)} {...props} ref={ref} />}
    </>
  )
)
