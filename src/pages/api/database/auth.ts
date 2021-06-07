import {NextApiRequest, NextApiResponse} from "next";
import {login} from "@server/authentication/login";
import {register} from "@server/authentication/register";
import {forgot} from "@server/authentication/forgot";
import {resetPassword} from "@server/authentication/resetPassword";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const {method} = req

  switch (method) {
    case 'POST':
      res.statusCode = 200
      res.setHeader('Content-Type', `application/json`)
      switch (req.body.action) {
        case "login": {
          const output = await login(req.body.stdID, req.body.password, 60 * 60 * 1000, req.body.fp, req, res)
          res.json(output)
          break
        }
        case "register": {
          const output = await register(req)
          res.json(output)
        }break
        case "forgot": {
          const output = await forgot(req, res)
          res.json(output)
        }break
        case "reset": {
          const output = await resetPassword(req, res)
          res.json(output)
        }
      }
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }

}