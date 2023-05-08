import { INTERNAL_COLUMN_KINDS, InternalColumnKindEnum } from '@/legacy_pages/constants'
import { FieldKindEnum, ServerSidePaymentValue } from '@heyforms/shared-types-enums'
import {
  Flex,
  FormLabel,
  IconText,
  Image,
  Input,
  TagGroup,
  TagPicker,
  Tooltip
} from '@heyui/component'
import { ArrowDownSIcon, ArrowUpSIcon, AttachmentIcon, ImageIcon, MinimizeIcon } from '@heyui/icon'
import { unixDate } from '@hpnp/utils/date'
import { isEmpty, isValid, isValidArray } from '@hpnp/utils/helper'
import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled, { css } from 'styled-components'
import { SheetKindIcon } from './SheetKindIcon'
import { OnColumnOptionsUpdate, SheetCellProps, SheetColumn } from './types'
import { CURRENCY_SYMBOLS } from '@heyforms/answer-utils'
import Big from 'big.js'
import { CheckIcon } from '@heroicons/react/outline'
import { ClockIcon } from '@heroicons/react/solid'

interface SheetRowModalProps {
  visible?: boolean
  columns: SheetColumn[]
  rowIdx: number
  rowCount: number
  row?: Record<string, any> | null
  onNextSubmission?: () => void
  onPrevSubmission?: () => void
  onClose?: () => void
  onColumnOptionsUpdate?: OnColumnOptionsUpdate
  onCellValueChange?: (rowIdx: number, column: SheetColumn, value: any) => void
}

const InputItem: FC<SheetCellProps> = ({ column, row }) => {
  return <TextContainer>{row[column.key]}</TextContainer>
}

const DropdownItem: FC<SheetCellProps> = ({ column, row }) => {
  const choice = column.properties?.choices?.find(choice => choice.id === row[column.key])

  return <TextContainer>{choice && <TagGroup round={true} tags={[choice]} />}</TextContainer>
}

const UrlItem: FC<SheetCellProps> = ({ column, row }) => {
  const url = row[column.key]

  return (
    <TextContainer>
      <a href={url} target="_blank" rel="noreferrer">
        {url}
      </a>
    </TextContainer>
  )
}

const DateItem: FC<SheetCellProps> = ({ column, row }) => {
  return <ShortTextContainer>{row[column.key]}</ShortTextContainer>
}

const DateRangeItem: FC<SheetCellProps> = ({ column, row }) => {
  const value = row[column.key]
  const arrays = [value?.start, value?.end].filter(Boolean)

  return <ShortTextContainer>{arrays.join(' - ')}</ShortTextContainer>
}

