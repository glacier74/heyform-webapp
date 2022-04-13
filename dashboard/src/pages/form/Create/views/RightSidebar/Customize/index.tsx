import { GOOGLE_FONTS_OPTIONS } from '@/consts'
import { useStore } from '@/store'
import { insertThemeStyle, loadWebFont } from '@heyforms/form-component'
import { Button, Form, Select } from '@heyforms/ui'
import { observer } from 'mobx-react-lite'
import type { FC } from 'react'
import { useEffect } from 'react'
import { BackgroundImage } from './BackgroundImage'
import { ColorPickerField } from './ColorPickerField'

export const Customize: FC = observer(() => {
  const formStore = useStore('formStore')

  function handleValuesChange(changedValues: any) {
    console.log(changedValues)
    formStore.updateTheme(changedValues)
  }

  function handleFinish(values: any) {
    console.log(values)
  }

  useEffect(() => {
    loadWebFont(formStore.theme.fontFamily)
    insertThemeStyle(formStore.theme)
  }, [formStore.theme])

  return (
    <div>
      <Form
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
              onChange={v => {
                console.log(v)
              }}
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

        <BackgroundImage />

        <Form.Item className="right-sidebar-group">
          <div className="flex items-center">
            <Button>Revert</Button>
            <Button className="ml-4 flex-1" type="primary" htmlType="submit">
              Save changes
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  )
})
