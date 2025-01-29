import { formatDistanceToNow } from "date-fns";
import { useContext } from "react";

import { CycleStatus } from "@/contexts/cycles/cycles.types";
import { CyclesContext } from "@/contexts/cycles/CyclesContext";
import {
  Card,
  CardItem,
  CardsContainer,
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
              <th>Task name</th>
              <th>Duration</th>
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

      <CardsContainer>
        {sortedCycles.map((cycle) => (
          <Card key={cycle.id}>
            <CardItem>
              <strong>Task</strong> <span>{cycle.taskName}</span>
            </CardItem>
            <CardItem>
              <strong>Duration</strong>{" "}
              <span>{cycle.durationMinutes} minutes</span>
            </CardItem>
            <CardItem>
              <strong>Started</strong>
              <span>
                {formatDistanceToNow(new Date(cycle.startDate), {
                  addSuffix: true,
                })}
              </span>
            </CardItem>
            <CardItem>
              <strong>Status</strong>
              <Status $color={cycleStatusMap[cycle.status].color}>
                {cycleStatusMap[cycle.status].text}
              </Status>
            </CardItem>
          </Card>
        ))}
      </CardsContainer>
    </HistoryContainer>
  );
}
