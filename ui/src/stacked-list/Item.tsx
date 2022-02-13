import type { FC, ReactNode } from 'react'

export interface StackedListItemProps extends Omit<IComponentProps<HTMLLIElement>, 'title'> {
  imageUrl?: string
  title?: ReactNode
  description?: ReactNode
}

const StackedListItem: FC<StackedListItemProps> = ({
  imageUrl,
  title,
  description,
  ...restProps
}) => {
  return (
    <li className="stacked-list-item" {...restProps}>
      {imageUrl && <img className="stacked-list-item-image" src={imageUrl} />}
      <img
        className="h-10 w-10 rounded-full"
        src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt=""
      />
      <div className="ml-3">
        <p className="text-sm font-medium text-gray-900">Calvin Hawkins</p>
        <p className="text-sm text-gray-500">calvin.hawkins@example.com</p>
      </div>
    </li>
  )
}

export default StackedListItem
