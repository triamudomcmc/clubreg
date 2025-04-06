import { NextApiRequest, NextApiResponse } from "next"
import { regClub } from "@server/userActions/regClub"
import { confirmClub } from "@server/userActions/confirmClub"
import { rejectClub } from "@server/userActions/rejectClub"
import { oldClub } from "@handlers/server/userActions/oldClub"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case "POST":
      res.statusCode = 200
      res.setHeader("Content-Type", `application/json`)
      switch (req.body.action) {
        case "regClub": {
          const output = await regClub(req, res)
          res.json(output)
          break
        }
        case "confirmClub": {
          const output = await confirmClub(req, res)
          res.json(output)
          break
        }
        case "confirmOldClub": {
          const output = await oldClub(req, res)
          res.json(output)
          break
        }
        case "rejectClub": {
          const output = await rejectClub(req, res)
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
