import { Heading, SubHeading } from '@/legacy_pages/components'
import { NavBarContainer } from '@/legacy_pages/layouts/views/NavBarContainer'
import { observer } from 'mobx-react-lite'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { Basic } from './views/Basic'
import { DeleteForm } from './views/DeleteForm'
import { FormStatus } from './views/FormStatus'
import { Protection } from './views/Protection'

const FormSettings: FC = observer(() => {
  const { t } = useTranslation()
  const history = useHistory()

  function handleClose() {
    history.goBack()
  }

  return (
    <Container close={true} onClose={handleClose}>
      <Content>
        <Heading description={t('Manage your form settings')}>{t('Form')}</Heading>

        <FormStatus />
        <Basic />
        <Protection />

        <SubHeading>{t('Extra')}</SubHeading>
        <DeleteForm />
      </Content>
    </Container>
  )
})

export default FormSettings

const Container = styled(NavBarContainer)`
  .content {
    width: 640px;
  }
`

const Content = styled.div`
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
