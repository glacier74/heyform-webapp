import { FormCover } from '@/legacy_pages/pages/FormBuilder/nodes/FormCover'
import { FormName } from '@/legacy_pages/pages/FormBuilder/nodes/FormName'
import { loadFont, useStore } from '@/legacy_pages/utils'
import { Queue } from '@/legacy_pages/utils/queue'
import { FormService } from '@/service'
import { useParam } from '@/utils'
import { htmlUtils } from '@heyforms/answer-utils'
import { FieldKindEnum, FormField, FormModel } from '@heyforms/shared-types-enums'
import { ComponentProps, message } from '@heyui/component'
import { alpha } from '@hpnp/utils/color'
import { isURL, isValid } from '@hpnp/utils/helper'
import { observer } from 'mobx-react-lite'
import { FC, useEffect, useMemo, useReducer } from 'react'
import { ReactSortable } from 'react-sortablejs'
import styled, { ThemeProvider } from 'styled-components'
import {
  Address,
  CodeBlock,
  CountryPicker,
  DatePicker,
  Divider,
  EmailInput,
  Embed,
  FileUpload,
  FullName,
  Heading,
  Image,
  LegalTerms,
  LongText,
  MultipleChoice,
  NumberInput,
  OpinionScale,
  PageBreak,
  PhoneNumberInput,
  PictureChoice,
  Rating,
  ShortText,
  Signature,
  SingleChoice,
  Text,
  ThankYou,
  UrlInput,
  Welcome,
  YesNo
} from './nodes'
import {
  parseFields,
  parseThankYouPage,
  serializeHtmlSchema,
  StoreContext,
  storeReducer,
  useStoreContext
} from './store'

interface BuilderProps extends ComponentProps {
  form: FormModel
}

interface ItemProps {
  field: FormField
}

const Item: FC<ItemProps> = ({ field }) => {
  switch (field.kind) {
    case FieldKindEnum.SHORT_TEXT:
      return <ShortText field={field} />

    case FieldKindEnum.LONG_TEXT:
    case FieldKindEnum.LONG_TEXT_LEGACY:
      return <LongText field={field} />

    case FieldKindEnum.YES_NO:
      return <YesNo field={field} />

    case FieldKindEnum.RATING:
      return <Rating field={field} />

    case FieldKindEnum.OPINION_SCALE:
      return <OpinionScale field={field} />

    case FieldKindEnum.FILE_UPLOAD:
      return <FileUpload field={field} />

    case FieldKindEnum.NUMBER:
      return <NumberInput field={field} />

    case FieldKindEnum.DATE:
      return <DatePicker field={field} />

    case FieldKindEnum.HEADING_1:
      return <Heading level={1} field={field} />

    case FieldKindEnum.HEADING_2:
      return <Heading level={2} field={field} />

    case FieldKindEnum.HEADING_3:
      return <Heading level={3} field={field} />

    case FieldKindEnum.DIVIDER:
      return <Divider field={field} />

    case FieldKindEnum.PAGE_BREAK:
      return <PageBreak field={field} />

    case FieldKindEnum.FULL_NAME:
      return <FullName field={field} />

    case FieldKindEnum.EMAIL:
      return <EmailInput field={field} />

    case FieldKindEnum.ADDRESS:
      return <Address field={field} />

    case FieldKindEnum.PHONE_NUMBER:
      return <PhoneNumberInput field={field} />

    case FieldKindEnum.SIGNATURE:
      return <Signature field={field} />

    case FieldKindEnum.COUNTRY:
      return <CountryPicker field={field} />

    case FieldKindEnum.CODE_BLOCK:
      return <CodeBlock field={field} />

    case FieldKindEnum.LEGAL_TERMS:
      return <LegalTerms field={field} />

    case FieldKindEnum.URL:
      return <UrlInput field={field} />

    case FieldKindEnum.IMAGE:
      return <Image field={field} />

    case FieldKindEnum.EMBED:
      return <Embed field={field} />

    case FieldKindEnum.SINGLE_CHOICE:
      return <SingleChoice field={field} />

    case FieldKindEnum.MULTIPLE_CHOICE:
      return <MultipleChoice field={field} />

    // 兼容 Dropdown
    case FieldKindEnum.DROPDOWN:
      return (
        <SingleChoice
          field={{
            ...field,
            kind: FieldKindEnum.SINGLE_CHOICE,
            properties: {
              ...field.properties,
              choiceStyle: 'dropdown'
            }
          }}
        />
      )

    case FieldKindEnum.PICTURE_CHOICE:
      return <PictureChoice field={field} />

    default:
      return <Text field={field} />
  }
}

