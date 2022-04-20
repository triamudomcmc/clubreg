import { ClubData } from "@interfaces/clubData"
import { Dispatch, FC, SetStateAction } from "react"
import { ClubNames } from "../../../../_map/clubs"

export const SelectClub: FC<{
  clubsDataList: (ClubData & { clubID: string })[]
  setClubID: Dispatch<SetStateAction<string>>
}> = ({ clubsDataList, setClubID }) => {
  return (
    <div className="flex flex-col p-6">
      <div className="mb-2 flex items-center space-x-2 pb-2">
        <div className="h-5 w-5 rounded-full bg-TUCMC-orange-400" />
        <h2 className="text-xl">ชมรมที่มีสถานะรอการตรวจสอบ</h2>
      </div>
      <hr />
      {clubsDataList
        .filter((clubData) => clubData.status === "pending")
        .map((clubData) => (
          <div className="grid grid-cols-[3fr,1fr] items-center border-b border-gray-300 py-6" key={clubData.clubID}>
            <p>
              {clubData.clubID} - {ClubNames[clubData.clubID]}
            </p>

            <button
              className="rounded-md border border-gray-400 bg-white px-4 py-2 transition-colors hover:bg-gray-50"
              onClick={() => setClubID(clubData.clubID)}
            >
              ดูข้อมูลชมรม
            </button>
          </div>
        ))}
    </div>
  )
}
