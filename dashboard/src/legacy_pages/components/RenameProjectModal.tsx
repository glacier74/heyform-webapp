/**
 * @program: heyform-dashboard
 * @description:
 * @author: mufeng
 * @date: 11/16/21 2:05 PM
 **/

import { Heading } from '@/legacy_pages/components/index'
import { NavBarContainer } from '@/legacy_pages/layouts/views/NavBarContainer'
import { ProjectService, WorkspaceService } from '@/service'
import { useStore } from '@/legacy_pages/utils'
import { Button, Form, FormItem, Input, message } from '@heyui/component'
import { isEqual } from '@hpnp/utils/helper'
import { observer } from 'mobx-react-lite'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

export const RenameProjectModal: FC = observer(() => {
  const { t } = useTranslation()
  const appStore = useStore('appStore')
  const workspaceStore = useStore('workspaceStore')
  const [loading, setLoading] = useState(false)

  function handleClose() {
    appStore.toggleRenameProject(false)
  }

  async function handleFinish(values: any) {
    if (isEqual(values.name, appStore.renameProject?.name)) {
      return
    }

    if (loading) {
      return
    }

    setLoading(true)

    try {
      await ProjectService.rename(appStore.renameProject?.id!, values.name)
      const result = await WorkspaceService.workspaces()
      workspaceStore.setWorkspaces(result)

      handleClose()
    } catch (err: any) {
      message.error('Failed to rename the project')
    }

    setLoading(false)
  }

  return (
    <>
      {appStore.renameProjectVisible && (
        <Container close={true} onClose={handleClose}>
          <Content>
            <Heading
              style={{
                textAlign: 'center'
              }}
            >
              {t('Rename project')}
            </Heading>

            <Form
              initialValues={{
                name: appStore.renameProject?.name
              }}
              style={{
                marginTop: 48
              }}
              onFinish={handleFinish}
            >
              <FormItem
                name="name"
                label={t('Workspace Name')}
                hideRequiredMark={true}
                rules={[
                  {
                    required: true,
                    message: t("Workspace name can't be empty")
                  }
                ]}
                style={{
                  marginTop: 24
                }}
              >
                <Input placeholder={t('eg: New Workspace')} />
              </FormItem>
              <FormItem>
                <Button type="primary" htmlType="submit" block={true} loading={loading}>
                  {t('Rename')}
                </Button>
              </FormItem>
            </Form>
          </Content>
        </Container>
      )}
    </>
  )
})

const Container = styled(NavBarContainer)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  z-index: 9999;
  overflow-y: auto;
`

const Content = styled.div`
  .hey-form-item {
    padding-bottom: 0;
  }

  .hey-input {
    padding-bottom: 24px;

    input {
      padding: 10px;
      border: 1px solid rgba(0, 0, 0, 0.2);

      &:hover {
        border-color: #377dff;
      }

      &::placeholder {
        color: #b0b7c3;
      }
    }

    &.hey-input-password {
      input {
        padding-right: 44px;
      }

      div {
        right: 14px;
      }
    }

    & > svg {
      position: absolute;
      top: 50%;
      left: 14px;
      margin-top: -10px;
    }

    svg {
      width: 20px;
      height: 20px;
      color: #c1c7d0;
    }
  }

  .hey-form-item-error {
    bottom: 6px;
  }

  .hey-button {
    padding-top: 10px;
    padding-bottom: 10px;
  }
`
