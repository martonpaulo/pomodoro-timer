import { CyclesState } from "@/contexts/cycles/cycles.types";

const STORAGE_PREFIX = "@pomodoro-timer";
const STORAGE_VERSION =
  import.meta.env.VITE_STORAGE_VERSION || "unknown-version";
const STORAGE_KEY = `${STORAGE_PREFIX}:cycles-state:${STORAGE_VERSION}`;

export function saveCyclesState(state: CyclesState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function loadCyclesState(): CyclesState {
  const storageStateAsJSON = localStorage.getItem(STORAGE_KEY);
  return storageStateAsJSON
    ? JSON.parse(storageStateAsJSON)
    : { cycles: [], activeCycleId: null };
}
