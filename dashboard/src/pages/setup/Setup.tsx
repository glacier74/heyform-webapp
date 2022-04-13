import { LogoIcon, PhotoPickerField } from '@/components'
import { WorkspaceModel } from '@/models'
import { WorkspaceService } from '@/service'
import { useStore } from '@/store'
import { Button, Form, Input } from '@heyforms/ui'
import { observer } from 'mobx-react-lite'
import type { FC } from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const Setup: FC = () => {
  const navigate = useNavigate()
  const workspaceStore = useStore('workspaceStore')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const { t } = useTranslation()

  async function handleFinish(values: WorkspaceModel) {
    if (loading) {
      return
    }

    setLoading(true)

    try {
      const result = await WorkspaceService.create(values.name, values.avatar)

      // Fetch the latest workspaces
      const workspaces = await WorkspaceService.workspaces()
      workspaceStore.setWorkspaces(workspaces)

      // Navigate to new created workspace page
      navigate(`/workspace/${result}`, {
        replace: true
      })
    } catch (err: any) {
      setLoading(false)
      setError(err)
    }
  }

  return (
    <div>
      <div>
        <LogoIcon className="h-8 w-auto" />
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">{t('setup.createW')}</h2>
        <p className="mt-2 text-sm text-gray-600">{t('setup.explain')}</p>
      </div>

      <div className="mt-8">
        <div className="mt-6">
          <Form onFinish={handleFinish}>
            <Form.Item name="name" label={t('setup.name')} rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item
              name="avatar"
              label={
                <>
                  {t('setup.logo')}{' '}
                  <span className="text-gray-500">
                    ({t('audiences.contact.addContact.optional')})
                  </span>
                </>
              }
            >
              <PhotoPickerField />
            </Form.Item>

            <Button type="primary" htmlType="submit" loading={loading}>
              {t('setup.createW')}
            </Button>

            {error && <div className="form-item-error">{error.message}</div>}
          </Form>
        </div>
      </div>
    </div>
  )
}

export default observer(Setup)
