import {NextApiRequest, NextApiResponse} from "next";
import {login, register} from "@server/authentication";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const {method} = req

  switch (method) {
    case 'POST':
      res.statusCode = 200
      res.setHeader('Content-Type', `application/json`)
      switch (req.body.action) {
        case "login": {
          const output = await login(req.body.stdID, req.body.password, 60*60 * 1000, req.body.fingerprint, req, res)
          res.json(output)
          break
        }
        case "register": {
          const output = await register(req)
          res.json(output)
        }
      }
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }

}