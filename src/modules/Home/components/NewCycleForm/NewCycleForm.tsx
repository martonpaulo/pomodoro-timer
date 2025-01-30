import { Minus, Plus } from "phosphor-react";
import { useContext } from "react";
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
const DEFAULT_MINUTES = 25;

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext);
  const { register, setValue, watch } = useFormContext();

  const minutes = watch("taskDuration", DEFAULT_MINUTES);

  function updateMinutes(newValue: number) {
    setValue(
      "taskDuration",
      Math.min(Math.max(newValue, MINUTES_MIN), MINUTES_MAX)
    );
  }

  return (
    <FormContainer>
      <TaskTitle $hidden={!activeCycle}>{watch("taskTitle")}</TaskTitle>

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
              onClick={() => updateMinutes(minutes - MINUTES_STEP)}
              disabled={!!activeCycle || minutes <= MINUTES_MIN}
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
              onClick={() => updateMinutes(minutes + MINUTES_STEP)}
              disabled={!!activeCycle || minutes >= MINUTES_MAX}
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
