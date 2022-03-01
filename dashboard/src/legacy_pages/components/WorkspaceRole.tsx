import { MemberRoleEnum } from '@/legacy_pages/models'
import { isValidArray } from '@hpnp/utils/helper'
import { FC, ReactNode } from 'react'

interface WorkspaceRoleProps {
  role?: MemberRoleEnum
  permission: MemberRoleEnum[]
  children?: ReactNode
}

export const WorkspaceRole: FC<WorkspaceRoleProps> = ({ permission, role, children }) => {
  return <>{isValidArray(permission) && permission.includes(role!) && children}</>
}
