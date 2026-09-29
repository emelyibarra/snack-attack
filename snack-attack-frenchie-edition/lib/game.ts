export type Phase = "lobby" | "playing" | "results" | "finished";
export type Player = { id: string; name: string; score: number; joinedAt: number };
export type TreatKind = "bone" | "croissant" | "cookie" | "strawberry" | "broccoli" | "toy";
export type Treat = { id: string; kind: TreatKind; points: number; x: number; y: number; claimedBy: string | null };
export type Room = { code: string; hostId: string; players: Player[]; phase: Phase; round: number; treats: Treat[]; endsAt: number | null; createdAt: number };
export const ROUND_SECONDS = 35;
const kinds: Array<[TreatKind, number]> = [["bone", 2], ["croissant", 3], ["cookie", 1], ["strawberry", 2], ["broccoli", -2], ["toy", -1]];
export const treatInfo: Record<TreatKind, { emoji: string; name: string }> = { bone: { emoji: "🦴", name: "Biscuit Bone" }, croissant: { emoji: "🥐", name: "Fancy Croissant" }, cookie: { emoji: "🍪", name: "Cookie" }, strawberry: { emoji: "🍓", name: "Strawberry" }, broccoli: { emoji: "🥦", name: "Broccoli" }, toy: { emoji: "🎾", name: "Squeaky Toy" } };
export function code() { return Array.from({ length: 6 }, () => "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"[Math.floor(Math.random() * 32)]).join(""); }
export function makeTreats(round: number): Treat[] { return Array.from({ length: 22 }, (_, i) => { const roll = Math.random(); const [kind, points] = roll < .09 ? kinds[4] : roll < .16 ? kinds[5] : roll < .31 ? kinds[1] : roll < .56 ? kinds[0] : roll < .78 ? kinds[3] : kinds[2]; return { id: `r${round}-${i}-${Math.random().toString(36).slice(2, 7)}`, kind, points, x: 7 + Math.random() * 86, y: 8 + Math.random() * 82, claimedBy: null }; }); }
export function advance(room: Room): Room { if (room.phase === "playing" && room.endsAt && Date.now() >= room.endsAt) { room.phase = room.round >= 8 ? "finished" : "results"; room.endsAt = null; } return room; }
