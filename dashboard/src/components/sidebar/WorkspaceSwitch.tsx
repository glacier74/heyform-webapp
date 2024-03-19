import { Avatar, Dropdown, Menus } from '@heyforms/ui'
import { IconCircleCheck, IconPlus, IconSelector } from '@tabler/icons-react'
import { observer } from 'mobx-react-lite'
import type { FC } from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import type { WorkspaceModel } from '@/models'
import { PlanGradeEnum } from '@/models'
import { useStore } from '@/store'
import { cropImage, useParam } from '@/utils'

import { WorkspaceIcon } from '../icons'

interface WorkspaceItemProps {
  workspace: WorkspaceModel
  onClick: (workspace: WorkspaceModel) => void
}

interface WorkspaceSwitchProps {
  onCreateWorkspace: () => void
}

interface WorkspaceListProps {
  onClose: () => void
}

const WorkspaceItem: FC<WorkspaceItemProps> = ({ workspace, onClick }) => {
  const { workspaceId } = useParam()
  const { t } = useTranslation()

  function handleClick() {
    onClick(workspace)
  }

  return (
    <div
      className="group flex cursor-pointer items-center px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-100"
      onClick={handleClick}
    >
      <Avatar
        src={cropImage(workspace.avatar, 100, 100)}
        defaultIcon={<WorkspaceIcon />}
        size={40}
        retainLength={2}
        rounded
        circular
      />

      <div className="ml-4 flex-auto">
        <p className="truncate text-sm font-medium text-slate-700">{workspace.name}</p>
        <p className="truncate text-sm text-slate-500">
          <span>
            {workspace.plan.name} {t('billing.plan')}
          </span>
          {workspace.plan.grade > PlanGradeEnum.FREE && workspace.subscription.trialing && (
            <span className="text-xs text-blue-700"> (trial)</span>
          )}
          <span> · </span>
          <span>
            {workspace.memberCount} {t('workspace.join.member')}
          </span>
        </p>
      </div>

      {workspaceId === workspace.id && <IconCircleCheck className="h-6 w-6 text-blue-500" />}
    </div>
  )
}

const WorkspaceList: FC<WorkspaceListProps> = observer(({ onClose }) => {
  const navigate = useNavigate()
  const workspaceStore = useStore('workspaceStore')

  function handleClick(workspace: WorkspaceModel) {
    onClose()
    navigate(`/workspace/${workspace.id}`)
  }

  return (
    <>
      {workspaceStore.list.map(workspace => (
        <WorkspaceItem key={workspace.id} workspace={workspace} onClick={handleClick} />
      ))}
    </>
  )
})

const CurrentWorkspace = observer(() => {
  const workspaceStore = useStore('workspaceStore')
  const { t } = useTranslation()

  return (
    <button className="group w-full rounded-md text-left text-sm text-slate-700">
      <span className="flex w-full cursor-pointer items-center justify-between">
        <span className="flex min-w-0 items-center justify-between space-x-3">
          <Avatar
            className="h-10 w-10 flex-shrink-0 rounded-full"
            src={cropImage(workspaceStore.workspace?.avatar, 100, 100)}
            defaultIcon={<WorkspaceIcon />}
            size={40}
            rounded
            circular
          />
          <span className="flex min-w-0 flex-1 flex-col">
            <span className="truncate text-sm font-medium text-slate-900">
              {workspaceStore.workspace?.name}
            </span>
            <span className="truncate text-sm text-slate-500">
              {workspaceStore.workspace?.plan.name} {t('billing.plan')}
              {workspaceStore.workspace.subscription.trialing && (
                <span className="text-xs text-blue-700"> (trial)</span>
              )}
            </span>
          </span>
        </span>
        <IconSelector className="h-5 w-5 flex-shrink-0 text-slate-400 group-hover:text-slate-500" />
      </span>
    </button>
  )
})

export const WorkspaceSwitch: FC<WorkspaceSwitchProps> = ({ onCreateWorkspace }) => {
  const [visible, setVisible] = useState(false)
  const { t } = useTranslation()

  function handleClose() {
    setVisible(false)
  }

  const Overlay = (
    <div className="menus">
      <WorkspaceList onClose={handleClose} />
      <Menus.Divider />
      <Menus.Item
        value="create"
        icon={<IconPlus />}
        label={t('other.labelList.CreateWorkspace')}
        onClick={onCreateWorkspace}
      />
    </div>
  )

  return (
    <div className="px-2">
      <Dropdown
        className="block w-full"
        popupClassName="workspace-switch"
        visible={visible}
        placement="bottom-start"
        overlay={Overlay}
      >
        <CurrentWorkspace />
      </Dropdown>
    </div>
  )
}
