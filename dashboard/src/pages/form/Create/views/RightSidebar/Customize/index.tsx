import { GOOGLE_FONTS_OPTIONS } from '@/consts'
import { useStore } from '@/store'
import { insertThemeStyle, insertWebFont } from '@heyforms/form-component'
import { Button, Form, Select, stopPropagation, useForm } from '@heyforms/ui'
import { isURL } from '@hpnp/utils/helper'
import { observer } from 'mobx-react-lite'
import type { FC } from 'react'
import { useEffect } from 'react'
import { BackgroundBrightness } from './BackgroundBrightness'
import { BackgroundImage } from './BackgroundImage'
import { ColorPickerField } from './ColorPickerField'

export const Customize: FC = observer(() => {
  const formStore = useStore('formStore')
  const [form] = useForm()

  function handleValuesChange(changedValues: any) {
    formStore.updateTheme(changedValues)
  }

  function handleFinish(values: any) {
    console.log(values)
  }

  function handleRevert(event: any) {
    stopPropagation(event)
    formStore.clearCustomTheme()

    setTimeout(() => {
      form.setFieldsValue(formStore.theme)
      form.resetFields()
    }, 0)
  }

  useEffect(() => {
    insertWebFont(formStore.theme.fontFamily)
    insertThemeStyle(formStore.theme)
  }, [formStore.theme])

  return (
    <div>
      <Form
        form={form}
        initialValues={formStore.theme}
        onValuesChange={handleValuesChange}
        onFinish={handleFinish}
      >
        <div className="right-sidebar-group">
          <Form.Item name="fontFamily">
            <Select options={GOOGLE_FONTS_OPTIONS} />
          </Form.Item>

          <Form.Item name="questionTextColor">
            <ColorPickerField
              label="Questions"
            />
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

        {isURL(formStore.theme.backgroundImage) && (
          <div className="right-sidebar-group">
            <Form.Item name="backgroundBrightness">
              <BackgroundBrightness backgroundImage={formStore.theme.backgroundImage} />
            </Form.Item>
          </div>
        )}

        <Form.Item className="right-sidebar-group">
          <div className="flex items-center">
            <Button onClick={handleRevert}>Revert</Button>
            <Button className="ml-4 flex-1" type="primary" htmlType="submit">
              Save changes
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  )
})
