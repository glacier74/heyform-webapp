import { ComponentProps, resizeImage } from '@heyui/component'
import { FC } from 'react'
import styled from 'styled-components'

interface FormCoverProps extends ComponentProps {
  sourceUrl: string
  width?: number
  height?: number
}

export const FormCover: FC<FormCoverProps> = ({ sourceUrl, width, height, ...restProps }) => {
  const imageUrl = resizeImage({
    url: sourceUrl,
    width,
    height
  })

  return (
    <Container
      {...restProps}
      style={{
        backgroundImage: `url(${imageUrl})`
      }}
    />
  )
}

const Container = styled.div`
  height: 200px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`
