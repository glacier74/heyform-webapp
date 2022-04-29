import { MobilePhoneCode } from '@/components'
import type { ProjectModel } from '@/models'
import { ProjectService } from '@/service'
import { useStore } from '@/store'
import { useAsyncEffect, useParam } from '@/utils'
import { Form, Input, Modal, notification, useForm } from '@heyforms/ui'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

interface DeleteProjectProps extends IModalProps {
  project?: ProjectModel | null
}

export const DeleteProject: FC<DeleteProjectProps> = ({
  visible,
  project,
  onComplete,
  onClose
}) => {
  const { workspaceId } = useParam()
  const { t } = useTranslation()
  const workspaceStore = useStore('workspaceStore')
  const userStore = useStore('userStore')

  async function handleFinish(values: IMapType) {
    await ProjectService.delete(project!.id, values.code)
    workspaceStore.deleteProject(workspaceId, project!.id)

    onComplete?.()
  }

  async function handleSendCode(data: any) {
    // TODO - 发送验证码
  }

  async function handleClick() {
    return true
  }

  useAsyncEffect(async () => {
    if (visible) {
      await ProjectService.deleteCode(project!.id)

      notification.success({
        title: `${t('project.deleteProject.sendEmail')} ${userStore.user.email}.`
      })
    }
  }, [visible])

  return (
    <Modal contentClassName="max-w-md" visible={visible} showCloseIcon onClose={onClose}>
      <div className="space-y-6">
        <div>
          <h1 className="text-lg leading-6 font-medium text-gray-900">
            {t('project.deleteProject.del')}
          </h1>
          <div className="space-y-2">
            <p className="mt-1 text-sm text-gray-500">{t('project.deleteProject.deleteExplain')}</p>
            <p className="mt-1 text-sm text-gray-500">
              {t('project.deleteProject.deleteExplain2')}
            </p>
          </div>
        </div>

        <Form.Custom
          submitText={t('project.deleteProject.delBottom')}
          submitOptions={{
            type: 'danger'
          }}
          request={handleFinish}
        >
          <Form.Item
            name="code"
            label={t('project.deleteProject.code')}
            rules={[{ required: true }]}
          >
            <Input trailing={<MobilePhoneCode request={handleSendCode} onClick={handleClick} />} />
          </Form.Item>
        </Form.Custom>
      </div>
    </Modal>
  )
}
