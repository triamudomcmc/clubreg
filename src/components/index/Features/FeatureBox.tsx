import { Button } from "@components/common/Inputs/Button"
import type { FeatureBoxProps } from "@components/index/Features/sharedProps"
import classNames from "classnames"
import type { FC } from "react"
import React from "react"

// TODO convert img tag to next/image

export const FeatureBox: FC<FeatureBoxProps> = (props) => {
  const { url, content, image, smallImage, customClassName } = props

  if (smallImage) {
    return (
      <Button
        type="div"
        href={url}
        className="flex flex-row items-end justify-between rounded-xl bg-TUCMC-pink-400 px-7 pt-4 pb-6 shadow-lg md:rounded-lg md:bg-white"
      >
        {content}
        <img alt={"menu1"} className="w-32 md:hidden md:w-28" src={image} />
        <img
          alt={"menu2"}
          className="ml-4 hidden w-32 md:block md:w-28"
          src={smallImage}
        />
      </Button>
    )
  }

  return (
    <Button
      type="div"
      href={url}
      className={classNames(
        "flex flex-row items-center justify-between rounded-xl bg-white shadow-lg md:rounded-lg",
        customClassName || "px-7 py-5"
      )}
    >
      <div className="w-1/2 shrink-0">
        <h1 className="text-5xl font-bold tracking-tighter text-TUCMC-pink-400">
          {content}
        </h1>
      </div>
      <img alt={"menu2"} className="w-36 md:w-32" src={image} />
    </Button>
  )
}
