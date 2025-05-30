export const ListElement = ({
  position = 0,
  index = 0,
  userData,
  editable,
  editFunc,
  callCount = 0,
  noStatus = false,
}) => {
  let statusBar = (
    <div className="rounded-full bg-TUCMC-gray-800 px-4 py-0.5 text-center text-sm tracking-tight text-white">
      รอการตอบรับ
    </div>
  )
  if (userData.status === "confirmed") {
    statusBar = (
      <div className="rounded-full bg-TUCMC-green-400 px-4 py-0.5 text-center text-sm tracking-tight text-white">
        ยืนยันสิทธิ์แล้ว
      </div>
    )
  }
  if (userData.status === "rejected") {
    statusBar = (
      <div className="rounded-full bg-TUCMC-red-400 px-4 py-0.5 text-center text-sm tracking-tight text-white">
        สละสิทธิ์แล้ว
      </div>
    )
  }

  if (userData.status === "reserved") {
    statusBar = (
      <div className="hidden rounded-full bg-TUCMC-gray-800 py-1 px-[0.5] text-center text-sm tracking-tight text-white opacity-0 md:block">
        จะถูกเรียกสำรอง
      </div>
    )
    if (position + 1 <= callCount) {
      statusBar = (
        <div className="rounded-full bg-TUCMC-gray-800 py-1 px-[0.5] text-center text-sm tracking-tight text-white">
          จะถูกเรียกสำรอง
        </div>
      )
    }
  }

  if (userData.status === "failed") {
    statusBar = (
      <div className="rounded-full bg-TUCMC-red-400 py-1 px-[0.5] text-center text-sm tracking-tight text-white">
        ไม่ผ่านการคัดเลือก
      </div>
    )
  }

  return (
    <>
      <div className="mx-2 border-b border-TUCMC-gray-300 py-4 md:py-8">
        <div className="flex w-full items-center justify-between">
          <div
            className={`flex flex-col items-start md:flex-row md:items-center md:justify-between ${
              noStatus && !editable ? "md:w-full" : "md:w-[80%]"
            } mx-4`}
          >
            {userData.title}
            {userData.firstname} {userData.lastname}
            <div className="mt-2 flex w-36 flex-row-reverse items-start justify-between text-TUCMC-gray-600 md:w-80 md:flex-row">
              <span className="flex w-1/3 justify-center">
                {userData.student_id.toString().length < 6 ? <>{userData.student_id}</> : <>N/A</>}
              </span>
              <div className="flex w-2/3 items-center justify-center -space-x-2 md:space-x-0">
                <span className="flex w-1/2 justify-center">{userData.level ? <>ม.{userData.level}</> : <>N/A</>}</span>
                <span className="md:hidden">/</span>
                <span className="flex w-1/2 justify-center">{userData.room ? <>{userData.room}</> : <>N/A</>}</span>
                <span className="pl-1 md:hidden">|</span>
              </div>
            </div>
          </div>
          {!noStatus && !editable && <div className="mt-1 -ml-[2px] w-28">{statusBar}</div>}
          {editable && (
            <span
              className="z-40 flex w-1/4 cursor-pointer justify-center text-sm text-TUCMC-gray-600 underline transition-all hover:no-underline hover:opacity-70"
              onClick={() => {
                editFunc(userData)
              }}
            >
              เปลี่ยน
            </span>
          )}
        </div>
      </div>
    </>
  )
}
