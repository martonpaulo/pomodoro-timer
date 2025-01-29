import { Cycle } from "@/contexts/cycles/cycles.types";

export enum CyclesActionTypes {
  ADD_NEW_CYCLE = "ADD_NEW_CYCLE",
  STOP_CURRENT_CYCLE = "STOP_CURRENT_CYCLE",
  MARK_CURRENT_CYCLE_AS_COMPLETED = "MARK_CURRENT_CYCLE_AS_COMPLETED",
}

export type CyclesActions =
  | { type: CyclesActionTypes.ADD_NEW_CYCLE; payload: { newCycle: Cycle } }
  | { type: CyclesActionTypes.STOP_CURRENT_CYCLE }
  | { type: CyclesActionTypes.MARK_CURRENT_CYCLE_AS_COMPLETED };

export function addNewCycleAction(newCycle: Cycle): CyclesActions {
  return {
    type: CyclesActionTypes.ADD_NEW_CYCLE,
    payload: { newCycle },
  };
}

export function stopCurrentCycleAction(): CyclesActions {
  return { type: CyclesActionTypes.STOP_CURRENT_CYCLE };
}

export function markCurrentCycleAsCompletedAction(): CyclesActions {
  return { type: CyclesActionTypes.MARK_CURRENT_CYCLE_AS_COMPLETED };
}
