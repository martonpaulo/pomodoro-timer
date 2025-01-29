import { formatDistanceToNow } from "date-fns";
import { useContext } from "react";

import { CycleStatus } from "@/contexts/cycles/cycles.types";
import { CyclesContext } from "@/contexts/cycles/CyclesContext";
import {
  HistoryContainer,
  HistoryList,
  Status,
} from "@/modules/History/History.styles";

const cycleStatusMap = {
  [CycleStatus.COMPLETED]: {
    color: "green",
    text: "Completed",
  },
  [CycleStatus.STOPPED]: {
    color: "red",
    text: "Stopped",
  },
  [CycleStatus.IN_PROGRESS]: {
    color: "yellow",
    text: "In progress",
  },
} as const;

export function History() {
  const { cycles } = useContext(CyclesContext);

  const sortedCycles = [...cycles].sort((a, b) => {
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });

  return (
    <HistoryContainer>
      <h1>History</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Length</th>
              <th>Started</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {sortedCycles.map((cycle) => (
              <tr key={cycle.id}>
                <td>{cycle.taskName}</td>
                <td>{cycle.durationMinutes} minutes</td>
                <td>
                  {formatDistanceToNow(new Date(cycle.startDate), {
                    addSuffix: true,
                  })}
                </td>
                <td>
                  <Status $color={cycleStatusMap[cycle.status].color}>
                    {cycleStatusMap[cycle.status].text}
                  </Status>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
}
