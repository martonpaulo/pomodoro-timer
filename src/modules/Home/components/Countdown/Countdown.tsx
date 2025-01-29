import { differenceInSeconds } from "date-fns";
import { useContext, useEffect } from "react";

import { CyclesContext } from "@/contexts/cycles/CyclesContext";
import {
  CountdownContainer,
  Separator,
} from "@/modules/Home/components/Countdown/Countdown.styles";

export function Countdown() {
  const {
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    elapsedSeconds,
    updateElapsedSeconds,
  } = useContext(CyclesContext);

  const totalCycleSeconds = activeCycle ? activeCycle.durationMinutes * 60 : 0;

  const remainingTimeSeconds = activeCycle
    ? totalCycleSeconds - elapsedSeconds
    : 0;

  const minutesRemaining = Math.floor(remainingTimeSeconds / 60);
  const secondsRemaining = remainingTimeSeconds % 60;

  const formattedMinutes = String(minutesRemaining).padStart(2, "0");
  const formattedSeconds = String(secondsRemaining).padStart(2, "0");

  useEffect(() => {
    if (activeCycle) {
      document.title = `(${formattedMinutes}:${formattedSeconds}) Pomodoro Timer`;
    }
  }, [activeCycle, formattedMinutes, formattedSeconds]);

  useEffect(() => {
    let countdownInterval: NodeJS.Timeout;

    if (activeCycle) {
      countdownInterval = setInterval(() => {
        const secondsElapsed = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate)
        );

        if (secondsElapsed >= totalCycleSeconds) {
          markCurrentCycleAsFinished();
          updateElapsedSeconds(totalCycleSeconds);
          clearInterval(countdownInterval);
        } else {
          updateElapsedSeconds(secondsElapsed);
        }
      }, 1000);
    }

    return () => {
      clearInterval(countdownInterval);
    };
  }, [
    activeCycle,
    totalCycleSeconds,
    activeCycleId,
    markCurrentCycleAsFinished,
    updateElapsedSeconds,
  ]);

  return (
    <CountdownContainer $hidden={!activeCycle}>
      <span>{formattedMinutes[0]}</span>
      <span>{formattedMinutes[1]}</span>
      <Separator>:</Separator>
      <span>{formattedSeconds[0]}</span>
      <span>{formattedSeconds[1]}</span>
    </CountdownContainer>
  );
}
