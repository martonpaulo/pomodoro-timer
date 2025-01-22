import { HistoryContainer, HistoryList, Status } from "@/pages/History/styles";

export function History() {
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
            {Array.from({ length: 20 }).map((_, index) => (
              <tr key={index}>
                <td>Task {index + 1}</td>
                <td>25 minutes</td>
                <td>2 days ago</td>
                <td>
                  <Status statusColor="green">Completed</Status>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
}
