import { NextRequest, NextResponse } from "next/server";
import { getRoom, putRoom } from "@/lib/store";
import { ROUND_SECONDS, makeTreats } from "@/lib/game";
export const runtime = "nodejs";
export async function POST(req: NextRequest, { params }: { params: Promise<{ code: string }> }) {
  const { code } = await params; const body = await req.json(); const room = await getRoom(code.toUpperCase());
  if (!room) return NextResponse.json({ error: "Room not found" }, { status: 404 });
  let player = room.players.find(p => p.id === body.playerId); const now = Date.now();
  if (body.action === "join") { if (room.phase !== "lobby") return NextResponse.json({ error: "Snack Attack has already started" }, { status: 409 }); if (!player) { if (room.players.length >= 8) return NextResponse.json({ error: "This room is full" }, { status: 409 }); player = { id: body.playerId, name: String(body.name || "Player").trim().slice(0, 18), score: 0, joinedAt: now }; room.players.push(player); } }
  if (!player) return NextResponse.json({ error: "Join the room first" }, { status: 403 });
  if (body.action === "start") { if (room.hostId !== player.id || room.players.length < 2) return NextResponse.json({ error: "The host needs at least 2 players" }, { status: 403 }); room.phase = "playing"; room.round = 1; room.treats = makeTreats(1); room.endsAt = now + ROUND_SECONDS * 1000; }
  if (body.action === "chomp" && room.phase === "playing") { const treat = room.treats.find(t => t.id === body.treatId); if (!treat || treat.claimedBy) return NextResponse.json(room); treat.claimedBy = player.id; player.score = Math.max(0, player.score + treat.points); }
  if (body.action === "next" && room.phase === "results" && room.hostId === player.id) { room.round++; room.phase = "playing"; room.treats = makeTreats(room.round); room.endsAt = now + ROUND_SECONDS * 1000; }
  await putRoom(room); return NextResponse.json(room);
}
