import { differenceInSeconds } from "date-fns";
import { ReactNode, useEffect, useReducer, useState } from "react";

import {
  addNewCycleAction,
  pauseCurrentCycleAction,
  stopCurrentCycleAction,
} from "@/contexts/cycles/cycles.actions";
import { cyclesReducer } from "@/contexts/cycles/cycles.reducer";
import {
  loadCyclesState,
  saveCyclesState,
} from "@/contexts/cycles/cycles.storage";
import { Cycle } from "@/contexts/cycles/cycles.types";
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

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate));
    }
    return 0;
  });

  useEffect(() => {
    saveCyclesState(cyclesState);
  }, [cyclesState]);

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }

  function markCurrentCycleAsFinished() {
    dispatch(stopCurrentCycleAction());
  }

  function createNewCycle(data: { task: string; minutesAmount: number }) {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    dispatch(addNewCycleAction(newCycle));
    setAmountSecondsPassed(0);
  }

  function pauseCurrentCycle() {
    dispatch(pauseCurrentCycleAction());
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        pauseCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
}
