import styled from "styled-components";

export const FormWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  color: ${(props) => props.theme["gray-100"]};
  font-size: 1.25rem;
  font-weight: bold;
  flex-wrap: wrap;
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
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  align-self: center;
  border-bottom: 2px solid ${(props) => props.theme["gray-500"]};

  &:focus-within {
    border-color: ${(props) => props.theme["purple-500"]};
  }
`;

export const MinutesInput = styled(BaseInput)`
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

const BaseButton = styled.button`
  background: transparent;
  border: 0;
  box-shadow: none;
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

export const DecreaseButton = styled(BaseButton)``;

export const IncreaseButton = styled(BaseButton)``;
