import styled from "styled-components";

export const FormContainer = styled.div`
  color: ${(props) => props.theme["gray-100"]};
  font-size: 1.25rem;
  font-weight: bold;
`;

export interface TaskTitleProps {
  $hidden?: boolean;
}

export const TaskTitle = styled.h2<TaskTitleProps>`
  display: none;

  ${(props) => props.theme["only-small-screen"]} {
    text-align: center;
    display: ${(props) => (props.$hidden ? "none" : "flex")};
  }
`;

export interface InputGroupProps {
  $hidden?: boolean;
}

export const InputGroup = styled.div<InputGroupProps>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  flex-wrap: wrap;

  ${(props) => props.theme["only-small-screen"]} {
    flex-direction: column;
    width: auto;
    display: ${(props) => (props.$hidden ? "none" : "flex")};
  }
`;

const BaseInput = styled.input`
  background: transparent;
  height: 2.5rem;
  font-weight: bold;
  font-size: 1.25rem;
  padding: 0 0.5rem;
  color: ${(props) => props.theme["gray-100"]};
  text-align: center;

  &:disabled {
    cursor: not-allowed;
  }
`;

export const TaskInput = styled(BaseInput)`
  flex: 1;
  border: 0;
  border-bottom: 2px solid ${(props) => props.theme["gray-500"]};

  &:focus {
    box-shadow: none;
    border-color: ${(props) => props.theme["purple-500"]};
  }

  &::placeholder {
    color: ${(props) => props.theme["gray-500"]};
  }

  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }

  &:-webkit-autofill {
    transition: background-color 0s 999999s, color 0s 999999s !important;
  }

  ${(props) => props.theme["only-small-screen"]} {
    flex: unset;
  }
`;

export const TimerContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const TimerInputGroup = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 2px solid ${(props) => props.theme["gray-500"]};

  &:focus-within {
    border-color: ${(props) => props.theme["purple-500"]};
  }
`;

export const TimerInput = styled(BaseInput)`
  border: 0;
  box-shadow: none;

  &:focus {
    box-shadow: none;
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    appearance: none;
  }
`;

export const TimerButton = styled.button`
  background: transparent;
  border: 0;
  color: ${(props) => props.theme["gray-500"]};
  font-size: 1.25rem;
  font-weight: bold;
  cursor: pointer;

  &:focus {
    box-shadow: none;
  }

  &:disabled {
    cursor: unset;
    color: transparent;
  }
`;
