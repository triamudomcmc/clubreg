import { NextApiRequest, NextApiResponse } from "next"
import initialisedDB from "@server/firebase-admin"
import { fetchPanel } from "@server/fetchers/panel"
import { submitPending } from "@server/panel/submitPending"
import { updatePosition } from "@server/panel/updatePosition"
import { updateUser } from "@server/panel/updateUser"
import { fetchSession } from "@server/fetchers/session"
import { updateClubField } from "@server/panel/updateClubField"
import { fetchStudentID } from "@handlers/server/panel/fetchStudentID"
import { addClubCommittee } from "@handlers/server/panel/addClubCommittee"
import { fetchClubCommittee } from "@handlers/server/panel/fetchClubCommittee"
import { removeClubCommittee } from "@handlers/server/panel/removeClubCommittee"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case "POST":
      res.statusCode = 200
      res.setHeader("Content-Type", `application/json`)

      switch (req.body.action) {
        case "fetchMembers": {
          const output = await fetchPanel(req, res)
          res.json(output)
          break
        }
        case "submitPending": {
          const output = await submitPending(req, res)
          res.json(output)
          break
        }
        case "updatePosition": {
          const output = await updatePosition(req, res)
          res.json(output)
          break
        }
        case "updateUser": {
          const output = await updateUser(req, res)
          res.json(output)
          break
        }
        case "fetchAClub": {
          const { logged } = await fetchSession(req, res)

          if (!logged) {
            res.json({ status: false, report: "sessionError" })
          } else {
            const clubDoc = await initialisedDB.collection("clubs").doc("mainData").get()
            const data = clubDoc.get(req.body.clubID)
            res.json(data)
          }
          break
        }
        case "updateClubField": {
          const output = await updateClubField(req, res)
          res.json(output)
          break
        }
        case "fetchStudentID": {
          const output = await fetchStudentID(req, res)
          res.json(output)
          break
        }
        case "addClubCommittee": {
          const output = await addClubCommittee(req, res)
          res.json(output)
          break
        }
        case "fetchClubCommittee": {
          const output = await fetchClubCommittee(req, res)
          res.json(output)
          break
        }
        case "removeClubCommittee": {
          const output = await removeClubCommittee(req, res)
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
