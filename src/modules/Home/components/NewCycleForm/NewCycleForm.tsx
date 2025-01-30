import { Minus, Plus } from "phosphor-react";
import { useContext, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import { CyclesContext } from "@/contexts/cycles/CyclesContext";
import {
  FormContainer,
  InputGroup,
  TaskInput,
  TaskTitle,
  TimerButton,
  TimerContainer,
  TimerInput,
  TimerInputGroup,
} from "@/modules/Home/components/NewCycleForm/NewCycleForm.styles";

const MINUTES_STEP = 5;
const MINUTES_MIN = 5;
const MINUTES_MAX = 60;

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext);
  const { register, setValue, getValues } = useFormContext();

  const [minutes, setMinutes] = useState(MINUTES_MIN);

  useEffect(() => {
    const initialMinutes = getValues("taskDuration") || MINUTES_MIN;
    setMinutes(initialMinutes);
  }, [getValues]);

  function updateMinutes(newValue: number) {
    setMinutes(newValue);
    setValue("taskDuration", newValue);
  }

  function decreaseMinutes() {
    const newValue = Math.max(minutes - MINUTES_STEP, MINUTES_MIN);
    updateMinutes(newValue);
  }

  function increaseMinutes() {
    const newValue = Math.min(minutes + MINUTES_STEP, MINUTES_MAX);
    updateMinutes(newValue);
  }

  const isDecreaseButtonDisabled = !!activeCycle || minutes <= MINUTES_MIN;
  const isIncreaseButtonDisabled = !!activeCycle || minutes >= MINUTES_MAX;

  return (
    <FormContainer>
      <TaskTitle $hidden={!activeCycle}>{getValues("taskTitle")}</TaskTitle>

      <InputGroup $hidden={!!activeCycle}>
        <label htmlFor="taskTitle">I will work on</label>
        <TaskInput
          id="taskTitle"
          list="task-suggestions"
          placeholder="Give your task a name"
          disabled={!!activeCycle}
          {...register("taskTitle")}
        />

        <datalist id="task-suggestions">
          <option value="Preparing the presentation" />
          <option value="Writing the essay" />
          <option value="Reviewing the content" />
        </datalist>

        <TimerContainer>
          <label htmlFor="taskDuration">for</label>

          <TimerInputGroup>
            <TimerButton
              type="button"
              onClick={decreaseMinutes}
              disabled={isDecreaseButtonDisabled}
            >
              <Minus size={16} />
            </TimerButton>

            <TimerInput
              type="number"
              id="taskDuration"
              placeholder="00"
              step={MINUTES_STEP}
              min={MINUTES_MIN}
              max={MINUTES_MAX}
              value={minutes}
              disabled={!!activeCycle}
              {...register("taskDuration", { valueAsNumber: true })}
            />

            <TimerButton
              type="button"
              onClick={increaseMinutes}
              disabled={isIncreaseButtonDisabled}
            >
              <Plus size={16} />
            </TimerButton>
          </TimerInputGroup>

          <span>minutes</span>
        </TimerContainer>
      </InputGroup>
    </FormContainer>
  );
}
