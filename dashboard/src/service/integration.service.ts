/**
 * @program: dashboard-next
 * @description: Integration Service
 * @author: Mufeng
 * @date: 2021-06-16 11:42
 **/
import {
  DELETE_INTEGRATION_SETTINGS_GQL,
  DROPBOX_FOLDERS_GQL,
  DROPBOX_OAUTH_GQL,
  GITHUB_ASSIGNEES_GQL,
  GITHUB_LABELS_GQL,
  GITHUB_MILESTONES_GQL,
  GITHUB_OAUTH_GQL,
  GITHUB_ORGANIZATIONS_GQL,
  GITHUB_REPOSITORIES_GQL,
  GITLAB_GROUPS_GQL,
  GITLAB_LABELS_GQL,
  GITLAB_MEMBERS_GQL,
  GITLAB_MILESTONES_GQL,
  GITLAB_PROJECTS_GQL,
  GOOGLE_DRIVE_FOLDERS_GQL,
  GOOGLE_DRIVE_LIST_GQL,
  GOOGLE_OAUTH_GQL,
  GOOGLE_SHEETS_FIELDS_GQL,
  GOOGLE_SHEETS_LIST_GQL,
  GOOGLE_SHEETS_WORKSHEETS_GQL,
  HUBSPOT_OAUTH_GQL,
  MAILCHIMP_AUDIENCES_GQL,
  MAILCHIMP_OAUTH_GQL,
  MONDAY_BOARDS_GQL,
  MONDAY_FIELDS_GQL,
  MONDAY_GROUPS_GQL,
  MONDAY_OAUTH_GQL,
  SUPPORTPAL_DEPARTMENTS_GQL,
  SUPPORTPAL_PRIORITIES_GQL,
  SUPPORTPAL_STATUS_GQL,
  THIRD_PARTY_OAUTH_URL_GQL,
  UPDATE_INTEGRATION_SETTINGS_GQL,
  UPDATE_INTEGRATION_STATUS_GQL
} from '@/consts'
import { IntegrationStatusEnum } from '@/models'
import { request } from '@/utils'

export class IntegrationService {
  static async oauthUrl(formId: string, appId: string) {
    return request.query({
      query: THIRD_PARTY_OAUTH_URL_GQL,
      variables: {
        input: {
          formId,
          appId
        }
      }
    })
  }

  static async mailchimpOauth(formId: string, appId: string, code: string) {
    return request.mutate({
      mutation: MAILCHIMP_OAUTH_GQL,
      variables: {
        input: {
          formId,
          appId,
          code
        }
      }
    })
  }

  static async mailchimpAudiences(formId: string, appId: string) {
    return request.query({
      query: MAILCHIMP_AUDIENCES_GQL,
      variables: {
        input: {
          formId,
          appId
        }
      }
    })
  }

  static async updateSettings(formId: string, appId: string, data: Record<string, any>) {
    return request.mutate({
      mutation: UPDATE_INTEGRATION_SETTINGS_GQL,
      variables: {
        input: {
          formId,
          appId,
          ...data
        }
      }
    })
  }

  static async updateStatus(formId: string, appId: string, status: IntegrationStatusEnum) {
    return request.mutate({
      mutation: UPDATE_INTEGRATION_STATUS_GQL,
      variables: {
        input: {
          formId,
          appId,
          status
        }
      }
    })
  }

  static async deleteSettings(formId: string, appId: string) {
    return request.mutate({
      mutation: DELETE_INTEGRATION_SETTINGS_GQL,
      variables: {
        input: {
          formId,
          appId
        }
      }
    })
  }

  static async googleOauth(formId: string, appId: string, code: string) {
    return request.mutate({
      mutation: GOOGLE_OAUTH_GQL,
      variables: {
        input: {
          formId,
          appId,
          code
        }
      }
    })
  }

  static async googleDriveList(formId: string, appId: string) {
    return request.query({
      query: GOOGLE_DRIVE_LIST_GQL,
      variables: {
        input: {
          formId,
          appId
        }
      }
    })
  }

  static async googleDriveFolders(formId: string, appId: string, drive?: string) {
    return request.query({
      query: GOOGLE_DRIVE_FOLDERS_GQL,
      variables: {
        input: {
          formId,
          appId,
          drive
        }
      }
    })
  }

  static async googleSheetsList(formId: string, appId: string, drive?: string) {
    return request.query({
      query: GOOGLE_SHEETS_LIST_GQL,
      variables: {
        input: {
          formId,
          appId,
          drive
        }
      }
    })
  }

  static async googleSheetsWorksheets(formId: string, appId: string, spreadsheet: string) {
    return request.query({
      query: GOOGLE_SHEETS_WORKSHEETS_GQL,
      variables: {
        input: {
          formId,
          appId,
          spreadsheet
        }
      }
    })
  }

  static async googleSheetsFields(
    formId: string,
    appId: string,
    spreadsheet: string,
    worksheet: string
  ) {
    return request.query({
      query: GOOGLE_SHEETS_FIELDS_GQL,
      variables: {
        input: {
          formId,
          appId,
          spreadsheet,
          worksheet
        }
      }
    })
  }

