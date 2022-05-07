import { ComponentProps } from '@heyui/component'
import type { FC } from 'react'
import { NavLink, NavLinkProps } from 'react-router-dom'
import styled from 'styled-components'

interface TabNavProps extends ComponentProps {
  links: NavLinkProps[]
}

export const TabNav: FC<TabNavProps> = ({ links }) => {
  return (
    <Container>
      {links.map((row, index) => (
        <NavLink key={index} {...row}>
          {row.title}
        </NavLink>
      ))}
    </Container>
  )
}

const Container = styled.div`
  margin-top: 60px;
  margin-bottom: 40px;
  border-bottom: 1px solid #f3f3f3;

  a {
    display: inline-block;
    margin-bottom: -1px;
    margin-right: 36px;
    padding-bottom: 22px;
    color: #4e5d78;
    font-weight: 500;
    border-bottom: 1px solid transparent;

    &:hover {
      color: #4e5d78;
    }

    &.active {
      color: #0252d7;
      border-bottom-color: #0252d7;
    }
  }
`
