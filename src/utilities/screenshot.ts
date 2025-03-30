import { getBrowser } from "./getBrowser"

export default async function screenshot(url: string, width: number = 990, height: number = 1715) {
  const browser = await getBrowser()
  const page = await browser.newPage()
  await page.setViewport({ width, height })
  await page.goto(url, { waitUntil: "networkidle2" })
  return await page.screenshot({ type: "png" })
}
