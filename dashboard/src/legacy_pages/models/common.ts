import { MemberRoleEnum } from './workspace'

export interface RouteProps {
  path: string
  title?: string
  exact?: boolean
  loginRequired?: boolean
  layout: any
  component: any
  roles?: MemberRoleEnum[]
}