  static async hubspotOauth(formId: string, appId: string, code: string) {
    return request.mutate({
      mutation: HUBSPOT_OAUTH_GQL,
      variables: {
        input: {
          formId,
          appId,
          code
        }
      }
    })
  }

  static async mondayOauth(formId: string, appId: string, code: string) {
    return request.mutate({
      mutation: MONDAY_OAUTH_GQL,
      variables: {
        input: {
          formId,
          appId,
          code
        }
      }
    })
  }

  static async mondayBoards(formId: string, appId: string) {
    return request.mutate({
      mutation: MONDAY_BOARDS_GQL,
      variables: {
        input: {
          formId,
          appId
        }
      }
    })
  }

  static async mondayGroups(formId: string, appId: string, board: number | string) {
    return request.mutate({
      mutation: MONDAY_GROUPS_GQL,
      variables: {
        input: {
          formId,
          appId,
          board
        }
      }
    })
  }

  static async mondayFields(formId: string, appId: string, board: number | string) {
    return request.mutate({
      mutation: MONDAY_FIELDS_GQL,
      variables: {
        input: {
          formId,
          appId,
          board
        }
      }
    })
  }

  static async supportPalDepartments(formId: string, systemURL: string, token: string) {
    return request.mutate({
      mutation: SUPPORTPAL_DEPARTMENTS_GQL,
      variables: {
        input: {
          formId,
          systemURL,
          token
        }
      }
    })
  }

  static async supportPalPriorities(
    formId: string,
    systemURL: string,
    token: string,
    departmentId: number
  ) {
    return request.mutate({
      mutation: SUPPORTPAL_PRIORITIES_GQL,
      variables: {
        input: {
          formId,
          systemURL,
          token,
          departmentId
        }
      }
    })
  }

  static async supportPalStatus(formId: string, systemURL: string, token: string) {
    return request.mutate({
      mutation: SUPPORTPAL_STATUS_GQL,
      variables: {
        input: {
          formId,
          systemURL,
          token
        }
      }
    })
  }

  static async githubOauth(formId: string, appId: string, code: string) {
    return request.mutate({
      mutation: GITHUB_OAUTH_GQL,
      variables: {
        input: {
          formId,
          appId,
          code
        }
      }
    })
  }

  static async githubOrganizations(formId: string, appId: string) {
    return request.mutate({
      mutation: GITHUB_ORGANIZATIONS_GQL,
      variables: {
        input: {
          formId,
          appId
        }
      }
    })
  }

  static async githubRepositories(
    formId: string,
    appId: string,
    organization: Record<string, any>
  ) {
    return request.mutate({
      mutation: GITHUB_REPOSITORIES_GQL,
      variables: {
        input: {
          formId,
          appId,
          ...organization
        }
      }
    })
  }

  static async githubAssignees(formId: string, appId: string, repository: string) {
    return request.mutate({
      mutation: GITHUB_ASSIGNEES_GQL,
      variables: {
        input: {
          formId,
          appId,
          repository
        }
      }
    })
  }

  static async githubLabels(formId: string, appId: string, repository: string) {
    return request.mutate({
      mutation: GITHUB_LABELS_GQL,
      variables: {
        input: {
          formId,
          appId,
          repository
        }
      }
    })
  }

  static async githubMilestones(formId: string, appId: string, repository: string) {
    return request.mutate({
      mutation: GITHUB_MILESTONES_GQL,
      variables: {
        input: {
          formId,
          appId,
          repository
        }
      }
    })
  }

  static async gitlabGroups(formId: string, server: string, token: string) {
    return request.mutate({
      mutation: GITLAB_GROUPS_GQL,
      variables: {
        input: {
          formId,
          server,
          token
        }
      }
    })
  }

  static async gitlabProjects(formId: string, server: string, token: string, group: string) {
    return request.mutate({
      mutation: GITLAB_PROJECTS_GQL,
      variables: {
        input: {
          formId,
          server,
          token,
          group
        }
      }
    })
  }

  static async gitlabMembers(formId: string, server: string, token: string, project: string) {
    return request.mutate({
      mutation: GITLAB_MEMBERS_GQL,
      variables: {
        input: {
          formId,
          server,
          token,
          project
        }
      }
    })
  }

  static async gitlabLabels(formId: string, server: string, token: string, project: string) {
    return request.mutate({
      mutation: GITLAB_LABELS_GQL,
      variables: {
        input: {
          formId,
          server,
          token,
          project
        }
      }
    })
  }

  static async gitlabMilestones(formId: string, server: string, token: string, project: string) {
    return request.mutate({
      mutation: GITLAB_MILESTONES_GQL,
      variables: {
        input: {
          formId,
          server,
          token,
          project
        }
      }
    })
  }

  static async dropboxOauth(formId: string, appId: string, code: string) {
    return request.mutate({
      mutation: DROPBOX_OAUTH_GQL,
      variables: {
        input: {
          formId,
          appId,
          code
        }
      }
    })
  }

  static async dropboxFolders(formId: string, appId: string) {
    return request.query({
      query: DROPBOX_FOLDERS_GQL,
      variables: {
        input: {
          formId,
          appId
        }
      }
    })
  }
}
