import { FC } from 'react'
import { ResultNavbar } from './views/ResultNavbar'
import { Summary } from './views/Summary'

const Analytics: FC = () => {
  return (
    <>
      <ResultNavbar />
      <div className="container max-w-5xl mx-auto">
        <Summary />
      </div>
    </>
  )
}

export default Analytics
