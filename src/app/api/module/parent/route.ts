import { getParentModule } from "@/services/module/getModules";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const modules = await getParentModule();
    return NextResponse.json(modules);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch modules" },
      { status: 500 }
    );
  }
}
