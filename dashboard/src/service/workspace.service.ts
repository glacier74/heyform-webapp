import {
  ADD_CUSTOM_HOSTNAME_GQL,
  CHECK_CUSTOM_HOSTNAME_GQL,
  CREATE_WORKSPACE_GQL,
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
  WORKSPACES_GQL
} from '@/consts'
import { request } from '@/utils'

export class WorkspaceService {
  static async create(name: string, avatar?: string) {
    const result = await request.mutate({
      mutation: CREATE_WORKSPACE_GQL,
      variables: {
        input: {
          name,
          avatar
        }
      }
    })
    return result.data.createTeam
  }

  static publicDetail(teamId: string, inviteCode: string) {
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

  static dissolve(teamId: string) {
    return request.mutate({
      mutation: DISSOLVE_WORKSPACE_GQL,
      variables: {
        input: {
          teamId
        }
      }
    })
  }

  static async workspaces() {
    const result = await request.query({
      query: WORKSPACES_GQL,
      fetchPolicy: 'network-only'
    })
    return result.data.teams
  }

  static async subscription(teamId: string) {
    const result = await request.query({
      query: WORKSPACE_SUBSCRIPTION_GQL,
      variables: {
        input: {
          teamId
        }
      }
    })
    return result.data.teamSubscription
  }

  static async members(teamId: string) {
    const result = await request.query({
      query: WORKSPACE_MEMBERS_GQL,
      variables: {
        input: {
          teamId
        }
      },
      fetchPolicy: 'network-only'
    })
    return result.data.teamMembers
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
    const result = await request.query({
      query: PLANS_GQL
    })
    return result.data.plans
  }

  static async cdnToken(workspaceId: string, filename: string, mime: string) {
    const result = await request.query({
      query: WORKSPACE_CDN_TOKEN_GQL,
      variables: {
        input: {
          teamId: workspaceId,
          filename,
          mime
        }
      }
    })
    return result.data.teamCdnToken
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

  static async addCustomHostname(teamId: string, hostname: string) {
    const result = await request.mutate({
      mutation: ADD_CUSTOM_HOSTNAME_GQL,
      variables: {
        input: {
          teamId,
          hostname
        }
      }
    })
    return result.data.addCustomHostname
  }

  static async checkCustomHostname(teamId: string, hostname: string) {
    const result = await request.mutate({
      mutation: CHECK_CUSTOM_HOSTNAME_GQL,
      variables: {
        input: {
          teamId,
          hostname
        }
      }
    })
    return result.data.checkCustomHostname
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
