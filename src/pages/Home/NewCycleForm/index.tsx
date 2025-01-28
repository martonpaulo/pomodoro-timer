import { useContext } from "react";
import { useFormContext } from "react-hook-form";

import { CyclesContext } from "@/contexts/CyclesContext";
import {
  FormContainer,
  MinutesAmountInput,
  TaskInput,
} from "@/pages/Home/NewCycleForm/styles";

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext);
  const { register } = useFormContext();

  return (
    <FormContainer>
      <label htmlFor="">I will work on </label>
      <TaskInput
        id="task"
        list="task-suggestions"
        placeholder="Give your task a name"
        disabled={!!activeCycle}
        {...register("task")}
      />

      <datalist id="task-suggestions">
        <option value="Work on the project" />
        <option value="Prepare the presentation" />
        <option value="Write the essay" />
        <option value="Review the content" />
      </datalist>

      <label htmlFor="minutesAmount">for</label>
      <MinutesAmountInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        step={5}
        min={5}
        max={60}
        disabled={!!activeCycle}
        {...register("minutesAmount", { valueAsNumber: true })}
      />

      <span>minutes</span>
    </FormContainer>
  );
}
