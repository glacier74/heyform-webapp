import { BillingCycleEnum } from '@/models'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'

interface BillingCycleSwitchProps {
  value: BillingCycleEnum
  onChange: (billingCycle: BillingCycleEnum) => void
}

const plans = [
  { name: 'Monthly', price: '49.9', term: 'month', avg: '$49.9'},
  { name: 'Annually', price: '499', save: '- save 17%', term: 'year', avg: '$42'},
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const BillingCycleSwitch: FC<BillingCycleSwitchProps> = ({ value, onChange }) => {
  const { t } = useTranslation()
  const [selected, setSelected] = useState(plans[0])

  return (
    <RadioGroup value={selected} onChange={setSelected} className="sm:w-1/2 lg:w-1/3">
      <RadioGroup.Label className="sr-only">Billing cycle</RadioGroup.Label>
      <div className="space-y-4">
        {plans.map((plan) => (
          <RadioGroup.Option
            key={plan.name}
            value={plan}
            className={({ active }) =>
              classNames(
                active ? 'border-blue-500' : '',
                'relative block rounded-lg border border-gray-300 bg-white shadow-sm p-6 cursor-pointer hover:border-gray-400 sm:flex sm:justify-between focus:outline-none'
              )
            }
          >
            {({ checked }) => (
              <>
                <div className="flex items-center">
                  <div className="text-sm">
                    <RadioGroup.Label as="p" className="text-xl font-medium text-gray-900">
                      {plan.name}
                    </RadioGroup.Label>
                    <RadioGroup.Description as="div" className="text-gray-500">
                      <p className="sm:inline">
                        ${plan.price}/{plan.term}
                      </p>{' '}
                      {' '}
                      <p className="sm:inline">{plan.save}</p>
                    </RadioGroup.Description>
                  </div>
                </div>
                <RadioGroup.Description as="div" className="mt-2 flex text-sm sm:mt-0 sm:block sm:ml-4 sm:text-right">
                  <div className="text-3xl font-extrabold text-gray-900">{plan.avg}</div>
                  <div className="ml-1 text-gray-500 sm:ml-0">per month</div>
                </RadioGroup.Description>
                <div
                  className={classNames(
                    checked ? 'border-indigo-500' : 'border-transparent',
                    'absolute -inset-px rounded-lg border-2 pointer-events-none'
                  )}
                  aria-hidden="true"
                />
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  )
}