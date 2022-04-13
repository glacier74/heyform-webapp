import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline'
import { FieldKindEnum } from '@heyforms/shared-types-enums'
import { Button } from '@heyforms/ui'
import type { FC } from 'react'
import { useMemo } from 'react'
import { useStore } from '../store'
import { Address } from './Address'
import { Country } from './Country'
import { Date } from './Date'
import { Email } from './Email'
import { FileUpload } from './FileUpload'
import { FullName } from './FullName'
import { LegalTerms } from './LegalTerms'
import { LongText } from './LongText'
import { MultipleChoice } from './MultipleChoice'
import { Number } from './Number'
import { OpinionScale } from './OpinionScale'
import { PhoneNumber } from './PhoneNumber'
import { PictureChoice } from './PictureChoice'
import { Rating } from './Rating'
import { ShortText } from './ShortText'
import { Signature } from './Signature'
import { Statement } from './Statement'
import { ThankYou } from './ThankYou'
import { Website } from './Website'
import { Welcome } from './Welcome'
import { YesNo } from './YesNo'

const Main: FC = () => {
  const { state } = useStore()

  return useMemo(() => {
    const field = state.fields[state.scrollIndex!]

    switch (field.kind) {
      case FieldKindEnum.ADDRESS:
        return <Address key={field.id} field={field} />

      case FieldKindEnum.COUNTRY:
        return <Country key={field.id} field={field} />

      case FieldKindEnum.FULL_NAME:
        return <FullName key={field.id} field={field} />

      case FieldKindEnum.DATE:
        return <Date key={field.id} field={field} />

      case FieldKindEnum.EMAIL:
        return <Email key={field.id} field={field} />

      case FieldKindEnum.FILE_UPLOAD:
        return <FileUpload key={field.id} field={field} />

      case FieldKindEnum.MULTIPLE_CHOICE:
        return <MultipleChoice key={field.id} field={field} />

      case FieldKindEnum.NUMBER:
        return <Number key={field.id} field={field} />

      case FieldKindEnum.OPINION_SCALE:
        return <OpinionScale key={field.id} field={field} />

      case FieldKindEnum.PHONE_NUMBER:
        return <PhoneNumber key={field.id} field={field} />

      case FieldKindEnum.PICTURE_CHOICE:
        return <PictureChoice key={field.id} field={field} />

      case FieldKindEnum.RATING:
        return <Rating key={field.id} field={field} />

      case FieldKindEnum.URL:
        return <Website key={field.id} field={field} />

      case FieldKindEnum.YES_NO:
        return <YesNo key={field.id} field={field} />

      case FieldKindEnum.LONG_TEXT:
        return <LongText key={field.id} field={field} />

      case FieldKindEnum.SIGNATURE:
        return <Signature key={field.id} field={field} />

      case FieldKindEnum.LEGAL_TERMS:
        return <LegalTerms key={field.id} field={field} />

      case FieldKindEnum.SHORT_TEXT:
        return <ShortText key={field.id} field={field} />

      default:
        return <Statement key={field.id} field={field} />
    }
  }, [state.scrollIndex])
}

const Footer: FC = () => {
  const { state, dispatch } = useStore()

  function handlePrevious() {
    dispatch({ type: 'scrollPrevious' })
  }

  function handleNext() {
    dispatch({ type: 'scrollNext' })
  }

  return (
    <div className="heyform-footer">
      <div className="heyform-footer-wrapper">
        <div className="heyform-pagination">
          <Button.Link
            className="heyform-pagination-previous"
            trailing={<ChevronUpIcon />}
            disabled={state.scrollIndex! < 1}
            onClick={handlePrevious}
          />
          <Button.Link
            className="heyform-pagination-next"
            trailing={<ChevronDownIcon />}
            disabled={state.scrollIndex! >= state.fields.length - 1}
            onClick={handleNext}
          />
        </div>

        {!state.settings?.removeBranding && (
          <a className="heyform-branding" href="https://heyform.net" target="_blank">
            Power by HeyForm
          </a>
        )}
      </div>
    </div>
  )
}

export const BlockWrapper = () => {
  const { state } = useStore()

  if (!state.isStarted && state.welcomeField) {
    return <Welcome field={state.welcomeField} />
  }

  if (state.isSubmitted) {
    const field: any = state.thankYouField || {
      title: 'Thank you!',
      description: 'Thanks for completing this form. Now create your own form.',
      properties: {
        buttonText: 'Create a heyform'
      }
    }

    return <ThankYou field={field} />
  }

  return (
    <>
      <Main />
      <Footer />
    </>
  )
}
