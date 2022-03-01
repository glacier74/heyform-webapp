import { Avatar, AvatarProps, Flex } from '@heyui/component'
import { FC } from 'react'
import styled from 'styled-components'

export const AvatarText: FC<AvatarProps> = ({
  className,
  style,
  text,
  image,
  width,
  height,
  round
}) => {
  return (
    <Flex className={className} style={style} align="center">
      <StyledAvatar
        className="avatar"
        text={text}
        image={image}
        width={width}
        height={height}
        round={round}
      />
      <Text className="text">{text}</Text>
    </Flex>
  )
}

const StyledAvatar = styled(Avatar)`
  width: 24px;
  height: 24px;
  line-height: 24px;
  background: ${props => props.theme.deepBackground};
  color: ${props => props.theme.text};
`

const Text = styled.span`
  margin-left: 12px;
`
