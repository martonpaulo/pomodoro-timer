import { zodResolver } from "@hookform/resolvers/zod";
import { HandPalm, Play } from "phosphor-react";
import { useContext, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as zod from "zod";

import { CyclesContext } from "@/contexts/cycles/CyclesContext";
import { Countdown } from "@/modules/Home/components/Countdown/Countdown";
import { NewCycleForm } from "@/modules/Home/components/NewCycleForm/NewCycleForm";
import {
  HomeWrapper,
  StartButton,
  StopButton,
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
  const { activeCycle, createNewCycle, stopCurrentCycle } =
    useContext(CyclesContext);

  const taskForm = useForm<TaskFormData>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: { taskTitle: "", taskDuration: 25 },
  });

  const { handleSubmit, watch, reset } = taskForm;
  const taskTitle = watch("taskTitle");

  useEffect(() => {
    reset({
      taskTitle: activeCycle?.taskTitle || "",
      taskDuration: activeCycle?.taskDuration || 25,
    });
  }, [activeCycle, reset]);

  function handleCreateCycle({ taskTitle, taskDuration }: TaskFormData) {
    createNewCycle(taskTitle, taskDuration);
    reset();
  }

  function handleStopCycle() {
    stopCurrentCycle();
    reset();
  }

  return (
    <HomeWrapper>
      <form onSubmit={handleSubmit(handleCreateCycle)}>
        <FormProvider {...taskForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <StopButton type="button" onClick={handleStopCycle}>
            <HandPalm size={24} />
            Stop
          </StopButton>
        ) : (
          <StartButton type="submit" disabled={!taskTitle}>
            <Play size={24} />
            Start
          </StartButton>
        )}
      </form>
    </HomeWrapper>
  );
}
