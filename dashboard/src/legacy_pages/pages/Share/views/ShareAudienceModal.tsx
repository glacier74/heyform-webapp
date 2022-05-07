import { Error, FormError, Heading } from '@/legacy_pages/components'
import { NavBarContainer } from '@/legacy_pages/layouts/views/NavBarContainer'
import { GroupModel } from '@/legacy_pages/models'
import { useAsyncEffect } from '@/legacy_pages/utils'
import { AudienceService } from '@/service'
import { useParam } from '@/utils'
import { Button, Form, FormItem, message, MultipleSelect } from '@heyui/component'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

interface ShareAudienceModalProps {
  visible?: boolean
  onVisibleChange?: (visible: boolean) => void
}

export const ShareAudienceModal: FC<ShareAudienceModalProps> = ({ visible, onVisibleChange }) => {
  const { t } = useTranslation()
  const { workspaceId, formId } = useParam()
  const [groups, setGroups] = useState<GroupModel[]>([])
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(false)
  const [pending, setPending] = useState(false)

  async function handleFinish(values: any) {
    if (loading) {
      return
    }

    setLoading(true)

    try {
      await AudienceService.share({
        formId,
        groupIds: values.groupIds
      })
      message.success(t('share.shared'))
    } catch (err: any) {
      setError(err)
    }

    setLoading(false)
  }

  async function handleCreateGroup(name: string) {
    const result = await AudienceService.createGroup({
      teamId: workspaceId,
      name
    })

    setGroups([{ id: result, name }, ...groups])
    return result
  }

  function handleClose() {
    onVisibleChange && onVisibleChange(false)
  }

  useAsyncEffect(async () => {
    if (visible) {
      setPending(true)

      try {
        const result = await AudienceService.groups({
          teamId: workspaceId,
          page: 1,
          limit: 0
        })
        setGroups(result.groups)
      } catch (err: any) {
        message.error(t('share.fetchGroups'))
      }

      setPending(false)
    }
  }, [workspaceId, visible])

  return (
    <>
      {visible && (
        <Container close={true} onClose={handleClose}>
          <Content>
            <Heading
              description={
                <>
                  {t('share.selectGroups')}{' '}
                  <a href={`/workspace/${workspaceId}/audience`}>{t('share.addContacts')}</a>{' '}
                  {t('share.Or')}
                  <a href={`/workspace/${workspaceId}/audience/groups`}>{t('share.groups')}</a>.
                </>
              }
              style={{
                textAlign: 'center'
              }}
            >
              {t('share.ShareAudience')}
            </Heading>

            <Form
              style={{
                marginTop: 48
              }}
              onFinish={handleFinish}
            >
              <FormItem
                className="item"
                name="groupIds"
                label={t('share.Groups')}
                rules={[
                  {
                    required: true,
                    type: 'array',
                    message: t('share.noGroups')
                  }
                ]}
                labelClassName="label"
                hideRequiredMark={true}
                style={{
                  paddingBottom: 24
                }}
              >
                <StyledMultipleSelect
                  options={groups}
                  valueKey="id"
                  labelKey="name"
                  placeholder={t('share.findGroup')}
                  newOptionsPrefix={t('share.createGroup')}
                  disabled={pending}
                  onCreate={handleCreateGroup}
                />
              </FormItem>
              {error && <FormError error={error}/>}
              <FormItem>
                <Button type="primary" htmlType="submit" block={true} loading={loading}>
                  {t('share.Share')}
                </Button>
              </FormItem>
            </Form>
          </Content>
        </Container>
      )}
    </>
  )
}

const Container = styled(NavBarContainer)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  z-index: 99;
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

      &:hover {
        border-color: #0252d7;
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

const StyledMultipleSelect = styled(MultipleSelect)`
  width: 100%;
  background: #fff;
  border: 1px solid #f3f3f3;

  &:hover {
    border-color: #0252d7;
  }

  & > .hey-flex {
    width: 100%;
    padding: 0 24px;
    align-items: center;

    svg {
      margin-right: -6px;
      color: #b0b7c3;
    }
  }

  .hey-multiple-select-tag-list {
    display: flex;
    flex-wrap: wrap;
    min-height: 42px;
    padding-top: 4px;
    padding-bottom: 4px;
  }

  .hey-multiple-select-tag {
    height: 28px;
    margin-right: 8px;
    margin-top: 4px;
    margin-bottom: 4px;
    padding-left: 16px;
    padding-right: 32px;
    line-height: 28px;
    border-radius: 3px;
    background: rgba(135, 131, 120, 0.2);
    font-size: 13px;

    svg {
      margin-right: 0px;
      width: 18px;
      height: 18px;
    }
  }
`
