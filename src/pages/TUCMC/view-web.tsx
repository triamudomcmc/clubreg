import PageContainer from "@components/common/PageContainer"
import { useAuth } from "@handlers/client/auth"
import { fetchAllClubData, fetchClubDisplay } from "@handlers/client/fetcher/club"
import { fetchClub } from "@client/fetcher/panel"
import { ClubDisplay } from "@interfaces/clubDisplay"
import UserData from "@interfaces/userData"
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next"
import { useRouter } from "next/router"
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import initialisedDB from "@server/firebase-admin"
import { ClubDisplaySection } from "@components/clubs/ClubDisplay"
import { StatusText } from "@components/panel/table/TableRow"
import { ClubData } from "@interfaces/clubData"
import { CheckIcon, XIcon } from "@heroicons/react/solid"
import { SelectClub } from "@components/clubs/view-web/SelectClub"
import { ModalSection } from "@components/clubs/view-web/ModalSection"
import { delBasePath } from "next/dist/shared/lib/router/router"

const BaseData: ClubData = {
  new_count: 0,
  new_count_limit: 0,
  old_count: 0,
  old_count_limit: 0,
  count_limit: 0,
  place: "",
  audition: false,
  message: "",
  contact: { type: "", context: "" },
  contact2: { type: "", context: "" },
  contact3: { type: "", context: "" },
  teacher_count: 0,
  status: "pending",
}

const fetchClubDataAction = async (clubID: string, setClubData: Dispatch<SetStateAction<{}>>) => {
  const data = await fetchClub(clubID)
  let nid = clubID
  if (clubID.includes("_")) {
    nid = `${clubID.split("_")[0]}_1`
  } else {
    if (clubID.includes("ก30920") && clubID !== "ก30920-8") {
      nid = "ก30920-1"
    }
  }

  //@ts-ignore
  const st: { status: any } = await fetchClub(nid)
  setClubData({ ...data, status: st.status })
}

const fetchAllClubDataAction = async (
  clubID: string,
  setClubData: Dispatch<SetStateAction<(ClubData & { clubID: string })[]>>,
  setClubID: Dispatch<SetStateAction<string>>
) => {
  let nid = clubID
  if (clubID.includes("_")) {
    nid = `${clubID.split("_")[0]}_1`
  } else {
    if (clubID.includes("ก30920") && clubID !== "ก30920-8") {
      nid = "ก30920-1"
    }
  }

  const { data } = await fetchAllClubData(nid)

  setClubData(data)

  const availableData = data.filter((d) => d.status === "pending")

  if (availableData.length === 0) return
  if (clubID === "") setClubID(availableData[~~(Math.random() * availableData.length)].clubID)
}

const fetchClubDisplayAction = async (
  clubID: string,
  setClubDisplay: Dispatch<SetStateAction<ClubDisplay>>,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  setLoading(true)

  const res = await fetchClubDisplay(clubID.replace(/_\d+/g, ""))

  if (res.status) {
    setClubDisplay(res.data)
    setLoading(false)
  }
}

const WebDisplayPage: NextPage = () => {
  const [clubID, setClubID] = useState("")
  const [clubDisplay, setClubDisplay] = useState<ClubDisplay>({
    audition: false,
    contact: {},
    contact2: {},
    contact3: {},
    count: 0,
    description: "",
    nameEN: "",
    nameTH: "",
    reviews: [],
  })
  const [allClubData, setAllClubData] = useState<(ClubData & { clubID: string; nameTH: string })[]>([
    { ...BaseData, clubID: "", nameTH: "" },
  ])
  const [clubData, setClubData] = useState<ClubData>(BaseData)
  const [imgLoading, setLoading] = useState(false)
  const [action, setAction] = useState<null | "accepted" | "declined">(null)

  const refetchData = () => {
    fetchClubDisplayAction(clubID, setClubDisplay, setLoading)
    // fetchClubDataAction(clubID, setClubData)
    fetchAllClubDataAction(clubID, setAllClubData, setClubID)
  }

  const [newData, setNewData] = useState<{ description: string; reviews: any[] } | null>(null)
  const onDataChange = (newData: { description: string; reviews: any[] }) => {
    setNewData(newData)
  }

  useEffect(() => {
    // works for initial fetch too
    refetchData()
  }, [clubID])

  useEffect(() => {
    if (allClubData) setClubData(allClubData.find((c) => c.clubID === clubID))
  }, [allClubData])

  const { onReady } = useAuth()
  const router = useRouter()

  const userData: UserData = onReady((logged, uData) => {
    if (!logged) return router.push("/auth")
    else if (!uData?.tucmc) return router.push("/")
    else return uData
  })

  return (
    <PageContainer>
      <ModalSection
        refetch={() => {
          setClubID("")
          refetchData()
        }}
        clubID={clubID}
        setAction={setAction}
        action={action}
        newData={newData}
      />
      <div className="relative pt-10 pb-14">
        <div className="pb-4">
          <h1 className="text-center text-2xl font-medium">ตรวจสอบข้อมูลชมรมบนเว็บไซต์</h1>
        </div>

        <div className="mx-auto max-w-[1100px]">
          <SelectClub clubsDataList={allClubData} setClubID={setClubID} />
        </div>

        <div className="mx-auto mt-6 flex max-w-[1100px] flex-col rounded-md border border-gray-200">
          <div className="flex flex-col-reverse rounded-md bg-TUCMC-gray-900 px-12 py-6 text-white sm:flex-row sm:items-center sm:justify-between">
            <h2>
              {clubID} - ชมรม{clubDisplay.nameTH}
            </h2>
            <div className="flex space-x-4">
              <StatusText status={clubData?.status} />
              {clubData?.status === "pending" && (
                <>
                  <button
                    onClick={() => setAction("accepted")}
                    className="rounded-md bg-TUCMC-green-400 px-4 py-2 text-white transition-colors hover:bg-TUCMC-green-500"
                  >
                    <CheckIcon className="h-5 w-5 text-white" />
                  </button>
                  <button
                    onClick={() => setAction("declined")}
                    className="rounded-md bg-TUCMC-red-400 px-4 py-2 text-white transition-colors hover:bg-TUCMC-red-500"
                  >
                    <XIcon className="h-5 w-5 text-white" />
                  </button>
                </>
              )}
            </div>
          </div>
          <ClubDisplaySection
            editable
            onDataChange={onDataChange}
            clubID={clubID}
            clubDisplay={clubDisplay}
            imgLoading={imgLoading}
          />
        </div>
      </div>
    </PageContainer>
  )
}

export default WebDisplayPage
