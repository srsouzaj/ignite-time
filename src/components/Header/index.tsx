import { HeaderContainer } from './style'
import { Scroll, Timer } from 'phosphor-react'

import { NavLink } from 'react-router-dom'
import LogoIcon from '../../assets/Logo.icon'

export function Header() {
  return (
    <HeaderContainer>
      <LogoIcon />

      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="Histórico">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
