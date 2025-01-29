import { differenceInSeconds } from "date-fns";
import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from "react";

import {
  addNewCycleAction,
  pauseCurrentCycleAction,
  stopCurrentCycleAction,
} from "@/reducers/cycles/actions";
import { Cycle, cyclesReducer } from "@/reducers/cycles/reducer";

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

// eslint-disable-next-line react-refresh/only-export-components
export const CyclesContext = createContext({} as CycleContextType);

interface CyclesContextProviderProps {
  children: ReactNode;
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    (initialState) => {
      const storageStateAsJSON = localStorage.getItem(
        "@pomodoro-timer:cycles-state-1.0.0"
      );

      if (storageStateAsJSON) {
        return JSON.parse(storageStateAsJSON);
      }

      return initialState;
    }
  );

  const { cycles, activeCycleId } = cyclesState;

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(
        new Date(),
        new Date(activeCycle?.startDate || 0)
      );
    }

    return 0;
  });

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState);

    localStorage.setItem("@pomodoro-timer:cycles-state-1.0.0", stateJSON);
  }, [cyclesState]);

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }

  function markCurrentCycleAsFinished() {
    dispatch(stopCurrentCycleAction);
  }

  function createNewCycle(data: CreateCycleData) {
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
    dispatch(pauseCurrentCycleAction);
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
