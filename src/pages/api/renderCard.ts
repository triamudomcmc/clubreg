import { NextApiRequest, NextApiResponse } from 'next'
import screenshot from '@utilities/screenshot'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const file = await screenshot(
    `http://localhost:3000/renderer/card`
  )
  console.log("called")

  res.setHeader('Content-Type', `image/png`)
  res.setHeader(
    'Cache-Control',
    `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`
  )
  res.statusCode = 200
  res.end(file)
}
