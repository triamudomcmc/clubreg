import {NextApiRequest, NextApiResponse} from "next";
import {fetchFiles} from "@server/attendance/fetchFiles";
import {uploadFiles} from "@server/attendance/uploadFile";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const {method} = req

  switch (method) {
    case 'POST':
      res.statusCode = 200
      res.setHeader('Content-Type', `application/json`)
      switch (req.body.action) {
        case "uploadFile": {
          const data = await uploadFiles(req ,res)
          res.json(data)
        }
          break
      }
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }

}