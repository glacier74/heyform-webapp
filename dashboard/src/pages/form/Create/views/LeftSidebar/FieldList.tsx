import { DotsVerticalIcon } from '@heroicons/react/outline'
import { htmlUtils } from '@heyforms/answer-utils'
import type { FormField } from '@heyforms/shared-types-enums'
import { FieldKindEnum, QUESTION_FIELD_KINDS } from '@heyforms/shared-types-enums'
import { Button, Dropdown, Menus, stopPropagation } from '@heyforms/ui'
import { isEmpty, isValid } from '@hpnp/utils/helper'
import clsx from 'clsx'
import type { FC } from 'react'
import { useMemo, useState } from 'react'
import { ReactSortable } from 'react-sortablejs'
import { useStoreContext } from '../../store'
import { FieldIcon } from '../FieldIcon'

interface FieldCardProps {
  field: FormField
  isSelected?: boolean
  isDeleteEnabled?: boolean
}

const WELCOME_THANK_YOU_KINDS = [FieldKindEnum.WELCOME, FieldKindEnum.THANK_YOU]

const FieldCard: FC<FieldCardProps> = ({ field, isSelected, isDeleteEnabled }) => {
  const { dispatch } = useStoreContext()
  const [isOpen, setIsOpen] = useState(false)

  function handleClick() {
    dispatch({
      type: 'selectField',
      payload: field.id
    })
  }

  function handleMenuClick(name?: IKeyType) {
    switch (name) {
      case 'duplicate':
        dispatch({
          type: 'duplicateField',
          payload: field.id
        })
        break

      case 'delete':
        dispatch({
          type: 'deleteField',
          payload: field.id
        })
        break
    }
  }

  const fieldIcon = useMemo(
    () => (
      <FieldIcon
        className="field-card-icon"
        kind={field.kind}
        index={field.index}
        iconOnly={false}
      />
    ),
    [field.kind, field.index]
  )
  const dropdownTrigger = useMemo(
    () => (
      <Button.Link
        className="field-card-action w-8 h-8"
        leading={<DotsVerticalIcon />}
        onMouseDown={stopPropagation}
      />
    ),
    []
  )
  const dropdownOverlay = useMemo(
    () => (
      <Menus onClick={handleMenuClick}>
        {!WELCOME_THANK_YOU_KINDS.includes(field.kind) && (
          <Menus.Item name="duplicate" label="Duplicate" />
        )}
        {(isEmpty(field.index) || (isValid(field.index) && isDeleteEnabled)) && (
          <Menus.Item className="text-red-700" name="delete" label="Delete" />
        )}
      </Menus>
    ),
    [field.kind, isDeleteEnabled]
  )

  return (
    <div
      className={clsx(
        'field-card group flex items-center pt-2 pr-1 pb-2 pl-4 bg-white cursor-pointer',
        {
          'bg-gray-100': isSelected,
          'field-card-open': isOpen
        }
      )}
      onClick={handleClick}
    >
      {fieldIcon}
      <div className="field-card-title flex-1 ml-3 text-xs">
        {htmlUtils.plain(field.title as string)}
      </div>
      <Dropdown
        className="opacity-0 group-hover:opacity-100"
        placement="bottom-start"
        overlay={dropdownOverlay}
        onDropdownVisibleChange={setIsOpen}
      >
        {dropdownTrigger}
      </Dropdown>
    </div>
  )
}

export const FieldList: FC = () => {
  const { state, dispatch } = useStoreContext()

  const data = useMemo(() => {
    let index = 1
    let welcome: FormField | null = null
    let thankYou: FormField | null = null
    const fields: FormField[] = []

    for (const field of state.fields) {
      if (field.kind === FieldKindEnum.WELCOME) {
        welcome = field
      } else if (field.kind === FieldKindEnum.THANK_YOU) {
        thankYou = field
      } else {
        if (QUESTION_FIELD_KINDS.includes(field.kind)) {
          field.index = index++
        }

        fields.push(field)
      }
    }

    return {
      welcome,
      fields,
      thankYou
    }
  }, [state.fields])
  const isDeleteEnabled = useMemo(() => state.questions.length > 1, [state.questions])

  function handleSortFields(fields: FormField[]) {
    dispatch({
      type: 'setFields',
      payload: [data.welcome, ...fields, data.thankYou].filter(Boolean) as FormField[]
    })
  }

  // Hack for jsx rerender
  const sortable = useMemo(
    () => (
      <ReactSortable
        ghostClass="field-card-ghost"
        chosenClass="field-card-chosen"
        dragClass="field-card-dragging"
        fallbackClass="field-card-cloned"
        list={data.fields}
        setList={handleSortFields}
        delay={10}
        animation={240}
      >
        {data.fields.map(field => (
          <FieldCard
            key={field.id}
            field={field}
            isSelected={field.id === state.selectedId}
            isDeleteEnabled={isDeleteEnabled}
          />
        ))}
      </ReactSortable>
    ),
    [data.fields, state.selectedId]
  )

  return (
    <div className="flex-1 scrollbar">
      {data.welcome && (
        <FieldCard
          field={data.welcome}
          isSelected={data.welcome.id === state.selectedId}
          isDeleteEnabled={isDeleteEnabled}
        />
      )}
      <div className="field-list">{sortable}</div>
      {data.thankYou && (
        <FieldCard
          field={data.thankYou}
          isSelected={data.thankYou.id === state.selectedId}
          isDeleteEnabled={isDeleteEnabled}
        />
      )}
    </div>
  )
}
