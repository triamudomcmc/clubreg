export const Line = ({
  color = "bg-TUCMC-red-400",
  dot = "top",
  length = "h-48"
}) => {
  return (
    <div className={`mt-2 flex flex-col items-center ${length}`}>
      {dot === "top" && <div className={`h-2 w-2 rounded-full ${color}`}></div>}
      <div className={`h-full w-0.5 ${color}`}></div>
      {dot === "bottom" && (
        <div className={`h-2 w-2 rounded-full ${color}`}></div>
      )}
    </div>
  )
}
