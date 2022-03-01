import { ComponentProps, Flex } from '@heyui/component'
import { alpha } from '@hpnp/utils/color'
import { FC, ReactNode } from 'react'
import styled from 'styled-components'

interface PseudoProps extends ComponentProps {
  contentEditable?: boolean
  icon?: ReactNode
}

export const PseudoInput: FC<PseudoProps> = ({
  contentEditable = false,
  children,
  ...restProps
}) => {
  return (
    <Container contentEditable={contentEditable} {...restProps}>
      {children}
    </Container>
  )
}

export const PseudoPrefixInput: FC<PseudoProps> = ({
  contentEditable = false,
  icon,
  children,
  ...restProps
}) => {
  return (
    <PrefixContainer contentEditable={contentEditable} {...restProps}>
      {icon || children}
    </PrefixContainer>
  )
}

export const PseudoSuffixInput: FC<PseudoProps> = ({
  contentEditable = false,
  icon,
  children,
  ...restProps
}) => {
  return (
    <SuffixContainer contentEditable={contentEditable} {...restProps}>
      {icon || children}
    </SuffixContainer>
  )
}

export const PseudoRadio: FC<PseudoProps> = ({
  contentEditable = false,
  children,
  ...restProps
}) => {
  return (
    <RadioContainer contentEditable={contentEditable} justify="flex-start" {...restProps}>
      <Radio />
      {children}
    </RadioContainer>
  )
}

export const PseudoCheckbox: FC<PseudoProps> = ({
  contentEditable = false,
  children,
  ...restProps
}) => {
  return (
    <RadioContainer contentEditable={contentEditable} justify="flex-start" {...restProps}>
      <Checkbox />
      {children}
    </RadioContainer>
  )
}

export const PseudoButton: FC<PseudoProps> = ({
  contentEditable = false,
  children,
  ...restProps
}) => {
  return (
    <ButtonContainer contentEditable={contentEditable} {...restProps}>
      {children}
    </ButtonContainer>
  )
}

const Checkbox = styled.div`
  margin-right: 8px;
  width: 16px;
  height: 16px;
  border: 1px solid ${props => alpha(props.theme.answer, 0.3)};
  border-radius: 2px;
`

const Container = styled(Flex)`
  width: 100%;
  height: 35px;
  padding: 8px;
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: ${({ theme }) => theme.answerFontSize};
  font-variant: normal;
  color: ${({ theme }) => theme.answer};
  line-height: 1.2857;
  font-weight: 500;
  background: transparent;
  border: 1px solid ${({ theme }) => alpha(theme.answer, 0.3)};
  border-radius: 4px;
  box-shadow: 0 2px 4px ${({ theme }) => alpha(theme.answer, 0.05)};
  outline: 0;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;
  transition: color 0.15s ease, border-color 0.15s ease;
  cursor: default;

  &::placeholder {
    color: ${({ theme }) => alpha(theme.answer, 0.3)};
  }
`

const PrefixContainer = styled(Container)`
  width: 320px;

  svg {
    width: 20px;
    height: 20px;
    color: ${({ theme }) => alpha(theme.answer, 0.3)};
  }
`

const SuffixContainer = styled(PrefixContainer)`
  flex-direction: row-reverse;
`

const RadioContainer = styled(Flex)``

const Radio = styled.div`
  margin-right: 8px;
  width: 16px;
  height: 16px;
  border: 1px solid ${({ theme }) => alpha(theme.answer, 0.3)};
  border-radius: 50%;
`

const ButtonContainer = styled.div`
  padding: 8px 20px;
  background: ${({ theme }) => theme.button};
  color: ${({ theme }) => theme.buttonText};
  border-radius: 4px;
`

export const PseudoTextarea = styled(PseudoInput)`
  width: 100%;
  height: 70px;
`
