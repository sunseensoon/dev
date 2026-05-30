import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { validateUrl, validateCode, generateCode } from "@/lib/validateUrl"
import { checkRateLimit } from "@/lib/rateLimit"
import type { ShortenResponse, ApiResponse } from "@/types"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://minguri.vercel.app"
const MAX_CODE_ATTEMPTS = 5

function getIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  )
}

function ok<T>(data: T): NextResponse<ApiResponse<T>> {
  return NextResponse.json({ success: true, data })
}

function fail(error: string, status: number, headers?: HeadersInit): NextResponse<ApiResponse<never>> {
  return NextResponse.json({ success: false, error }, { status, headers })
}

export async function POST(
  req: NextRequest
): Promise<NextResponse<ApiResponse<ShortenResponse>>> {

  const { allowed, retryAfter } = checkRateLimit(getIp(req))
  if (!allowed) {
    return fail(
      `Too many requests. Try again in ${retryAfter} seconds.`,
      429,
      { "Retry-After": String(retryAfter) }
    )
  }

  let body: { url: string; code?: string }
  try {
    body = await req.json()
  } catch {
    return fail("Invalid request body.", 400)
  }

  const { url, code: customCode } = body

  const urlError = validateUrl(url)
  if (urlError) return fail(urlError, 422)

  if (customCode?.trim()) {
    const codeError = validateCode(customCode)
    if (codeError) return fail(codeError, 422)

    try {
      const link = await prisma.link.create({
        data: { url, code: customCode },
      })
      return ok<ShortenResponse>({
        shortUrl: `${BASE_URL}/${link.code}`,
        code: link.code,
      })
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        return fail("That code is already taken. Try a different one.", 409)
      }
      return fail("Database error.", 503)
    }
  }

  for (let i = 0; i < MAX_CODE_ATTEMPTS; i++) {
    try {
      const link = await prisma.link.create({
        data: { url, code: generateCode() },
      })
      return ok<ShortenResponse>({
        shortUrl: `${BASE_URL}/${link.code}`,
        code: link.code,
      })
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        continue
      }
      return fail("Database error.", 503)
    }
  }

  return fail("Could not generate a unique code. Please try again.", 500)
}