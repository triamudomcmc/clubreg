import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { detectOuside, useWindowDimensions } from "@utilities/document"
import { XIcon } from "@heroicons/react/solid"
import classnames from "classnames"

export const Zoomable = ({
  src,
  width,
  height,
  onLoad = () => {},
  priority = false,
  className = "",
  updateOverlay = null,
}) => {
  const [zoom, toggleZoom] = useState(false)
  const ref = useRef(null)
  const [zoomedWidth, setZW] = useState(0)
  const [sqPercent, setSqPer] = useState(0)
  const [activeTP, setActiveTP] = useState(0)
  const squeezed = useRef(null)

  const dimension = useWindowDimensions()

  detectOuside(ref, true, () => {
    toggleZoom(false)
  })

  const padding = 60
  const tp = 80

  useEffect(() => {
    let w = (dimension.width >= 768 ? 768 : dimension.width) - padding
    let h = (w * height) / width

    console.log(h, "e")
    if (dimension.height - (padding + tp * 3) < h) {
      w = dimension.height - ((padding + tp * 3) * width) / height - padding
      setActiveTP(tp)
    }

    setZW(w * (height > 800 ? 0.6 : 1))
  }, [dimension.width, dimension.height, zoom])

  useEffect(() => {
    if (!squeezed.current) return
    setSqPer((squeezed.current.clientWidth / dimension.width) * 100)
  }, [squeezed.current?.clientWidth])

  useEffect(() => {
    if (zoom && updateOverlay) {
      updateOverlay(
        <div
          style={{ paddingTop: `${activeTP}px` }}
          className="min-w-screen fixed top-0 left-0 z-20 flex min-h-screen w-full select-none items-center justify-center bg-gray-600 bg-opacity-70"
        >
          <div className="relative" ref={ref}>
            <div
              onClick={() => {
                toggleZoom(false)
              }}
              className="absolute -top-6 -right-6 cursor-pointer rounded-full bg-TUCMC-gray-900 bg-opacity-40 px-1 py-1"
            >
              <XIcon className="h-4 w-4 cursor-pointer text-white" />
            </div>
            <Image
              priority={priority}
              onLoad={onLoad}
              placeholder="blur"
              blurDataURL={src}
              className={className}
              src={src}
              width={zoomedWidth}
              height={(zoomedWidth * height) / width}
            />
          </div>
        </div>
      )
    } else {
      updateOverlay && updateOverlay(<></>)
    }
  }, [zoom])

  return (
    <div className="select-none">
      {!updateOverlay && zoom && (
        <div className="min-w-screen fixed top-0 left-0 z-20 flex min-h-screen w-full items-center justify-center bg-gray-600 bg-opacity-70">
          <div className="relative" ref={ref}>
            <div
              onClick={() => {
                toggleZoom(false)
              }}
              className="absolute -top-6 -right-6 cursor-pointer rounded-full bg-TUCMC-gray-900 bg-opacity-40 px-1 py-1"
            >
              <XIcon className="h-4 w-4 cursor-pointer text-white" />
            </div>
            <Image
              priority={priority}
              onLoad={onLoad}
              placeholder="blur"
              blurDataURL={src}
              className={className}
              src={src}
              width={zoomedWidth}
              height={(zoomedWidth * height) / width}
            />
          </div>
        </div>
      )}
      <div
        ref={squeezed}
        onClick={() => {
          sqPercent < 80 && toggleZoom((prev) => !prev)
        }}
        className={classnames(sqPercent < 80 && "cursor-magnify")}
      >
        <Image
          priority={priority}
          placeholder="blur"
          blurDataURL={src}
          onLoad={onLoad}
          className={className}
          src={src}
          width={width}
          height={height}
        />
      </div>
    </div>
  )
}
