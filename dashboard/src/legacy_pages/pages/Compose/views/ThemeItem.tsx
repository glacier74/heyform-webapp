import { Loader } from '@/legacy_pages/components'
import { FormThemeV2 } from '@/legacy_pages/models'
import { useStore } from '@/legacy_pages/utils'
import { FormService } from '@/service'
import { useParam } from '@/utils'
import { customTheme } from '@heyforms/form-component'
import { Flex, message } from '@heyui/component'
import { observer } from 'mobx-react-lite'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

export const ThemeItem: FC<FormThemeV2> = observer(props => {
  const { t } = useTranslation()
  const { formId } = useParam()
  const [loading, setLoading] = useState(false)
  const composeStore = useStore('composeStore')

  async function handleClick() {
    setLoading(true)

    try {
      const themeOptions: any = {
        theme: customTheme(props as FormThemeV2)
      }

      await FormService.updateTheme(formId, themeOptions)
      composeStore.setTheme(themeOptions.theme)

      message.success('Theme settings have been successfully updated')
    } catch (err: any) {
      console.error(err)
      message.error('Failed to update theme')
    }

    setLoading(false)
  }

  return (
    <Container column={true} background={props.background} onClick={handleClick}>
      <Question question={props.question}>{t('Question')}</Question>
      <Answer answer={props.answer}>{t('Answer')}</Answer>
      <Button button={props.button} />
      {loading && <StyledLoader />}
    </Container>
  )
})

const Container = styled(Flex)<FormThemeV2>`
  position: relative;
  height: 120px;
  margin-bottom: 24px;
  padding: 24px;
  background: ${props => props.background};
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 2px 4px;

  &:nth-of-type(3n) {
    margin-right: 0;
  }
`

const Question = styled.div<FormThemeV2>`
  font-size: 16px;
  line-height: 24px;
  color: ${props => props.question};
`

const Answer = styled(Question)<FormThemeV2>`
  font-size: 14px;
  line-height: 20px;
  color: ${props => props.answer};
`

const Button = styled(Answer)<FormThemeV2>`
  width: 3.75rem;
  height: 24px;
  border-radius: 8px;
  margin-top: 12px;
  background: ${props => props.button};
`

const StyledLoader = styled(Loader)`
  background-color: rgba(0, 0, 0, 0.3);
  color: #fff;
`
