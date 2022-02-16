import './wdyr'
import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  EmptyStates,
  Form,
  Heading,
  Input,
  Menus,
  Modal,
  Navbar,
  Radio,
  Select,
  Switch,
  Table,
  Tabs
} from '../src'
import { render } from 'react-dom'
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DocumentAddIcon,
  DuplicateIcon,
  FolderRemoveIcon,
  LockClosedIcon,
  MailIcon,
  PencilIcon,
  TrashIcon,
  UserAddIcon
} from '@heroicons/react/solid'
import { StrictMode, useMemo, useState } from 'react'
import { ArchiveIcon, CodeIcon, EyeIcon, PlusIcon } from '@heroicons/react/outline'
import '../src/style.scss'

const DropdownElements = () => {
  const [mv, setMv] = useState(true)

  return (
    <div className="mt-8 space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
      <Button onClick={() => setMv(!mv)}>Toggle</Button>

      <Dropdown
        visible={mv}
        overlay={
          <Menus>
            <Menus.Item icon={<PencilIcon />} label="Edit" />
            <Menus.Item icon={<DuplicateIcon />} label="Duplicate" />
            <Menus.Divider />
            <Menus.Item icon={<UserAddIcon />} label="Add user" />
            <Menus.Item icon={<FolderRemoveIcon />} label="Move" />
            <Menus.Divider />
            <Menus.Item icon={<TrashIcon />} label="Delete" />
          </Menus>
        }
      >
        <Button trailing={<ChevronDownIcon />}>Options</Button>
      </Dropdown>

      <Dropdown
        placement="left"
        overlay={
          <Menus
            onClick={key => {
              console.log(key)
            }}
          >
            <Menus.Item name="Edit" icon={<PencilIcon />} label="Edit" />
            <Menus.Item name="Duplicate" icon={<DuplicateIcon />} label="Duplicate" />
            <Menus.Divider />
            <Menus.Item name="Add user" icon={<UserAddIcon />} label="Add user" />
            <Menus.Item name="Move" icon={<FolderRemoveIcon />} label="Move" />
            <Menus.Divider />
            <Menus.Item name="Delete" icon={<TrashIcon />} label="Delete" />
          </Menus>
        }
      >
        <Button trailing={<ChevronDownIcon />}>Options</Button>
      </Dropdown>

      <div>
        <Button trailing={<ChevronDownIcon />}>Options</Button>
        <Menus>
          <Menus.Item icon={<PencilIcon />} label="Edit" />
          <Menus.Item icon={<DuplicateIcon />} label="Duplicate" />
          <Menus.Divider />
          <Menus.Item icon={<UserAddIcon />} label="Add user" />
          <Menus.Item icon={<FolderRemoveIcon />} label="Move" />
          <Menus.Divider />
          <Menus.Item icon={<TrashIcon />} label="Delete" />
        </Menus>
      </div>
    </div>
  )
}

const Standalone = () => {
  const [mv, setMv] = useState(false)
  const [cv, setcv] = useState(false)
  const Icon = useMemo(() => {
    return (
      <img
        className="hidden h-16 w-16 rounded-full sm:block"
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2.6&amp;w=256&amp;h=256&amp;q=80"
        alt=""
      />
    )
  }, [])
  const Actions = useMemo(() => {
    return (
      <>
        <Button className="block" leading={<PlusIcon />} onClick={() => setMv(true)}>
          Create User
        </Button>
        <Button
          className="block ml-3"
          type="primary"
          leading={<MailIcon />}
          onClick={() => setcv(true)}
        >
          Button text
        </Button>
      </>
    )
  }, [])

  return (
    <>
      <Heading
        title="Back End Developer"
        description="Closing on January 9, 2020"
        icon={Icon}
        actions={Actions}
      />

      <Modal.Confirm
        type="primary"
        visible={cv}
        title="Are you sure you want to delete this user?"
        description="This action cannot be undone. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius aliquam laudantium explicabo pariatur iste dolorem animi vitae error totam. At sapiente aliquam accusamus facere veritatis."
        cancelLabel="Cancel"
        confirmLabel="Deactivate"
        onClose={() => setcv(false)}
      />

      <Modal visible={mv} onClose={() => setMv(false)}>
        <Form onValuesChange={console.log} onFinish={console.log}>
          <Form.Item
            name="email"
            label="Email"
            extra="We'll only use this for spam."
            validateTrigger="blur"
            rules={[{ type: 'email', required: true }]}
          >
            <Input type="email" placeholder="Email" leading={<MailIcon />} />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true }]}>
            <Input.Password placeholder="password" leading={<LockClosedIcon />} />
          </Form.Item>
          <Form.Item name="homepage" label="Homepage" rules={[{ required: true }]}>
            <Input placeholder="example.com" leading="https://" />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <Input placeholder="0.00" leading="$" trailing="USD" />
          </Form.Item>
          <Form.Item name="budget" label="Expected budget" rules={[{ required: true }]}>
            <Radio.Group
              options={[
                {
                  label: 'Less than $25K',
                  value: 1
                },
                {
                  label: '$25K – $50K',
                  value: 2
                },
                {
                  label: '$50K – $100K',
                  value: 3
                },
                {
                  label: '$100K+',
                  value: 4
                }
              ]}
            />
          </Form.Item>
          <Form.Item name="message" label="Message" rules={[{ required: true }]}>
            <Input.Textarea />
          </Form.Item>
          <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
            <Select
              options={[
                {
                  label: 'Men',
                  value: 'men'
                },
                {
                  label: 'Women',
                  value: 'women'
                },
                {
                  label: 'Unknown',
                  value: 'unknown'
                }
              ]}
            />
          </Form.Item>
          <Button type="primary" htmlType="submit" block={true}>
            Sign In
          </Button>
        </Form>
      </Modal>
    </>
  )
}

