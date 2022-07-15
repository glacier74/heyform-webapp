/**
 * @program: dashboard-next
 * @description: Mailchimp
 * @author: Mufeng
 * @date: 2021-06-16 11:18
 **/

import {
  SettingsProps,
  SettingsWrapper
} from '@/legacy_pages/pages/Integration/views/Settings/views/SettingsWrapper'
import { Input } from '@heyforms/ui'
import { FormItem } from '@heyui/component'
import { FC } from 'react'

export const CommonSettings: FC<SettingsProps> = ({ app, options = [], onFinish }) => {
  return (
    <SettingsWrapper app={app} onFinish={onFinish}>
      {options.map((row, index) => (
        <FormItem
          key={index}
          name={row.name}
          label={row.label}
          description={row.description}
          rules={row.rules}
        >
          <Input placeholder={row.placeholder} />
        </FormItem>
      ))}
    </SettingsWrapper>
  )
}
