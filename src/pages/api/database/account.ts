import { NextApiRequest, NextApiResponse } from "next"
import { fetchUserCredentials } from "@server/fetchers/userCredentials"
import { addBrowser } from "@server/account/addBrowser"
import { toggleSafeMode } from "@server/account/toggleSafeMode"
import { removeBrowser } from "@server/account/removeBrowser"
import { toggleBeta } from "@server/account/toggleBeta"
import { generate2FA } from "@handlers/server/account/generate2FA"
import { verify2FA } from "@handlers/server/account/verify2FA"


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case "POST":
      res.statusCode = 200
      res.setHeader("Content-Type", `application/json`)
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
        case "generate2FA": {
          const output = await generate2FA(req, res)
          res.json(output)
          break
        }
        case "verify2FA": {
          const output = await verify2FA(req, res)
          res.json(output)
          break
        }
        case "toggleBeta": {
          const output = await toggleBeta(req, res)
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
      res.setHeader("Allow", ["GET", "PUT"])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
