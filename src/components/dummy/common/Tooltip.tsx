import classnames from "classnames"

export const Tooltip = ({ children, className = "", type = "left" }) => {
  return type === "left" ? (
    <div className={classnames(className, "absolute flex flex-row items-start")}>
      <div
        className="mt-2 border-TUCMC-pink-400"
        style={{
          width: "0",
          height: "0",
          borderStyle: "solid",
          borderWidth: "5px 10px 10px 0",
          borderColor: "transparent rgb(246, 135, 179) transparent transparent",
        }}
      />
      <div className="rounded-md bg-TUCMC-pink-400 px-4 py-1.5 text-xs font-medium text-white">
        <p>{children}</p>
      </div>
    </div>
  ) : type === "right" ? (
    <div className={classnames(className, "absolute flex flex-row items-start")}>
      <div className="rounded-md bg-TUCMC-pink-400 px-4 py-1.5 text-xs font-semibold text-white">
        <p>{children}</p>
      </div>
      <div
        className="mt-2 border-TUCMC-pink-400"
        style={{
          width: "0",
          height: "0",
          borderStyle: "solid",
          borderWidth: "5px 0px 10px 10px",
          borderColor: "transparent transparent transparent rgb(246, 135, 179)",
        }}
      />
    </div>
  ) : type === "top-right" ? (
    <div className={classnames(className, "absolute flex flex-col items-end")}>
      <div
        className="mr-4 border-TUCMC-pink-400"
        style={{
          width: "0",
          height: "0",
          borderStyle: "solid",
          borderWidth: "0px 10px 10px 10px",
          borderColor: "transparent transparent rgb(246, 135, 179) transparent",
        }}
      />
      <div className="rounded-md bg-TUCMC-pink-400 px-4 py-1.5 text-xs font-medium text-white">
        <p>{children}</p>
      </div>
    </div>
  ) : (
    <div className={classnames(className, "absolute flex flex-col items-start")}>
      <div
        className="ml-4 border-TUCMC-pink-400"
        style={{
          width: "0",
          height: "0",
          borderStyle: "solid",
          borderWidth: "0px 10px 10px 10px",
          borderColor: "transparent transparent rgb(246, 135, 179) transparent",
        }}
      />
      <div className="rounded-md bg-TUCMC-pink-400 px-4 py-1.5 text-xs font-medium text-white">
        <p>{children}</p>
      </div>
    </div>
  )
}
