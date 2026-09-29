import { NextRequest, NextResponse } from "next/server";
import { getRoom } from "@/lib/store";
export async function GET(_: NextRequest, { params }: { params: Promise<{ code: string }> }) { const { code } = await params; const room = await getRoom(code.toUpperCase()); return room ? NextResponse.json(room) : NextResponse.json({ error: "Room not found" }, { status: 404 }); }
