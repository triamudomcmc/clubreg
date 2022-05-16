import { NextApiRequest, NextApiResponse } from "next"
import chrome from "chrome-aws-lambda"
import puppeteer from "puppeteer-core"
import initialisedDB from "@server/firebase-admin"

async function savePDF(url: string) {
  const options = process.env.AWS_REGION
    ? {
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless,
      }
    : {
        args: [],
        executablePath:
          process.platform === "win32"
            ? "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
            : process.platform === "linux"
            ? "/usr/bin/google-chrome"
            : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      }
  const browser = await puppeteer.launch(options)
  const page = await browser.newPage()

  await page.goto(url, { waitUntil: "networkidle2" })
  
  return await page.pdf({format: "a4"})
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { path },
  } = req


  const file = await savePDF(`http://localhost:57823/panel/print/renderer?path=${path}`)

  if (typeof path == "string") {
    await initialisedDB.collection("printReport").doc(path).delete()
  }

  res.setHeader("Content-Type", `application/pdf`)
  res.setHeader("Cache-Control", `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`)
  res.statusCode = 200
  res.end(file)
}

const getProtocol = (req: NextApiRequest) => (req.headers.host?.includes("localhost") ? "http" : "https")
