import { Scroll, Timer } from "phosphor-react";
import { NavLink } from "react-router-dom";

import logo from "@/assets/logo.svg";
import { HeaderContainer } from "@/components/Header/styles";

export function Header() {
  return (
    <HeaderContainer>
      <img
        src={logo}
        alt="Logo with a modern abstract design in shades of purple, featuring layered angular shapes with varying opacity, creating depth and dynamic composition."
      />
      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="History">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  );
}
