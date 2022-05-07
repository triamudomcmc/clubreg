import Head from "next/head"
import { useRouter } from "next/router"
import { FC } from "react"

export const DescribeRoute: FC<{ title: string; description: string; imgURL: string }> = ({
  title,
  description,
  imgURL,
  children,
}) => {
  const router = useRouter()

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={description} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={router.basePath} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imgURL} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={router.basePath} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={imgURL} />
      </Head>
      {children}
    </>
  )
}
