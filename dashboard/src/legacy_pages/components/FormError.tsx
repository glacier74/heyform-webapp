import { ComponentProps, FormItemError } from '@heyui/component'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

interface FormErrorProps extends ComponentProps {
  error: Error
}

export const FormError: FC<FormErrorProps> = ({ error, ...restProps }) => {
  const { t } = useTranslation()

  return (
    <Container {...restProps}>
      <StyledFormItemError>{t(error.message)}</StyledFormItemError>
    </Container>
  )
}

const StyledFormItemError = styled(FormItemError)`
  bottom: 4px;
`

const Container = styled.div`
  position: relative;
  margin-top: -24px;
  padding-bottom: 24px;
`
