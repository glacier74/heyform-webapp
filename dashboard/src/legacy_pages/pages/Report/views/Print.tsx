import { Flex } from '@heyui/component'
import { PrinterIcon } from '@heyui/icon'
import { FC } from 'react'
import styled from 'styled-components'

export const Print: FC = () => {
  function handleClick() {
    window.print()
  }

  return (
    <Container role="button" ariaLabel="Print Report" align="center" onClick={handleClick}>
      <StyledPrinterIcon />
      Print
    </Container>
  )
}

const Container = styled(Flex)`
  cursor: pointer;

  @media print {
    display: none;
  }
`

const StyledPrinterIcon = styled(PrinterIcon)`
  width: 20px;
  height: 20px;
  margin-right: 8px;
  color: ${props => props.theme.description};
`
