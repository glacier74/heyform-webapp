import { UnsplashService } from '@/service'
import { UnsplashImage } from '@heyforms/shared-types-enums'
import { message, Spin } from '@heyui/component'
import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Loader } from '../Loader'
import { SearchInput } from './SearchInput'

interface UnsplashPickerProps {
  onSelect: (src: string) => void
}

interface ImageItemProps {
  image: UnsplashImage
  onClick: (src: string) => void
}

const ImageItem: FC<ImageItemProps> = ({ image, onClick }) => {
  function handleClick() {
    onClick(image.url)
    UnsplashService.trackDownload(image.downloadUrl)
  }

  return (
    <ImageContainer>
      <ImageBox onClick={handleClick}>
        <img src={image.thumbUrl} alt="" />
      </ImageBox>
      <ImageLink href={image.authorUrl}>{image.author}</ImageLink>
    </ImageContainer>
  )
}

export const UnsplashPicker: FC<UnsplashPickerProps> = ({ onSelect }) => {
  const [keyword, setKeyword] = useState<string>()
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState<any[]>([])

  async function getImages() {
    if (loading) {
      return
    }

    setLoading(true)

    try {
      const result = await UnsplashService.search(keyword)
      setImages(result)
    } catch (_) {
      message.error('Failed to load unsplash images')
    }

    setLoading(false)
  }

  function handleSearchChange(keyword: string) {
    setKeyword(keyword)
  }

  useEffect(() => {
    getImages()
  }, [keyword])

  return (
    <Container>
      <SearchInput placeholder="Search unsplash images" onChange={handleSearchChange} />
      {loading ? (
        <SpinContainer>
          <Spin />
        </SpinContainer>
      ) : (
        <ImageList>
          {images.map(row => (
            <ImageItem key={row.id} image={row} onClick={onSelect} />
          ))}
        </ImageList>
      )}
    </Container>
  )
}

const Container = styled.div`
  padding: 0 20px 20px 20px;
  height: 540px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`

const SpinContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  svg {
    width: 20px;
    height: 20px;
  }
`

const ImageList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: stretch;
  margin-top: 20px;
  margin-left: -10px;
  margin-right: -10px;
`

const ImageContainer = styled.div`
  width: auto;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 50%;
  padding: 0 10px;
  margin-bottom: 20px;
`

const ImageBox = styled.div`
  position: relative;
  cursor: pointer;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    aspect-ratio: 1.6;
    background: #f1f1f1;
    transition: opacity 0.3s;
  }

  &:hover {
    img {
      opacity: 0.8;
    }
  }
`

const ImageLink = styled.a`
  font-size: 12px;
  color: #b0b7c3;
  text-decoration: underline;
`

const StyledLoader = styled(Loader)`
  background-color: rgba(0, 0, 0, 0.3);
  color: #fff;
`
