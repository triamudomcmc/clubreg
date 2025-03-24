const CHROMIUM_PATH = "https://vomrghiulbmrfvmhlflk.supabase.co/storage/v1/object/public/chromium-pack/chromium-v123.0.0-pack.tar";

async function getBrowser() {
  if (process.env.VERCEL_ENV === "production") {
    const chromium = await import("@sparticuz/chromium-min").then(
      (mod) => mod.default
    );

    const puppeteerCore = await import("puppeteer-core").then(
      (mod) => mod.default
    );

    const executablePath = await chromium.executablePath(CHROMIUM_PATH);

    const browser = await puppeteerCore.launch({
      args: [...chromium.args, '--high-dpi-support=1'],
      defaultViewport: chromium.defaultViewport,
      executablePath,
      headless: chromium.headless,
    });
    return browser;
  } else {
    const puppeteer = await import("puppeteer").then((mod) => mod.default);
    const browser = await puppeteer.launch();
    return browser;
  }
}

export async function savePDF(url: string) {
    // const options = process.env.AWS_REGION
    //   ? {
    //       args: chrome.args,
    //       executablePath: await chrome.executablePath,
    //       headless: chrome.headless,
    //     }
    //   : {
    //       args: [],
    //       executablePath:
    //         process.platform === "win32"
    //           ? "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
    //           : process.platform === "linux"
    //           ? "/usr/bin/google-chrome"
    //           : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  //     }
  
    const browser = await getBrowser()
    const page = await browser.newPage()
  
    await page.goto(url, { waitUntil: "networkidle2" })
    
    return await page.pdf({format: "a4"})
  }
