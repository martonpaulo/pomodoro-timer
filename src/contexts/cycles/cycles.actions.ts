import { Cycle } from "@/contexts/cycles/cycles.types";

export enum CyclesActionTypes {
  ADD_NEW_CYCLE = "ADD_NEW_CYCLE",
  PAUSE_CURRENT_CYCLE = "PAUSE_CURRENT_CYCLE",
  STOP_CURRENT_CYCLE = "STOP_CURRENT_CYCLE",
}

export type CyclesActions =
  | { type: CyclesActionTypes.ADD_NEW_CYCLE; payload: { newCycle: Cycle } }
  | { type: CyclesActionTypes.PAUSE_CURRENT_CYCLE }
  | { type: CyclesActionTypes.STOP_CURRENT_CYCLE };

export function addNewCycleAction(newCycle: Cycle): CyclesActions {
  return {
    type: CyclesActionTypes.ADD_NEW_CYCLE,
    payload: { newCycle },
  };
}

export function pauseCurrentCycleAction(): CyclesActions {
  return { type: CyclesActionTypes.PAUSE_CURRENT_CYCLE };
}

export function stopCurrentCycleAction(): CyclesActions {
  return { type: CyclesActionTypes.STOP_CURRENT_CYCLE };
}
