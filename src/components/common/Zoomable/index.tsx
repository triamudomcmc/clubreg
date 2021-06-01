import Image from "next/image";
import {useEffect, useRef, useState} from "react";
import {detectOuside, useWindowDimensions} from "@utilities/document";
import {XCircleIcon} from "@heroicons/react/outline";
import {XIcon} from "@heroicons/react/solid";
import classnames from "classnames";

export const Zoomable = ({src, width, height, onLoad = () => {}, priority = false, className = "", updateOverlay = null}) => {
  const [zoom, toggleZoom] = useState(false)
  const ref = useRef(null)
  const [zoomedWidth, setZW] = useState(0)
  const [sqPercent, setSqPer] = useState(0)
  const [activeTP ,setActiveTP] = useState(0)
  const squeezed = useRef(null)

  const dimension = useWindowDimensions()

  detectOuside(ref, true, () => {
    toggleZoom(false)
  })

  const padding = 60
  const tp = 80

  useEffect(() => {
    let w = (dimension.width >= 768 ? 768 : dimension.width) - padding
    let h = w * height / width

    console.log(h, "e")
    if (dimension.height - (padding + tp * 3) < h) {
      w = (dimension.height - (padding + tp * 3) * width / height) - padding
      setActiveTP(tp)
    }

    setZW(w * (height > 800 ? 0.6 : 1))
  }, [dimension.width, dimension.height, zoom])

  useEffect(() => {
    if (!squeezed.current) return
    setSqPer((squeezed.current.clientWidth / dimension.width * 100))
  },[squeezed.current?.clientWidth])

  useEffect(() => {
    if (zoom && updateOverlay) {
      updateOverlay(<div style={{paddingTop: `${activeTP}px`}} className="fixed top-0 select-none left-0 z-20 flex bg-gray-600 bg-opacity-70 justify-center items-center w-full min-w-screen min-h-screen">
        <div className="relative" ref={ref}>
          <div onClick={() => {toggleZoom(false)}} className="absolute cursor-pointer rounded-full bg-TUCMC-gray-900 bg-opacity-40 px-1 py-1 -top-6 -right-6">
            <XIcon className="w-4 h-4 text-white cursor-pointer"/>
          </div>
          <Image priority={priority} onLoad={onLoad} className={className} src={src} width={zoomedWidth}
                 height={zoomedWidth * height / width}/>
        </div>
      </div>)
    }else{
      updateOverlay && updateOverlay(<></>)
    }

  },[zoom])

  return (
    <div className="select-none">
      {!updateOverlay && zoom && <div className="fixed top-0 left-0 z-20 flex bg-gray-600 bg-opacity-70 justify-center items-center w-full min-w-screen min-h-screen">
          <div className="relative" ref={ref}>
              <div onClick={() => {toggleZoom(false)}} className="absolute cursor-pointer rounded-full bg-TUCMC-gray-900 bg-opacity-40 px-1 py-1 -top-6 -right-6">
                  <XIcon className="w-4 h-4 text-white cursor-pointer"/>
              </div>
              <Image priority={priority} onLoad={onLoad} className={className} src={src} width={zoomedWidth}
                     height={zoomedWidth * height / width}/>
          </div>
      </div>}
      <div ref={squeezed} onClick={() => {
        sqPercent < 80 && toggleZoom(prev => (!prev))
      }} className={classnames(sqPercent < 80 && "cursor-magnify")}>
        <Image priority={priority} onLoad={onLoad} className={className} src={src} width={width}
               height={height}/>
      </div>
    </div>
  )
}