import { watch } from "fs";
import { HandPalm, Play } from "phosphor-react";
import { useEffect, useState } from "react";

import { Countdown } from "@/pages/Home/Countdown";
import { NewCycleForm } from "@/pages/Home/NewCycleForm";
import {
  HomeContainer,
  PauseCountdownButton,
  StartCountdownButton,
} from "@/pages/Home/styles";

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  pauseDate?: Date;
  stopDate?: Date;
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    setCycles((prevCycles) => [...prevCycles, newCycle]);
    setActiveCycleId(id);
    setAmountSecondsPassed(0);

    reset();
  }

  function handleInterruptCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return {
            ...cycle,
            pauseDate: new Date(),
          };
        } else {
          return cycle;
        }
      })
    );

    setActiveCycleId(null);
  }

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, "0");
  const seconds = String(secondsAmount).padStart(2, "0");

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds} - Pomodoro Timer`;
    }
  }, [activeCycle, minutes, seconds]);

  const task = watch("task");
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <NewCycleForm />

        <Countdown />

        {activeCycle ? (
          <PauseCountdownButton type="button" onClick={handleInterruptCycle}>
            <HandPalm size={24} />
            Stop
          </PauseCountdownButton>
        ) : (
          <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24} />
            Start
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
}
