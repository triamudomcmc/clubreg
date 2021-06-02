import html from 'remark-html'
import remark from 'remark'

const parseText = (text) => {
  return '<p>' + text.replace(/\n{2,}/g, '</p><p>')
}

export default async function markdownToHtml(markdown: string) {
  const result = await remark().use(html).process(markdown)
  let text = result.toString()
  let l: Array<string> = []
  const arr = text.split("<code>")
  arr.forEach((i, d) => {
    if (i.includes("<pre>")) {
      l.push(arr[d + 1].split("</code>",2)[0])
    }
  })

  for (let a of l) {
    text = text.replace(a, parseText(a))
  }

  return text.replace(/<pre>/g,"<div style='margin-left: 28px'>").replace(RegExp("</pre>", "g"),"</div>").replace(/<code>/g,"<div>").replace(RegExp("</code>", "g"),"</div>")
}
