import { FormError } from '@/legacy_pages/components'
import { DangerIcon } from '@/legacy_pages/components/DangerIcon'
import { ProjectModel } from '@/legacy_pages/models'
import { ProjectService } from '@/service'
import { useStore } from '@/legacy_pages/utils'
import {
  Button,
  ComponentProps,
  Dropdown,
  Form,
  FormItem,
  Input,
  Menu,
  Modal,
  StringNumber
} from '@heyui/component'
import { MoreFillIcon } from '@heyui/icon'
import type { FC } from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink, useHistory } from 'react-router-dom'
import styled from 'styled-components'

interface ProjectLinkProps extends ComponentProps {
  workspaceId: string
  isOwner?: boolean
  project: ProjectModel
}

export const ProjectLink: FC<ProjectLinkProps> = ({
  workspaceId,
  isOwner = false,
  project,
  ...restProps
}) => {
  const history = useHistory()
  const { t } = useTranslation()
  const workspaceStore = useStore('workspaceStore')
  const appStore = useStore('appStore')
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const Overlay = (
    <StyledMenu onClick={handlerClick}>
      <Menu.Item name="rename">{t('Rename')}</Menu.Item>
      <Menu.Item name="delete" type="error">
        {t('Delete Project')}
      </Menu.Item>
    </StyledMenu>
  )

  function handlerClick(name: StringNumber) {
    switch (name) {
      case 'rename':
        appStore.toggleRenameProject(true, project)
        break

      case 'delete':
        setVisible(true)
        break
    }
  }

  async function handleFinish() {
    if (loading) {
      return
    }

    setLoading(true)

    try {
      await ProjectService.delete(project.id)
      workspaceStore.deleteProject(project.id)
      history.replace(`/workspace/${project.teamId}`)
    } catch (err: any) {
      setLoading(false)
      setError(err)
    }
  }

  function handleClose() {
    if (loading) {
      return
    }
    setVisible(false)
  }

  return (
    <NavLink to={`/workspace/${workspaceId}/project/${project.id}`} {...restProps}>
      <span>{project.name}</span>

      {isOwner && (
        <StyledDropdown placement="bottom-start" overlay={Overlay}>
          <MoreFillIcon />
        </StyledDropdown>
      )}

      <StyledModal
        icon={<DangerIcon />}
        title={t('Verify project deletion request')}
        description={
          <>
            <p>
              {t(
                'Keep in mind this operation is irreversible and will permanently delete all the data associated with this project.'
              )}
            </p>
            <p>
              {t(
                'Once you confirm to delete the project, you will no longer have access to the project data.'
              )}
            </p>
            <p>
              {t('Please type')} <strong>{project.name}</strong> {t('to confirm')}.
            </p>
          </>
        }
        visible={visible}
        maskClosable={false}
        onVisibleChange={setVisible}
        onClose={handleClose}
      >
        <Form onFinish={handleFinish}>
          <FormItem
            name="name"
            rules={[
              {
                required: true,
                validator: async (rule, value) => {
                  if (value !== project.name) {
                    throw new Error(rule.message as string)
                  }
                },
                message: t('Invalid project name')
              }
            ]}
          >
            <Input />
          </FormItem>
          {error && <FormError error={error} />}
          <FormItem>
            <Button type="error" htmlType="submit" block={true} loading={loading}>
              {t('I understand, delete the project anyway')}
            </Button>
          </FormItem>
        </Form>
      </StyledModal>
    </NavLink>
  )
}

const StyledDropdown = styled(Dropdown)`
  user-select: none;
  transition: transform 0.3s;
  width: 20px;
  height: 20px;
  padding: 2px;
  border-radius: 50%;

  &:active {
    transform: scale(0.98);
  }

  &:hover {
    color: #4e5d78;
    background: #f5f6f7;
  }

  svg {
    color: #8a94a6;
  }
`

const StyledMenu = styled(Menu)`
  width: 200px;
`

const StyledModal = styled(Modal)`
  position: relative;
  width: 480px;
  padding: 48px 36px 32px 36px;
`
