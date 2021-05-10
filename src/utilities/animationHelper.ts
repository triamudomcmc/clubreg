export function moveArray<T>(items: T[], startIndex: number, endIndex: number) {
  const clone = [...items];
  clone[endIndex] = {...items[startIndex], position: endIndex + 1};
  clone[startIndex] = {...items[endIndex], position: startIndex + 1};
  return clone;
}

export const calculateSwapDistance = (sibling: number) => sibling;

export const getDragStateZIndex = (state: string, base = 0) => {
  switch (state) {
    case "dragging":
      return base + 3;
    case "animating":
      return base + 2;
    default:
      return base + 1;
  }
};
