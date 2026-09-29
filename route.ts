import { NextRequest, NextResponse } from "next/server";
import { code } from "@/lib/game";
import { getRoom, putRoom } from "@/lib/store";
export const runtime = "nodejs";
export async function POST(req: NextRequest) {
  const { playerId, name } = await req.json();
  if (!playerId || !name?.trim()) return NextResponse.json({ error: "Enter a name" }, { status: 400 });
  let roomCode = code(); while (await getRoom(roomCode)) roomCode = code();
  const room = { code: roomCode, hostId: playerId, players: [{ id: playerId, name: name.trim().slice(0, 18), score: 0, joinedAt: Date.now() }], phase: "lobby" as const, round: 0, treats: [], endsAt: null, createdAt: Date.now() };
  await putRoom(room); return NextResponse.json(room);
}
