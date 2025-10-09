## 📘 **README.md**

```markdown
# 🕒 RingBell – Alarm Scheduler (React + Supabase)

A modern alarm scheduling web app built with **React (Vite)** and **Supabase**.  
This project enables authenticated users to create, update, and store alarm configurations directly in Supabase Storage via Edge Functions.

---

## 🚀 Features

- 🔐 Supabase authentication (email + password)
- ☁️ Cloud-synced `schedule.json` via Supabase Storage
- ⚙️ CRUD functions for alarm manipulation
- 🌐 Reusable Supabase service module
- 🧠 Environment-safe configuration for both browser & Node CLI
- 🤝 Collaborative-ready GitHub repository

---

## 🧩 Project Structure


ringbell/
│
├── src/
│   ├── service.js           # Central Supabase + Alarm logic
│   ├── components/          # React UI components (to be added)
│   ├── App.jsx              # Main React entry
│   └── main.jsx             # Vite root
│
├── .env                     # Environment variables (local only)
├── .gitignore               # Ignored system + node files
├── package.json             # Dependencies + scripts
└── README.md                # Documentation


---

## ⚙️ Environment Setup

Create a `.env` file in your project root (not committed to GitHub):

```bash
VITE_SUPABASE_URL=https://<your-project>.supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-key>
VITE_SUPABASE_FUNCTIONS_BASE_URL=https://<your-project>.supabase.co/functions/v1
````

> 🔒 **Never share** the anon or service keys publicly.
> The anon key is safe for client use only. Do **not** expose the service key.

---

## 📦 Installation (Team Member Setup)

Each collaborator should follow these steps after cloning the repo:

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/<repo-name>.git
cd ringbell

# 2. Install dependencies
npm install

# 3. Create your own .env file (as described above)

# 4. Start development server
npm run dev
```

Your local app will start on:
👉 `http://localhost:5173`

---

## 🧠 Supabase Service Module (src/service.js)

This module centralizes:

* Supabase client initialization
* Edge Function communication
* Alarm CRUD operations
* Local <-> cloud synchronization

### 1. Authentication

```js
export async function signIn(email, password)
```

* Authenticates user using Supabase email + password.
* Throws error if invalid credentials.

---

### 2. Fetch Schedule

```js
export async function fetchSchedule()
```

* Fetches `schedule.json` from Supabase Edge Function (`getSchedule`).
* Handles errors gracefully and logs them.
* Returns parsed JSON or `{ error, message }`.

---

### 3. Save / Upload Schedule

```js
export async function saveSchedule(payload)
```

* Uploads new schedule data via Supabase Edge Function (`postSchedule`).
* Requires valid Supabase session token.
* Performs `upsert: true` — replaces or creates `schedule.json`.

---

### 4. Alarm Manipulation Functions

| Function                                             | Description                          |
| ---------------------------------------------------- | ------------------------------------ |
| `addWeekdayAlarm(time, isLongType, isOn, weekdays)`  | Adds alarm with weekday repetition.  |
| `addCustomAlarm(time, isLongType, isOn, timestamps)` | Adds alarm for custom datetime list. |
| `updateAlarmParam(id, params)`                       | Updates specific alarm fields.       |
| `toggleAlarm(id)`                                    | Flips alarm on/off state.            |
| `removeAlarm(id)`                                    | Deletes alarm by ID.                 |

Each alarm follows this structure:

```js
{
  id: "unique_id",
  time: "08:45",
  isCustom: false,
  days: [1,2,4,5],          // weekdays if isCustom=false, timestamps if true
  isLongType: true,
  isOn: true
}
```

---

### 5. Cloud Sync Helpers

```js
export const syncAlarmsToSupabase = async () => saveSchedule(alarms);
export const loadAlarmsFromSupabase = async () => fetchSchedule();
```

* `syncAlarmsToSupabase()` → Push local data to Supabase.
* `loadAlarmsFromSupabase()` → Fetch current cloud state.

---

## 🧰 CLI Testing (Optional)

You can test Supabase functionality directly in Node without launching Vite:

1. Create a file `test.mjs`:

   ```js
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
   ```

2. Run:

   ```bash
   node test.mjs
   ```

---

## 🧾 Git Workflow

Typical update process for all collaborators:

```bash
# 1. Pull latest updates
git pull origin main

# 2. Make modifications
# (edit code, fix bugs, add features)

# 3. Stage & commit
git add .
git commit -m "Description of changes"

# 4. Push changes
git push origin main
```

---

## 🔍 Troubleshooting

| Issue                              | Cause                           | Fix                                |
| ---------------------------------- | ------------------------------- | ---------------------------------- |
| `import.meta.env` undefined in CLI | Node doesn’t auto-load Vite env | Use `dotenv.config()`              |
| 401 Unauthorized on upload         | Session missing                 | Ensure user logged in (`signIn()`) |
| `.env` not detected                | File missing / not in root      | Add `.env` and restart server      |
| Git push blocked                   | Branch not set upstream         | Run `git push -u origin main` once |

---

## 🧑‍💻 Tech Stack

| Layer           | Tech                                     |
| --------------- | ---------------------------------------- |
| Frontend        | React + Vite                             |
| Backend         | Supabase (Edge Functions, Auth, Storage) |
| Language        | JavaScript (ESM)                         |
| Version Control | Git + GitHub                             |

---

## 🛡️ License

MIT License © 2025 – Collaborative Dev Team
This project is open for internal educational and development purposes.

---

> **Note:**
> This documentation is written to help any new collaborator set up, understand, and extend the project quickly.
> Every change in backend logic (Supabase Edge Functions) should be reflected in `service.js` accordingly.

