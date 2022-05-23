import { useState, useCallback, useEffect } from "react"
import { PanInfo, motion, useAnimation, useDragControls, useMotionValue, Reorder } from "framer-motion"
import { useItems } from "@components/panel/sections/ReservedSection"
import { moveArray } from "@utilities/animationHelper"
import LooseTypeObject from "../../../interfaces/LooseTypeObject"
import { ListElement } from "@components/panel/element/ListElement"
import { useLongPress } from "use-long-press"
import { useWindowDimensions } from "@utilities/document"
import isMobile from "is-mobile"
import { editDataTime, positionUpdateTime } from "@config/time"

export type FixedListProps<T> = {
  items: T[]
  swapDistance: number
  onPositionUpdate: (from: number, to: number) => void
  onPositionChange?: (startIndex: number, endIndex) => void
}

export type FixedListItemProps = {
  handleChange: (i: number, dragOffset: number) => void
  handleDragStart: (index: number) => void
  handleDragEnd: (endIndex: number) => void
}

export const findIndex = (i: number, offset: number, length: number, swapDistance: number) => {
  let target = i

  // If moving down
  if (offset > 0) {
    if (i === length - 1) return i
    if (offset > swapDistance) target = i + 1
  }
  // If moving up
  else if (offset < 0) {
    if (i === 0) return i
    if (offset < -swapDistance) target = i - 1
  }

  return Math.min(Math.max(target, 0), length)
}

export function useFixedList<T>({
  items,
  swapDistance,
  onPositionUpdate,
  onPositionChange,
}: FixedListProps<T>): FixedListItemProps {
  const [startIndex, handleDragStart] = useState(-1)

  const handleChange = useCallback(
    (i: number, dragOffset: number) => {
      const targetIndex = findIndex(i, dragOffset, items.length, swapDistance)
      if (targetIndex !== i) {
        onPositionUpdate(i, targetIndex)
      }
    },
    [items.length, swapDistance, onPositionUpdate]
  )

  const handleDragEnd = useCallback(
    (endIndex: number) => {
      if (onPositionChange && startIndex !== endIndex) onPositionChange(startIndex, endIndex)
      handleDragStart(-1)
    },
    [startIndex, onPositionChange]
  )

  return {
    handleChange,
    handleDragStart,
    handleDragEnd,
  }
}

type DragState = "idle" | "animating" | "dragging"

type FixedListItemResult = [
  DragState,
  {
    onDragStart(event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void
    onDragEnd(event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void
    onAnimationComplete(): void
    onViewportBoxUpdate(box: AxisBox2D, delta: BoxDelta): void
  }
]

export function useFixedListItem(
  index: number,
  { handleChange, handleDragStart, handleDragEnd }: FixedListItemProps
): FixedListItemResult {
  const [state, setState] = useState<DragState>("idle")

  return [
    state,
    {
      onDragStart: (event) => {
        setState("dragging")
        handleDragStart(index)
      },
      onDragEnd: () => {
        setState("animating")
        handleDragEnd(index)
      },
      onAnimationComplete: () => {
        if (state === "animating") setState("idle")
      },
      onViewportBoxUpdate: (_viewportBox, delta) => {
        if (state === "dragging") handleChange(index, delta.y.translate)
      },
    },
  ]
}

type FixedSizeItemProps = {
  index: number
  data: LooseTypeObject<any>
  editable: boolean
  editFunc: () => {}
  dragable: boolean
  callCount: number
  itemProps: FixedListItemProps
}

const tapVariants = {
  tap: {
    opacity: 0.1,
  },
  idle: {
    opacity: 0,
  },
}

function DragableEntity({ index, data, editable, itemProps, editFunc, dragable, callCount }: FixedSizeItemProps) {
  const [dragState, eventHandlers] = useFixedListItem(index, itemProps)

  const dragControls = useDragControls()
  const dragOriginY = useMotionValue(0)

  function startDrag(event) {
    dragControls.start(event, { snapToCursor: true })
  }

  return (
    <li className="relative cursor-pointer">
      <Reorder.Item key={data.position} value={data} dragListener={dragable} {...eventHandlers}>
        <motion.div
          className="absolute h-full w-full bg-TUCMC-gray-700"
          initial="idle"
          whileTap="tap"
          variants={tapVariants}
        />
        <ListElement
          position={index}
          index={data.position}
          userData={data}
          editable={editable}
          editFunc={editFunc}
          callCount={callCount}
        />
      </Reorder.Item>
    </li>
  )
}

const getRandomTransformOrigin = () => {
  const value = (16 + 40 * Math.random()) / 100
  const value2 = (15 + 36 * Math.random()) / 100
  return {
    originX: value,
    originY: value2,
  }
}

const getRandomDelay = () => -(Math.random() * 0.7 + 0.05)

const randomDuration = () => Math.random() * 0.07 + 0.23

const checkOffset = (pram1: number, pram2: number, offset: number) => {
  return Math.abs(pram1 - pram2) <= offset
}

export function DragableList({ editable, editFunc, dragable, setDragMode, callCount }) {
  const [items, setItems] = useItems()
  const [TapnHold, setTapnHold] = useState(setTimeout(() => {}, 1000))
  const [initialPos, setInitialPos] = useState([0, 0])
  const [prevent, setPrevent] = useState(false)

  const { width } = useWindowDimensions()

  const scale = 0.2 * (1 / (width / 1000))

  const variants = {
    start: (i) => ({
      rotate: i % 2 === 0 ? [-1 * scale, 1.3 * scale, 0 * scale] : [1 * scale, -1.4 * scale, 0 * scale],
      transition: {
        delay: getRandomDelay(),
        repeat: Infinity,
        duration: randomDuration(),
      },
    }),
    reset: {
      rotate: 0,
    },
  }

  const onPositionUpdate = useCallback(
    (startIndex: number, endIndex: number) => {
      setItems(moveArray(items, startIndex, endIndex))
    },
    [items, setItems]
  )

  const bind = useLongPress(() => {
    setDragMode(true)
  })

  const controls = useAnimation()
  const offset = 10

  const props = useFixedList({
    items,
    swapDistance: 60,
    onPositionUpdate,
  })

  const lock = new Date().getTime() > positionUpdateTime

  useEffect(() => {
    if (dragable) {
      controls.start("start")
    } else {
      controls.stop()
      controls.set("reset")
    }
  }, [dragable])

  return (
    <ul>
      {items.map((item, i) => {
        return (
          <motion.div
            custom={i}
            className="relative hover:z-30"
            variants={variants}
            animate={controls}
            style={getRandomTransformOrigin()}
            whileTap={dragable ? { scale: 1.03 } : { scale: 1 }}
            onTapStart={(event) => {
              // @ts-ignore
              setInitialPos([event.clientX, event.clientY])
              setTapnHold(
                setTimeout(() => {
                  !lock && setDragMode(true)
                }, 1000)
              )
            }}
            onPointerMove={(event) => {
              if (
                checkOffset(event.clientX, initialPos[0], offset) &&
                checkOffset(event.clientY, initialPos[1], offset)
              )
                return
              return isMobile() && clearTimeout(TapnHold)
            }}
            onPointerUp={() => {
              clearTimeout(TapnHold)
            }}
            key={`shakeWrapper${item.id}-${item.section}`}
          >
            <DragableEntity
              key={item.id}
              data={item}
              index={i}
              dragable={dragable}
              editFunc={editFunc}
              editable={editable}
              itemProps={props}
              callCount={callCount}
            />
          </motion.div>
        )
      })}
    </ul>
  )
}
