import { Scroll, Timer } from "phosphor-react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";

import logo from "@/assets/logo.svg";
import { HeaderContainer } from "@/components/Header/Header.styles";
import { CyclesContext } from "@/contexts/cycles/CyclesContext";

export function Header() {
  const { activeCycle } = useContext(CyclesContext);

  return (
    <HeaderContainer $hidden={!!activeCycle}>
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
