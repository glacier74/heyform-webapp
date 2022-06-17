import { LogoIcon } from '@/legacy_pages/components/Icons'
import { Button, ComponentProps, Flex } from '@heyui/component'
import { ArrowLeftIcon, CloseIcon } from '@heyui/icon'
import { isValid } from '@hpnp/utils/helper'
import type { FC, ReactNode } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

interface NavBarProps {
  homeLink?: boolean
  navigateBackTitle?: string
  close?: boolean
  actions?: ReactNode
  onNavigateBack?: () => void
  onClose?: () => void
}

export const NavBar: FC<NavBarProps> = ({
  homeLink,
  navigateBackTitle,
  close,
  actions,
  onNavigateBack,
  onClose
}) => {
  function handleEscEvent(event: any) {
    if (close && event.keyCode === 27) {
      onClose && onClose()
    }
  }

  useEffect(() => {
    if (close) {
      document.addEventListener('keydown', handleEscEvent)
    }

    return () => {
      if (close) {
        document.removeEventListener('keydown', handleEscEvent)
      }
    }
  }, [close])

  return (
    <Wrapper className="navbar" align="center">
      {isValid(navigateBackTitle) ? (
        <NavigateBackButton icon={<ArrowLeftIcon />} onClick={onNavigateBack}>
          {navigateBackTitle!}
        </NavigateBackButton>
      ) : (
        <>
          {homeLink && (
            <HomeLink to="/">
              <LogoIcon />
            </HomeLink>
          )}
        </>
      )}
      <Flex auto={true} />
      {actions && actions}
      {close && (
        <CloseButton onClick={onClose}>
          <CloseIcon />
        </CloseButton>
      )}
    </Wrapper>
  )
}

const Wrapper = styled(Flex)`
  position: sticky;
  top: 0;
  height: 3.75rem;
  padding: 0 24px;
  background: #fff;
  z-index: 10;

  a {
    display: inline-block;
  }

  svg {
    width: auto;
  }

  a,
  svg {
    height: 24px;
  }
`

const HomeLink = styled(Link)`
  display: inline-block;

  svg {
    width: auto;
  }

  a,
  svg {
    height: 24px;
  }
`

const NavigateBackButton = styled(Button)`
  color: #4e5d78;
  border: none;
  background: transparent;
  padding: 0;

  svg {
    width: 24px;
    height: 24px;
  }

  &:hover {
    color: #0252d7;
  }
`

const CloseButton = styled(Button)`
  width: 32px;
  height: 32px;
  padding: 0 !important;
  border: none;
  border-radius: 8px;
  font-weight: 400;
  cursor: pointer;

  &:hover {
    background: #fafbfc;
  }

  svg {
    width: 24px;
    height: 24px;
    margin-right: 0;
  }
`

export const NavBarContainer: FC<NavBarProps & ComponentProps> = ({
  className,
  style,
  children,
  ...restProps
}) => {
  return (
    <Container className={className} style={style}>
      <NavBar {...restProps} />
      <Content className="content">{children}</Content>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
`

const Content = styled.div`
  width: 540px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 80px;
  padding-bottom: 100px;
`
