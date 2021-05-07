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
        break
        case "fetchAClub": {
          const data = await initialisedDB.collection("clubs").doc(req.body.clubID).get()
          res.json({
            place: data.get("place"),
            contact: data.get("contact"),
            contact2: data.get("contact2"),
            contact3: data.get("contact3")
          })
        }
      }
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }

}