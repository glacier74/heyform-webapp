import { Avatar, AvatarProps, message, Uploader } from '@heyui/component'
import { FC, useState } from 'react'
import styled from 'styled-components'

interface ImageUploaderProps extends AvatarProps {
  request: (file: File) => Promise<any>
  onError?: (err: Error) => void
}

export const ImageUploader: FC<ImageUploaderProps> = ({
  image,
  text,
  width = 64,
  height = 64,
  fit = 'cover',
  request,
  onError
}) => {
  const [loading, setLoading] = useState(false)

  async function handleRequest(file: File) {
    if (loading) {
      return
    }

    setLoading(true)

    try {
      await request(file)
    } catch (err: any) {
      console.error(err)
      message.error('Failed to upload the image')
    }

    setLoading(false)
  }

  return (
    <Container>
      <Avatar
        image={image}
        text={text}
        width={width}
        height={height}
        imageWidth={width * 2}
        imageHeight={height * 2}
        fit={fit}
        round={true}
      />
      <StyledUploader
        accept={['image/png', 'image/jpeg', 'image/bmp']}
        maxSize="1MB"
        request={handleRequest}
        disabled={loading}
        onError={onError}
      >
        Upload
      </StyledUploader>
    </Container>
  )
}

const StyledUploader = styled(Uploader)`
  position: absolute;
  display: none;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  text-align: center;
  color: #fff;
  line-height: 64px;
  transition: all 150ms;
  cursor: pointer;
`

const Container = styled.div`
  position: relative;
  display: inline-block;

  &:hover {
    ${StyledUploader} {
      display: block;
    }
  }
`
