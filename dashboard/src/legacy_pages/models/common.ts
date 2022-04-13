import { MemberRoleEnum } from './workspace'

export interface RouteProps {
  path: string
  title?: string
  loginRequired?: boolean
  layout: any
  component: any
  roles?: MemberRoleEnum[]
}
