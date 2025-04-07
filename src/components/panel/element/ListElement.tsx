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
    <div className="rounded-full bg-TUCMC-gray-800 px-4 py-0.5 text-sm tracking-tight text-white">รอการตอบรับ</div>
  )

  if (userData.status === "confirmed") {
    statusBar = (
      <div className="rounded-full bg-TUCMC-green-400 px-4 py-0.5 text-sm tracking-tight text-white">
        ยืนยันสิทธิ์แล้ว
      </div>
    )
  }
  if (userData.status === "rejected") {
    statusBar = (
      <div className="rounded-full bg-TUCMC-red-400 px-4 py-0.5 text-sm tracking-tight text-white">สละสิทธิ์แล้ว</div>
    )
  }

  if (userData.status === "reserved") {
    statusBar = (
      <div className="hidden rounded-full bg-TUCMC-gray-800 px-4 py-0.5 text-sm tracking-tight text-white opacity-0 md:block">
        จะถูกเรียกสำรอง
      </div>
    )
    if (position + 1 <= callCount) {
      statusBar = (
        <div className="rounded-full bg-TUCMC-gray-800 px-4 py-0.5 text-sm tracking-tight text-white">
          จะถูกเรียกสำรอง
        </div>
      )
    }
  }

  if (userData.status === "failed") {
    statusBar = (
      <div className="rounded-full bg-TUCMC-red-400 px-4 py-0.5 text-sm tracking-tight text-white">
        ไม่ผ่านการคัดเลือก
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between border-b border-TUCMC-gray-300 bg-white py-5 pr-4 md:py-8">
      <div className="flex items-center">
        {index > 0 && <div className="-mr-2 h-6 w-6 rounded-full bg-black text-center text-white">{index}</div>}
        <div className="ml-6 flex flex-col items-start">
          <h1>
            {userData.title}
            {userData.firstname} {userData.lastname}
          </h1>
          <span className="text-TUCMC-gray-600 md:hidden">
            {userData.student_id} | ม.{userData.level}/{userData.room}
          </span>
          {!noStatus && !editable && <div className="mt-1 -ml-[2px] md:hidden">{statusBar}</div>}
        </div>
      </div>
      <div className="flex text-TUCMC-gray-600">
        <div className="mr-28 hidden space-x-16 md:block">
          <span>{userData.student_id}</span>
          <span>ม.{userData.level}</span>
          <span>{userData.room}</span>
        </div>
        {editable && (
          <span
            className="z-40 cursor-pointer"
            onClick={() => {
              editFunc(userData)
            }}
          >
            เปลี่ยน
          </span>
        )}
        {!noStatus && !editable && <div className="hidden md:block">{statusBar}</div>}
        {/*<div>
          <div className="border rounded-t-md p-1.5">
            <ChevronUpIcon className="w-4 h-4"/>
          </div>
          <div className="border -mt-px rounded-b-md p-1.5">
            <ChevronDownIcon className="w-4 h-4"/>
          </div>
        </div>*/}
      </div>
    </div>
  )
}
