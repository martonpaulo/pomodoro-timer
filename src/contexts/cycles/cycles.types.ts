export enum CycleStatus {
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  STOPPED = "STOPPED",
}

export interface Cycle {
  id: string;
  taskTitle: string;
  taskDuration: number;
  startDate: Date;
  status: CycleStatus;
}

export interface CyclesState {
  cycles: Cycle[];
  activeCycleId: string | null;
}
