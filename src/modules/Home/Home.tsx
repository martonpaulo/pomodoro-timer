import { zodResolver } from "@hookform/resolvers/zod";
import { HandPalm, Play } from "phosphor-react";
import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as zod from "zod";

import { CyclesContext } from "@/contexts/cycles/CyclesContext";
import { Countdown } from "@/modules/Home/components/Countdown/Countdown";
import { NewCycleForm } from "@/modules/Home/components/NewCycleForm/NewCycleForm";
import {
  HomeWrapper,
  PauseButton,
  StartButton,
} from "@/modules/Home/Home.styles";

const taskFormSchema = zod.object({
  taskTitle: zod.string().min(1, "Task title is required"),
  taskDuration: zod
    .number()
    .min(5, "Minimum duration is 5 minutes")
    .max(60, "Maximum duration is 60 minutes"),
});

type TaskFormData = zod.infer<typeof taskFormSchema>;

export function Home() {
  const { activeCycle, createNewCycle, pauseCurrentCycle } =
    useContext(CyclesContext);

  const taskForm = useForm<TaskFormData>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      taskTitle: "",
      taskDuration: 25,
    },
  });

  const { handleSubmit, watch, reset } = taskForm;

  function handleCreateCycle(formData: TaskFormData) {
    createNewCycle(formData.taskTitle, formData.taskDuration);
    reset();
  }

  function handlePauseCycle() {
    pauseCurrentCycle();
    reset();
  }

  const taskTitle = watch("taskTitle");
  const isStartDisabled = !taskTitle;

  return (
    <HomeWrapper>
      <form onSubmit={handleSubmit(handleCreateCycle)}>
        <FormProvider {...taskForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <PauseButton type="button" onClick={handlePauseCycle}>
            <HandPalm size={24} />
            Stop
          </PauseButton>
        ) : (
          <StartButton type="submit" disabled={isStartDisabled}>
            <Play size={24} />
            Start
          </StartButton>
        )}
      </form>
    </HomeWrapper>
  );
}
