import { GOOGLE_FONTS_OPTIONS } from '@/consts'
import { FormService } from '@/service'
import { useStore } from '@/store'
import { useParam } from '@/utils'
import { insertThemeStyle, insertWebFont } from '@heyforms/form-component'
import { Button, Form, notification, Select, stopPropagation, useForm } from '@heyforms/ui'
import { message } from '@heyui/component'
import { isURL } from '@hpnp/utils/helper'
import { observer } from 'mobx-react-lite'
import type { FC } from 'react'
import { useEffect, useState } from 'react'
import { BackgroundBrightness } from './BackgroundBrightness'
import { BackgroundImage } from './BackgroundImage'
import { ColorPickerField } from './ColorPickerField'

export const Customize: FC = observer(() => {
  const { formId } = useParam()
  const formStore = useStore('formStore')
  const [form] = useForm()
  const [loading, setLoading] = useState(false)

  function handleValuesChange(changedValues: any) {
    formStore.updateCustomTheme(changedValues)
  }

  async function handleFinish(theme: any) {
    if (loading) {
      return
    }

    setLoading(true)

    try {
      await FormService.updateTheme(formId, {
        theme
      })

      notification.success({
        title: 'Theme settings updated'
      })
    } catch (err: any) {
      notification.error({
        title: err.message
      })
    }

    setLoading(false)
  }

  function handleRevert(event: any) {
    stopPropagation(event)
    formStore.resetCustomTheme()

    // Reset form theme
    setTimeout(() => {
      form.setFieldsValue(formStore.theme)
      form.resetFields()
    }, 0)
  }

  useEffect(() => {
    insertWebFont(formStore.customTheme!.fontFamily)
    insertThemeStyle(formStore.customTheme!)
  }, [formStore.customTheme])

  return (
    <div>
      <Form
        form={form}
        initialValues={formStore.customTheme}
        onValuesChange={handleValuesChange}
        onFinish={handleFinish}
      >
        <div className="right-sidebar-group">
          <Form.Item name="fontFamily">
            <Select options={GOOGLE_FONTS_OPTIONS} />
          </Form.Item>

          <Form.Item name="questionTextColor">
            <ColorPickerField label="Questions" />
          </Form.Item>

          <Form.Item name="answerTextColor">
            <ColorPickerField label="Answers" />
          </Form.Item>

          <Form.Item name="buttonBackground">
            <ColorPickerField label="Buttons" />
          </Form.Item>

          <Form.Item name="buttonTextColor">
            <ColorPickerField label="Button text" />
          </Form.Item>

          <Form.Item name="backgroundColor">
            <ColorPickerField label="Background" />
          </Form.Item>
        </div>

        <div className="right-sidebar-group">
          <Form.Item name="backgroundImage">
            <BackgroundImage />
          </Form.Item>
        </div>

        {isURL(formStore.customTheme?.backgroundImage) && (
          <div className="right-sidebar-group">
            <Form.Item name="backgroundBrightness">
              <BackgroundBrightness backgroundImage={formStore.customTheme?.backgroundImage} />
            </Form.Item>
          </div>
        )}

        <Form.Item className="right-sidebar-group">
          <div className="flex items-center">
            <Button onClick={handleRevert}>Revert</Button>
            <Button className="ml-4 flex-1" type="primary" htmlType="submit" loading={loading}>
              Save changes
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  )
})
