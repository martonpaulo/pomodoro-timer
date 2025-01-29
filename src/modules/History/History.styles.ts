import styled from "styled-components";

export const HistoryContainer = styled.main`
  flex: 1;
  padding: 3.5rem;
  display: flex;
  flex-direction: column;

  ${(props) => props.theme["only-small-screen"]} {
    padding: 3.5rem 0;
  }

  h1 {
    font-size: 1.5rem;
    color: ${(props) => props.theme["gray-100"]};
  }
`;

export const HistoryList = styled.div`
  flex: 1;
  overflow: auto;
  margin-top: 2rem;

  table {
    width: 100%;
    min-width: 600px;
    border-collapse: collapse;

    th,
    td {
      padding: 1rem;
      line-height: 1.6rem;
      text-align: center;
    }

    th {
      background-color: ${(props) => props.theme["gray-600"]};
      color: ${(props) => props.theme["gray-100"]};
      font-size: 1rem;

      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 1.5rem;
        text-align: left;
      }

      &:last-child {
        border-top-right-radius: 8px;
        padding-right: 1.5rem;
      }
    }

    td {
      background: ${(props) => props.theme["gray-700"]};
      border-top: 4px solid ${(props) => props.theme["gray-800"]};
      color: ${(props) => props.theme["gray-100"]};
      font-size: 0.875rem;

      &:first-child {
        width: 35%;
        padding-left: 1.5rem;
        text-align: left;
        border-radius: 4px 0 0 4px;
      }

      &:last-child {
        padding-right: 1.5rem;
        border-radius: 0 4px 4px 0;
      }
    }
  }

  ${(props) => props.theme["smaller-than-large-screen"]} {
    table {
      display: none;
    }
  }
`;

const STATUS_COLORS = {
  yellow: "yellow-500",
  red: "red-500",
  green: "green-500",
} as const;

export interface StatusProps {
  $color: keyof typeof STATUS_COLORS;
}

export const Status = styled.span<StatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  ${(props) => props.theme["only-large-screen"]} {
    justify-content: center;
  }

  &::before {
    content: "";
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: ${(props) => props.theme[STATUS_COLORS[props.$color]]};
  }
`;

export const CardsContainer = styled.div`
  display: none;

  ${(props) => props.theme["smaller-than-large-screen"]} {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

export const Card = styled.div`
  background: ${(props) => props.theme["gray-700"]};
  padding: 1.5rem;
  border-radius: 8px;
  border: 2px solid ${(props) => props.theme["gray-600"]};
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  strong {
    color: ${(props) => props.theme["gray-100"]};
    font-size: 1rem;
  }

  span {
    color: ${(props) => props.theme["gray-300"]};
    font-size: 0.875rem;
  }
`;

export const CardItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  ${(props) => props.theme["only-small-screen"]} {
    flex-direction: column;
    align-items: start;
  }
`;
