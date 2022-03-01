import { Flex } from '@heyui/component'
import { alpha } from '@hpnp/utils/color'
import { FC } from 'react'
import styled from 'styled-components'
import { UploadCloudIcon } from '../components'
import { BlockProps, QuestionBlock } from './Block'

const Children = () => (
  <Container column={true} align="center" justify="center" contentEditable={false}>
    <SUploadCloudIcon />
    <OpenDialogButton>Select File</OpenDialogButton>
    <UploadMark>
      <p>Click to upload a file or drag file here.</p>
      <p>Size limit: 10MB</p>
    </UploadMark>
  </Container>
)

export const FileUpload: FC<BlockProps> = props => {
  return (
    <QuestionBlock {...props}>
      <Children />
    </QuestionBlock>
  )
}

const Container = styled(Flex)`
  padding: 48px 24px;
  border: 1px dashed ${props => alpha(props.theme.answer, 0.3)};
  box-shadow: 0 2px 4px ${props => alpha(props.theme.answer, 0.05)};
`

const SUploadCloudIcon = styled(UploadCloudIcon)`
  color: ${props => alpha(props.theme.answer, 0.3)};
`

const OpenDialogButton = styled.div`
  margin-top: 24px;
  margin-bottom: 12px;
  width: 160px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  border-radius: 2px;
  font-size: ${props => props.theme.answerFontSize};
  color: ${props => props.theme.buttonText};
  background: ${props => props.theme.button};

  &:hover {
    background: ${props => props.theme.button};
  }

  &:active {
    background: ${props => props.theme.button};
  }
`

const UploadMark = styled.div`
  margin-top: 12px;
  font-size: ${props => props.theme.smallFontSize};
  color: ${props => alpha(props.theme.answer, 0.3)};

  p {
    margin: 0 0 8px 0;
    text-align: center;

    &:nth-of-type(1) {
      font-size: ${props => props.theme.answerFontSize};
    }
  }
`
