import { NextApiRequest, NextApiResponse } from "next"
import initialisedDB from "@server/firebase-admin"
import { fetchChecks } from "@server/fetchers/checks"
import { submitChecks } from "@server/attendance/submitChecks"
import { submitChanges } from "@handlers/server/panel/submitChanges"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case "POST":
      res.statusCode = 200
      res.setHeader("Content-Type", `application/json`)
      console.log(req.body.action)
      switch (req.body.action) {
        case "submitChanges":
          {
            const data = await submitChanges(req, res)
            console.log(data)
            res.json(data)
          }
          break
        case "submitChecks":
          {
            const data = await submitChecks(req, res)
            res.json(data)
          }
          break
      }
      break
    default:
      res.setHeader("Allow", ["GET", "PUT"])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
