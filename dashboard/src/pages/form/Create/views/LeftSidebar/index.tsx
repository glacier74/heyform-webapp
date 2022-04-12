import { memo } from 'react'
import { FieldList } from './FieldList'
import { InsertFieldDropdown } from './InsertFieldDropdown'

const LeftSidebarComponent = () => {
  return (
    <div className="left-sidebar flex flex-col w-64 bg-white border-r border-gray-200">
      <div className="flex items-center justify-between p-4">
        <span>Content</span>
        <InsertFieldDropdown />
      </div>

      <FieldList />
    </div>
  )
}

export const LeftSidebar = memo(LeftSidebarComponent)
