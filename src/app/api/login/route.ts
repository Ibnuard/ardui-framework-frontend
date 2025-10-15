import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const res = NextResponse.json({ success: true });

  console.log("CALLED");
  

  // Set cookie di server
  res.cookies.set("token", "sampleToken", {
    httpOnly: false, // set false agar bisa dibaca JS juga (opsional)
    path: "/",
  });

  return res;
}
