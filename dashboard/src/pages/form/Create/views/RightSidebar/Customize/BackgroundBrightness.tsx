import { Slider } from '@heyforms/ui'
import type { FC } from 'react'

interface BackgroundBrightnessProps {
  backgroundImage?: string
  value?: number
  onChange?: (value?: number) => void
}

export const BackgroundBrightness: FC<BackgroundBrightnessProps> = ({
  backgroundImage,
  value,
  onChange
}) => {
  function handleChange(newValue: any) {
    onChange?.(newValue)
  }

  return (
    <div className="background-brightness flex items-end justify-between">
      <img className="background-brightness-image" src={backgroundImage} />
      <div className="flex-1 ml-4">
        <div className="mb-2">Brightness</div>
        <Slider min={-100} max={100} value={value} onChange={handleChange} />
      </div>
    </div>
  )
}
