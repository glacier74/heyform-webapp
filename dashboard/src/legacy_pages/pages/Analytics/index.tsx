import { FC } from 'react'
import styled from 'styled-components'
import { ResultNavbar } from './views/ResultNavbar'
import { Summary } from './views/Summary'

const Analytics: FC = () => {
  return (
    <>
      <ResultNavbar
        style={{
          width: 1044
        }}
      />
      <Container>
        <Summary />
      </Container>
    </>
  )
}

const Container = styled.div`
  width: 1044px;
  margin-left: auto;
  margin-right: auto;
`

export default Analytics