const InputTableItem: FC<SheetCellProps> = ({ column, row }) => {
  const value = row[column.key]
  const columns = column.properties?.tableColumns || []

  return (
    <PictureChoiceContainer>
      <table className="w-full divide-y divide-gray-300">
        <thead>
          <tr>
            {columns.map(c => (
              <th key={c.id} className="py-1.5 px-3 text-left text-sm font-semibold text-slate-900">
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {isValidArray(value) && (
            <>
              {value!.map((v, index) =>
                v ? (
                  <tr key={index}>
                    {columns.map(c => (
                      <td key={c.id} className="whitespace-nowrap py-2 px-3 text-sm text-slate-500">
                        {v[c.id]}
                      </td>
                    ))}
                  </tr>
                ) : null
              )}
            </>
          )}
        </tbody>
      </table>
    </PictureChoiceContainer>
  )
}

const OpinionScaleItem: FC<SheetCellProps> = ({ column, row }) => {
  return (
    <ShortTextContainer>
      {row[column.key]} / {column.properties?.total}
    </ShortTextContainer>
  )
}

const PictureChoiceItem: FC<SheetCellProps> = ({ column, row }) => {
  const choices = column.properties?.choices?.filter(choice =>
    row[column.key]?.value?.includes(choice.id)
  )

  return (
    <PictureChoiceContainer>
      {isValid(choices) ? (
        <PictureChoiceFlex>
          {choices!.map((choice, index) => (
            <PictureChoice key={index}>
              <PictureChoiceInner>
                <PictureChoiceImage>
                  <PictureChoiceImageWrapper align="center" justify="center">
                    {choice.image ? (
                      <Image
                        url={choice.image}
                        fit="contain"
                        width={200}
                        height={200}
                        alt={choice.label}
                      />
                    ) : (
                      <ImagePlaceholder />
                    )}
                  </PictureChoiceImageWrapper>
                </PictureChoiceImage>
                <PictureChoiceLabel>{choice.label}</PictureChoiceLabel>
              </PictureChoiceInner>
            </PictureChoice>
          ))}
        </PictureChoiceFlex>
      ) : (
        <PictureChoiceEmpty align="center" justify="center">
          Not been answered
        </PictureChoiceEmpty>
      )}
    </PictureChoiceContainer>
  )
}

const MultipleChoiceItem: FC<SheetCellProps> = ({ column, row }) => {
  const choices = column.properties?.choices?.filter(choice =>
    row[column.key]?.value?.includes(choice.id)
  )

  return (
    <TextContainer>
      {isValid(choices) && <TagGroup round={true} tags={choices as any} />}
    </TextContainer>
  )
}

const FileUploadItem: FC<SheetCellProps> = ({ column, row }) => {
  const value = row[column.key]

  if (isEmpty(value)) {
    return (
      <FileUploadContainer>
        <AttachmentIcon />
      </FileUploadContainer>
    )
  }

  const filename = encodeURIComponent(value!.filename)
  const downloadUrl = `${value.cdnUrlPrefix}/${value.cdnKey}?attname=${filename}`

  return (
    <FileUploadContainer>
      <a href={downloadUrl} target="_blank" rel="noreferrer">
        <AttachmentIcon />
        <span>{value?.filename}</span>
      </a>
    </FileUploadContainer>
  )
}

const AddressItem: FC<SheetCellProps> = ({ column, row }) => {
  const value = row[column.key]

  return (
    <>
      <AddressItemFlex column>
        <SubFormLabel label="Address Line 1" />
        <AddressInput>{value?.address1}</AddressInput>
      </AddressItemFlex>
      <AddressItemFlex column>
        <SubFormLabel label="Address Line 2" />
        <AddressInput>{value?.address2}</AddressInput>
      </AddressItemFlex>
      <Flex justify="space-between">
        <LeftAddressItem column>
          <SubFormLabel label="City" />
          <AddressInput>{value?.city}</AddressInput>
        </LeftAddressItem>
        <LeftAddressItem column>
          <SubFormLabel label="State/Province" />
          <AddressInput>{value?.state}</AddressInput>
        </LeftAddressItem>
      </Flex>
      <Flex justify="space-between">
        <LastLeftItem column>
          <SubFormLabel label="Zip/Postal Code" />
          <AddressInput>{value?.zip}</AddressInput>
        </LastLeftItem>
        <LastRightItem column>
          <SubFormLabel label="Country" />
          <AddressInput>{value?.country}</AddressInput>
        </LastRightItem>
      </Flex>
    </>
  )
}

const FullNameItem: FC<SheetCellProps> = ({ column, row }) => {
  const value = row[column.key]

  return (
    <Flex justify="space-between">
      <LastLeftItem column>
        <SubFormLabel label="First name" />
        <AddressInput>{value?.firstName}</AddressInput>
      </LastLeftItem>
      <LastRightItem column>
        <SubFormLabel label="Last name" />
        <AddressInput>{value?.lastName}</AddressInput>
      </LastRightItem>
    </Flex>
  )
}

const SignatureItem: FC<SheetCellProps> = ({ column, row }) => {
  return (
    <TextContainer>
      <Image url={row[column.key]} width={500} height={120} />
    </TextContainer>
  )
}

const ContactItem: FC<SheetCellProps> = ({ row }) => {
  const { t } = useTranslation()
  const contact = row.contact
  const endAt: number = row.endAt ?? 0

  return (
    <ContactContainer align="center" justify="space-between">
      <ContactBox align="center">
        {contact ? (
          <>
            <img src={contact.avatar} />
            <ContactInfo>
              <ContactName>{contact.fullName}</ContactName>
              <ContactEmail>{contact.email}</ContactEmail>
            </ContactInfo>
          </>
        ) : (
          <>
            <AnonymousIcon>?</AnonymousIcon>
            <AnonymousInfo>{t('Anonymous')}</AnonymousInfo>
          </>
        )}
      </ContactBox>
      <SubmitDate>{unixDate(endAt).format('MMM DD, YYYY')}</SubmitDate>
    </ContactContainer>
  )
}

const PaymentItem: FC<SheetCellProps> = ({ column, row }) => {
  const value: ServerSidePaymentValue = row[column.key]
  const amount = value.amount || 0
  const amountString = CURRENCY_SYMBOLS[value.currency] + Big(amount).div(100).toFixed(2)
  const isCompleted = isValid(value.paymentIntentId)

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <div className="text-2xl mr-2">{amountString}</div>
        {isCompleted ? (
          <div className="flex items-center h-6 pl-1 pr-2 text-sm bg-green-100 text-green-800 rounded">
            <CheckIcon className="w-4 h-4" />
            <span className="ml-1">Succeeded</span>
          </div>
        ) : (
          <div className="flex items-center h-6 pl-1 pr-2 text-sm bg-gray-100 text-slate-800 rounded">
            <ClockIcon className="w-4 h-4" />
            <span className="ml-1">Incomplete</span>
          </div>
        )}
      </div>

      {isCompleted && (
        <div className="divide-slate-50 divide-y space-y-2">
          <div className="flex items-center justify-between">
            <span>Stripe payment ID</span>
            <span>{value.paymentIntentId}</span>
          </div>

          <div className="flex items-center justify-between">
            <span>Client</span>
            <span>{value.billingDetails?.name}</span>
          </div>
        </div>
      )}
    </div>
  )
}

const ContactContainer = styled(Flex)``

const SubmitDate = styled.div`
  color: #b0b7c3;
`

const ContactBox = styled(Flex)`
  img {
    margin-right: 12px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
`

const ContactInfo = styled.div`
  span {
    display: block;
  }
`

const ContactName = styled.div``

const ContactEmail = styled.div`
  color: #8a94a6;
`

const AnonymousIcon = styled.div`
  margin-right: 12px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #59d6b8;
  font-weight: 600;
  font-size: 32px;
  line-height: 40px;
  color: #fff;
  text-align: center;
`

const AnonymousInfo = styled.div`
  font-size: 20px;
`

const CustomTextCell: FC<SheetCellProps> = ({ rowIdx, column, row, onCellValueChange }) => {
  const [value, setValue] = useState(row[column.key])

  useEffect(() => {
    setValue(row[column.key])
  }, [row])

  function handleChange(value: string) {
    setValue(value)
    onCellValueChange!(rowIdx!, column, value)
  }

  return <StyledInput value={value} onChange={handleChange} />
}

const CustomMultipleCell: FC<SheetCellProps> = ({
  rowIdx,
  column,
  row,
  onColumnOptionsUpdate,
  onCellValueChange
}) => {
  const [value, setValue] = useState(row[column.key]?.value)

  useEffect(() => {
    setValue(row[column.key]?.value)
  }, [row])

  function handleCreate(option: any) {
    onColumnOptionsUpdate!(column, {
      choices: [...(column.properties?.choices || []), option]
    })
  }

  function handleUpdate(value: any) {
    setValue(value)
    onCellValueChange!(rowIdx!, column, {
      value
    })
  }

  return (
    <StyledTagPicker
      placement="bottom"
      multiple={column.kind === FieldKindEnum.CUSTOM_MULTIPLE}
      tags={column.properties?.choices || []}
      inputPlaceholder="Find or add an option"
      value={value}
      closeOutside={true}
      onCreate={handleCreate}
      onUpdate={handleUpdate}
    />
  )
}

export const SheetRowModal: FC<SheetRowModalProps> = ({
  visible,
  columns: rawColumns,
  rowIdx,
  rowCount,
  row,
  onClose,
  onNextSubmission,
  onPrevSubmission,
  onColumnOptionsUpdate,
  onCellValueChange
}) => {
  const { t } = useTranslation()
  const isPreviousDisabled = rowIdx < 1
  const isNextDisabled = rowIdx >= rowCount - 1
  const columns = rawColumns.slice(1, rawColumns.length - 1).sort((a, b) => {
    // Sort frozen columns third:
    if (a.frozen) {
      if (b.frozen) return 0
      return -1
    }
    if (b.frozen) return 1

    // Sort other columns last:
    return 0
  })

  return (
    <>
      {visible && (
        <Container>
          <Mask onClick={onClose} />
          <Panel>
            <Header align="center">
              <HeaderLeft align="center">
                <StyledTooltip
                  ariaLabel="Previous submission"
                  placement="top"
                  disabled={isPreviousDisabled}
                >
                  <ArrowUpSIcon onClick={isPreviousDisabled ? undefined : onPrevSubmission} />
                </StyledTooltip>

                <StyledTooltip
                  ariaLabel="Next submission"
                  placement="top"
                  disabled={isNextDisabled}
                >
                  <ArrowDownSIcon onClick={isNextDisabled ? undefined : onNextSubmission} />
                </StyledTooltip>

                <span>
                  {rowIdx + 1} of {rowCount} {t('Submissions')}
                </span>
              </HeaderLeft>
              <HeaderRight align="center">
                <StyledTooltip ariaLabel="Close" placement="top">
                  <MinimizeIcon onClick={onClose} />
                </StyledTooltip>
              </HeaderRight>
            </Header>
            <Body>
              {columns.map((column, index) => (
                <BodyItem key={index}>
                  {!INTERNAL_COLUMN_KINDS.includes(column.kind as any) && (
                    <StyledIconText icon={<SheetKindIcon kind={column.kind as any} />}>
                      {column.name}
                    </StyledIconText>
                  )}

                  {row &&
                    (() => {
                      switch (column.kind) {
                        case InternalColumnKindEnum.CONTACT:
                          return <ContactItem row={row!} column={column} />

                        case InternalColumnKindEnum.SUBMIT_DATE:
                          return <></>

                        case FieldKindEnum.YES_NO:
                          return <DropdownItem row={row!} column={column} />

                        case FieldKindEnum.MULTIPLE_CHOICE:
                          return <MultipleChoiceItem row={row!} column={column} />

                        case FieldKindEnum.PICTURE_CHOICE:
                          return <PictureChoiceItem row={row!} column={column} />

                        case FieldKindEnum.FILE_UPLOAD:
                          return <FileUploadItem row={row!} column={column} />

                        case FieldKindEnum.RATING:
                        case FieldKindEnum.OPINION_SCALE:
                          return <OpinionScaleItem row={row!} column={column} />

                        // Short text
                        case FieldKindEnum.NUMBER:
                        case FieldKindEnum.DATE:
                        case FieldKindEnum.PHONE_NUMBER:
                          return <DateItem row={row!} column={column} />

                        case FieldKindEnum.DATE_RANGE:
                          return <DateRangeItem row={row!} column={column} />

                        case FieldKindEnum.INPUT_TABLE:
                          return <InputTableItem row={row!} column={column} />

                        case FieldKindEnum.COUNTRY:
                          return <OpinionScaleItem row={row!} column={column} />

                        case FieldKindEnum.URL:
                          return <UrlItem row={row!} column={column} />

                        case FieldKindEnum.ADDRESS:
                          return <AddressItem row={row!} column={column} />

                        case FieldKindEnum.FULL_NAME:
                          return <FullNameItem row={row!} column={column} />

                        case FieldKindEnum.SIGNATURE:
                          return <SignatureItem row={row!} column={column} />

                        case FieldKindEnum.PAYMENT:
                          return <PaymentItem row={row!} column={column} />

                        // Custom column
                        case FieldKindEnum.CUSTOM_TEXT:
                          return (
                            <CustomTextCell
                              rowIdx={rowIdx}
                              row={row!}
                              column={column}
                              onCellValueChange={onCellValueChange}
                            />
                          )

                        case FieldKindEnum.CUSTOM_SINGLE:
                        case FieldKindEnum.CUSTOM_MULTIPLE:
                          return (
                            <CustomMultipleCell
                              rowIdx={rowIdx}
                              row={row!}
                              column={column}
                              onColumnOptionsUpdate={onColumnOptionsUpdate}
                              onCellValueChange={onCellValueChange}
                            />
                          )

                        default:
                          return <InputItem row={row!} column={column} />
                      }
                    })()}
                </BodyItem>
              ))}
            </Body>
          </Panel>
        </Container>
      )}
    </>
  )
}

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
`

const Mask = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(50, 59, 75, 0.3);
  z-index: 10;
`

const Panel = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 40%;
  max-width: 600px;
  background: #fff;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  z-index: 100;
`

const Header = styled(Flex)`
  padding: 16px 36px;
  height: 3.75rem;
  user-select: none;
  border-bottom: 1px solid #f3f3f3;
`

const StyledTooltip = styled(Tooltip)<{
  disabled?: boolean
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${props => props.theme.text};
  transition: color 150ms;

  &:not[disabled]:hover {
    color: ${props => props.theme.primary};
  }

  ${({ disabled, theme }) =>
    disabled &&
    `
    color: ${theme.disabled};
    cursor: not-allowed;
  `};

  svg {
    margin-right: -5px;
  }
`

const HeaderLeft = styled(Flex)`
  flex: 1;

  ${StyledTooltip} {
    margin-right: 8px;
  }
`

const HeaderRight = styled(Flex)`
  user-select: none;

  svg {
    width: 18px;
    height: 18px;
  }
`

const Body = styled.div`
  height: calc(100vh - 3.75rem);
  padding: 36px 36px 24px 36px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`

const BodyItem = styled.div`
  margin-bottom: 40px;
`

const StyledIconText = styled(IconText)`
  align-items: flex-start;
  margin-bottom: 12px;

  svg {
    width: 22px;
    height: 22px;
    margin-left: -4px;
    padding: 2px;
    margin-right: 8px;
    color: #8a94a6;
  }

  span {
    flex: 1;
  }
`

const TextStyle = () => css`
  padding: 10px;
  font-size: 14px;
  color: #4e5d78;
  line-height: 22px;
  min-height: 44px;
  font-weight: 400;
  background: #fff;
  border: 1px solid #f3f3f3;
  cursor: not-allowed;
  white-space: pre-line;
`

const TextContainer = styled.div`
  ${TextStyle};
`

const ShortTextContainer = styled.div`
  ${TextStyle};
  width: 240px;
`

const CodeBlockContainer = styled.pre`
  ${TextStyle};
  font-family: ${props => props.theme.codeFontFamily};
`

const FileUploadContainer = styled.div`
  ${TextStyle};

  a {
    display: flex;
    align-items: center;
  }

  svg {
    width: 20px;
    height: 20px;
    margin-left: -4px;
    margin-right: 4px;
    color: ${props => props.theme.disabled};
  }
`

const PictureChoiceContainer = styled.div`
  ${TextStyle};
  padding: 8px;

  table {
    width: 100%;
  }
`

const PictureChoiceFlex = styled(Flex)`
  flex-wrap: wrap;
  justify-content: space-between;
  margin-left: -6px;
  margin-right: -6px;
  margin-bottom: -12px;
`

const PictureChoice = styled.div`
  width: 20%;

  &:nth-last-of-type(1) {
    margin-right: auto;
  }

  @media only screen and (max-width: 768px) {
    width: 25%;
  }
`

const PictureChoiceEmpty = styled(Flex)`
  min-height: 80px;
  color: ${props => props.theme.disabled};
`

const PictureChoiceInner = styled.div`
  margin: 0 6px 12px 6px;
  padding: 8px;
  border: 1px solid ${props => props.theme.border};
  border-radius: ${props => props.theme.borderRadius};
  color: ${props => props.theme.answer};
  background: ${props => props.theme.white};
`

const PictureChoiceImage = styled(Flex)`
  position: relative;
  width: 100%;
  min-height: 50px;

  &:before {
    content: '';
    display: block;
    width: 100%;
    padding-top: 100%;
  }
`

const PictureChoiceImageWrapper = styled(Flex)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;

  img {
    display: block;
    max-width: 100%;
    max-height: 100%;
    min-height: 1px;
  }
`

const PictureChoiceLabel = styled.div`
  height: 20px;
  margin-top: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const ImagePlaceholder = styled(ImageIcon)`
  width: 36px;
  height: 36px;
  color: ${props => props.theme.disabled};
`

const StyledInput = styled(Input)`
  ${TextStyle};
  width: 100%;
  padding: 0;
  background: ${props => props.theme.white};

  input {
    border: none;

    &,
    &[disabled] {
      background: transparent;
      color: ${props => props.theme.text};
    }

    &[disabled] {
      cursor: default;
    }
  }
`

const StyledTagPicker = styled(TagPicker)`
  ${TextStyle};
  padding: 0;
  background: ${props => props.theme.white};
  cursor: default;

  .tagpicker-trigger {
    padding: 8px 16px;
    margin-bottom: -4px;
  }

  .tagpicker-tags {
    line-height: 1;
  }

  .tagselect-wrapper {
    width: 100%;
  }

  .tagselect {
    max-width: 100%;
  }
`

const AddressItemFlex = styled(Flex)`
  margin-bottom: 12px;
`

const SubFormLabel = styled(FormLabel)`
  margin-bottom: 4px;
  font-size: ${props => props.theme.fontSize};

  label {
    font-weight: 400;
    margin-bottom: 10px;
    color: #b0b7c3;
  }
`

const LeftAddressItem = styled(AddressItemFlex)`
  width: 50%;
  padding-right: 6px;

  @media only screen and (max-width: 768px) {
    width: 100%;
    padding-right: 0;
  }
`

const RightAddressItem = styled(AddressItemFlex)`
  width: 50%;
  padding-left: 6px;

  @media only screen and (max-width: 768px) {
    width: 100%;
    padding-left: 0;
  }
`

const AddressInput = styled.div`
  ${TextStyle};
`

const LastLeftItem = styled(LeftAddressItem)`
  margin-bottom: 0;
`

const LastRightItem = styled(RightAddressItem)`
  margin-bottom: 0;
`
