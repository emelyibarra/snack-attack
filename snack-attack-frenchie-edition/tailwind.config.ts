import type { Config } from "tailwindcss";
export default { content: ["./app/**/*.{ts,tsx}"], theme: { extend: { fontFamily: { display: ["Arial Black", "Arial", "sans-serif"] }, colors: { ink: "#261c3f", peach: "#ffefc7", coral: "#ff6571", violet: "#7453e8" } } }, plugins: [] } satisfies Config;
