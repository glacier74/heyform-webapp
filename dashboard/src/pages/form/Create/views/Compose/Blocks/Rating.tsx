import { RATING_SHAPE_CONFIG } from '@/pages/form/Create/consts'
import { Rate } from '@heyforms/ui'
import type { FC } from 'react'
import type { BlockProps } from './Block'
import { Block } from './Block'

export const Rating: FC<BlockProps> = ({ field, ...restProps }) => {
  function characterRender(index: number) {
    return (
      <>
        {RATING_SHAPE_CONFIG[field.properties?.shape || 'star']}
        <span className="builder-rate-index">{index}</span>
      </>
    )
  }

  return (
    <Block className="builder-rating" field={field} {...restProps}>
      <Rate count={field.properties?.total || 5} itemRender={characterRender} />
    </Block>
  )
}
