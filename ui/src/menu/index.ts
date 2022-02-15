import type { FC } from 'react'
import MenuDivider from './Divider'
import type { MenuItemProps } from './Item'
import MenuItem from './Item'
import type { MenusProps } from './Menus'
import Menus from './Menus'

type ExportMenusType = FC<MenusProps> & {
  Item: FC<MenuItemProps>
  Divider: FC<IComponentProps<HTMLDivElement>>
}

const ExportMenus = Menus as unknown as ExportMenusType
ExportMenus.Item = MenuItem
ExportMenus.Divider = MenuDivider

export default ExportMenus
