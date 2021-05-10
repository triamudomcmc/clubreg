import {NextApiRequest, NextApiResponse} from "next";
import {fetchSession, fetchUser} from "@server/fetchUser"
import {destroySession} from "@server/authentication";
import {fetchPanel, submitPending, updatePosition, updateUser} from "@server/panelControl";
import initialisedDB from "@server/firebase-admin";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const {method} = req

  switch (method) {
    case 'POST':
      res.statusCode = 200
      res.setHeader('Content-Type', `application/json`)
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
          const {logged} = await fetchSession(req, res, req.body.fp)
          if (!logged) {
            res.json({status: false, report: "sessionError"})
          } else {
            const clubDoc = await initialisedDB.collection("clubs").doc("mainData").get()
            const data = clubDoc.get(req.body.clubID)
            res.json({
              new_count: data.new_count,
              new_count_limit: data.new_count_limit
            })
          }
        }
      }
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }

}