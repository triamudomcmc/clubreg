import { useState, useCallback } from "react";
import { PanInfo, AxisBox2D, BoxDelta, motion} from "framer-motion";
import {useItems} from "@components/panel/sections/ReservedSection";
import {getDragStateZIndex, moveArray} from "@utilities/animationHelper";
import LooseTypeObject from "../../../interfaces/LooseTypeObject";
import {ListElement} from "@components/panel/element/ListElement";

export type FixedListProps<T> = {
  items: T[];
  swapDistance: number;
  onPositionUpdate: (from: number, to: number) => void;
  onPositionChange?: (startIndex: number, endIndex) => void;
};

export type FixedListItemProps = {
  handleChange: (i: number, dragOffset: number) => void;
  handleDragStart: (index: number) => void;
  handleDragEnd: (endIndex: number) => void;
};

export const findIndex = (
  i: number,
  offset: number,
  length: number,
  swapDistance: number
) => {
  let target = i;

  // If moving down
  if (offset > 0) {
    if (i === length - 1) return i;
    if (offset > swapDistance) target = i + 1;
  }
  // If moving up
  else if (offset < 0) {
    if (i === 0) return i;
    if (offset < -swapDistance) target = i - 1;
  }

  return Math.min(Math.max(target, 0), length);
};

export function useFixedList<T>({
                                  items,
                                  swapDistance,
                                  onPositionUpdate,
                                  onPositionChange
                                }: FixedListProps<T>): FixedListItemProps {
  const [startIndex, handleDragStart] = useState(-1);

  const handleChange = useCallback(
    (i: number, dragOffset: number) => {
      const targetIndex = findIndex(i, dragOffset, items.length, swapDistance);
      if (targetIndex !== i) {
        onPositionUpdate(i, targetIndex);
      }
    },
    [items.length, swapDistance, onPositionUpdate]
  );

  const handleDragEnd = useCallback(
    (endIndex: number) => {
      if (onPositionChange && startIndex !== endIndex)
        onPositionChange(startIndex, endIndex);
      handleDragStart(-1);
    },
    [startIndex, onPositionChange]
  );

  return {
    handleChange,
    handleDragStart,
    handleDragEnd
  };
}

type DragState = "idle" | "animating" | "dragging";

type FixedListItemResult = [
  DragState,
  {
    onDragStart(
      event: MouseEvent | TouchEvent | PointerEvent,
      info: PanInfo
    ): void;
    onDragEnd(
      event: MouseEvent | TouchEvent | PointerEvent,
      info: PanInfo
    ): void;
    onAnimationComplete(): void;
    onViewportBoxUpdate(box: AxisBox2D, delta: BoxDelta): void;
  }
];

export function useFixedListItem(
  index: number,
  { handleChange, handleDragStart, handleDragEnd }: FixedListItemProps
): FixedListItemResult {
  const [state, setState] = useState<DragState>("idle");

  return [
    state,
    {
      onDragStart: () => {
        setState("dragging");
        handleDragStart(index);
      },
      onDragEnd: () => {
        setState("animating");
        handleDragEnd(index);
      },
      onAnimationComplete: () => {
        if (state === "animating") setState("idle");
      },
      onViewportBoxUpdate: (_viewportBox, delta) => {
        if (state === "dragging") handleChange(index, delta.y.translate);
      }
    }
  ];
}

type FixedSizeItemProps = {
  index: number;
  data: LooseTypeObject<any>,
  itemProps: FixedListItemProps;
};

function DragableEntity({
                         index, data,
                         itemProps
                       }: FixedSizeItemProps) {
  const [dragState, eventHandlers] = useFixedListItem(index, itemProps);

  return (
    <li
      className="hover:z-10 relative cursor-pointer"
    >
      <motion.div
        layout
        initial={false}
        drag="y"
        style={{padding: 0}}
        whileTap={{
          scale: 1.12,
          boxShadow: "0px 5px 5px rgba(0,0,0,0.1)"
        }}
        {...eventHandlers}
      >
        <ListElement index={data.position} userData={data} editable={false}/>
      </motion.div>
    </li>
  );
}

export function DragableList() {
  const [items, setItems] = useItems();
  const onPositionUpdate = useCallback(
    (startIndex: number, endIndex: number) => {
      setItems(moveArray(items, startIndex, endIndex));
    },
    [items, setItems]
  );

  const props = useFixedList({
    items,
    swapDistance: 60,
    onPositionUpdate
  });

  return (
    <ul>
      {items.map((item, i) => (
        <DragableEntity
          key={item.id}
          data={item}
          index={i}
          itemProps={props}
        />
      ))}
    </ul>
  );
}