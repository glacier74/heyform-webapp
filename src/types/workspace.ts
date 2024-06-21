import { FormModel } from '@heyform-inc/shared-types-enums'

import { BillingCycleEnum, SubscriptionStatusEnum } from '@/consts'

import { PlanType } from './plan'
import { UserType } from './user'

export interface SubscriptionType {
  id?: string
  planId: string
  billingCycle: BillingCycleEnum
  startAt: number
  endAt: number
  canceledAt: number
  isCanceled?: boolean
  trialing?: boolean
  status: SubscriptionStatusEnum
}

export interface ProjectType {
  id: string
  teamId: string
  name: string
  ownerId: string
  formCount: number
  isOwner?: boolean
  members: string[]
  forms: FormModel
}

export interface WorkspaceType {
  id: string
  name: string
  ownerId: string
  avatar?: string
  enableCustomDomain?: boolean
  customDomain?: string
  removeBranding?: boolean
  inviteCode: string
  inviteCodeExpireAt?: number
  allowJoinByInviteLink: boolean
  storageQuota: number
  memberCount: number
  additionalSeats: number
  contactCount: number
  subscription: SubscriptionType
  plan: PlanType
  trialEndAt: number
  isOwner?: boolean
  owner?: UserType
  createdAt?: number
  projects: ProjectType[]
  members: UserType[]
}

export interface MemberType {
  id: string
  name: string
  email: string
  avatar: string
  isOwner: boolean
  isYou: boolean
  lastSeenAt?: number
}
