import { Async, Pagination } from '@/components'
import type { ContactModel } from '@/models'
import { PlanGradeEnum } from '@/models'
import { AudienceService } from '@/service'
import { useStore } from '@/store'
import { urlBuilder, useParam, useQuery, useVisible } from '@/utils'
import { DotsHorizontalIcon, MailIcon, PencilIcon, TrashIcon } from '@heroicons/react/outline'
import {
  Avatar,
  Button,
  Dropdown,
  EmptyStates,
  Input,
  Menus,
  notification,
  Table
} from '@heyforms/ui'
import type { TableColumn } from '@heyforms/ui/types/table'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { AudienceLayout } from '../views/AudienceLayout'
import AddContact from './AddContact'
import { ContactFilter } from './ContactFilter'
import EditContact from './EditContact'
import ImportContact from './ImportContact'
import { Skeleton } from './Skeleton'

const Contacts = () => {
  const { workspaceId } = useParam()
  const navigate = useNavigate()
  const workspaceStore = useStore('workspaceStore')
  const appStore = useStore('appStore')

  const { keyword, groups, page } = useQuery({
    keyword: String,
    groups: Array,
    page: {
      type: Number,
      default: 1
    }
  })

  const [total, setTotal] = useState(0)
  const [contacts, setContacts] = useState<ContactModel[]>([])
  const [contact, setContact] = useState<ContactModel | null>(null)
  const [addContactVisible, openAddContact, closeAddContact] = useVisible()
  const [importContactVisible, openImportContact, closeImportContact] = useVisible()
  const [editContactVisible, openEditContact, closeEditContact] = useVisible()
  const { t } = useTranslation()

  // Table columns
  const columns: TableColumn<ContactModel>[] = [
    {
      key: 'id',
      name: t('audiences.contact.index.Contact'),
      width: '40%',
      render(record) {
        return (
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Avatar
                src={record.avatar}
                text={record.fullName}
                retainLength={2}
                size={36}
                rounded
                circular
              />
            </div>
            <div className="flex-1 px-4">
              <p className="text-sm font-medium text-gray-800 truncate">{record.fullName}</p>
              <p className="mt-0.5 flex items-center font-normal text-sm text-gray-500">
                <span className="truncate">{record.email}</span>
              </p>
            </div>
          </div>
        )
      }
    },
    {
      key: 'phoneNumber',
      name: t('audiences.contact.index.Phone'),
      width: '15%'
    },
    {
      key: 'jobTitle',
      name: t('audiences.contact.addContact.jobTitle'),
      width: '15%'
    },
    {
      key: 'company',
      name: t('audiences.contact.index.Company'),
      width: '15%'
    },
    {
      key: 'action',
      name: t('workspace.members.Action'),
      align: 'right',
      render(record) {
        async function handleDeleteContact() {
          const loading = notification.loading({
            title: t('audiences.contact.index.delContact'),
            duration: 0
          })

          try {
            await AudienceService.deleteContacts({
              teamId: workspaceId,
              contactIds: [record.id]
            })

            notification.success({
              title: t('audiences.contact.index.deleted')
            })
          } catch (err: any) {
            notification.error({
              title: err.message
            })
          }

          loading.dismiss()
        }

        function handleMenuClick(name?: IKeyType) {
          switch (name) {
            case 'edit':
              setContact(record)
              openEditContact()
              break

            case 'delete':
              handleDeleteContact()
              break
          }
        }

        const Overlay = (
          <Menus onClick={handleMenuClick}>
            <Menus.Item
              name="edit"
              label={t('audiences.contact.index.edit')}
              icon={<PencilIcon />}
            />
            <Menus.Item name="delete" label={t('project.del')} icon={<TrashIcon />} />
          </Menus>
        )

        return (
          <Dropdown className="p-1 hover:bg-gray-100 rounded-md cursor-pointer" overlay={Overlay}>
            <DotsHorizontalIcon className="w-5 h-5 text-gray-400 hover:text-gray-900" />
          </Dropdown>
        )
      }
    }
  ]

  function handleChange(query: IMapType) {
    const url = urlBuilder(`/workspace/${workspaceId}/audience`, query)
    navigate(url)
  }

  function handleKeywordChange(value: string) {
    if (keyword !== value) {
      handleChange({
        keyword: value
      })
    }
  }

  function handlePageChange(currentPage: number) {
    handleChange({
      groups,
      keyword,
      page: currentPage
    })
  }

  function handleGroupChange(newGroups: string[]) {
    handleChange({
      keyword,
      groups: newGroups
    })
  }

  async function request() {
    const result = await AudienceService.contacts({
      teamId: workspaceId,
      groupIds: groups,
      keyword,
      page,
      limit: 20
    })

    setTotal(result.total)
    setContacts(result.contacts)

    return result.contacts.length > 0
  }

  function handleOpenPlanModal() {
    appStore.isPlanModalOpen = true
  }

  if (workspaceStore.workspace.plan.grade < PlanGradeEnum.BASIC) {
    return (
      <EmptyStates
        className="empty-states-full"
        icon={<MailIcon className="non-scaling-stroke" />}
        title={t('audiences.contact.index.noContact')}
        description={t('audiences.contact.index.addPeople')}
        action={
          <Button onClick={handleOpenPlanModal}>{t('audiences.contact.addContact.add')}</Button>
        }
      />
    )
  }

  return (
    <AudienceLayout>
      {contacts.length > 0 && (
        <div className="mt-8 lg:flex lg:items-center lg:justify-between">
          <div className="flex items-center space-x-2">
            <Input.Search className="w-full md:w-96" onSearch={handleKeywordChange} />
            <ContactFilter value={groups} onChange={handleGroupChange} />
          </div>

          <div className="mt-6 flex flex-col justify-items-stretch space-x-0 space-y-4 md:space-y-0 md:space-x-3 lg:mt-0 md:flex-row">
            <Button type="primary" onClick={openAddContact}>
              {t('audiences.contact.addContact.add')}
            </Button>
            <Button onClick={openImportContact}>{t('audiences.contact.importContact.imp')}</Button>
          </div>
        </div>
      )}

      <Async
        request={request}
        deps={[page, keyword, groups]}
        skeleton={<Skeleton />}
        emptyState={
          <EmptyStates
            className="empty-states-fit"
            icon={<MailIcon className="non-scaling-stroke" />}
            title={t('audiences.contact.index.noContact')}
            description={t('audiences.contact.index.addPeople')}
            action={
              <Button onClick={openAddContact}>{t('audiences.contact.addContact.add')}</Button>
            }
          />
        }
      >
        <Table<ContactModel> className="mt-8" columns={columns} data={contacts} />
      </Async>

      <Pagination total={total} page={page} pageSize={20} onChange={handlePageChange} />

      <AddContact visible={addContactVisible} onClose={closeAddContact} />

      <ImportContact visible={importContactVisible} onClose={closeImportContact} />

      <EditContact visible={editContactVisible} contact={contact} onClose={closeEditContact} />
    </AudienceLayout>
  )
}

export default observer(Contacts)
