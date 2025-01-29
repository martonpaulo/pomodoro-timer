import { Cycle } from "@/reducers/cycles/reducer";

export enum ActionTypes {
  ADD_NEW_CYCLE = "ADD_NEW_CYCLE",
  PAUSE_CURRENT_CYCLE = "PAUSE_CURRENT_CYCLE",
  STOP_CURRENT_CYCLE = "STOP_CURRENT_CYCLE",
}

export function addNewCycleAction(newCycle: Cycle) {
  return {
    type: ActionTypes.ADD_NEW_CYCLE,
    payload: {
      newCycle,
    },
  };
}

export function pauseCurrentCycleAction() {
  return {
    type: ActionTypes.PAUSE_CURRENT_CYCLE,
  };
}

export function stopCurrentCycleAction() {
  return {
    type: ActionTypes.STOP_CURRENT_CYCLE,
  };
}
