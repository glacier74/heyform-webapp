import { FakeSubmit } from '@/pages/form/Create/views/Compose/FakeSubmit'
import { ChevronRightIcon, UploadIcon } from '@heroicons/react/outline'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import type { BlockProps } from './Block'
import { Block } from './Block'

export const FileUpload: FC<BlockProps> = ({ field, ...restProps }) => {
  const { t } = useTranslation()

  return (
    <Block className="builder-file-upload" field={field} {...restProps}>
      <div className="builder-file-uploader">
        <div className="builder-upload-wrapper">
          <UploadIcon className="builder-upload-icon non-scaling-stroke" />
          <div className="mt-8">{t('formBuilder.clickUpload')}</div>
          <div className="builder-upload-size-limit">{t('formBuilder.sizeLimit')}</div>
        </div>
      </div>
      <FakeSubmit text={t('Next')} icon={<ChevronRightIcon />} />
    </Block>
  )
}
