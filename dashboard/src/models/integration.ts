export enum AppInternalTypeEnum {
  /**
   * Third-party applications can be accessed by users which requires OAuth v2 authorization,
   * such as: Google Sheets, Google Drive
   */
  THIRD_PARTY_OAUTH = 1,
  /**
   * Third-party applications accessed by users, authorized by other means
   * such as: Lark
   */
  THIRD_PARTY_OPTIONS = 2,

  /**
   * The open application developed by HeyForm requires OAuth v2 authorization,
   * for example: https://zapier.com/apps/heyform/integrations
   */
  OPEN_APP_OAUTH = 3,
  // TBD
  // For now we only have email notification
  OPEN_APP_OPTIONS = 4,

  // Team privatization application (TBD)
  TEAM_APP = 5
}

export enum AppStatusEnum {
  ACTIVE = 1,
  DISCARD,
  BANNED,
  PENDING = 4
}

export interface AppModel {
  id: string
  internalType: AppInternalTypeEnum
  uniqueId: string
  category: string
  name: string
  description?: string
  avatar?: string
  homepage?: string
  helpLinkUrl?: string
  attributes?: IMapType
  integration?: IntegrationModel
  status: AppStatusEnum
}

export interface IntegrationModel {
  appId: string
  attributes?: IMapType
  status: number
}
