import { differenceInMilliseconds, formatDistanceToNow } from "date-fns";
import { useContext } from "react";

import { CyclesContext } from "@/contexts/cycles/CyclesContext";
import {
  HistoryContainer,
  HistoryList,
  Status,
} from "@/modules/History/History.styles";

export function History() {
  const { cycles } = useContext(CyclesContext);

  const sortedCycles = [...cycles].sort((a, b) => {
    const aDistance = differenceInMilliseconds(
      new Date(),
      new Date(a.startDate)
    );
    const bDistance = differenceInMilliseconds(
      new Date(),
      new Date(b.startDate)
    );
    return aDistance - bDistance;
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
              <th>Start</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {sortedCycles.map((cycle) => (
              <tr key={cycle.id}>
                <td>{cycle.task}</td>
                <td>{cycle.minutesAmount} minutes</td>
                <td>
                  {formatDistanceToNow(new Date(cycle.startDate), {
                    addSuffix: true,
                  })}
                </td>
                <td>
                  {cycle.stopDate && (
                    <Status $statusColor="green">Completed</Status>
                  )}

                  {!cycle.stopDate && cycle.pauseDate && (
                    <Status $statusColor="red">Paused</Status>
                  )}

                  {!cycle.stopDate && !cycle.pauseDate && (
                    <Status $statusColor="yellow">In progress</Status>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
}
