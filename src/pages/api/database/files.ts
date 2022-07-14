import { NextApiRequest, NextApiResponse } from "next"
import initialisedDB from "@server/firebase-admin"
import { fetchFiles } from "@server/attendance/fetchFiles"
import { deleteFile } from "@server/attendance/deleteFile"
import { getFile } from "@server/attendance/getFile"
import { printReport } from "@handlers/server/panel/printReport"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case "POST":
      res.statusCode = 200
      res.setHeader("Content-Type", `application/json`)
      switch (req.body.action) {
        case "fetchFiles": {
          const data = await fetchFiles(req, res)
          res.json(data)
          break
        }
        case "deleteFile": {
          const data = await deleteFile(req, res)
          res.json(data)
          break
        }
        case "getFileTempURL": {
          const data = await getFile(req, res)
          res.json(data)
          break
        }
        case "printReport": {
          const data = await printReport(req, res)
          res.json(data)
          break
        }
      }
      break
    default:
      res.setHeader("Allow", ["GET", "PUT"])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
