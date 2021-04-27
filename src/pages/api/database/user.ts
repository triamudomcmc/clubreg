import {NextApiRequest, NextApiResponse} from "next";
import {fetchUser} from "@server/fetchUser"
import {destroySession} from "@server/authentication";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const {method} = req

  switch (method) {
    case 'POST':
      res.statusCode = 200
      res.setHeader('Content-Type', `application/json`)
      switch (req.body.action) {
        case "fetchUser": {
          const output = await fetchUser(req, res, req.body.fp)
          res.json(output)
          break
        }
        case "logout": {
          const output = await destroySession(req, res)
          res.json(output)
        }
      }
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }

}