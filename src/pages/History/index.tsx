import { formatDistanceToNow } from "date-fns";
import { useContext } from "react";

import { CyclesContext } from "@/contexts/CyclesContext";
import { HistoryContainer, HistoryList, Status } from "@/pages/History/styles";

export function History() {
  const { cycles } = useContext(CyclesContext);

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
            {cycles.map((cycle) => (
              <tr key={cycle.id}>
                <td>{cycle.task}</td>
                <td>{cycle.minutesAmount} minutes</td>
                <td>
                  {formatDistanceToNow(cycle.startDate, {
                    addSuffix: true,
                  })}
                </td>
                <td>
                  {cycle.stopDate && (
                    <Status statusColor="green">Completed</Status>
                  )}

                  {!cycle.stopDate && cycle.pauseDate && (
                    <Status statusColor="red">Paused</Status>
                  )}

                  {!cycle.stopDate && !cycle.pauseDate && (
                    <Status statusColor="yellow">In progress</Status>
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
