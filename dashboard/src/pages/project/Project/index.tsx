import { Async } from '@/components'
import { FormService } from '@/service'
import { useStore } from '@/store'
import { useParam, useVisible } from '@/utils'
import {
  ClipboardCheckIcon,
  DotsHorizontalIcon,
  DuplicateIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/outline'
import type { FormModel } from '@heyforms/shared-types-enums'
import { FormStatusEnum } from '@heyforms/shared-types-enums'
import {
  Badge,
  Button,
  Dropdown,
  EmptyStates,
  Menus,
  Modal,
  notification,
  Table
} from '@heyforms/ui'
import type { TableColumn } from '@heyforms/ui/lib/types/table'
import { isValid } from '@hpnp/utils/helper'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import * as timeago from 'timeago.js'
import { ProjectLayout } from '../views/ProjectLayout'
import { Skeleton } from '../views/Skeleton'
import './index.scss'

const Project = observer(() => {
  const navigate = useNavigate()
  const { workspaceId, projectId } = useParam()
  const workspaceStore = useStore('workspaceStore')
  const [suspendModalVisible, openSuspendModal, closeSuspendModal] = useVisible()
  const { t } = useTranslation()

  async function request() {
    const result = await FormService.forms(projectId, FormStatusEnum.NORMAL)
    workspaceStore.setForms(projectId, result)

    return isValid(result)
  }

  function handleRowClick(record: FormModel) {
    if (record.suspended) {
      return openSuspendModal()
    }

    navigate(`/workspace/${record.teamId}/project/${record.projectId}/form/${record.id}/create`)
  }

  async function handleDuplicate(record: FormModel) {
    const loading = notification.loading({
      title: t('project.Duplicating')
    })

    try {
      const result = await FormService.duplicate(record.id)
      workspaceStore.addForm(projectId, {
        ...record,
        id: result
      })

      navigate(`/workspace/${workspaceId}/project/${projectId}/form/${result}/create`)
    } catch (err: any) {
      notification.error({
        title: err.message
      })
    }

    loading.dismiss()
  }

  async function handleDelete(record: FormModel) {
    const loading = notification.loading({
      title: t('project.Deleting')
    })

    try {
      await FormService.moveToTrash(record.id)
      workspaceStore.deleteForm(projectId, record.id)
    } catch (err: any) {
      notification.error({
        title: err.message
      })
    }

    loading.dismiss()
  }

  function handleCreateForm() {
    navigate(`/workspace/${workspaceId}/project/${projectId}/form/create`)
  }

  function handleConfirm() {
    window.location.href = 'https://my.heyform.net/f/E4MKK2hx'
  }

  // Table columns
  const columns: TableColumn<FormModel>[] = [
    {
      key: 'id',
      name: 'Form name',
      width: '40%',
      render(record) {
        return (
          <div>
            <p className="text-sm font-medium text-gray-800 truncate">{record.name}</p>
            <p className="mt-0.5 flex items-center font-normal text-sm text-gray-500">
              <span className="truncate">
                {record.submissionCount && record.submissionCount > 0
                  ? `${record.submissionCount} ${t('project.ProjectMembers.submissions')}`
                  : t('project.ProjectMembers.NoSubmissions')}
              </span>
            </p>
          </div>
        )
      }
    },
    {
      key: 'status',
      name: 'Status',
      width: '30%',
      render(record) {
        if (record.suspended) {
          return <Badge className="form-status" type="red" text={t('project.suspended')} dot />
        } else if (record.draft) {
          return <Badge className="form-status" text={t('project.draft')} dot />
        } else if (record.settings?.active) {
          return <Badge className="form-status" type="blue" text={t('project.active')} dot />
        } else {
          return <Badge className="form-status" text={t('project.closed')} dot />
        }
      }
    },
    {
      key: 'fieldUpdateAt',
      name: 'Last update',
      width: '20%',
      render(record) {
        if (record.fieldUpdateAt) {
          return timeago.format(record.fieldUpdateAt * 1_000)
        }
      }
    },
    {
      key: 'action',
      name: 'Action',
      align: 'right',
      render(record) {
        function handleClick(name?: IKeyType) {
          switch (name) {
            case 'edit':
              handleRowClick(record)
              break

            case 'duplicate':
              handleDuplicate(record)
              break

            case 'delete':
              handleDelete(record)
              break
          }
        }

        return (
          <Dropdown
            className="ml-1 p-1 rounded-md text-gray-500 hover:bg-gray-50 hover:text-gray-900 cursor-pointer"
            placement="bottom-start"
            overlay={
              <Menus onClick={handleClick}>
                <Menus.Item name="edit" icon={<PencilIcon />} label={t('project.edit')} />
                <Menus.Item name="duplicate" icon={<DuplicateIcon />} label={t('project.dup')} />
                <Menus.Item name="delete" icon={<TrashIcon />} label={t('project.del')} />
              </Menus>
            }
          >
            <DotsHorizontalIcon className="w-5 h-5" />
          </Dropdown>
        )
      }
    }
  ]

  return (
    <ProjectLayout>
      <Async
        request={request}
        deps={[projectId]}
        skeleton={<Skeleton />}
        emptyState={
          <EmptyStates
            className="empty-states-fit"
            icon={<ClipboardCheckIcon className="non-scaling-stroke" />}
            title={t('project.noForm')}
            description={t('project.text')}
            action={<Button onClick={handleCreateForm}>{t('project.bottom')}</Button>}
          />
        }
      >
        <Table<FormModel>
          className="forms mt-8"
          columns={columns}
          data={workspaceStore.forms}
          onRowClick={handleRowClick}
        />
      </Async>

      <Modal.Confirm
        type="danger"
        visible={suspendModalVisible}
        title={t('project.suspendForm')}
        description={t('project.suspendText')}
        cancelLabel={t('project.trash.cancel')}
        confirmLabel={t('project.contact')}
        onClose={closeSuspendModal}
        onCancel={closeSuspendModal}
        onConfirm={handleConfirm}
      />
    </ProjectLayout>
  )
})

export default Project
