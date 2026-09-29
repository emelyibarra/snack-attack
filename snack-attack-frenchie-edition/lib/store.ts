import { Redis } from "@upstash/redis";
import type { Room } from "./game";
import { advance } from "./game";

// Construct lazily so `next build` can run before Vercel injects the integration variables.
let client: Redis | undefined;
function redis() {
  if (!client) {
    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) throw new Error("Redis is not configured. Add the Upstash Redis integration in Vercel.");
    client = Redis.fromEnv();
  }
  return client;
}
const key = (code: string) => `snack-attack:${code}`;
export async function getRoom(code: string) { const room = await redis().get<Room>(key(code)); if (!room) return null; const before = JSON.stringify(room); const next = advance(room); if (JSON.stringify(next) !== before) await putRoom(next); return next; }
export async function putRoom(room: Room) { await redis().set(key(room.code), room, { ex: 60 * 60 * 24 }); return room; }
