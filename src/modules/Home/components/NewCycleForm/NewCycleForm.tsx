import { Minus, Plus } from "phosphor-react";
import { useContext, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import { CyclesContext } from "@/contexts/cycles/CyclesContext";
import {
  DecreaseButton,
  FormWrapper,
  IncreaseButton,
  InputWrapper,
  MinutesInput,
  TaskInput,
} from "@/modules/Home/components/NewCycleForm/NewCycleForm.styles";

const MINUTES_STEP = 5;
const MINUTES_MIN = 5;
const MINUTES_MAX = 60;

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext);
  const { register, setValue, getValues } = useFormContext();

  // Estado local para armazenar o valor atualizado
  const [minutes, setMinutes] = useState(MINUTES_MIN);

  // Sincroniza o estado com o valor inicial do React Hook Form
  useEffect(() => {
    const initialMinutes = getValues("minutesAmount") || MINUTES_MIN;
    setMinutes(initialMinutes);
  }, [getValues]);

  function updateMinutes(newValue: number) {
    setMinutes(newValue);
    setValue("minutesAmount", newValue);
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
      <label htmlFor="task">I will work on</label>
      <TaskInput
        id="task"
        list="task-suggestions"
        placeholder="Give your task a name"
        disabled={!!activeCycle}
        {...register("task")}
      />

      <datalist id="task-suggestions">
        <option value="Preparing the presentation" />
        <option value="Writing the essay" />
        <option value="Reviewing the content" />
      </datalist>

      <label htmlFor="minutesAmount">for</label>

      <InputWrapper>
        <DecreaseButton
          type="button"
          onClick={decreaseMinutes}
          disabled={isDecreaseButtonDisabled}
        >
          <Minus size={16} />
        </DecreaseButton>

        <MinutesInput
          type="number"
          id="minutesAmount"
          placeholder="00"
          step={MINUTES_STEP}
          min={MINUTES_MIN}
          max={MINUTES_MAX}
          value={minutes} // Agora usa o estado atualizado
          disabled={!!activeCycle}
          {...register("minutesAmount", { valueAsNumber: true })}
        />

        <IncreaseButton
          type="button"
          onClick={increaseMinutes}
          disabled={isIncreaseButtonDisabled}
        >
          <Plus size={16} />
        </IncreaseButton>
      </InputWrapper>

      <span>minutes</span>
    </FormWrapper>
  );
}
