import { ColorDropPicker, ScrollBarStyle } from '@/legacy_pages/components'
import { ImagePicker } from '@/legacy_pages/components/ImagePicker'
import {
  ANSWER_FONT_SIZES_OPTIONS,
  FONT_FAMILY_OPTIONS,
  QUESTION_FONT_SIZES_OPTIONS,
  TITLE_FONT_SIZES_OPTIONS
} from '@/legacy_pages/constants'
import { ComposeTabKeyEnum } from '@/legacy_pages/models'
import { FormService } from '@/service'
import { loadFont, useStore } from '@/legacy_pages/utils'
import { customTheme } from '@heyforms/form-component'
import { Form, FormItem, message, Select } from '@heyui/component'
import { observer } from 'mobx-react-lite'
import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useParam } from '@/utils'
import styled from 'styled-components'
import { SettingsExplanation } from './common/BasicSettings'

export const Customize: FC = observer(() => {
  const { t } = useTranslation()
  const composeStore = useStore('composeStore')
  const { formId } = useParam()

  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  useEffect(() => {
    if (composeStore.activeTab === ComposeTabKeyEnum.CUSTOMIZE) {
      form.resetFields()
    }
  }, [composeStore.activeTab])

  async function handleFinish(values: IMapType) {
    if (loading) {
      return
    }

    setLoading(true)

    try {
      await FormService.updateTheme(formId, {
        theme: customTheme(values)
      })

      message.success('Theme settings have been successfully updated')
    } catch (err: any) {
      console.error(err)
      message.error('Update theme failed')
    }

    setLoading(false)
  }

  function handleValuesChange(changes: IMapType, allValues: IMapType) {
    composeStore.setTheme(customTheme(allValues))

    if (changes.fontFamily) {
      loadFont(changes.fontFamily)
    }
  }

  function handleSubmit() {
    form.submit()
  }

  return (
    <Container>
      <Form
        form={form}
        initialValues={composeStore.theme}
        onValuesChange={handleValuesChange}
        onFinish={handleFinish}
      >
        <SettingsExplanation>{t('General')}</SettingsExplanation>
        <FormItem
          className="item"
          labelClassName="label"
          label={t('Font')}
          name="fontFamily"
          inline={true}
        >
          <Select
            className="select"
            options={FONT_FAMILY_OPTIONS}
            allowClear={false}
            onClose={handleSubmit}
          />
        </FormItem>
        <FormItem
          className="item"
          labelClassName="label"
          label={t('Cover')}
          name="backgroundImage"
          inline={true}
        >
          <ImagePicker onSelect={handleSubmit} />
        </FormItem>
        <FormItem
          className="item"
          labelClassName="label"
          label={t('Background')}
          name="background"
          inline={true}
        >
          <ColorDropPicker key="ColorDropPicker" onClose={handleSubmit} />
        </FormItem>

        <SettingsExplanation style={{ marginTop: 10 }}>{t('Header')}</SettingsExplanation>
        <FormItem
          className="item"
          labelClassName="label"
          label={t('Title Size')}
          name="titleFontSize"
          inline={true}
        >
          <Select
            className="font-size-select"
            options={TITLE_FONT_SIZES_OPTIONS}
            allowClear={false}
            onClose={handleSubmit}
          />
        </FormItem>
        <FormItem
          className="item"
          labelClassName="label"
          label={t('Title')}
          name="title"
          inline={true}
        >
          <ColorDropPicker onClose={handleSubmit} />
        </FormItem>

        <SettingsExplanation style={{ marginTop: 10 }}>{t('Form')}</SettingsExplanation>
        <FormItem
          className="item"
          labelClassName="label"
          label={t('Question')}
          name="question"
          inline={true}
        >
          <ColorDropPicker onClose={handleSubmit} />
        </FormItem>
        <FormItem
          className="item"
          labelClassName="label"
          label={t('Question Size')}
          name="questionFontSize"
          inline={true}
        >
          <Select
            className="font-size-select"
            options={QUESTION_FONT_SIZES_OPTIONS}
            allowClear={false}
            onClose={handleSubmit}
          />
        </FormItem>
        <FormItem
          className="item"
          labelClassName="label"
          label={t('Answer')}
          name="answer"
          inline={true}
        >
          <ColorDropPicker onClose={handleSubmit} />
        </FormItem>
        <FormItem
          className="item"
          labelClassName="label"
          label={t('Answer Size')}
          name="answerFontSize"
          inline={true}
        >
          <Select
            className="font-size-select"
            options={ANSWER_FONT_SIZES_OPTIONS}
            allowClear={false}
            onClose={handleSubmit}
          />
        </FormItem>
        <FormItem
          className="item"
          labelClassName="label"
          label={t('Button Background')}
          name="button"
          inline={true}
        >
          <ColorDropPicker onClose={handleSubmit} />
        </FormItem>
        <FormItem
          className="item"
          labelClassName="label"
          label={t('Button Text')}
          name="buttonText"
          inline={true}
        >
          <ColorDropPicker onClose={handleSubmit} />
        </FormItem>
      </Form>
    </Container>
  )
})

const Container = styled.div`
  padding-left: 8px;
  padding-right: 8px;

  .hey-form-item {
    padding-bottom: 8px;
  }

  .label {
    margin-bottom: 4px;

    label {
      font-weight: 400;
      color: #8a94a6;
    }
  }

  .select,
  .font-size-select {
    &,
    button {
      width: 100%;
    }

    button {
      min-width: 70px;
      height: 32px;
      padding: 0 32px 0 12px;
      background: #f3f3f3;
      color: #4e5d78;
      border: none;
    }
  }

  .font-size-select {
    .hey-select-label {
      min-width: 0;
    }

    button {
      min-width: 80px;
      padding-right: 12px;
    }
  }

  input[type='text'],
  input[type='number'] {
    padding-top: 6px;
    padding-bottom: 6px;
  }
`
