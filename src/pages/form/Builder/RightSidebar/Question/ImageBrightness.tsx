import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { Image, Slider } from '@/components'

export interface ImageBrightnessProps {
  imageURL?: string
  value?: Any
  onChange?: (value?: Any) => void
}

const ImageBrightness: FC<ImageBrightnessProps> = ({ imageURL, value, onChange }) => {
  const { t } = useTranslation()

  function handleChange(newValue: number) {
    onChange?.(newValue)
  }

  return (
    <div className="flex items-end justify-between gap-x-4">
      <Image className="h-12 w-12 rounded-md object-cover" src={imageURL} />
      <div className="flex-1">
        <div className="mb-1 text-sm/6">{t('form.builder.settings.brightness')}</div>
        <Slider min={-100} max={100} value={value} onChange={handleChange} />
      </div>
    </div>
  )
}

export default ImageBrightness
