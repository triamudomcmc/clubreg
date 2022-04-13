import { css, cx } from "@emotion/css"
import { forwardRef, PropsWithChildren, Ref } from "react"
import ReactDOM from "react-dom"

interface BaseProps {
  className: string
  [key: string]: unknown
}
type OrNull<T> = T | null

export const Portal = ({ children }) => {
  return typeof document === "object" ? ReactDOM.createPortal(children, document.body) : null
}

export const Menu = forwardRef(
  ({ className, ...props }: PropsWithChildren<BaseProps>, ref: Ref<OrNull<HTMLDivElement>>) => (
    <div
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          & > { display:
            inline-block; }
          &
          > + { margin-left: 15px; }
            * *
          *
        `
      )}
    />
  )
)
