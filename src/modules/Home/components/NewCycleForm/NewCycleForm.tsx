import { Minus, Plus } from "phosphor-react";
import { useContext, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import { CyclesContext } from "@/contexts/cycles/CyclesContext";
import {
  FormWrapper,
  InputWrapper,
  MinutesButton,
  MinutesInput,
  TaskInput,
} from "@/modules/Home/components/NewCycleForm/NewCycleForm.styles";

const MINUTES_STEP = 5;
const MINUTES_MIN = 5;
const MINUTES_MAX = 60;

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext);
  const { register, setValue, getValues } = useFormContext();

  const [minutes, setMinutes] = useState(MINUTES_MIN);

  useEffect(() => {
    const initialMinutes = getValues("durationMinutes") || MINUTES_MIN;
    setMinutes(initialMinutes);
  }, [getValues]);

  function updateMinutes(newValue: number) {
    setMinutes(newValue);
    setValue("durationMinutes", newValue);
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
    <FormWrapper>
      <label htmlFor="taskName">I will work on</label>
      <TaskInput
        id="taskName"
        list="task-suggestions"
        placeholder="Give your task a name"
        disabled={!!activeCycle}
        {...register("taskName")}
      />

      <datalist id="task-suggestions">
        <option value="Preparing the presentation" />
        <option value="Writing the essay" />
        <option value="Reviewing the content" />
      </datalist>

      <label htmlFor="durationMinutes">for</label>

      <InputWrapper>
        <MinutesButton
          type="button"
          onClick={decreaseMinutes}
          disabled={isDecreaseButtonDisabled}
        >
          <Minus size={16} />
        </MinutesButton>

        <MinutesInput
          type="number"
          id="durationMinutes"
          placeholder="00"
          step={MINUTES_STEP}
          min={MINUTES_MIN}
          max={MINUTES_MAX}
          value={minutes}
          disabled={!!activeCycle}
          {...register("durationMinutes", { valueAsNumber: true })}
        />

        <MinutesButton
          type="button"
          onClick={increaseMinutes}
          disabled={isIncreaseButtonDisabled}
        >
          <Plus size={16} />
        </MinutesButton>
      </InputWrapper>

      <span>minutes</span>
    </FormWrapper>
  );
}
