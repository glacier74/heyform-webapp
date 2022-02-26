import { DragUploader } from '@/components'
import type { GroupModel } from '@/models'
import { AudienceService } from '@/service'
import { csvParse, useAsyncEffect, useParam } from '@/utils'
import { DownloadIcon } from '@heroicons/react/outline'
import { Button, Form, Modal, notification, Select } from '@heyforms/ui'
import type { FC } from 'react'
import { useState } from 'react'

const ImportContact: FC<IModalProps> = ({ visible, onClose }) => {
  const { workspaceId } = useParam()
  const [groups, setGroups] = useState<GroupModel[]>([])

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
      title: 'Contacts has been imported'
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
    window.open('https://storage-us.heyformhq.com/example.csv?attname=heyform-contact-example.csv')
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
          <h1 className="text-lg leading-6 font-medium text-gray-900">Import contacts</h1>
          <p className="mt-1 mr-8 text-sm text-gray-500">
            You can bulk create contacts from CSV file.
          </p>
        </div>

        <div>
          <div className="block text-sm font-medium text-gray-700">Download the template</div>
          <p className="mt-1 text-sm text-gray-500">
            The number of columns in your CSV should be the same as the example below.
          </p>
          <Button className="mt-2" leading={<DownloadIcon />} onClick={handleDownload}>
            Download blank template
          </Button>
        </div>

        <Form.Custom
          submitText="Import"
          submitOptions={{
            type: 'primary'
          }}
          request={handleFinish}
        >
          <Form.Item
            name="groupIds"
            label="Select groups"
            rules={[
              {
                required: true,
                type: 'array',
                message: 'Select at least one group or create a new one'
              }
            ]}
          >
            <Select.Multiple
              options={groups as any}
              labelKey="name"
              valueKey="id"
              createOptionLeading="Create new group"
              createRequest={handleCreateGroup}
            />
          </Form.Item>
          <Form.Item
            name="file"
            label="Upload completed CSV file"
            rules={[
              {
                required: true,
                message: 'Invalid CSV file'
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
