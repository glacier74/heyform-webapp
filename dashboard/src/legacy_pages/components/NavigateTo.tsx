import { ComponentProps } from '@heyui/component'
import { ArrowLeftIcon } from '@heyui/icon'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

interface NavigateToProps extends ComponentProps {
  to: string
  title?: string
}

export const NavigateTo: FC<NavigateToProps> = ({ to, title, ...restProps }) => {
  return (
    <Container>
      <Link to={to} {...restProps}>
        <ArrowLeftIcon />
        <span>{title}</span>
      </Link>
    </Container>
  )
}

const Container = styled.div`
  margin-top: 8px;
  margin-bottom: 12px;

  a {
    display: inline-flex;
    align-items: center;
    padding-right: 18px;
    color: ${props => props.theme.description};
    transition: color 200ms, transform 200ms;

    &:hover {
      color: ${props => props.theme.primary};
      transform: translateX(-18px);
    }
  }

  svg {
    margin-left: -2px;
    width: 18px;
    height: 18px;
  }

  span {
    margin-left: 4px;
  }
`
