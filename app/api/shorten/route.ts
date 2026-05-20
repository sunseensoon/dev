import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { validateUrl, validateCode, generateCode } from "@/lib/validateUrl"
import type { ShortenRequest, ShortenResponse, ApiError } from "@/types"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://minguri.vercel.app"
const MAX_CODE_ATTEMPTS = 5

export async function POST(
  req: NextRequest
): Promise<NextResponse<ShortenResponse | ApiError>> {
  let body: ShortenRequest

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 })
  }

  const { url, code: customCode } = body

  const urlError = validateUrl(url)
  if (urlError) {
    return NextResponse.json({ error: urlError }, { status: 422 })
  }

  if (customCode !== undefined && customCode !== "") {
    const codeError = validateCode(customCode)
    if (codeError) {
      return NextResponse.json({ error: codeError }, { status: 422 })
    }

    const existing = await prisma.link.findUnique({ where: { code: customCode } })
    if (existing) {
      return NextResponse.json(
        { error: "That code is already taken. Try a different one." },
        { status: 409 }
      )
    }

    const link = await prisma.link.create({
      data: { url, code: customCode },
    })

    return NextResponse.json({
      shortUrl: `${BASE_URL}/${link.code}`,
      code: link.code,
    })
  }

  // Auto-generate a unique code
  for (let i = 0; i < MAX_CODE_ATTEMPTS; i++) {
    const code = generateCode()
    const existing = await prisma.link.findUnique({ where: { code } })
    if (!existing) {
      const link = await prisma.link.create({ data: { url, code } })
      return NextResponse.json({
        shortUrl: `${BASE_URL}/${link.code}`,
        code: link.code,
      })
    }
  }

  return NextResponse.json(
    { error: "Could not generate a unique code. Please try again." },
    { status: 500 }
  )
}
