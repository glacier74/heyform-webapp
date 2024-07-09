import { FormKindEnum, InteractiveModeEnum } from '@heyform-inc/shared-types-enums'
import { helper } from '@heyform-inc/utils'
import { IconPlus } from '@tabler/icons-react'
import { useBoolean } from 'ahooks'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { Button, Form, Input, Modal, Select, SimpleFormProps } from '@/components'
import { FormService } from '@/services'
import { useAppStore, useModal, useWorkspaceStore } from '@/store'
import { FormType } from '@/types'
import { nextTick, useParam, useRouter } from '@/utils'

const CreateForm: FC<Pick<SimpleFormProps, 'onLoadingChange'>> = ({ onLoadingChange }) => {
  const { t } = useTranslation()

  const router = useRouter()
  const { workspaceId, projectId } = useParam()
  const [rcForm] = Form.useForm()
  const { openModal, closeModal } = useAppStore()
  const { workspace } = useWorkspaceStore()
  const { payload } = useModal('CreateFormModal')

  async function fetch(values: FormType) {
    const result = await FormService.create({
      projectId: values.projectId,
      name: values.name,
      nameSchema: [],
      interactiveMode: InteractiveModeEnum.GENERAL,
      kind: FormKindEnum.SURVEY
    })

    closeModal('CreateFormModal')
    router.push(`/workspace/${workspaceId}/project/${values.projectId}/form/${result}/create`)
  }

  function handleCreateProject() {
    openModal('CreateProjectModal', {
      callback: (newProjectId: string) => {
        nextTick(() => {
          rcForm.setFieldValue('projectId', newProjectId)
        })
      }
    })
  }

  return (
    <Form.Simple
      form={rcForm}
      className="space-y-4"
      fetch={fetch}
      initialValues={{
        projectId: projectId || payload?.projectId
      }}
      submitProps={{
        className: 'px-5 min-w-24',
        size: 'md',
        label: t('components.continue')
      }}
      onLoadingChange={onLoadingChange}
    >
      <Form.Item
        name="projectId"
        label={t('form.creation.project.label')}
        rules={[
          {
            required: true,
            message: t('form.creation.project.required')
          }
        ]}
      >
        {helper.isValidArray(workspace.projects) ? (
          <Select
            className="h-11 w-full sm:h-10"
            options={workspace.projects}
            labelKey="name"
            valueKey="id"
          />
        ) : (
          <Button.Ghost
            className="w-full [&_[data-slot=button]]:justify-start"
            onClick={handleCreateProject}
          >
            <IconPlus className="h-5 w-5" />
            <span>{t('project.creation.headline')}</span>
          </Button.Ghost>
        )}
      </Form.Item>
      <Form.Item
        name="name"
        label={t('form.creation.name.label')}
        rules={[
          {
            required: true,
            message: t('form.creation.name.required')
          }
        ]}
      >
        <Input autoComplete="off" />
      </Form.Item>
    </Form.Simple>
  )
}

export default function CreateFormModal() {
  const { t } = useTranslation()

  const { isOpen, onOpenChange } = useModal('CreateFormModal')
  const [loading, { set }] = useBoolean(false)

  return (
    <Modal.Simple
      open={isOpen}
      contentProps={{
        className: 'max-w-lg'
      }}
      title={t('form.creation.headline')}
      loading={loading}
      onOpenChange={onOpenChange}
    >
      <CreateForm onLoadingChange={set} />
    </Modal.Simple>
  )
}
