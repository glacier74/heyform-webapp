import type { Choice } from '@heyforms/shared-types-enums'
import { KeyCode } from '@heyforms/ui'
import { isNumber, isValid, isValidArray } from '@hpnp/utils/helper'
import type { WheelEvent } from 'react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { GlobalTimeout } from '../utils'

interface SelectionRange {
  allowMultiple: boolean
  min: number
  max: number
}

function resetNumber(num?: number, defaultValue?: number): number {
  if (isValid(num) && isNumber(num) && num! > 0) {
    return num!
  }
  return defaultValue!
}

export function useChoicesOption(choices?: Choice[]): any[] {
  return useMemo(() => {
    if (!isValidArray(choices)) {
      return []
    }

    return choices!.map((choice, index) => ({
      keyName: String.fromCharCode(KeyCode.A + index),
      label: choice.label,
      value: choice.id,
      image: choice.image
    }))
  }, [choices])
}

export function useSelectionRange(
  allowMultiple?: boolean,
  min?: number,
  max?: number
): SelectionRange {
  return useMemo(() => {
    const range: SelectionRange = {
      allowMultiple: allowMultiple ?? false,
      min: 1,
      max: 1
    }

    if (allowMultiple) {
      range.min = resetNumber(min, 0)
      range.max = resetNumber(max, 0)

      if (range.min > range.max) {
        range.min = 0
      }
    }

    range.allowMultiple = range.max !== 1
    return range
  }, [allowMultiple, min, max])
}

export function useWheelScroll(
  isScrollable?: boolean,
  onScroll?: (type: 'scrollNext' | 'scrollPrevious') => void
) {
  const [isDisabled, setIsDisabled] = useState(false)
  const [accumulated, setAccumulated] = useState(0)

  function disableWheelScroll() {
    setAccumulated(0)
    setIsDisabled(true)

    GlobalTimeout.add({
      name: 'disableWheelScroll',
      duration: 500,
      callback: () => setIsDisabled(false)
    })
  }

  function handleNext() {
    disableWheelScroll()
    onScroll?.('scrollNext')
  }

  function handlePrevious() {
    disableWheelScroll()
    onScroll?.('scrollPrevious')
  }

  function handleWheelScroll(event: WheelEvent) {
    if (!isScrollable || isDisabled) {
      return
    }

    GlobalTimeout.add({
      name: 'setAccumulated',
      duration: 500,
      callback: () => setAccumulated(0)
    })

    const value = accumulated + event.deltaY
    setAccumulated(value)

    if (value < -300) {
      handlePrevious()
    } else if (value > 300) {
      handleNext()
    }
  }

  useEffect(() => {
    return () => GlobalTimeout.clear()
  }, [])

  return useCallback(handleWheelScroll, [isScrollable, isDisabled, accumulated])
}
