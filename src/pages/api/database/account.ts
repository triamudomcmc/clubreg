import {NextApiRequest, NextApiResponse} from "next";
import {fetchUser, fetchUserCredentials} from "@server/fetchUser"
import {destroySession} from "@server/authentication";
import {addBrowser, removeBrowser, toggleSafeMode} from "@server/accActions";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const {method} = req

  switch (method) {
    case 'POST':
      res.statusCode = 200
      res.setHeader('Content-Type', `application/json`)
      switch (req.body.action) {
        case "fetchUserCredentials": {
          const output = await fetchUserCredentials(req, res)
          res.json(output)
          break
        }
        case "addBrowser": {
          const output = await addBrowser(req, res)
          res.json(output)
          break
        }
        case "toggleSafeMode": {
          const output = await toggleSafeMode(req, res)
          res.json(output)
          break
        }
        case "removeBrowser": {
          const output = await removeBrowser(req, res)
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