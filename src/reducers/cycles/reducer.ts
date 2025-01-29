import { produce } from "immer";

import { ActionTypes } from "@/reducers/cycles/actions";

export interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  pauseDate?: Date;
  stopDate?: Date;
}

interface CyclesState {
  cycles: Cycle[];
  activeCycleId: string | null;
}

export function cyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle);
        draft.activeCycleId = action.payload.newCycle.id;
      });

    case ActionTypes.PAUSE_CURRENT_CYCLE: {
      console.log("PAUSE_CURRENT_CYCLE");
      const currentCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId
      );

      if (currentCycleIndex < 0) {
        return state;
      }

      return produce(state, (draft) => {
        draft.cycles[currentCycleIndex].pauseDate = new Date();
        draft.activeCycleId = null;
      });
    }

    case ActionTypes.STOP_CURRENT_CYCLE: {
      console.log("STOP_CURRENT_CYCLE");
      const currentCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId
      );

      if (currentCycleIndex < 0) {
        return state;
      }

      return produce(state, (draft) => {
        draft.cycles[currentCycleIndex].stopDate = new Date();
        draft.activeCycleId = null;
      });
    }

    default:
      return state;
  }
}
