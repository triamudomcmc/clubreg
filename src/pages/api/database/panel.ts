import {NextApiRequest, NextApiResponse} from "next";
import {fetchUser} from "@server/fetchUser"
import {destroySession} from "@server/authentication";
import {fetchPanel, submitPending, updatePosition} from "@server/panelControl";

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
      }
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }

}