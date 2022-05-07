import { Input, Popup } from '@heyui/component'
import { isNumber, isValid } from '@hpnp/utils/helper'
import dayjs, { Dayjs } from 'dayjs'
import { PickerPanel } from 'rc-picker'
import generateConfig from 'rc-picker/lib/generate/dayjs'
import en_US from 'rc-picker/lib/locale/en_US'
import type { FC, MouseEvent } from 'react'
import { useState } from 'react'
import styled from 'styled-components'

interface DatePickerProps {
  format?: string
  placeholder?: string
  timeFormat?: string
  use12Hours?: boolean
  minuteStep?: number
  value?: number
  onBlur?: () => void
  onChange?: (value: number) => void
}

function valueToDayJS(value?: number) {
  if (isValid(value) && isNumber(value)) {
    return dayjs.unix(value!)
  }
}

function unixToDateString(value?: number, format?: string) {
  if (isValid(value) && isNumber(value)) {
    return dayjs.unix(value!).format(format!)
  }
}

export const DatetimePicker: FC<DatePickerProps> = ({
  value,
  placeholder,
  format,
  timeFormat,
  use12Hours = true,
  minuteStep = 30,
  onBlur,
  onChange,
  ...restProps
}) => {
  const [visible, setVisible] = useState(false)
  const [referenceRef, setReferenceRef] = useState<any>(null)

  function handleOpen(event: MouseEvent) {
    event.preventDefault()
    setVisible(true)
  }

  function handleClose() {
    onBlur && onBlur()
    setVisible(false)
  }

  function handleSelect(value: Dayjs) {
    onChange && onChange(value.unix())
  }

  function handleOk(value: Dayjs) {
    handleClose()
    onChange && onChange(value.unix())
  }

  return (
    <>
      <Trigger ref={setReferenceRef} onClick={handleOpen}>
        <Input
          type="text"
          placeholder={placeholder}
          disabled={true}
          value={unixToDateString(value, format)}
        />
      </Trigger>

      <Popup
        visible={visible}
        referenceRef={referenceRef}
        popperOptions={{
          placement: 'bottom-start',
          strategy: 'fixed',
          modifiers: [
            {
              name: 'computeStyles',
              options: {
                gpuAcceleration: false
              }
            }
          ]
        }}
        onMaskClick={handleClose}
      >
        <Panel>
          <PickerPanel<Dayjs>
            {...restProps}
            prefixCls="date-picker"
            generateConfig={generateConfig}
            value={valueToDayJS(value)}
            locale={en_US}
            tabIndex={-1}
            showToday={false}
            showTime={{
              format: timeFormat,
              use12Hours: use12Hours,
              showSecond: false,
              minuteStep
            }}
            direction="ltr"
            onSelect={handleSelect}
            onOk={handleOk}
          />
        </Panel>
      </Popup>
    </>
  )
}

const Trigger = styled.span`
  display: inline-flex;
  position: relative;

  input {
    width: 180px;
    color: #37352f !important;
    background: #fff !important;
    cursor: pointer !important;
  }

  @media only screen and (max-width: 800px) {
    input {
      height: 40px;
    }

    &,
    & > div,
    input {
      width: 100%;
    }
  }
`

