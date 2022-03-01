import { IconText } from '@/legacy_pages/components'
import { SettingsIcon } from '@/legacy_pages/components/Icons'
import { FC } from 'react'
import styled from 'styled-components'

export const CustomFields: FC = () => {
  return <Container icon={<SettingsIcon />} text="Custom Fields" />
}

const Container = styled(IconText)`
  height: 40px;
  margin-right: 12px;
  padding: 0 12px;
  background: #f3f3f3;
  color: #4e5d78;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 23px 44px rgb(176 183 195 / 14%);
  }

  svg {
    width: 22px;
    height: 22px;
    color: #8a94a6;
  }

  span {
    margin-left: 8px;
  }
`
