import { produce } from "immer";

import {
  CyclesActions,
  CyclesActionTypes,
} from "@/contexts/cycles/cycles.actions";
import { CyclesState, CycleStatus } from "@/contexts/cycles/cycles.types";

export const initialCyclesState: CyclesState = {
  cycles: [],
  activeCycleId: null,
};

export function cyclesReducer(
  state: CyclesState,
  action: CyclesActions
): CyclesState {
  switch (action.type) {
    case CyclesActionTypes.ADD_NEW_CYCLE:
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle);
        draft.activeCycleId = action.payload.newCycle.id;
      });

    case CyclesActionTypes.STOP_CURRENT_CYCLE: {
      const currentCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId
      );

      if (currentCycleIndex < 0) return state;

      return produce(state, (draft) => {
        draft.cycles[currentCycleIndex].status = CycleStatus.STOPPED;
        draft.activeCycleId = null;
      });
    }

    case CyclesActionTypes.MARK_CURRENT_CYCLE_AS_COMPLETED: {
      const currentCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId
      );

      if (currentCycleIndex < 0) return state;

      return produce(state, (draft) => {
        draft.cycles[currentCycleIndex].status = CycleStatus.COMPLETED;
        draft.activeCycleId = null;
      });
    }

    default:
      return state;
  }
}
