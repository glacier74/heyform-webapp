import type { FC } from 'react'
import MenuDivider from './Divider'
import type { MenuItemProps } from './Item'
import MenuItem from './Item'
import Menus from './Menus'

type ExportMenusType = FC<IComponentProps> & {
  Item: FC<MenuItemProps>
  Divider: FC<IComponentProps>
}

const ExportMenus = Menus as ExportMenusType
ExportMenus.Item = MenuItem
ExportMenus.Divider = MenuDivider

export default ExportMenus
