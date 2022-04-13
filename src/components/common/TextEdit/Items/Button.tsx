import classNames from "classnames"
import { forwardRef, PropsWithChildren, Ref } from "react"

interface BaseProps {
  className: string
  [key: string]: unknown
}
type OrNull<T> = T | null

export const Button = forwardRef(
  (
    {
      className,
      active,
      reversed,
      ...props
    }: PropsWithChildren<
      {
        active: boolean
        reversed: boolean
      } & BaseProps
    >,
    ref: Ref<OrNull<HTMLSpanElement>>
  ) => (
    <span
      {...props}
      ref={ref}
      className={classNames(
        className,
        "pointer",
        reversed ? (active ? "color-white" : "color-[#aaa]") : active ? "color-black" : "color-[#ccc]"
      )}
    />
  )
)
