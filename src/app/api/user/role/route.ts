import { createRole } from "@/services/role/createRole";
import { getRoles } from "@/services/role/getRole";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const result = await createRole(body);

  if (!result.success) {
    return NextResponse.json(
      { error: result.error, issues: result.issues },
      { status: 400 }
    );
  }

  return NextResponse.json(result.data);
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const search = searchParams.get("search") || "";

  try {
    const modules = await getRoles({ page: page, limit: limit });
    return NextResponse.json(modules);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch modules" },
      { status: 500 }
    );
  }
}
