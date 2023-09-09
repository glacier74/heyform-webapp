import { Async, RestoreIcon } from '@/components'
import { FormService } from '@/service'
import { useStore } from '@/store'
import { useParam, useVisible } from '@/utils'
import { DotsHorizontalIcon, TrashIcon } from '@heroicons/react/outline'
import type { FormModel } from '@heyforms/shared-types-enums'
import { FormStatusEnum } from '@heyforms/shared-types-enums'
import { Badge, Dropdown, EmptyStates, Menus, Modal, notification, Table } from '@heyforms/ui'
import type { TableColumn } from '@heyforms/ui/types/table'
import { isValid } from '@hpnp/utils/helper'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import * as timeago from 'timeago.js'
import { ProjectLayout } from './views/ProjectLayout'
import { Skeleton } from './views/Skeleton'

const Trash = observer(() => {
  const { t } = useTranslation()
  const { projectId } = useParam()
  const workspaceStore = useStore('workspaceStore')

  const [loading, setLoading] = useState(false)
  const [deleteFormVisible, openDeleteForm, closeDeleteForm] = useVisible()

  const [forms, setForms] = useState<FormModel[]>([])
  const [form, setForm] = useState<FormModel | null>(null)

  async function request() {
    const result = await FormService.forms(projectId, FormStatusEnum.TRASH)
    setForms(result)

    return isValid(result)
  }

  async function handleRestore(record: FormModel) {
    const l = notification.loading({
      title: t('project.trash.restoring')
    })

    try {
      await FormService.restoreForm(record.id)
      setForms(forms.filter(f => f.id !== record.id))
      workspaceStore.addForm(projectId, record)
    } catch (err: any) {
      notification.error({
        title: err.message
      })
    }

    l.dismiss()
  }

  async function handleDelete() {
    setLoading(true)

    try {
      await FormService.delete(form!.id)
      setForms(forms.filter(f => f.id !== form!.id))

      closeDeleteForm()
    } catch (err: any) {
      notification.error({
        title: err.message
      })
    }

    setLoading(false)
  }

  // Table columns
  const columns: TableColumn<FormModel>[] = [
    {
      key: 'id',
      name: t('project.trash.FormName'),
      width: '40%',
      render(record) {
        return (
          <div>
            <p className="text-sm font-semibold text-slate-800 truncate">{record.name}</p>
            <p className="mt-0.5 flex items-center font-normal text-sm text-slate-500">
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
      name: t('integration.Status'),
      width: '30%',
      render() {
        return <Badge className="form-status" text={t('project.closed')} dot />
      }
    },
    {
      key: 'fieldUpdateAt',
      name: t('project.trash.LastUpdate'),
      width: '20%',
      render(record) {
        if (record.fieldUpdateAt) {
          return timeago.format(record.fieldUpdateAt * 1_000)
        }
      }
    },
    {
      key: 'action',
      name: t('workspace.members.Action'),
      align: 'right',
      render(record) {
        function handleClick(name?: IKeyType) {
          switch (name) {
            case 'restore':
              handleRestore(record)
              break

            case 'delete':
              setForm(record)
              openDeleteForm()
              break
          }
        }

        return (
          <Dropdown
            className="ml-1 p-1 rounded-md text-slate-500 hover:bg-slate-50 hover:text-slate-900 cursor-pointer"
            placement="bottom-start"
            overlay={
              <Menus onClick={handleClick}>
                <Menus.Item
                  value="restore"
                  icon={<RestoreIcon />}
                  label={t('project.trash.restore')}
                />
                <Menus.Item
                  value="delete"
                  icon={<TrashIcon />}
                  label={t('project.trash.delForever')}
                />
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
      <div className="mt-8 text-sm text-slate-700">
        {t('project.trash.explain')}{' '}
        <a
          href="https://heyform.net/help"
          target="_blank"
          className="text-blue-500 hover:text-blue-700"
        >
          {t('project.trash.link')}
        </a>
      </div>

      <Async
        request={request}
        deps={[projectId]}
        skeleton={<Skeleton />}
        emptyState={
          <EmptyStates
            className="empty-states-fit"
            icon={<TrashIcon className="non-scaling-stroke" />}
            title={t('project.trash.noForm')}
            description={t('project.trash.daysExplain')}
          />
        }
      >
        <Table<FormModel> className="mt-8" columns={columns} data={forms} />
      </Async>

      <Modal.Confirm
        type="danger"
        visible={deleteFormVisible}
        title={t('project.trash.deleteForever')}
        description={`'${form?.name}' ${t('project.trash.delForm')}`}
        cancelLabel={t('project.trash.cancel')}
        confirmLabel={t('project.del')}
        confirmLoading={loading}
        onCancel={closeDeleteForm}
        onClose={closeDeleteForm}
        onConfirm={handleDelete}
      />
    </ProjectLayout>
  )
})

export default Trash
