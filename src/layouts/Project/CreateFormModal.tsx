import { FormKindEnum, InteractiveModeEnum } from '@heyform-inc/shared-types-enums'
import { useBoolean } from 'ahooks'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'

import { Form, Input, Modal, SimpleFormProps } from '@/components'
import { FormService } from '@/services'
import { useAppStore, useModal, useWorkspaceStore } from '@/store'
import { FormType } from '@/types'
import { useParam, useRouter } from '@/utils'

interface CreateFormProps extends Pick<SimpleFormProps, 'onLoadingChange'> {
  projectId: string
}

const CreateForm: FC<CreateFormProps> = ({ projectId, onLoadingChange }) => {
  const { t } = useTranslation()

  const router = useRouter()
  const { workspaceId } = useParam()
  const { closeModal } = useAppStore()

  async function fetch(values: FormType) {
    const result = await FormService.create({
      projectId,
      name: values.name,
      nameSchema: [],
      interactiveMode: InteractiveModeEnum.GENERAL,
      kind: FormKindEnum.SURVEY
    })

    closeModal('CreateFormModal')
    router.push(`/workspace/${workspaceId}/project/${projectId}/form/${result}/create`)
  }

  return (
    <Form.Simple
      className="space-y-4"
      fetch={fetch}
      submitProps={{
        className: 'px-5 min-w-24',
        size: 'md',
        label: t('components.continue')
      }}
      onLoadingChange={onLoadingChange}
    >
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

  const { projectId } = useParam()
  const { isOpen, payload, onOpenChange } = useModal('CreateFormModal')
  const { project } = useWorkspaceStore()
  const [loading, { set }] = useBoolean(false)

  return (
    <Modal.Simple
      open={isOpen}
      contentProps={{
        className: 'max-w-lg'
      }}
      title={
        <Trans
          t={t}
          i18nKey="form.creation.headline"
          components={{
            span: <span />
          }}
          values={{
            name: (payload || project)?.name
          }}
        />
      }
      loading={loading}
      onOpenChange={onOpenChange}
    >
      <CreateForm projectId={payload?.id || projectId} onLoadingChange={set} />
    </Modal.Simple>
  )
}
