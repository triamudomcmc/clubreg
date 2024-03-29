import { NextApiRequest, NextApiResponse } from "next"
import initialisedDB from "@server/firebase-admin"
import { fetchClubDisplay } from "@handlers/server/club/fetchClubDisplay"
import { fetchAllClubData } from "@handlers/server/club/fetchAllClubData"
import {transformClubsCollection} from "@utilities/object"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case "POST":
      res.statusCode = 200
      res.setHeader("Content-Type", `application/json`)
      switch (req.body.action) {
        case "fetchClub": {
          const data = await initialisedDB.collection("clubs").get()
          res.json(transformClubsCollection(data))
          break
        }
        case "fetchAClub": {
          const clubDoc = await initialisedDB.collection("clubs").doc(req.body.clubID).get()
          const data = clubDoc.data()
          res.json({
            place: data.place,
            contact: data.contact,
            contact2: data.contact2,
            contact3: data.contact3,
            message: data.message,
          })
          break
        }
        case "fetchClubDisplay": {
          const output = await fetchClubDisplay(req, res)
          res.json(output)
          break
        }
        case "fetchAllClubData": {
          const output = await fetchAllClubData(req, res)
          res.json(output)
          break
        }
      }

      break

    default:
      res.setHeader("Allow", ["GET", "PUT"])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
