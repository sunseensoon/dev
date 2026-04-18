import prisma from "../lib/prisma";
import { redirect } from "next/navigation";

export default async function Page({ params }) {

  const { code } = await params;

  const url = await prisma.url.findUnique({
    where: {
      shortCode: code
    }
  });

  if (!url) {
    return (
      <h1 style={{ padding: 20 }}>
        Link not found
      </h1>
    );
  }

  redirect(url.longUrl);

}