import { NextApiRequest, NextApiResponse } from 'next'
import screenshot from '@utilities/screenshot'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { userData, clubData }
  } = req

  const file = await screenshot(
    `http://preview.tucmc.dev/renderer/card?userData=${escape(userData.toString())}&clubData=${escape(clubData.toString())}`
  )

  res.setHeader('Content-Type', `image/png`)
  res.setHeader(
    'Cache-Control',
    `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`
  )
  res.statusCode = 200
  res.end(file)
}
