import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const BASE_URL = import.meta.env.VITE_SUPABASE_FUNCTIONS_BASE_URL;

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function getSchedule() {
  const res = await fetch(`${BASE_URL}/getSchedule`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("Failed to fetch schedule");
  return res.json();
}

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function postSchedule(payload) {
  const session = (await supabase.auth.getSession()).data.session;
  if (!session) throw new Error("Not authenticated");
  const res = await fetch(`${BASE_URL}/postSchedule`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${session.access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to upload schedule");
  return res.json();
}

let alarms = {};

export const loadAlarmsFromSupabase = async () => {
  const remoteData = await getSchedule();
  if (remoteData && !remoteData.error) {
    alarms = remoteData;
  } else {
    console.warn("Failed to load alarms from Supabase:", remoteData.message);
  }
  return alarms;
};


export const getAlarms = () =>
  Object.entries(alarms).map(([id, [time, isCustom, days, isLongType, isOn]]) => ({
    id,
    time,
    isCustom,
    days,
    isLongType,
    isOn,
  }));

export const updateLocalAlarm = (id, params = {}) => {
  if (!alarms[id]) throw new Error("Alarm not found");
  const [time, isCustom, days, isLongType, isOn] = alarms[id];
  alarms[id] = [
    params.time ?? time,
    params.isCustom ?? isCustom,
    params.days ?? days,
    params.isLongType ?? isLongType,
    params.isOn ?? isOn,
  ];
};

export default {
  supabase,
  signIn,
  getSchedule,
  postSchedule,
  loadAlarmsFromSupabase,
  getAlarms,
  updateLocalAlarm,
};
