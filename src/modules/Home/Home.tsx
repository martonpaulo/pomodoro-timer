import { zodResolver } from "@hookform/resolvers/zod";
import { HandPalm, Play } from "phosphor-react";
import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as zod from "zod";

import { CyclesContext } from "@/contexts/cycles/CyclesContext";
import { Countdown } from "@/modules/Home/components/Countdown/Countdown";
import { NewCycleForm } from "@/modules/Home/components/NewCycleForm/NewCycleForm";
import {
  HomeContainer,
  PauseCountdownButton,
  StartCountdownButton,
} from "@/modules/Home/Home.styles";

const cycleFormValidationSchema = zod.object({
  taskName: zod.string().min(1, "Task name is required"),
  durationMinutes: zod
    .number()
    .min(5, "Minimum duration is 5 minutes")
    .max(60, "Maximum duration is 60 minutes"),
});

type CycleFormData = zod.infer<typeof cycleFormValidationSchema>;

export function Home() {
  const { activeCycle, createNewCycle, pauseCurrentCycle } =
    useContext(CyclesContext);

  const cycleForm = useForm<CycleFormData>({
    resolver: zodResolver(cycleFormValidationSchema),
    defaultValues: {
      taskName: "",
      durationMinutes: 25,
    },
  });

  const { handleSubmit, watch, reset } = cycleForm;

  function handleCycleCreation(formData: CycleFormData) {
    createNewCycle(formData.taskName, formData.durationMinutes);
  }

  function handleCyclePause() {
    pauseCurrentCycle();
    reset();
  }

  const taskName = watch("taskName");
  const isStartButtonDisabled = !taskName;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCycleCreation)}>
        <FormProvider {...cycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <PauseCountdownButton type="button" onClick={handleCyclePause}>
            <HandPalm size={24} />
            Stop
          </PauseCountdownButton>
        ) : (
          <StartCountdownButton type="submit" disabled={isStartButtonDisabled}>
            <Play size={24} />
            Start
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
}
