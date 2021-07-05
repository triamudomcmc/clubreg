import {NextApiRequest, NextApiResponse} from "next";
import {login} from "@server/authentication/login";
import {register} from "@server/authentication/register";
import {forgot} from "@server/authentication/forgot";
import {resetPassword} from "@server/authentication/resetPassword";
import {query} from "@server/admin/query";
import {fieldUpdate} from "@server/admin/fieldUpdate";
import {rollback} from "@server/admin/rollback";
import {getReport} from "@server/admin/getReport";
import {getTrackingHistory} from "@server/admin/getTrackingHistory";
import {getUserIDfromCardID} from "@server/admin/getUserIDfromCardID";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const {method} = req

  switch (method) {
    case 'POST':
      res.statusCode = 200
      res.setHeader('Content-Type', `application/json`)
      switch (req.body.action) {
        case "query": {
          const output = await query(req, res)
          res.json(output)
          break
        }
        case "updateField": {
          const output = await fieldUpdate(req, res)
          res.json(output)
          break
        }
        case "rollback": {
          const output = await rollback(req, res)
          res.json(output)
          break
        }
        case "getReport": {
          const output = await getReport(req, res)
          res.json(output)
          break
        }
        case "getTrackingHistory": {
          const output = await getTrackingHistory(req, res)
          res.json(output)
          break
        }
        case "getUserIDfromCardID": {
          const output = await getUserIDfromCardID(req, res)
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