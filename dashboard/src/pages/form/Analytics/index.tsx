import { FC } from 'react'

import Report from './views/Report'
import Summary from './views/Summary'

const Analytics: FC = () => {
  return (
    <div className="form-content-container">
      <div className="container mx-auto max-w-5xl pt-14">
        <Summary />
        <Report />
      </div>
    </div>
  )
}

export default Analytics
