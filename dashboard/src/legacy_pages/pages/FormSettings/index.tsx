import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { Basic } from './views/Basic'
import { FormStatus } from './views/FormStatus'
import { Protection } from './views/Protection'

const FormSettings: FC = () => {
  const { t } = useTranslation()

  return (
    <div className="container max-w-3xl mx-auto py-24">
      <Content>
        <div className="pb-4 mb-4 border-b border-slate-200">
          <h3 className="text-xl font-bold text-slate-900">{t('formSettings.Form')}</h3>
        </div>
        <FormStatus />
        <Basic />
        <Protection />
      </Content>
    </div>
  )
}

export default FormSettings

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
        border-color: #0252d7;
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

  .heyform-item-error {
    .hey-select {
      border-color: #ff1711;
    }
  }
`
