import { Rate } from '@heyforms/ui'
import type { FC, ReactNode } from 'react'
import { CrownIcon, EmotionIcon, FormField, LikeIcon, StarIcon, ThumbsUpIcon } from '../components'
import { useStore } from '../store'
import type { BlockProps } from './Block'
import { Block } from './Block'
import { Form } from './Form'

const ICON_MAPS: IMapType<ReactNode> = {
  heart: <LikeIcon />,
  thumb_up: <ThumbsUpIcon />,
  happy: <EmotionIcon />,
  Crown: <CrownIcon />,
  star: <StarIcon />
}

function getShape(shape?: string) {
  let name = 'start'

  if (shape && Object.keys(ICON_MAPS).includes(shape)) {
    name = shape
  }

  return name
}

export const Rating: FC<BlockProps> = ({ field, ...restProps }) => {
  const { state } = useStore()
  const shape = getShape(field.properties?.shape)

  function getValues(values: any) {
    return values.input
  }

  function characterRender(index: number) {
    return (
      <>
        {ICON_MAPS[shape]}
        <span className="heyform-rate-index">{index}</span>
      </>
    )
  }

  return (
    <Block className="heyform-rating" field={field} {...restProps}>
      <Form
        initialValues={{
          input: state.values[field.id]
        }}
        autoSubmit={true}
        isSubmitShow={false}
        field={field}
        getValues={getValues}
      >
        <FormField
          name="input"
          rules={[
            {
              required: field.validations?.required,
              message: 'This field is required'
            }
          ]}
        >
          <Rate count={field.properties?.total || 5} itemRender={characterRender} />
        </FormField>
      </Form>
    </Block>
  )
}
