import { NextApiRequest, NextApiResponse } from "next"
import screenshot from "@utilities/screenshot"
import initialisedDB from "@handlers/server/firebase-admin"
import ClubStatus from "@components/announce/ClubStatus"
import { clubMap } from "@config/clubMap"
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
  } = req

  // console.log(id)

  const k = Object.keys(clubMap)
  const li = [61691,
    61321,
    59859,
    60608,
    61530,
    60097,
    60252,
    60511,
    59913,
    62057]

  for (let ew of k) {
    const club = ew
    const getAllStudents = await initialisedDB.collection("data").where("club", "==", club).get()

    const clubData = await initialisedDB.collection("clubs").doc("mainData").get()
    const e = clubData.get(club)
    const ttc = (e["committees"]?.length || 0) + e["old_count"]
    const all = getAllStudents.docs.filter(e => (e.get("level") !== "9")).length
    if (all === ttc) continue;

    console.log(ttc, all,ew, e["old_count"] === e["old_count_limit"] ? "full" : "not-full")
    // if (e["old_count"] === e["old_count_limit"]) continue;

    // const diff = all - ttc
    // if (diff > 0 && e["old_count"] + diff <= e["old_count_limit"]) {
    //     console.log("preform")
    //     await initialisedDB.collection("clubs").doc("mainData").set({ [ew]: { old_count: e["old_count"] + diff } }, { merge: true })
    // }
  }

  res.setHeader("Content-Type", `image/png`)
  res.setHeader("Cache-Control", `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`)
  res.statusCode = 200
  res.end()
}

const getProtocol = (req: NextApiRequest) => (req.headers.host?.includes("localhost") ? "http" : "https")
