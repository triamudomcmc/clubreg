export const Line = ({color = "bg-TUCMC-red-400", dot = "top", length = "h-48"}) => {
  return (
    <div className={"flex flex-col mt-2 items-center " + length}>
      {dot == "top" && <div className={"rounded-full w-2 h-2 " + color}></div>}
      <div className={"w-0.5 h-full " + color}>
      </div>
      {dot == "bottom" && <div className={"rounded-full w-2 h-2 " + color}></div>}
    </div>
  )
}