import { join } from "path"
import fs from "fs"
import markdownToHtml from "@utilities/markdownToHTML"
import PageContainer from "@components/common/PageContainer"
import DOMPurify from "isomorphic-dompurify"

export async function getStaticProps() {
  const tos = join(process.cwd(), "/_md/tos.md")
  const fileContents = fs.readFileSync(tos, "utf8")

  const content = await markdownToHtml(fileContents || "")

  return {
    props: {
      content,
    },
  }
}

const tos = ({ content }) => {
  return (
    <PageContainer>
      <div className="mx-6 py-14">
        <article className="prose mx-auto" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}></article>
      </div>
    </PageContainer>
  )
}

export default tos
