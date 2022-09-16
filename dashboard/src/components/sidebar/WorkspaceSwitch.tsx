import type { WorkspaceModel } from '@/models'
import { useStore } from '@/store'
import { cropImage, useParam } from '@/utils'
import { PlusIcon } from '@heroicons/react/outline'
import { CheckCircleIcon, SelectorIcon } from '@heroicons/react/solid'
import { Avatar, Dropdown, Menus } from '@heyforms/ui'
import { observer } from 'mobx-react-lite'
import type { FC } from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
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
      className="group flex items-center px-4 py-2.5 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
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
        <p className="text-sm font-medium text-gray-700 truncate">{workspace.name}</p>
        <p className="text-sm text-gray-500 truncate">
          <span>
            {workspace.plan.name} {t('billing.plan')}
          </span>
          {workspace.subscription.trialing && (
            <span className="text-blue-700 text-xs"> (trial)</span>
          )}
          <span> · </span>
          <span>
            {workspace.memberCount} {t('workspace.join.member')}
          </span>
        </p>
      </div>

      {workspaceId === workspace.id && <CheckCircleIcon className="w-6 h-6 text-blue-500" />}
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
    <button className="group w-full rounded-md text-sm text-left text-gray-700">
      <span className="flex w-full justify-between items-center cursor-pointer">
        <span className="flex min-w-0 items-center justify-between space-x-3">
          <Avatar
            className="w-10 h-10 rounded-full flex-shrink-0"
            src={cropImage(workspaceStore.workspace?.avatar, 100, 100)}
            defaultIcon={<WorkspaceIcon />}
            size={40}
            rounded
            circular
          />
          <span className="flex-1 flex flex-col min-w-0">
            <span className="text-gray-900 text-sm font-medium truncate">
              {workspaceStore.workspace?.name}
            </span>
            <span className="text-gray-500 text-sm truncate">
              {workspaceStore.workspace?.plan.name} {t('billing.plan')}
              {workspaceStore.workspace.subscription.trialing && (
                <span className="text-blue-700 text-xs"> (trial)</span>
              )}
            </span>
          </span>
        </span>
        <SelectorIcon className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
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
        icon={<PlusIcon />}
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
