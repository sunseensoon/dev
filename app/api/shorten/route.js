import prisma from "../../lib/prisma"

function generateCode(length = 6) {

 const chars =
 "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

 let code = "";

 for (let i = 0; i < length; i++) {
   code += chars.charAt(
     Math.floor(Math.random() * chars.length)
   );
 }

 return code;
}

export async function POST(req) {

 try {

   const body = await req.json();

   const shortCode = generateCode();

   await prisma.url.create({
     data: {
       longUrl: body.longUrl,
       shortCode
     }
   });

   return Response.json({
     shortCode
   });

 } catch (error) {

   console.error(error);

   return Response.json(
    { error: error.message },
    { status: 500 }
   );

 }

}