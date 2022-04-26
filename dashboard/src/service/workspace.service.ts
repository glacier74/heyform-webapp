import {
  ADD_CUSTOM_DOMAIN_GQL,
  CREATE_WORKSPACE_GQL,
  DISSOLVE_WORKSPACE_CODE_GQL,
  DISSOLVE_WORKSPACE_GQL,
  EXPORT_WORKSPACE_DATA_GQL,
  INVITE_MEMBERS_GQL,
  JOIN_WORKSPACE_GQL,
  LEAVE_WORKSPACE_GQL,
  PLANS_GQL,
  PUBLIC_WORKSPACE_DETAIL_GQL,
  REMOVE_WORKSPACE_MEMBER_GQL,
  RESET_WORKSPACE_INVITE_CODE_GQL,
  TRANSFER_WORKSPACE_GQL,
  UPDATE_WORKSPACE_GQL,
  WORKSPACE_CDN_TOKEN_GQL,
  WORKSPACE_MEMBERS_GQL,
  WORKSPACE_SUBSCRIPTION_GQL,
  WORKSPACES_GQL,
  ZH_CN_WORKSPACE_MEMBERS_GQL,
  ZH_CN_WORKSPACES_GQL
} from '@/consts'
import { Locale } from '@/locales'
import { request } from '@/utils'

export class WorkspaceService {
  static async create(name: string, avatar?: string) {
    return request.mutate({
      mutation: CREATE_WORKSPACE_GQL,
      variables: {
        input: {
          name,
          avatar
        }
      }
    })
  }

  static async publicDetail(teamId: string, inviteCode: string) {
    return request.query({
      query: PUBLIC_WORKSPACE_DETAIL_GQL,
      variables: {
        input: {
          teamId,
          inviteCode
        }
      }
    })
  }

  static update(input: { teamId: string } & IMapType) {
    return request.mutate({
      mutation: UPDATE_WORKSPACE_GQL,
      variables: {
        input
      }
    })
  }

  static dissolveCode(teamId: string) {
    return request.query({
      query: DISSOLVE_WORKSPACE_CODE_GQL,
      variables: {
        input: {
          teamId
        }
      },
      fetchPolicy: 'network-only'
    })
  }

  static dissolve(teamId: string, code: string) {
    return request.mutate({
      mutation: DISSOLVE_WORKSPACE_GQL,
      variables: {
        input: {
          teamId,
          code
        }
      }
    })
  }

  static async workspaces() {
    return request.query({
      query: Locale.isZhCn ? ZH_CN_WORKSPACES_GQL : WORKSPACES_GQL,
      fetchPolicy: 'network-only'
    })
  }

  static async subscription(teamId: string) {
    return request.query({
      query: WORKSPACE_SUBSCRIPTION_GQL,
      variables: {
        input: {
          teamId
        }
      }
    })
  }

  static async members(teamId: string) {
    return request.query({
      query:
        import.meta.env.VITE_I18N_DEFAULT_LOCALE === 'zh-cn'
          ? ZH_CN_WORKSPACE_MEMBERS_GQL
          : WORKSPACE_MEMBERS_GQL,
      variables: {
        input: {
          teamId
        }
      },
      fetchPolicy: 'network-only'
    })
  }

  static removeMember(teamId: string, memberId: string) {
    return request.mutate({
      mutation: REMOVE_WORKSPACE_MEMBER_GQL,
      variables: {
        input: {
          teamId,
          memberId
        }
      }
    })
  }

  static transfer(teamId: string, memberId: string) {
    return request.mutate({
      mutation: TRANSFER_WORKSPACE_GQL,
      variables: {
        input: {
          teamId,
          memberId
        }
      }
    })
  }

  static leave(teamId: string) {
    return request.mutate({
      mutation: LEAVE_WORKSPACE_GQL,
      variables: {
        input: {
          teamId
        }
      }
    })
  }

  static join(teamId: string, inviteCode: string) {
    return request.mutate({
      mutation: JOIN_WORKSPACE_GQL,
      variables: {
        input: {
          teamId,
          inviteCode
        }
      }
    })
  }

  static async plans() {
    return request.query({
      query: PLANS_GQL
    })
  }

  static async cdnToken(workspaceId: string, filename: string, mime: string) {
    return request.query({
      query: WORKSPACE_CDN_TOKEN_GQL,
      variables: {
        input: {
          teamId: workspaceId,
          filename,
          mime
        }
      }
    })
  }

  static refreshInvitationCode(teamId: string) {
    return request.mutate({
      mutation: RESET_WORKSPACE_INVITE_CODE_GQL,
      variables: {
        input: {
          teamId
        }
      }
    })
  }

  static sendInvites(teamId: string, emails: string[]) {
    return request.mutate({
      mutation: INVITE_MEMBERS_GQL,
      variables: {
        input: {
          teamId,
          emails
        }
      }
    })
  }

  static async addCustomDomain(teamId: string, domain: string) {
    return request.mutate({
      mutation: ADD_CUSTOM_DOMAIN_GQL,
      variables: {
        input: {
          teamId,
          domain
        }
      }
    })
  }

  static exportData(teamId: string) {
    return request.mutate({
      mutation: EXPORT_WORKSPACE_DATA_GQL,
      variables: {
        input: {
          teamId
        }
      }
    })
  }
}
