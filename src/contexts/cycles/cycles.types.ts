export interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  pauseDate?: Date;
  stopDate?: Date;
}

export interface CyclesState {
  cycles: Cycle[];
  activeCycleId: string | null;
}
