import { FilterIcon } from '@/components'
import { AudienceService } from '@/service'
import { useAsyncEffect, useParam } from '@/utils'
import type { GroupModel } from '@heyforms/shared-types-enums'
import { Button, Dropdown, Menus } from '@heyforms/ui'
import type { FC } from 'react'
import { useState } from 'react'


interface ContactFilterProps {
  value: string[]
  onChange: (value: string[]) => void
}

export const ContactFilter: FC<ContactFilterProps> = ({ value = [], onChange }) => {
  const { workspaceId } = useParam()
  const [visible, setVisible] = useState(false)
  const [groups, setGroups] = useState<GroupModel[]>([])


  function handleMenuClick(id?: IKeyType) {
    if (value.includes(id as string)) {
      onChange(value.filter(v => v !== id))
    } else {
      onChange([...value, id as string])
    }

    setVisible(false)
  }

  useAsyncEffect(async () => {
    const result = await AudienceService.groups({
      teamId: workspaceId,
      page: 1,
      limit: 0
    })
    setGroups(result.groups)
  }, [workspaceId])

  const Overlay = (
    <Menus onClick={handleMenuClick}>
      <h3 className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
        Groups
      </h3>
      {groups.map(group => (
        <Menus.Item
          key={group.id}
          name={group.id}
          label={group.name}
          isChecked={value.includes(group.id)}
        />
      ))}
    </Menus>
  )

  return (
    <Dropdown
      className="hidden md:flex md:items-center rounded-lg space-x-1 text-sm text-gray-500 hover:text-gray-900 cursor-pointer"
      placement="bottom-start"
      overlay={Overlay}
      dismissOnClickInside={false}
      visible={visible}
      onDropdownVisibleChange={setVisible}
    >
      <Button
        className="group text-gray-500 hover:text-gray-700"
        trailing={<FilterIcon className="w-5 h-5 text-gray-500 group-hover:text-gray-700"/>}
      >
        Filter
      </Button>
    </Dropdown>
  )
}
