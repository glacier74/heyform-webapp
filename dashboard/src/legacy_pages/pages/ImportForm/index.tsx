import { Error, FormError, Heading } from '@/legacy_pages/components'
import { NavBarContainer } from '@/legacy_pages/layouts/views/NavBarContainer'
import { useStore } from '@/legacy_pages/utils'
import { FormService } from '@/service'
import { useParam } from '@/utils'
import { Button, Form, FormItem, Input } from '@heyui/component'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

const ImportForm = observer(() => {
  const history = useHistory()
  const { t } = useTranslation()
  const workspaceStore = useStore('workspaceStore')
  const { workspaceId, projectId } = useParam()
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleFinish(values: any) {
    if (loading) {
      return
    }

    setLoading(true)
    setError(null)

    try {
      const result = await FormService.import(projectId, values.url)
      fetchForms()
      history.push(`/workspace/${workspaceId}/project/${projectId}/form/${result}/create`)
    } catch (err: any) {
      setError(err)
      setLoading(false)
    }
  }

  async function fetchForms() {
    const result = await FormService.forms(projectId)
    workspaceStore.setFormsMap(projectId, result)
  }

  function handleNavigateBack() {
    history.goBack()
  }

  return (
    <Container navigateBackTitle={t('improtForm.createForm')} onNavigateBack={handleNavigateBack}>
      <Heading description={t('improtForm.importText')}>
        {t('improtForm.ImportForm')}
      </Heading>

      <Header>{t('improtForm.works')}</Header>

      <Tips>
        <p>
          {t(
            'improtForm.Text'
          )}
        </p>
        <p>
          {t('improtForm.testText')}
        </p>
      </Tips>

      <Form style={{ marginTop: 32 }} onFinish={handleFinish}>
        <FormItem
          className="item"
          name="url"
          label={t('improtForm.formURL')}
          rules={[
            {
              required: true,
              type: 'url',
              message: t('improtForm.enterURL')
            }
          ]}
          labelClassName="label"
          hideRequiredMark={true}
        >
          <Input placeholder="https://www.example.com"/>
        </FormItem>
        {error && <FormError error={error}/>}
        <FormItem>
          <Button type="primary" htmlType="submit" block={true} loading={loading}>
            {t('improtForm.Detect')}
          </Button>
        </FormItem>
      </Form>
    </Container>
  )
})

const Container = styled(NavBarContainer)`
  .hey-form-item {
    padding-bottom: 24px;

    &.hey-form-item-inline {
      padding-bottom: 0;
    }
  }

  .hey-label {
    margin-bottom: 10px;
    color: #8a94a6;

    label {
      font-weight: 400;
    }
  }

  .hey-label-less {
    .hey-label {
      margin-bottom: 0;
    }
  }

  .hey-input {
    input {
      padding: 10px;

      &:hover {
        border-color: #377dff;
      }

      &::placeholder {
        color: #b0b7c3;
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

  .hey-button {
    height: 40px;
    padding: 10px 24px;
  }
`

const Header = styled.div`
  margin-bottom: 20px;
  margin-top: 48px;
  font-size: 16px;
  font-weight: 600;
  color: #4e5d78;
`

const Tips = styled.div`
  margin-bottom: 24px;
  color: #b0b7c3;
`

export default ImportForm
