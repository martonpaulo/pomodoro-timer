import styled from "styled-components";

export type ButtonVariant = "primary" | "secondary" | "danger" | "success";

interface ButtonContainerProps {
  variant: ButtonVariant;
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 40px;
  border-radius: 4px;
  border: 0;
  margin: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  background-color: ${(props) => props.theme[props.variant]};
  color: ${(props) => props.theme.white};
`;
