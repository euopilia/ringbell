
🕒 RingBell – Alarm Scheduler (React + Supabase)

A modern alarm scheduling web app built with React (Vite) and Supabase.
Enables authenticated users to create, update, and store alarm configurations directly in Supabase Storage via Edge Functions.


---

🚀 Features

🔐 Supabase authentication (email + password)

☁️ Cloud-synced schedule.json via Supabase Storage

⚙️ CRUD operations for alarms

🌐 Centralized Supabase service module

🧠 Environment-safe configuration (browser + Node CLI)

🤝 Collaborative-ready GitHub workflow



---

🧩 Project Structure

ringbell/
│
├── src/
│   ├── service.js           # Supabase + Alarm logic
│   ├── components/          # React UI components
│   ├── App.jsx              # Main React entry
│   └── main.jsx             # Vite root
│
├── .env                     # Local environment variables
├── .gitignore               # Ignored files
├── package.json             # Dependencies + scripts
└── README.md                # Documentation


---

⚙️ Environment Setup

Create a .env file in your project root:

VITE_SUPABASE_URL=https://<your-project>.supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-key>
VITE_SUPABASE_FUNCTIONS_BASE_URL=https://<your-project>.supabase.co/functions/v1

> 🔒 Never share your Supabase keys publicly.
The anon key is client-safe; never expose service keys.




---

📦 Installation (Collaborator Setup)

# 1. Clone the repository
git clone https://github.com/<your-username>/<repo-name>.git
cd ringbell

# 2. Install dependencies
npm install

# 3. Create your own .env file (as above)

# 4. Start the dev server
npm run dev

App runs at: http://localhost:5173


---

🧠 Supabase Service Module (src/service.js)

Centralized logic for Supabase client, Edge Functions, CRUD operations, and sync.

1. Authentication

export async function signIn(email, password)

Authenticates user via Supabase. Throws error on invalid credentials.

2. Fetch Schedule

export async function fetchSchedule()

Fetches schedule.json using Edge Function getSchedule.
Returns parsed JSON or { error, message }.

3. Save / Upload Schedule

export async function saveSchedule(payload)

Uploads schedule via postSchedule with upsert: true behavior.

4. Alarm Manipulation

Function	Description

addWeekdayAlarm(time, isLongType, isOn, weekdays)	Adds weekday alarm
addCustomAlarm(time, isLongType, isOn, timestamps)	Adds custom alarm
updateAlarmParam(id, params)	Updates alarm fields
toggleAlarm(id)	Toggles alarm on/off
removeAlarm(id)	Deletes alarm by ID


Alarm Structure:

{
  id: "unique_id",
  time: "08:45",
  isCustom: false,
  days: [1,2,4,5],
  isLongType: true,
  isOn: true
}

5. Cloud Sync Helpers

export const syncAlarmsToSupabase = async () => saveSchedule(alarms);
export const loadAlarmsFromSupabase = async () => fetchSchedule();


---

🧰 CLI Testing (Optional)

Create test.mjs:

import dotenv from "dotenv";
dotenv.config();
import { fetchSchedule, saveSchedule } from "./src/service.js";

const main = async () => {
  const schedule = await fetchSchedule();
  console.log("Current schedule:", schedule);

  // Modify or add an alarm
  schedule["7"] = ["09:00", false, [1, 3, 5], true, true];
  await saveSchedule(schedule);

  console.log("Schedule updated successfully ✅");
};

main();

Run it with:

node test.mjs


---

🧾 Git Workflow

git pull origin main
# make edits
git add .
git commit -m "Description of changes"
git push origin main


---

🔍 Troubleshooting

Issue	Cause	Fix

import.meta.env undefined	Node lacks Vite env	Use dotenv.config()
401 Unauthorized	No session	Ensure user logged in
.env not detected	Missing or misplaced	Add to root & restart
Git push blocked	No upstream branch	Run git push -u origin main



---

🧑‍💻 Tech Stack

Layer	Technology

Frontend	React + Vite
Backend	Supabase (Edge Functions, Auth, Storage)
Language	JavaScript (ESM)
Version Control	Git + GitHub



---

🛡️ License

MIT License © 2025 – Collaborative Dev Team
Open for internal educational and development purposes.


---

> Note:
Always update service.js if backend (Supabase Edge Functions) logic changes.
