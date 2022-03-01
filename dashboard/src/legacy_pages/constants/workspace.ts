import { MemberRoleEnum } from '@/legacy_pages/models'
import { OptionType } from '@heyui/component'

export const MEMBER_ROLE_OPTIONS: OptionType[] = [
  {
    id: MemberRoleEnum.ADMIN,
    label: 'Admin'
  },
  {
    id: MemberRoleEnum.COLLABORATOR,
    label: 'Collaborator'
  },
  {
    id: MemberRoleEnum.MEMBER,
    label: 'Member'
  }
]

export const MEMBER_ROLE_MAPS: StringMap = {
  [MemberRoleEnum.ADMIN]: 'Admin',
  [MemberRoleEnum.COLLABORATOR]: 'Collaborator',
  [MemberRoleEnum.MEMBER]: 'Member'
}