const Panel = styled.div`
  background: #fff;
  border-radius: 3px;
  box-shadow: rgb(55 60 67 / 12%) 0px 3px 12px 2px;

  .date-picker-rtl {
    direction: rtl;

    table,
    tr,
    td {
      margin: 0 !important;
      padding: 0 !important;
    }

    tr,
    td {
      border: none !important;
    }
  }

  .date-picker-panel {
    display: inline-block;
    vertical-align: top;
    outline: none;
  }

  .date-picker-date-panel {
    display: flex;
    flex-direction: column;
    width: 240px;
  }

  .date-picker-panel-rtl {
    direction: rtl;
  }

  .date-picker-decade-panel,
  .date-picker-year-panel,
  .date-picker-month-panel,
  .date-picker-week-panel,
  .date-picker-date-panel,
  .date-picker-time-panel {
    display: flex;
    flex-direction: column;
  }

  .date-picker-decade-panel table,
  .date-picker-year-panel table,
  .date-picker-month-panel table,
  .date-picker-week-panel table,
  .date-picker-date-panel table,
  .date-picker-time-panel table {
    text-align: center;
    border-collapse: collapse;
  }

  .date-picker-header {
    display: flex;
    padding: 0 8px;
    color: #4e5d78;
    border-bottom: 1px solid #f3f3f3;
  }

  .date-picker-header > * {
    flex: none;
  }

  .date-picker-header-view {
    flex: auto;
    text-align: center;
  }

  .date-picker-header button {
    -webkit-appearance: none;
    margin: 0;
    padding: 0;
    font-size: 14px;
    color: #8a94a6;
    line-height: 40px;
    background: 0 0;
    border: 0;
    cursor: pointer;
    -webkit-transition: color 0.15s;
    transition: color 0.15s;
    outline: none;

    &.date-picker-year-btn {
      margin-left: 10px;
    }

    &.date-picker-month-btn,
    &.date-picker-year-btn {
      color: #4e5d78;

      &:hover {
        color: #4e5d78;
      }
    }

    &:hover {
      color: #4e5d78;
    }
  }

  .date-picker-header > button {
    min-width: 1.6em;
  }

  .date-picker-cell {
    &.date-picker-cell-disabled {
      .date-picker-cell-inner {
        cursor: not-allowed;

        &,
        &:hover {
          color: #8a94a6;
        }
      }
    }

    &:not(.date-picker-cell-disabled) {
      .date-picker-cell-inner {
        cursor: pointer;

        &:hover {
          color: #fff;
          background-color: #0252d7;
        }
      }
    }
  }

  .date-picker-cell-inner {
    width: 28px;
    height: 28px;
    line-height: 28px;
    display: inline-block;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    background: transparent;
    cursor: pointer;
    outline: none;
    border: none;
    color: #8a94a6;
    border-radius: 3px;
  }

  .date-picker-year-panel,
  .date-picker-month-panel {
    .date-picker-cell-inner {
      border-radius: 3px;
    }
  }

  .date-picker-cell-in-view {
    width: 28px;
    height: 28px;
    margin: 0;

    .date-picker-cell-inner {
      color: #4e5d78;

      &:hover {
        color: #fff;
      }
    }
  }

  .date-picker-cell-selected {
    &.date-picker-cell-today > .date-picker-cell-inner,
    & > .date-picker-cell-inner {
      color: #fff;
      background: #0252d7;
    }
  }

  .date-picker-ok {
    float: right;
  }

  .date-picker-year-panel .date-picker-cell-inner,
  .date-picker-month-panel .date-picker-cell-inner {
    width: 80px;
  }

  .date-picker-body {
    padding: 5px;

    thead {
      color: #4e5d78;
    }
  }

  .date-picker-week-panel .date-picker-cell-week {
    font-size: 12px;
    color: #4e5d78;
    font-weight: bold;
  }

  .date-picker-week-panel .date-picker-cell:hover > .date-picker-cell-inner,
  .date-picker-week-panel .date-picker-cell-selected > .date-picker-cell-inner {
    background: transparent;
  }

  .date-picker-time-panel {
    width: auto;
  }

  .date-picker-time-panel .date-picker-content {
    display: flex;
    max-height: 200px;
  }

  .date-picker-content {
    width: 100%;

    th {
      font-weight: normal;
    }
  }

  .date-picker-time-panel-column {
    flex: none;
    text-align: left;
    list-style: none;
    margin: 0;
    padding: 0 0 180px 0;
    overflow-y: hidden;
    overflow-x: hidden;
    width: 50px;
    transition: background 0.15s;
  }

  .date-picker-time-panel-column-active {
    background: rgba(0, 0, 255, 0.1);
  }

  .date-picker-time-panel-column:hover {
    overflow-y: auto;
  }

  .date-picker-time-panel-column > li {
    padding: 0;
    margin: 0;
    cursor: pointer;
  }

  .date-picker-time-panel-column > li .date-picker-time-panel-cell-inner {
    margin: 0;
    height: 28px;
    line-height: 28px;
    text-align: center;
    display: block;
    width: 100%;
  }

  .date-picker-panel-rtl .date-picker-time-panel-column > li .date-picker-time-panel-cell-inner {
    padding: 0 12px 0 0;
    text-align: right;
  }

  .date-picker-datetime-panel {
    display: flex;
  }

  .date-picker-datetime-panel .date-picker-time-panel {
    border-left: 1px solid #f3f3f3;
  }

  .date-picker-datetime-panel .date-picker-date-panel,
  .date-picker-datetime-panel .date-picker-time-panel {
    transition: opacity 0.15s;
  }

  .date-picker-datetime-panel-active .date-picker-date-panel,
  .date-picker-datetime-panel-active .date-picker-time-panel {
    opacity: 0.3;
  }

  .date-picker-datetime-panel-active .date-picker-date-panel-active,
  .date-picker-datetime-panel-active .date-picker-time-panel-active {
    opacity: 1;
  }

  .date-picker-time-panel {
    .date-picker-header-view {
      height: 40px;
      line-height: 40px;
    }
  }

  .date-picker-time-panel-cell-selected {
    .date-picker-time-panel-cell-inner {
      color: #fff;
      background: #0252d7;
      border-radius: 3px;
    }
  }

  .date-picker-input {
    position: relative;
    display: flex;
    align-items: center;
    width: 420px;
    min-width: auto !important;

    input {
      -webkit-appearance: none;
      border: none;
      height: 24px;
      font-size: font-size(text);
      line-height: 24px;
      outline: none;
      background: transparent;
    }

    .date-picker-suffix {
      transform: scale(0.9);
      line-height: 1;
      color: color(textSecondary);
    }
  }

  .date-picker-rtl .date-picker-input {
    text-align: right;
  }

  .date-picker-input > input {
    width: 10%;
    flex: 1 auto;
  }

  .date-picker-clear {
    position: absolute;
    right: 4px;
    top: 0;
    cursor: pointer;
  }

  .date-picker-rtl .date-picker-clear {
    right: auto;
    left: 4px;
  }

  .date-picker-clear-btn::after {
    content: '×';
  }

  .date-picker-dropdown {
    margin: 0;
    padding: 0;
    background: #fff;
    color: #4e5d78;
    border: none;
    box-shadow: 0 3px 12px 2px rgb(55 60 67 / 12%);
    font-variant: tabular-nums;
    font-feature-settings: 'tnum';
    position: absolute;
    z-index: 1050;
  }

  .date-picker-dropdown-hidden {
    display: none;
  }

  .date-picker-panel-container {
    overflow: hidden;
    vertical-align: top;
    box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08),
      0 9px 28px 8px rgba(0, 0, 0, 0.05);
    transition: margin 0.15s;
  }

  .date-picker-content {
    padding: 5px;
  }

  .date-picker-time-panel-column {
    padding: 0 5px;
  }

  .date-picker-footer {
    padding: 0 12px;
    border-top: 1px solid #f3f3f3;

    .date-picker-ranges {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 40px;

      &,
      li {
        margin: 0;
        padding: 0;
        list-style: none;
      }
    }
  }
`
