import { UnsplashService } from '@/service'
import { ComponentProps, Flex, message } from '@heyui/component'
import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Skeleton } from '../Skeleton'
import { SearchInput } from './SearchInput'

interface UnsplashPickerProps extends ComponentProps {
  onChange: (src: string) => void
}

const UnsplashPickerSkeleton: FC = () => {
  const arrays = Array.from({ length: 12 })

  return (
    <ListContainer>
      <ImageList>
        {arrays.map((_, index) => (
          <ImageItem key={index}>
            <ImageContainer>
              <Skeleton.Bar height={90} />
            </ImageContainer>
          </ImageItem>
        ))}
      </ImageList>
    </ListContainer>
  )
}

export const UnsplashPicker: FC<UnsplashPickerProps> = ({ onChange, ...restProps }) => {
  const [images, setImages] = useState<any[]>([])
  const [keyword, setKeyword] = useState<string>()
  const [loading, setLoading] = useState(false)

  function handleClick(row: any) {
    onChange(row.url)
    UnsplashService.trackDownload(row.downloadUrl)
  }

  async function handleFetch() {
    if (loading) {
      return
    }

    setLoading(true)

    try {
      const result = await UnsplashService.search(keyword)
      setImages(result)
    } catch (err: any) {
      message.error('Failed to load unsplash images')
    }

    setLoading(false)
  }

  useEffect(() => {
    handleFetch()
  }, [keyword])

  return (
    <Container column={true} {...restProps}>
      <SearchInput
        placeholder="Search free high-resolution photos from Unsplash"
        onChange={setKeyword}
      />
      {loading ? (
        <UnsplashPickerSkeleton />
      ) : (
        <ListContainer>
          <ImageList>
            {images.map(row => (
              <ImageItem key={row.id} onClick={() => handleClick(row)}>
                <ImageContainer>
                  <img src={row.thumbUrl} />
                  <ImageLink href={row.authorUrl}>{row.author}</ImageLink>
                </ImageContainer>
              </ImageItem>
            ))}
          </ImageList>
        </ListContainer>
      )}
    </Container>
  )
}

const Container = styled(Flex)`
  height: 400px;

  ul,
  li {
    list-style: none;
  }
`

const ListContainer = styled.div`
  flex: 1;
  overflow: auto;
  padding-left: 10px;
  padding-right: 10px;
`

const ImageList = styled.ul`
  display: flex;
  flex-flow: row wrap;
  align-items: stretch;
  flex: 1;
  margin: 0;
  padding: 0;
`

const ImageItem = styled.li`
  width: auto;
  flex: 0 0 25%;
  padding: 0 10px;
  margin: 0 0 20px 0;
  cursor: pointer;
`

const ImageContainer = styled.div`
  position: relative;
  height: 94px;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    aspect-ratio: 1.6;
    background: #f1f1f1;
    border-radius: 4px;
  }

  &:hover {
    a {
      display: inline-block;
    }
  }
`

const ImageLink = styled.a`
  display: none;
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 2px 4px;
  font-size: 12px;
  color: #fff;

  &:hover {
    text-decoration: underline;
  }
`