const Builder: FC<BuilderProps> = observer(({ form }) => {
  const initialState = {
    name: serializeHtmlSchema(form.name, form.nameSchema),
    version: 0,
    welcome: parseThankYouPage(form.welcomePage),
    thankYou: parseThankYouPage(form.thankYouPage),
    ...parseFields(form.fields),
    references: [],
    selection: {
      id: undefined,
      type: undefined
    }
  }
  const composeStore = useStore('composeStore')
  const [state, dispatch] = useReducer(storeReducer, initialState)
  const store = useMemo(() => ({ state, dispatch }), [state])

  useEffect(() => {
    loadFont(composeStore.theme.fontFamily)
  }, [composeStore.theme.fontFamily])

  return (
    <ThemeProvider theme={composeStore.theme}>
      <StoreContext.Provider value={store}>
        <Editor />
      </StoreContext.Provider>
    </ThemeProvider>
  )
})

const Editor: FC = () => {
  const { formId } = useParam()
  const { state, dispatch } = useStoreContext()
  const composeStore = useStore('composeStore')
  const queue = useMemo(() => {
    return new Queue({
      concurrency: 1,
      scheduleInterval: 1_000,
      taskIntervalTime: 10_000
    })
  }, [formId])

  function handleSetFields(fields: FormField[]) {
    dispatch({ type: 'setFields', payload: { fields } })
  }

  function visibilityListener() {
    if (document.visibilityState === 'hidden') {
      syncForm()
    }
  }

  async function syncForm() {
    try {
      await FormService.updateFormSchemas(formId, getUpdates())
    } catch (err: any) {
      message.error(err.message)
    }
  }

  function getUpdates() {
    const nameSchema = htmlUtils.parse(state.name!)
    const name = htmlUtils.plain(state.name!)

    const updates: Record<string, any> = {
      name,
      nameSchema
    }

    if (state.welcome) {
      updates.welcomePage = {
        icon: state.welcome.icon,
        titleSchema: htmlUtils.parse(state.welcome.title!),
        bodySchema: htmlUtils.parse(state.welcome.body!)
      }
    }

    if (state.thankYou) {
      updates.thankYouPage = {
        icon: state.thankYou.icon,
        titleSchema: htmlUtils.parse(state.thankYou.title!),
        bodySchema: htmlUtils.parse(state.thankYou.body!)
      }
    }

    updates.fields = state.fields!.map(row => {
      const field: FormField = {
        id: row.id,
        kind: row.kind,
        validations: row.validations,
        properties: row.properties
      }

      field.titleSchema = htmlUtils.parse(row.title!)

      // @ts-ignore
      if (isValid(row.body)) {
        // @ts-ignore
        field.bodySchema = htmlUtils.parse(row.body!)
      }

      return field
    })

    return updates
  }

  useEffect(() => {
    composeStore.updateForm(getUpdates())

    // Add to queue
    queue.add(async () => {
      await syncForm()
    })

    document.addEventListener('visibilitychange', visibilityListener)

    return () => {
      document.removeEventListener('visibilitychange', visibilityListener)
    }
  }, [state.version])

  return (
    <Container>
      {isURL(composeStore.theme.backgroundImage) && (
        <FormCover sourceUrl={composeStore.theme.backgroundImage!} />
      )}

      <FormName />

      {state.welcome && <Welcome />}

      <ReactSortable
        ghostClass="block-ghost"
        chosenClass="block-chosen"
        dragClass="block-dragging"
        fallbackClass="block-cloned"
        handle=".block-drag-handler"
        list={state.fields}
        setList={handleSetFields}
        animation={240}
        delay={10}
        forceFallback={true}
      >
        {state.fields.map((row: FormField) => (
          <Item key={row.id} field={row} />
        ))}
      </ReactSortable>

      {state.thankYou && <ThankYou />}
    </Container>
  )
}

const Container = styled.div`
  min-height: 100%;
  padding-bottom: 75px;
  background: ${props => props.theme.background};
  font-family: ${props => props.theme.fontFamily};

  .block-chosen .block-content {
    border-top: 3px solid #377dff;
  }

  .block-cloned {
    cursor: grab !important;
  }

  .block-selected .block-menu {
    opacity: 1;
  }

  .block-cloned .block-menu {
    opacity: 0 !important;
  }

  .block-text .block-rich-text:empty:before {
    display: none;
  }

  .block-title:empty:before,
  .block-selected .block-rich-text:empty:before,
  .block:nth-of-type(1):nth-last-of-type(1) .block-rich-text:empty:before {
    display: block;
  }

  #block-title {
    padding-bottom: 30px;
  }

  .block-welcome-title,
  .block-welcome-body,
  .block-thankyou-title,
  .block-thankyou-body,
  .block-title {
    &:empty:before {
      position: absolute;
      pointer-events: none;
      content: attr(placeholder);
      color: ${props => alpha(props.theme.question, 0.3)};
    }
  }

  .block-ghost {
    visibility: hidden;
  }

  .block-legal-terms-container .block-rich-text {
    padding: 0 0 0 8px;
  }

  .block-container {
    position: relative;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 100px;
    padding-right: 100px;
  }

  .mention {
    color: ${props => alpha(props.theme.question, 0.6)};
  }
`

export default Builder
