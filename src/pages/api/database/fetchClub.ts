import {NextApiRequest, NextApiResponse} from "next";
import initialisedDB from "@server/firebase-admin";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const {method} = req

  switch (method) {
    case 'POST':
      res.statusCode = 200
      res.setHeader('Content-Type', `application/json`)
      switch (req.body.action) {
        case "fetchClub": {
          const data = await initialisedDB.collection("clubs").doc("mainData").get()
          res.json(data.data())
        }
        break
        case "fetchAClub": {
          const clubDoc = await initialisedDB.collection("clubs").doc("mainData").get()
          const data = clubDoc.get(req.body.clubID)
          res.json({
            place: data.place,
            contact: data.contact,
            contact2: data.contact2,
            contact3: data.contact3,
            message: data.message
          })
        }
      }
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }

}