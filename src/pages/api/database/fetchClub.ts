import {NextApiRequest, NextApiResponse} from "next";
import {regClub} from "@server/userActions";
import initialisedDB from "@server/firebase-admin";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const {method} = req

  switch (method) {
    case 'POST':
      res.statusCode = 200
      res.setHeader('Content-Type', `application/json`)
      switch (req.body.action) {
        case "fetchClub": {
          const data = await initialisedDB.collection("clubs").get()
          let dataobj = {}
          data.forEach((doc) => {
            dataobj[doc.id] = doc.data()
          })
          res.json(dataobj)
        }
      }
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }

}