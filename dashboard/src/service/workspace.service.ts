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
  static create(name: string, avatar?: string) {
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

  static update(input: { teamId: string; name?: string; avatar?: string; customDomain?: string }) {
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

  static subscription(teamId: string) {
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

  static plans() {
    return request.query({
      query: PLANS_GQL
    })
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

  static addCustomHostname(teamId: string, hostname: string) {
    return request.mutate({
      mutation: ADD_CUSTOM_HOSTNAME_GQL,
      variables: {
        input: {
          teamId,
          hostname
        }
      }
    })
  }

  static checkCustomHostname(teamId: string, hostname: string) {
    return request.mutate({
      mutation: CHECK_CUSTOM_HOSTNAME_GQL,
      variables: {
        input: {
          teamId,
          hostname
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

  // static searchUnsplashPhoto(query: string, page: number) {
  //   return request.query({
  //     query: SEARCH_UNSPLASH_PHOTO_GQL,
  //     variables: {
  //       input: {
  //         query,
  //         page
  //       }
  //     }
  //   })
  // }
}
