import styled from "styled-components";

export interface HeaderContainerProps {
  $hidden: boolean;
}

export const HeaderContainer = styled.header<HeaderContainerProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${(props) => props.theme["only-small-screen"]} {
    display: ${(props) => (props.$hidden ? "none" : "flex")};
  }

  ${(props) => props.theme["smaller-than-large-screen"]} {
    img {
      display: none;
    }
  }

  nav {
    display: flex;
    gap: 0.5rem;

    ${(props) => props.theme["smaller-than-large-screen"]} {
      width: 100%;
      gap: 1rem;
      justify-content: center;
      align-items: center;
      align-content: center;
    }

    a {
      width: 3rem;
      height: 3rem;

      display: flex;
      align-items: center;
      justify-content: center;

      color: ${(props) => props.theme["gray-100"]};

      border-top: 3px solid transparent;
      border-bottom: 3px solid transparent;

      cursor: pointer;

      &:hover {
        border-bottom: 3px solid ${(props) => props.theme["purple-500"]};
      }

      &.active {
        color: ${(props) => props.theme["purple-500"]};
      }
    }
  }
`;
