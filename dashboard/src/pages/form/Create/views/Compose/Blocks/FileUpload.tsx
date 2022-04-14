import { FakeSubmit } from '@/pages/form/Create/views/Compose/FakeSubmit'
import { ChevronRightIcon, UploadIcon } from '@heroicons/react/outline'
import type { FC } from 'react'
import type { BlockProps } from './Block'
import { Block } from './Block'

export const FileUpload: FC<BlockProps> = ({ field, ...restProps }) => {
  return (
    <Block className="builder-file-upload" field={field} {...restProps}>
      <div className="builder-file-uploader">
        <div className="builder-upload-wrapper">
          <UploadIcon className="builder-upload-icon non-scaling-stroke" />
          <div className="mt-8">
            <span>Click to upload a file</span> or drag file here.
          </div>
          <div className="builder-upload-size-limit">Size limit: 10MB</div>
        </div>
      </div>
      <FakeSubmit text="Next" icon={<ChevronRightIcon />} />
    </Block>
  )
}
