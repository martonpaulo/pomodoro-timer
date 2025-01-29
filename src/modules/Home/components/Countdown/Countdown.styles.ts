import styled from "styled-components";

export interface CountdownContainerProps {
  $hidden: boolean;
}

export const CountdownContainer = styled.div<CountdownContainerProps>`
  font-family: "Roboto Mono", monospace;
  font-size: 10rem;
  line-height: 8rem;
  color: ${(props) => props.theme["gray-100"]};

  display: flex;

  gap: 1rem;

  ${(props) => props.theme["only-small-screen"]} {
    font-size: 5.5rem;
    line-height: 3rem;
    gap: 0;

    display: ${(props) => (props.$hidden ? "none" : "flex")};
  }

  ${(props) => props.theme["only-medium-screen"]} {
    font-size: 7.5rem;
    line-height: 5.5rem;
    gap: 0.5rem;
  }

  span {
    background: ${(props) => props.theme["gray-700"]};
    padding: 2rem 1rem;
    border-radius: 8px;
    display: flex;
    align-items: center;

    ${(props) => props.theme["only-small-screen"]} {
      background: transparent;
      padding: 0;
    }

    ${(props) => props.theme["only-medium-screen"]} {
      padding: 0.5rem;
    }
  }
`;

export const Separator = styled.div`
  padding: 1.5rem;
  color: ${(props) => props.theme["purple-500"]};

  width: 4rem;
  overflow: hidden;
  display: flex;
  justify-content: center;

  ${(props) => props.theme["smaller-than-large-screen"]} {
    width: 1rem;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;
