import {NextApiRequest, NextApiResponse} from "next";
import {fetchUser} from "@server/fetchUser"
import {destroySession} from "@server/authentication";
import {confirmClub, regClub, rejectClub} from "@server/userActions";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const {method} = req

  switch (method) {
    case 'POST':
      res.statusCode = 200
      res.setHeader('Content-Type', `application/json`)
      switch (req.body.action) {
        case "regClub": {
          const output = await regClub(req, res)
          res.json(output)
        }
        break
        case "confirmClub": {
          const output = await confirmClub(req, res)
          res.json(output)
        }
        break
        case "rejectClub": {
          const output = await rejectClub(req, res)
          res.json(output)
        }
      }
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }

}