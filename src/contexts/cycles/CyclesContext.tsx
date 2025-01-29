import { createContext } from "react";

import { Cycle } from "@/contexts/cycles/cycles.types";

interface CreateCycleData {
  task: string;
  minutesAmount: number;
}

interface CycleContextType {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  markCurrentCycleAsFinished: () => void;
  setSecondsPassed: (seconds: number) => void;
  createNewCycle: (data: CreateCycleData) => void;
  pauseCurrentCycle: () => void;
}

export const CyclesContext = createContext({} as CycleContextType);