const App = () => {
  const [select, setSelect] = useState()

  return (
    <div className="container mx-auto">
      <Standalone />

      <EmptyStates
        title="No projects"
        description="Get started by creating a new project."
        icon={<ArchiveIcon vectorEffect="none" />}
        action={
          <Button type="primary" leading={<DocumentAddIcon />}>
            Create Project
          </Button>
        }
      />

      <EmptyStates
        title="No projects"
        description="Get started by creating a new project."
        icon={<ArchiveIcon vectorEffect="none" />}
        action={<Button leading={<DocumentAddIcon />}>Create Project</Button>}
      />

      <Navbar>
        <a href="#">Applied</a>
        <a href="#">Phone Screening</a>
        <a href="#" className="active">
          Interview
        </a>
      </Navbar>

      <DropdownElements />

      <div className="mt-8">
        <Table
          columns={[
            {
              key: 'name',
              name: 'transaction',
              render(row) {
                return `Payment to ${row.name}`
              }
            },
            {
              key: 'amount',
              name: 'amount',
              align: 'right',
              render(row) {
                return (
                  <>
                    <span className="text-gray-900 font-medium">{row.amount}</span> USD
                  </>
                )
              }
            },
            {
              key: 'success',
              name: 'status',
              width: 80,
              render(row) {
                return row.success ? <Badge type="green" text="Success" /> : <Badge text="Failed" />
              }
            },
            {
              key: 'date',
              name: 'date',
              width: 160,
              align: 'right'
            }
          ]}
          data={[
            {
              id: 1,
              name: 'Doug Mann',
              amount: 20000,
              success: true,
              date: 'July 11, 2020'
            },
            {
              id: 2,
              name: 'Molly Sanders',
              amount: 8750,
              success: true,
              date: 'July 3, 2020'
            },
            {
              id: 3,
              name: 'Erica Frost',
              amount: 300,
              success: false,
              date: 'July 1, 2020'
            },
            {
              id: 4,
              name: 'Miley Davis',
              amount: 1500,
              success: true,
              date: 'July 1, 2020'
            }
          ]}
        />
      </div>

      <div className="mt-8 space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
        <Button>Button</Button>
        <Button type="primary">Button text</Button>
        <Button type="success">Button text</Button>
        <Button type="danger">Button text</Button>
        <Button type="primary" leading={<MailIcon />}>
          Button text
        </Button>
        <Button trailing={<MailIcon />}>Button text</Button>
        <Button leading={<PlusIcon />} rounded={true} />
      </div>

      <div className="mt-8 space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
        <Button loading={true}>Button</Button>
        <Button type="primary" loading={true}>
          Button text
        </Button>
        <Button type="success" loading={true}>
          Button text
        </Button>
        <Button type="danger" loading={true}>
          Button text
        </Button>
        <Button type="primary" leading={<MailIcon />} loading={true}>
          Button text
        </Button>
        <Button trailing={<MailIcon />} loading={true}>
          Button text
        </Button>
        <Button leading={<PlusIcon />} rounded={true} loading={true} />
      </div>

      <div className="mt-8 space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
        <Button.Group>
          <Button>Years</Button>
          <Button>Months</Button>
          <Button>Days</Button>
        </Button.Group>

        <Button.Group>
          <Button leading={<ChevronLeftIcon />} />
          <Button leading={<ChevronRightIcon />} />
        </Button.Group>

        <Button.Group>
          <Button>Save changes</Button>
          <Button leading={<ChevronDownIcon />} />
        </Button.Group>
      </div>

      <div className="mt-8 space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
        <Badge text="Gray" />
        <Badge type="red" text="Red" />
        <Badge type="yellow" text="Yellow" />
        <Badge type="green" text="Green" />
        <Badge type="blue" text="Blue" />
        <Badge type="indigo" text="Indigo" />
        <Badge type="purple" text="Purple" />
        <Badge type="pink" text="Pink" />
      </div>

      <div className="mt-8 space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
        <Badge text="Gray" rounded={true} />
        <Badge type="red" text="Red" rounded={true} />
        <Badge type="yellow" text="Yellow" rounded={true} />
        <Badge type="green" text="Green" rounded={true} />
        <Badge type="blue" text="Blue" rounded={true} />
        <Badge type="indigo" text="Indigo" rounded={true} />
        <Badge type="purple" text="Purple" rounded={true} />
        <Badge type="pink" text="Pink" rounded={true} />
      </div>

      <div className="mt-8 space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
        <Badge text="Gray" dot={true} />
        <Badge type="red" text="Red" dot={true} />
        <Badge type="yellow" text="Yellow" dot={true} />
        <Badge type="green" text="Green" dot={true} />
        <Badge type="blue" text="Blue" dot={true} />
        <Badge type="indigo" text="Indigo" dot={true} />
        <Badge type="purple" text="Purple" dot={true} />
        <Badge type="pink" text="Pink" dot={true} />
      </div>

      <div className="mt-8 space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
        <Avatar
          src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          rounded={true}
        />
        <Avatar text="TW" circular={true} />
        <Avatar circular={true} />
        <Avatar.Group
          options={[
            {
              src: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
            },
            {
              src: 'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
            },
            {
              src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80'
            }
          ]}
          circular={true}
          rounded={true}
        />
      </div>

      <div className="mt-8 space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
        <Switch title="Switch" />
        <Switch title="Switch" loading={true} />
        <Switch title="Switch" value={true} loading={true} />
      </div>

      <div className="mt-8 space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
        <Select
          title="Select"
          value={select}
          options={[
            { label: 'New comments', value: 'newComments' },
            { label: 'New followers', value: 'newFollowers' },
            { label: 'Offers', value: 'offers' }
          ]}
          native={true}
          onChange={setSelect}
        />

        <Select
          title="Select"
          value={select}
          options={[
            { label: 'New comments', value: 'newComments' },
            { label: 'New followers', value: 'newFollowers' },
            { label: 'Offers', value: 'offers' }
          ]}
          onChange={setSelect}
        />

        <Select
          title="Select"
          value={select}
          options={[
            { label: 'New comments', value: 'newComments' },
            { label: 'New followers', value: 'newFollowers' },
            { label: 'Offers', value: 'offers' }
          ]}
          loading={true}
        />

        <Select
          title="Select"
          value={select}
          valueRender={option =>
            option && (
              <div className="inline-flex items-center space-x-2">
                <Avatar src={option.picture} size={20} circular={true} rounded={true} />
                <span>{option.label}</span>
              </div>
            )
          }
          placeholder="Select an option"
          options={[
            {
              label: 'New comments',
              value: 'newComments',
              picture:
                'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
            },
            {
              label: 'New followers',
              value: 'newFollowers',
              picture:
                'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
            },
            {
              label: 'Offers',
              value: 'offers',
              picture:
                'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80'
            }
          ]}
          optionRender={option => (
            <div className="flex items-center">
              <Avatar
                className="mr-2"
                src={option.picture}
                size={24}
                circular={true}
                rounded={true}
              />
              {option.label}
            </div>
          )}
          onChange={setSelect}
        />
      </div>

      <div className="mt-8 space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
        <Tabs>
          <Tabs.Pane key="preview" title="Preview" leading={<EyeIcon />}>
            Preview content
          </Tabs.Pane>
          <Tabs.Pane key="code" title="Code" leading={<CodeIcon />}>
            Code content
          </Tabs.Pane>
        </Tabs>
      </div>
    </div>
  )
}

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
)
