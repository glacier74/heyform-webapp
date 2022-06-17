import { ChevronDownIcon } from '@heroicons/react/outline'
import { SubmissionCategoryEnum } from '@heyforms/shared-types-enums'
import { Dropdown } from '@heyforms/ui'
import { Menu } from '@heyui/component'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

interface CategorySelectProps {
  category: SubmissionCategoryEnum
  onChange: (category: SubmissionCategoryEnum) => void
}

const CATEGORY_MAPS = {
  [SubmissionCategoryEnum.INBOX]: 'submissions.Inbox',
  [SubmissionCategoryEnum.ARCHIVE]: 'submissions.Archive',
  [SubmissionCategoryEnum.STARRED]: 'submissions.Starred',
  [SubmissionCategoryEnum.SPAM]: 'submissions.Spam'
}

export const CategorySelect: FC<CategorySelectProps> = ({ category: rowCategory, onChange }) => {
  const { t } = useTranslation()
  const categories = [
    SubmissionCategoryEnum.INBOX,
    // SubmissionCategoryEnum.ARCHIVE,
    // SubmissionCategoryEnum.STARRED,
    SubmissionCategoryEnum.SPAM
  ]
  const [category, setCategory] = useState(rowCategory)

  const DropdownOverlay = (
    <StyledMenu checkmark={true} markAlign="right" onClick={handleClick}>
      {categories.map((row, index) => (
        <Menu.Item key={index} name={row} checked={row === category}>
          {t(CATEGORY_MAPS[row])}
        </Menu.Item>
      ))}
    </StyledMenu>
  )

  function handleClick(value: any) {
    if (value !== category) {
      setCategory(value)
      onChange(value)
    }
  }

  return (
    <StyledDropdown overlay={DropdownOverlay}>
      <div className="flex items-center">
        <Text>{t(CATEGORY_MAPS[category])}</Text>
        <ChevronDownIcon className="ml-2 w-4 h-4" />
      </div>
    </StyledDropdown>
  )
}

const StyledDropdown = styled(Dropdown)`
  width: 100px;
  height: 40px;
  margin-right: 12px;
  padding: 0 12px;
  background: #f3f3f3;
  color: #4e5d78;

  &:hover {
    box-shadow: 0px 23px 44px rgb(176 183 195 / 14%);
  }

  span {
    color: #8a94a6;
  }

  .hey-flex {
    padding: 2px;
    border-radius: 4px;

    &:hover {
      background: ${props => props.theme.lightBorder};
    }
  }
`

const StyledMenu = styled(Menu)`
  width: 13.75rem;
`

const Text = styled.div`
  width: 50px;
  line-height: 40px;
  cursor: pointer;
`
