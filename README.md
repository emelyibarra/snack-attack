# Snack Attack: Frenchie Edition

A real-time, 2–8 player Frenchie treat-grabbing game built with Next.js and Upstash Redis. Add the **Upstash Redis** integration in Vercel and redeploy; the integration sets `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`.

Each room is stored in Redis for 24 hours. Clients poll the server every 1.5 seconds, so separate phones stay synchronized without server-resident memory or WebSockets.
