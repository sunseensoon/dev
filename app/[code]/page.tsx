import { redirect, notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"

interface Props {
  params: Promise<{ code: string }>
}

export default async function RedirectPage({ params }: Props) {
  const { code } = await params

  const link = await prisma.link.findUnique({ where: { code } })

  if (!link) notFound()

  prisma.link.update({
    where: { code },
    data: { clicks: { increment: 1 } },
  }).catch(() => {})

  redirect(link.url)
}
