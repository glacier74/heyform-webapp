import { helper, removeObjectNil } from '@heyform-inc/utils'
import { FC, ImgHTMLAttributes, SyntheticEvent, useMemo, useState } from 'react'

import { cn, getDecoratedURL } from '@/utils'

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  resize?: {
    width?: number
    height?: number
  }
}

interface BackgroundProps extends ComponentProps {
  as?: Any
  src?: string
  resize?: {
    width?: number
    height?: number
  }
}

const Background: FC<BackgroundProps> = ({
  as: Tag = 'div',
  className,
  src: rawSrc,
  resize = {},
  children,
  style,
  ...restProps
}) => {
  const { width, height } = resize

  const src = useMemo(() => {
    if (!helper.isURL(rawSrc)) {
      return
    }

    if (helper.isNumber(width) || helper.isNumber(height)) {
      return getDecoratedURL(
        rawSrc as string,
        removeObjectNil({
          w: width,
          h: height
        })
      )
    }

    return rawSrc
  }, [rawSrc, height, width])

  return (
    <Tag
      className={className}
      style={{
        ...style,
        backgroundImage: src ? `url(${src})` : undefined
      }}
      {...restProps}
    >
      {children}
    </Tag>
  )
}

const ImageComponent: FC<ImageProps> = ({
  className,
  src: rawSrc,
  resize = {},
  onLoad,
  onError,
  ...restProps
}) => {
  const [isLoaded, setLoaded] = useState(false)
  const { width, height } = resize

  const src = useMemo(() => {
    if (!helper.isURL(rawSrc)) {
      return
    }

    if (helper.isNumber(width) || helper.isNumber(height)) {
      return getDecoratedURL(
        rawSrc as string,
        removeObjectNil({
          w: width,
          h: height
        })
      )
    }

    return rawSrc
  }, [rawSrc, height, width])

  function handleLoad(event: SyntheticEvent<HTMLImageElement, Event>) {
    setLoaded(true)
    onLoad?.(event)
  }

  function handleError(event: SyntheticEvent<HTMLImageElement, Event>) {
    setLoaded(false)
    onError?.(event)
  }

  return (
    <img
      className={cn('bg-accent object-cover data-[loaded]:bg-transparent', className)}
      data-loaded={isLoaded ? '' : undefined}
      src={src}
      onLoad={handleLoad}
      onError={handleError}
      {...restProps}
    />
  )
}

export const Image = Object.assign(ImageComponent, {
  Background
})
