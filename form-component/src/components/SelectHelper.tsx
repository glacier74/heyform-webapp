import type { FC } from 'react'

interface SelectHelperProps {
  min: number
  max: number
}

export const SelectHelper: FC<SelectHelperProps> = ({ min = 0, max = 0 }) => {
  if (max === 1 || (min === max && min === 0)) {
    return null
  }

  if (min === 0) {
    return <div className="heyform-select-helper">Choose up to {max} choices</div>
  } else {
    if (max === 0) {
      return <div className="heyform-select-helper">Choose at least {min} choices</div>
    }
  }

  if (max === min) {
    return <div className="heyform-select-helper">Choose {max} choices</div>
  }

  return (
    <div className="heyform-select-helper">
      Choose between {min} to {max} choices
    </div>
  )
}
