import type { UserModel } from '@/models'
import { useStore } from '@/store'
import { Avatar, Badge, Button } from '@heyforms/ui'
import { uniqueArray } from '@hpnp/utils/helper'
import { observer } from 'mobx-react-lite'
import type { FC } from 'react'
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

interface MemberItemProps {
  member: UserModel
  onClick: (member: UserModel) => void
}

export const MemberItem: FC<MemberItemProps> = ({ member, onClick }) => {
  function handleClick() {
    onClick(member)
  }

  const { t } = useTranslation()
  return (
    <div className="group flex items-center p-2.5 -mx-2.5 rounded-md text-sm text-gray-700 hover:bg-gray-50">
      <Avatar src={member.avatar} size={40} retainLength={2} rounded circular/>

      <div className="ml-4 flex-auto">
        <p className="text-sm font-medium text-gray-700 truncate">
          {member.name}
          {member.isSelf && t('project.ProjectMembers.you')}
          {member.isOwner && <Badge className="ml-1" type="blue" text={t('workspace.members.index.owner')}/>}
        </p>
        <p className="text-sm text-gray-500 truncate">{member.email}</p>
      </div>

      <Button
        className="px-2.5 py-0.5"
        rounded
        disabled={member.isSelf || member.isOwner}
        onClick={handleClick}
      >
        {member.isAssigned ? 'Remove' : 'Assign'}
      </Button>
    </div>
  )
}

interface AssignMemberProps extends Omit<IComponentProps, 'onChange'> {
  value?: string[]
  onChange?: (value: string[]) => void
}

export const AssignMember: FC<AssignMemberProps> = observer(({ value = [], onChange }) => {
  const workspaceStore = useStore('workspaceStore')
  const userStore = useStore('userStore')

  const members = useMemo(() => {
    return workspaceStore.members.map(m => {
      const isOwner = workspaceStore.workspace.ownerId === m.id
      const isSelf = userStore.user.id === m.id
      const isAssigned = value.includes(m.id) || isOwner || isSelf

      return {
        ...m,
        isAssigned,
        isOwner,
        isSelf
      }
    })
  }, [workspaceStore.members, value])

  function handleClick(member: UserModel) {
    if (value.includes(member.id)) {
      onChange?.(value.filter(id => id !== member.id))
    } else {
      onChange?.([...value, member.id])
    }
  }

  useEffect(() => {
    onChange?.(uniqueArray([workspaceStore.workspace.ownerId, userStore.user.id]))
  }, [workspaceStore.workspace.id])

  return (
    <div>
      {members.map(row => (
        <MemberItem key={row.id} member={row} onClick={handleClick}/>
      ))}
    </div>
  )
})
