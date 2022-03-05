import { Request } from '@/legacy_pages/components'
import Builder from '@/legacy_pages/pages/FormBuilder/builder'
import { useStore } from '@/legacy_pages/utils'
import { FormService } from '@/service'
import { useParam } from '@/utils'
import { FormModel } from '@heyforms/shared-types-enums'
import { Flex } from '@heyui/component'
import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Leftbar } from '../Compose/views/Leftbar'

const FormBuilder: FC = () => {
  const { formId } = useParam()
  const composeStore = useStore('composeStore')
  const [form, setForm] = useState<FormModel>()

  async function fetchFormDetail() {
    const result = await FormService.detail(formId)
    setForm(result)
    composeStore.setForm(result)
    return true
  }

  useEffect(() => {
    composeStore.clearTabKey()
  }, [formId])

  return (
    <Container>
      <Leftbar />
      <StyledRequest className="scrollbar" fetch={fetchFormDetail}>
        {form && <Builder form={form!} />}
      </StyledRequest>
    </Container>
  )
}

const Container = styled(Flex)`
  height: calc(100vh - 60px);
`

const StyledRequest = styled(Request)`
  flex: 1;
  background: #fafbfc;
  height: calc(100vh - 60px);
  overflow-y: auto;
`

export default FormBuilder
