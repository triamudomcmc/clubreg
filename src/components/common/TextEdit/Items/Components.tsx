import React, { Ref, PropsWithChildren, FC, useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { cx, css } from "@emotion/css"
import { IconSwitcher } from "./IconSwitcher"
import classNames from "classnames"

export interface BaseProps {
  className: string
  [key: string]: unknown
}
export type OrNull<T> = T | null

export const Button = React.forwardRef(
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
      className={cx(
        className,
        css`
          cursor: pointer;
          color: ${reversed ? (active ? "white" : "#aaa") : active ? "black" : "#ccc"};
        `
      )}
    />
  )
)

export const EditorValue = React.forwardRef(
  (
    {
      className,
      value,
      ...props
    }: PropsWithChildren<
      {
        value: any
      } & BaseProps
    >,
    ref: Ref<OrNull<null>>
  ) => {
    const textLines = value.document.nodes
      .map((node) => node.text)
      .toArray()
      .join("\n")
    return (
      <div
        ref={ref}
        {...props}
        className={cx(
          className,
          css`
            margin: 30px -20px 0;
          `
        )}
      >
        <div
          className={css`
            font-size: 14px;
            padding: 5px 20px;
            color: #404040;
            border-top: 2px solid #eeeeee;
            background: #f8f8f8;
          `}
        >
          Slate's value as text
        </div>
        <div
          className={css`
            color: #404040;
            font: 12px monospace;
            white-space: pre-wrap;
            padding: 10px 20px;
            div {
              margin: 0 0 0.5em;
            }
          `}
        >
          {textLines}
        </div>
      </div>
    )
  }
)

// export const Icon = React.forwardRef(
//   ({ className, ...props }: PropsWithChildren<BaseProps>, ref: Ref<OrNull<HTMLSpanElement>>) => (
//     <span
//       {...props}
//       ref={ref}
//       className={cx(
//         "material-icons",
//         className,
//         css`
//           font-size: 18px;
//           vertical-align: text-bottom;
//         `
//       )}
//     />
//   )
// )

export const Icon = React.forwardRef(
  ({ className, children, ...props }: PropsWithChildren<BaseProps>, ref: Ref<OrNull<SVGSVGElement>>) => (
    <IconSwitcher
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          font-size: 18px;
          vertical-align: text-bottom;
          display: inline;
        `,
        "icon"
      )}
      type={children as string}
    />
  )
)

// export const Icon = React.forwardRef(
//   ({ className, children, ...props }: PropsWithChildren<BaseProps>, ref: Ref<OrNull<HTMLSpanElement>>) => (
//     <span
//       {...props}
//       ref={ref}
//       className={cx(
//         className,
//         css`
//           font-size: 18px;
//           vertical-align: text-bottom;
//           display: inline;
//         `
//       )}
//     >
//       <IconSwitcher type={children as string} />
//     </span>
//   )
// )

// export const Icon = React.forwardRef(
//   (
//     { className, ...props }: PropsWithChildren<BaseProps>,
//     ref: Ref<OrNull<HTMLSpanElement>>
//   ) => (
//     <span
//       {...props}
//       ref={ref}
//       className={cx(
//         'material-icons',
//         className,
//         css`
//           font-size: 18px;
//           vertical-align: text-bottom;
//         `
//       )}
//     />
//   )
// )

export const Instruction = React.forwardRef(
  ({ className, ...props }: PropsWithChildren<BaseProps>, ref: Ref<OrNull<HTMLDivElement>>) => (
    <div
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          white-space: pre-wrap;
          margin: 0 -20px 10px;
          padding: 10px 20px;
          font-size: 14px;
          background: #f8f8e8;
        `,
        "instruction"
      )}
    />
  )
)

export const Menu = React.forwardRef(
  ({ className, ...props }: PropsWithChildren<BaseProps>, ref: Ref<OrNull<HTMLDivElement>>) => {
    const [styles, setStyles] = useState<string | never>()

    useEffect(() => {
      setStyles(className)
    }, [className])

    return (
      <>
        <div
          {...props}
          ref={ref}
          id="menu"
          className={
            cx(
              styles,
              css`
                & > { display:
                  inline-block; }
                &
                > + { margin-left: 15px; }
                  * *
                *
              `
            ) ?? "none"
          }
        />
      </>
    )
  }
)

export const Portal = ({ children }) => {
  return typeof document === "object" ? createPortal(children, document.body) : null
}

export const Toolbar = React.forwardRef(
  ({ className, ...props }: PropsWithChildren<BaseProps>, ref: Ref<OrNull<HTMLDivElement>>) => (
    <Menu
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          position: relative;
          padding: 1px 18px 17px;
          margin: 0 -20px;
          border-bottom: 2px solid #eee;
          margin-bottom: 20px;
        `
      )}
    />
  )
)
