import dotenv from "dotenv";
dotenv.config({ path: ".env" });

// Vite's import.meta.env mock for Node
global.import = { meta: { env: process.env } };

import {
  getSchedule,
  loadAlarmsFromSupabase,
  getAlarms,
} from "./src/service.js";

async function test() {
  console.log("🔍 Fetching schedule from Supabase Edge Function...");
  const data = await getSchedule();
  console.log("Response from getSchedule:", data);

  console.log("\n📦 Loading alarms from Supabase...");
  const alarms = await loadAlarmsFromSupabase();
  console.log("Alarms loaded:", alarms);

  console.log("\n🧭 Extracted alarms for UI:");
  console.log(getAlarms());
}

test().catch((err) => console.error("❌ Test failed:", err));
