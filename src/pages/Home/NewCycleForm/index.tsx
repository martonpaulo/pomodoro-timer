import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as zod from "zod";

import {
  FormContainer,
  MinutesAmountInput,
  TaskInput,
} from "@/pages/Home/NewCycleForm/styles";

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Task name is required"),
  minutesAmount: zod
    .number()
    .min(5, "Minimum amount of minutes is 5")
    .max(60, "Maximum amount of minutes is 60"),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export function NewCycleForm() {
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 25,
    },
  });

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
