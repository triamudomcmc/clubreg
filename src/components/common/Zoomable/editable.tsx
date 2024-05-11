import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { detectOuside, useWindowDimensions } from "@utilities/document"
import { XIcon } from "@heroicons/react/solid"
import classnames from "classnames"
import { motion } from "framer-motion"
import { CameraIcon } from "@heroicons/react/outline"
import {convertToStaticFileUri, toBase64} from "@utilities/files"

export const EditableZoomable = ({
  src,
  width,
  height,
  onLoad = () => {},
  priority = false,
  className = "",
  updateOverlay = null,
  updateImage,
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

  const [image, setImage] = useState<string | null>(null)

  useEffect(() => {
    updateImage(image)
  }, [image])
  const uploader = useRef(null)
  const doUpload = async (e) => {
    const data = await toBase64(e.target.files[0])
    //@ts-ignore
    setImage(data)
  }

  const padding = 60
  const tp = 80

  useEffect(() => {
    let w = (dimension.width >= 768 ? 768 : dimension.width) - padding
    let h = (w * height) / width

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
              blurDataURL={convertToStaticFileUri(src)}
              className={className}
              src={convertToStaticFileUri(src)}
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
      <div
        ref={squeezed}
        onClick={() => {
          sqPercent < 80 && toggleZoom((prev) => !prev)
        }}
        className={classnames("relative cursor-pointer")}
      >
        {!image ? (
          <Image
            priority={priority}
            quality={50}
            placeholder="blur"
            blurDataURL={convertToStaticFileUri(src)}
            onLoad={onLoad}
            className={classnames(className)}
            src={convertToStaticFileUri(src)}
            width={width}
            height={height}
          />
        ) : (
          <img
            src={convertToStaticFileUri(src)}
            width={width}
            height={height}
            className={classnames(className, "h-[52vw] md:h-[18vw] lg:h-[200px]")}
          />
        )}
        <input
          className="hidden"
          ref={uploader}
          onChange={doUpload}
          type="file"
          accept="image/png, image/jpeg, image/heif"
        />
        <motion.div
          onClick={() => {
            uploader.current.click()
          }}
          initial={{ opacity: 0.4 }}
          whileHover={{ opacity: 1 }}
          className="absolute top-0 flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-TUCMC-gray-800 bg-opacity-70 text-white"
        >
          <CameraIcon className="h-12 w-12" />
        </motion.div>
      </div>
    </div>
  )
}
