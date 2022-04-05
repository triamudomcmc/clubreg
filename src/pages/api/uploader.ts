import { NextApiRequest, NextApiResponse } from "next"
import { fetchFiles } from "@server/attendance/fetchFiles"
import { uploadDocs, uploadFiles } from "@server/attendance/uploadFile"
import { getFile } from "@server/panel/getFile"
import { upBucket } from "@server/attendance/uploadFile/mainFunction"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case "POST":
      res.statusCode = 200
      res.setHeader("Content-Type", `application/json`)
      switch (req.body.action) {
        case "uploadFile":
          {
            const data = await uploadFiles(req, res)
            res.json(data)
          }
          break
        case "uploadDoc":
          {
            const data = await uploadDocs(req, res)
            res.json(data)
          }
          break
        case "getFile":
          {
            const data = await getFile(req, res)
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
