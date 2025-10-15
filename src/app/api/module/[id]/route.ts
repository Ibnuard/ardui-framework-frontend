import { deleteModule } from "@/services/module/deleteModule";
import { getModuleDetail } from "@/services/module/getModules";
import { updateModule } from "@/services/module/updateModule";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const modules = await getModuleDetail(Number(id));
    return NextResponse.json(modules);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch modules" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const modules = await deleteModule(Number(id));
    return NextResponse.json(modules);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to delete modules" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const data = await req.json();

    const modules = await updateModule(Number(id), data);
    return NextResponse.json(modules);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to update modules" },
      { status: 500 }
    );
  }
}
