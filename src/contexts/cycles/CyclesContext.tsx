import { createContext } from "react";

import { Cycle } from "@/contexts/cycles/cycles.types";

interface CycleContextType {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  elapsedSeconds: number;
  updateElapsedSeconds: (seconds: number) => void;
  createNewCycle: (taskName: string, durationMinutes: number) => void;
  pauseCurrentCycle: () => void;
  markCurrentCycleAsFinished: () => void;
}

export const CyclesContext = createContext({} as CycleContextType);
