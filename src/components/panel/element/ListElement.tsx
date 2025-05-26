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
    <div className="rounded-full bg-TUCMC-gray-800 px-4 py-0.5 text-sm tracking-tight text-white text-center">รอการตอบรับ</div>
  )
  if (userData.status === "confirmed") {
    statusBar = (
      <div className="rounded-full bg-TUCMC-green-400 px-4 py-0.5 text-sm tracking-tight text-white text-center">
        ยืนยันสิทธิ์แล้ว
      </div>
    )
  }
  if (userData.status === "rejected") {
    statusBar = (
      <div className="rounded-full bg-TUCMC-red-400 px-4 py-0.5 text-sm tracking-tight text-white text-center">สละสิทธิ์แล้ว</div>
    )
  }

  if (userData.status === "reserved") {
    statusBar = (
      <div className="hidden rounded-full bg-TUCMC-gray-800 py-1 px-[0.5] text-sm tracking-tight text-white opacity-0 md:block text-center">
        จะถูกเรียกสำรอง
      </div>
    )
    if (position + 1 <= callCount) {
      statusBar = (
        <div className="rounded-full bg-TUCMC-gray-800 py-1 px-[0.5] text-sm tracking-tight text-white text-center">
          จะถูกเรียกสำรอง
        </div>
      )
    }
  }

  if (userData.status === "failed") {
    statusBar = (
      <div className="rounded-full bg-TUCMC-red-400 text-center py-1 px-[0.5] text-sm tracking-tight text-white">
        ไม่ผ่านการคัดเลือก
      </div>
    )
  }

  return (
    <>
      <div className="border-b border-TUCMC-gray-300 py-4 md:py-8 mx-2">
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col items-start md:flex-row md:items-center md:justify-between md:w-[80%] mx-4">
            {userData.title}
            {userData.firstname} {userData.lastname}
            <div className="text-TUCMC-gray-600 mt-2">
              {userData.student_id.toString().length < 6 ? (<><span>{userData.student_id}</span></>) : (<><span>N/A</span></>)} | {userData.room ? (<><span>ม.{userData.level}/{userData.room}</span></>) : (<><span>N/A</span></>)}
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
