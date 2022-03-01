import { AddressValue } from '@heyforms/shared-types-enums'

export interface ContactModel {
  id: string
  fullName: string
  email: string
  jobTitle?: string
  avatar?: string
  phoneNumber?: string
  address?: AddressValue
  note?: string
  groups?: GroupModel[]
}

export interface GroupModel {
  id: string
  teamId?: string
  name: string
  avatar?: string
  contactCount?: number
}
