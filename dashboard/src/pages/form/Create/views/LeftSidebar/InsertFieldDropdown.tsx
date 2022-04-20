import { PlanCheck } from '@/components'
import { PlanGradeEnum } from '@/models'
import { PlusIcon } from '@heroicons/react/outline'
import { FieldKindEnum } from '@heyforms/shared-types-enums'
import { Button, Dropdown, Input } from '@heyforms/ui'
import type { InputValue } from '@heyforms/ui/types/input/Input'
import { isValid } from '@hpnp/utils/helper'
import clsx from 'clsx'
import type { FC } from 'react'
import { startTransition, useCallback, useLayoutEffect, useMemo, useState } from 'react'
import { useStoreContext } from '../../store'
import { getFieldFromKind } from '../../utils'
import type { FieldConfig, FieldGroup } from '../FieldConfig'
import { BLOCK_GROUPS, FIELD_CONFIGS } from '../FieldConfig'
import { FieldIcon } from '../FieldIcon'

interface InsertFieldMenuProps extends Omit<IComponentProps, 'onClick'> {
  onClick: (kind: FieldKindEnum) => void
}

interface InsertFieldItemProps {
  config: FieldConfig
  isWelcomeDisabled?: boolean
  isThankYouDisabled?: boolean
  onClick: (kind: FieldKindEnum) => void
}

const InsertFieldItem: FC<InsertFieldItemProps> = ({
  config,
  isWelcomeDisabled,
  isThankYouDisabled,
  onClick
}) => {
  const isDisabled =
    (config.kind === FieldKindEnum.WELCOME && isWelcomeDisabled) ||
    (config.kind === FieldKindEnum.THANK_YOU && isThankYouDisabled)

  function handleClick() {
    if (!isDisabled) {
      onClick(config.kind)
    }
  }

  const Children = (
    <div
      className={clsx(
        'insert-field-item group flex items-center px-4 py-2 text-sm font-medium rounded-md cursor-pointer',
        {
          'insert-field-item-disabled': isDisabled
        }
      )}
      onClick={handleClick}
    >
      <FieldIcon className="insert-field-item-icon mr-3 flex-shrink-0" kind={config.kind} />
      {config.label}
    </div>
  )

  if (config.kind === FieldKindEnum.THANK_YOU) {
    return <PlanCheck permission={PlanGradeEnum.BASIC}>{Children}</PlanCheck>
  }

  return Children
}

function filterGroups(keyword?: string): FieldGroup[] {
  let configs: FieldConfig[] = FIELD_CONFIGS

  if (isValid(keyword)) {
    configs = FIELD_CONFIGS.filter(config =>
      config.label.toLowerCase().includes(keyword!.toLowerCase())
    )
  }

  return BLOCK_GROUPS.map(group => ({
    ...group,
    configs: configs.filter(config => group.list.includes(config.kind))
  })).filter(group => group.configs.length > 0)
}

const InsertFieldMenu: FC<InsertFieldMenuProps> = ({ onClick }) => {
  const { state } = useStoreContext()
  const isWelcomeDisabled = useMemo(
    () => state.fields.some(f => f.kind === FieldKindEnum.WELCOME),
    [state.fields]
  )
  const isThankYouDisabled = useMemo(
    () => state.fields.some(f => f.kind === FieldKindEnum.THANK_YOU),
    [state.fields]
  )

  const [groups, setGroups] = useState<FieldGroup[]>(filterGroups())

  function handleKeywordChange(value?: InputValue) {
    startTransition(() => {
      const result = filterGroups(value as string)
      setGroups(result)
    })
  }

  useLayoutEffect(() => {
    const container = document.querySelector('.insert-field-groups')
    const elements: HTMLDivElement[] = Array.from(
      container!.querySelectorAll('.insert-field-group')
    )
    const columns = Array.from({ length: 4 }).fill(0) as number[]
    const gap = 36

    for (const element of elements) {
      const rect = element.getBoundingClientRect()
      const min = Math.min(...columns)
      const idx = columns.indexOf(min)

      columns[idx] = columns[idx] + rect.height + gap
      element.style.top = `${min}px`
      element.style.left = `${25 * idx}%`
    }
  }, [groups])

  const handleKeywordChangeCallback = useCallback(handleKeywordChange, [])

  return (
    <div className="insert-field-menu flex flex-col rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
      <Input.Search
        className="insert-field-search px-4 border-gray-200 outline-none focus:outline-none rounded-none border-t-0 border-r-0 border-l-0"
        placeholder="Find a question type"
        onChange={handleKeywordChangeCallback}
      />
      <div className="px-4 py-5">All question types</div>
      <div className="insert-field-groups relative scrollbar">
        {groups.map(group => (
          <div key={group.name} className="insert-field-group absolute w-1/4">
            <div className="insert-field-group-title mb-1 pl-4 text-sm font-medium text-gray-500">
              {group.name}
            </div>
            <div className="insert-field-list" key={group.name}>
              {FIELD_CONFIGS.filter(config => group.list.includes(config.kind)).map(config => (
                <InsertFieldItem
                  key={config.kind}
                  config={config}
                  isWelcomeDisabled={isWelcomeDisabled}
                  isThankYouDisabled={isThankYouDisabled}
                  onClick={onClick}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const InsertFieldDropdown = () => {
  const { dispatch } = useStoreContext()
  const [visible, setVisible] = useState(false)

  function handleCreateField(kind: FieldKindEnum) {
    setVisible(false)
    dispatch({
      type: 'addField',
      payload: getFieldFromKind(kind)
    })
  }

  const dropdownTrigger = useMemo(
    () => <Button.Link className="w-6 h-6" leading={<PlusIcon />} />,
    []
  )
  const dropdownOverlay = useMemo(
    () => (visible ? <InsertFieldMenu onClick={handleCreateField} /> : <></>),
    [visible]
  )

  return (
    <Dropdown
      className="insert-field-dropdown w-6 h-6 rounded-md text-gray-500 hover:bg-gray-50 cursor-pointer"
      popupClassName="insert-field-popup"
      visible={visible}
      placement="right-start"
      dismissOnClickInside={false}
      overlay={dropdownOverlay}
      onDropdownVisibleChange={setVisible}
    >
      {dropdownTrigger}
    </Dropdown>
  )
}
