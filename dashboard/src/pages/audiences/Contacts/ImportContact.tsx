import { DragUploader } from '@/components'
import type { GroupModel } from '@/models'
import { AudienceService } from '@/service'
import { csvParse, useAsyncEffect, useParam } from '@/utils'
import { DownloadIcon } from '@heroicons/react/outline'
import { Button, Form, Modal, notification, Select } from '@heyforms/ui'
import type { FC } from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const ImportContact: FC<IModalProps> = ({ visible, onClose }) => {
  const { workspaceId } = useParam()
  const [groups, setGroups] = useState<GroupModel[]>([])
  const { t } = useTranslation()

  async function handleFinish(values: any) {
    const result = (await csvParse<string[]>(values.file)).slice(1).filter(row => row.length > 1)

    if (result.length < 1) {
      throw new Error('Invalid CSV file')
    }

    const contacts = result.map(([fullName, email, phoneNumber, jobTitle]) => ({
      fullName,
      email,
      phoneNumber,
      jobTitle
    }))

    await AudienceService.importContacts({
      teamId: workspaceId,
      contacts,
      groupIds: values.groupIds
    })

    notification.success({
      title: t('audiences.contact.importContact.successCreate')
    })

    onClose?.()
  }

  async function handleCreateGroup(name: string) {
    const result = await AudienceService.createGroup({
      teamId: workspaceId,
      name
    })

    setGroups([
      ...groups,
      {
        id: result,
        name
      }
    ])

    return result
  }

  function handleDownload() {
    window.open('https://forms.b-cdn.net/example.csv?attname=heyform-contact-example.csv')
  }

  useAsyncEffect(async () => {
    const result = await AudienceService.groups({
      teamId: workspaceId,
      page: 1,
      limit: 0
    })
    setGroups(result.groups)
  }, [workspaceId])

  return (
    <Modal visible={visible} onClose={onClose} showCloseIcon>
      <div className="space-y-6">
        <div>
          <h1 className="text-lg leading-6 font-medium text-slate-900">
            {t('audiences.contact.importContact.Import')}
          </h1>
          <p className="mt-1 mr-8 text-sm text-slate-500">
            {t('audiences.contact.importContact.CSVFile')}
          </p>
        </div>

        <div>
          <div className="block text-sm font-medium text-slate-700">
            {t('audiences.contact.importContact.download')}
          </div>
          <p className="mt-1 text-sm text-slate-500">{t('audiences.contact.importContact.csv')}</p>
          <Button className="mt-2" leading={<DownloadIcon />} onClick={handleDownload}>
            {t('audiences.contact.importContact.blankTemplate')}
          </Button>
        </div>

        <Form.Custom
          submitText={t('audiences.contact.importContact.imp')}
          submitOptions={{
            type: 'primary'
          }}
          request={handleFinish}
        >
          <Form.Item
            name="groupIds"
            label={t('audiences.contact.importContact.groupSelect')}
            rules={[
              {
                required: true,
                type: 'array',
                message: t('audiences.contact.importContact.selectOne')
              }
            ]}
          >
            <Select.Multiple
              options={groups as any}
              labelKey="name"
              valueKey="id"
              createOptionLeading={t('audiences.contact.addContact.createGroup')}
              createRequest={handleCreateGroup}
            />
          </Form.Item>
          <Form.Item
            name="file"
            label={t('audiences.contact.importContact.uploadCsv')}
            rules={[
              {
                required: true,
                message: t('audiences.contact.importContact.invalid')
              }
            ]}
          >
            <DragUploader accept={['text/csv', 'application/vnd.ms-excel']} maxSize="1MB" />
          </Form.Item>
        </Form.Custom>
      </div>
    </Modal>
  )
}

export default ImportContact
