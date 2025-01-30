import { differenceInSeconds } from "date-fns";
import { ReactNode, useEffect, useReducer, useState } from "react";

import {
  addNewCycleAction,
  markCurrentCycleAsCompletedAction,
  stopCurrentCycleAction,
} from "@/contexts/cycles/cycles.actions";
import { cyclesReducer } from "@/contexts/cycles/cycles.reducer";
import {
  loadCyclesState,
  saveCyclesState,
} from "@/contexts/cycles/cycles.storage";
import { Cycle, CycleStatus } from "@/contexts/cycles/cycles.types";
import { CyclesContext } from "@/contexts/cycles/CyclesContext";

interface CyclesContextProviderProps {
  children: ReactNode;
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, loadCyclesState());

  const { cycles, activeCycleId } = cyclesState;
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const [elapsedSeconds, setElapsedSeconds] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate));
    }
    return 0;
  });

  useEffect(() => {
    saveCyclesState(cyclesState);
  }, [cyclesState]);

  function updateElapsedSeconds(seconds: number) {
    setElapsedSeconds(seconds);
  }

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsCompletedAction());
  }

  function createNewCycle(taskTitle: string, taskDuration: number) {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      taskTitle,
      taskDuration,
      startDate: new Date(),
      status: CycleStatus.IN_PROGRESS,
    };

    dispatch(addNewCycleAction(newCycle));
    setElapsedSeconds(0);
  }

  function pauseCurrentCycle() {
    dispatch(stopCurrentCycleAction());
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        elapsedSeconds,
        updateElapsedSeconds,
        createNewCycle,
        pauseCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
}
