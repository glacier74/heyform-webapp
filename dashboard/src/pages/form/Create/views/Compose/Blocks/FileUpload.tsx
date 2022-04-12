import { UploadIcon } from '@heroicons/react/outline'
import type { FC } from 'react'
import type { BlockProps } from './Block'
import { Block } from './Block'

export const FileUpload: FC<BlockProps> = ({ field, ...restProps }) => {
  return (
    <Block className="heyform-file-upload" field={field} {...restProps}>
      <div className="heyform-file-uploader">
        <div className="heyform-upload-wrapper">
          <UploadIcon className="heyform-upload-icon non-scaling-stroke" />
          <div className="mt-8">
            <span>Click to upload a file</span> or drag file here.
          </div>
          <div className="heyform-upload-size-limit">Size limit: 10MB</div>
        </div>
      </div>
    </Block>
  )
}
