import { gql } from '@apollo/client'

export const LOGIN_GQL = gql`
  query login($input: LoginInput!) {
    login(input: $input)
  }
`

export const SIGN_UP_GQL = gql`
  query signUp($input: SignUpInput!) {
    signUp(input: $input)
  }
`

export const SEND_RESET_EMAIL_GQL = gql`
  mutation sendResetPasswordEmail($input: SendResetPasswordEmailInput!) {
    sendResetPasswordEmail(input: $input)
  }
`

export const RESET_PASSWORD_GQL = gql`
  mutation resetPassword($input: ResetPasswordInput!) {
    resetPassword(input: $input)
  }
`

export const CREATE_WORKSPACE_GQL = gql`
  mutation createTeam($input: CreateTeamInput!) {
    createTeam(input: $input)
  }
`

export const PUBLIC_WORKSPACE_DETAIL_GQL = gql`
  query publicTeamDetail($input: PublicTeamDetailInput!) {
    publicTeamDetail(input: $input) {
      id
      name
      avatar
      allowJoinByInviteLink
      memberCount
      owner {
        name
        avatar
      }
    }
  }
`

export const UPDATE_WORKSPACE_GQL = gql`
  mutation updateTeam($input: UpdateTeamInput!) {
    updateTeam(input: $input)
  }
`

export const DISSOLVE_WORKSPACE_GQL = gql`
  mutation dissolveTeam($input: TeamDetailInput!) {
    dissolveTeam(input: $input)
  }
`

export const WORKSPACES_GQL = gql`
  query teams {
    teams {
      id
      name
      ownerId
      avatar
      storageQuota
      memberCount
      additionalSeats
      contactCount
      isOwner
      inviteCode
      inviteCodeExpireAt
      enableCustomDomain
      customHostnames {
        id
        hostname
      }
      removeBranding
      createdAt
      projects {
        id
        teamId
        name
        ownerId
        icon
        isOwner
      }
      plan {
        id
        name
        memberLimit
        formLimit
        contactLimit
        questionLimit
        submissionLimit
        storageLimit
        apiAccessLimit
        grade
      }
      subscription {
        id
        planId
        billingCycle
        startAt
        endAt
        isCanceled
        canceledAt
        status
      }
    }
  }
`

export const WORKSPACE_SUBSCRIPTION_GQL = gql`
  query teamSubscription($input: TeamDetailInput!) {
    teamSubscription(input: $input) {
      memberCount
      contactCount
      formCount
      storageQuota
    }
  }
`

export const WORKSPACE_MEMBERS_GQL = gql`
  query teamMembers($input: TeamDetailInput!) {
    teamMembers(input: $input) {
      id
      name
      email
      avatar
      role
      isOwner
      lastSeenAt
    }
  }
`

export const TRANSFER_WORKSPACE_GQL = gql`
  mutation transferTeam($input: TransferTeamInput!) {
    transferTeam(input: $input)
  }
`

export const LEAVE_WORKSPACE_GQL = gql`
  mutation leaveTeam($input: TeamDetailInput!) {
    leaveTeam(input: $input)
  }
`

export const REMOVE_WORKSPACE_MEMBER_GQL = gql`
  mutation removeTeamMember($input: TransferTeamInput!) {
    removeTeamMember(input: $input)
  }
`

export const UPDATE_WORKSPACE_MEMBER_GQL = gql`
  mutation updateTeamMemberRole($input: UpdateTeamMemberInput!) {
    updateTeamMemberRole(input: $input)
  }
`

export const JOIN_WORKSPACE_GQL = gql`
  mutation joinTeam($input: JoinTeamInput!) {
    joinTeam(input: $input)
  }
`

export const RESET_WORKSPACE_INVITE_CODE_GQL = gql`
  mutation resetTeamInviteCode($input: TeamDetailInput!) {
    resetTeamInviteCode(input: $input)
  }
`

export const ADD_CUSTOM_HOSTNAME_GQL = gql`
  mutation addCustomHostname($input: AddCustomHostnameInput!) {
    addCustomHostname(input: $input) {
      status
      dnsRecords {
        type
        name
        value
      }
    }
  }
`

export const CHECK_CUSTOM_HOSTNAME_GQL = gql`
  mutation checkCustomHostname($input: AddCustomHostnameInput!) {
    checkCustomHostname(input: $input) {
      active
      ssl
      ownership
      errors
    }
  }
`

export const EXPORT_WORKSPACE_DATA_GQL = gql`
  mutation exportTeamData($input: TeamDetailInput!) {
    exportTeamData(input: $input)
  }
`

export const INVITE_MEMBERS_GQL = gql`
  mutation inviteMember($input: InviteMemberInput!) {
    inviteMember(input: $input)
  }
`

export const PLANS_GQL = gql`
  query plans {
    plans {
      id
      name
      memberLimit
      storageLimit
      apiAccessLimit
      autoResponse
      customDomain
      customThankYouPage
      whitelabelBranding
      fileExport
      grade
      prices {
        price
        billingCycle
      }
    }
  }
`

export const WORKSPACE_CDN_TOKEN_GQL = gql`
  query teamCdnToken($input: TeamCdnTokenInput!) {
    teamCdnToken(input: $input) {
      token
      urlPrefix
      key
    }
  }
`

// export const SEARCH_UNSPLASH_PHOTO_GQL = gql`
//   query searchUnsplashPhoto($input: SearchUnsplashPhotoInput!) {
//     searchUnsplashPhoto(input: $input)
//   }
// `

export const INVOICES_GQL = gql`
  query invoices($input: TeamDetailInput!) {
    invoices(input: $input) {
      id
      note
      pdfUrl
      total
      paidAt
      status
    }
  }
`

export const PAYMENT_GQL = gql`
  mutation payment($input: PaymentInput!) {
    payment(input: $input) {
      sessionId
    }
  }
`

export const CANCEL_SUBSCRIPTION_GQL = gql`
  mutation cancelSubmission($input: TeamDetailInput!) {
    cancelSubmission(input: $input)
  }
`

export const ADD_ADDITIONAL_SEAT_GQL = gql`
  mutation additionalSeat($input: AdditionalSeatInput!) {
    additionalSeat(input: $input) {
      note
    }
  }
`

export const TEMPLATES_GQL = gql`
  query templates($input: TemplatesInput!) {
    templates(input: $input) {
      id
      category
      name
      thumbnail
      description
      interactiveMode
      kind
      themeSettings {
        theme {
          background
          backgroundImage
        }
      }
      published
    }
  }
`

export const TEMPLATE_DETAIL_GQL = gql`
  query templateDetail($input: TemplateDetailInput!) {
    templateDetail(input: $input) {
      id
      category
      name
      description
      interactiveMode
      kind
      published
      fields {
        id
        title
        description
        kind
        validations {
          required
          min
          max
          matchExpected
        }
        properties {
          showButton
          buttonText
          hideMarks
          allowOther
          allowMultiple
          choices {
            id
            label
            image
            color
            score
            isExpected
          }
          other
          numberPreRow
          shape
          total
          start
          leftLabel
          centerLabel
          rightLabel
          defaultCountryCode
          currency
          price
          format
          use12Hours
          score
        }
      }
      themeSettings {
        themeId
        theme {
          fontFamily
          codeFontFamily
          fontSize
          lineHeight
          smallFontSize
          title
          titleFontSize
          background
          backgroundImage
          question
          questionFontSize
          answer
          answerFontSize
          button
          buttonText
          error
        }
      }
    }
  }
`

export const USE_TEMPLATE_GQL = gql`
  mutation useTemplate($input: UseTemplateInput!) {
    useTemplate(input: $input)
  }
`

export const PROJECTS_GQL = gql`
  query projects($input: ProjectsInput!) {
    projects(input: $input) {
      id
      teamId
      name
      ownerId
      avatar
      isOwner
    }
  }
`

export const CREATE_PROJECT_GQL = gql`
  mutation createProject($input: CreateProjectInput!) {
    createProject(input: $input)
  }
`

export const RENAME_PROJECT_GQL = gql`
  mutation renameProject($input: RenameProjectInput!) {
    renameProject(input: $input)
  }
`

export const EMPTY_TRASH_GQL = gql`
  mutation emptyTrash($input: ProjectDetailInput!) {
    emptyTrash(input: $input)
  }
`

export const DELETE_PROJECT_GQL = gql`
  mutation deleteProject($input: ProjectDetailInput!) {
    deleteProject(input: $input)
  }
`

export const PROJECT_MEMBERS_GQL = gql`
  query projectMembers($input: ProjectDetailInput!) {
    projectMembers(input: $input) {
      id
      name
      email
      avatar
    }
  }
`

export const ADD_PROJECT_MEMBER_GQL = gql`
  mutation addProjectMember($input: ProjectMemberInput!) {
    addProjectMember(input: $input)
  }
`

export const DELETE_PROJECT_MEMBER_GQL = gql`
  mutation deleteProjectMember($input: ProjectMemberInput!) {
    deleteProjectMember(input: $input)
  }
`

export const LEAVE_PROJECT_GQL = gql`
  mutation leaveProject($input: ProjectDetailInput!) {
    leaveProject(input: $input)
  }
`

export const UPLOAD_FORM_IMAGE_GQL = gql`
  mutation uploadFormImage($input: UploadFormImageInput!) {
    uploadFormImage(input: $input)
  }
`

export const FORMS_GQL = gql`
  query forms($input: FormsInput!) {
    forms(input: $input) {
      id
      teamId
      projectId
      memberId
      name
      interactiveMode
      kind
      submissionCount
      settings {
        captchaKind
        active
        enableExpirationDate
        enabledAt
        closedAt
        enableTimeLimit
        timeLimit
        filterSpam
        published
        allowArchive
        password
        requirePassword
        redirectOnCompletion
        redirectUrl
        enableQuotaLimit
        quotaLimit
        enableIpLimit
        ipLimitCount
        ipLimitTime
        enableProgress
      }
      themeSettings {
        theme {
          background
          backgroundImage
        }
      }
      retentionAt
      suspended
      status
    }
  }
`

export const FORM_ANALYTIC_GQL = gql`
  query formAnalytic($input: FormAnalyticInput!) {
    formAnalytic(input: $input) {
      totalVisits
      submissionCount
      averageTime
      createdAt
      updatedAt
    }
  }
`

export const FORM_REPORT_GQL = gql`
  query formReport($input: FormDetailInput!) {
    formReport(input: $input) {
      responses {
        id
        total
        count
        average
        chooses
      }
      submissions {
        _id
        answers {
          submissionId
          kind
          value
          endAt
        }
      }
    }
  }
`

export const FORM_SUMMARY_GQL = gql`
  query formDetail($input: FormDetailInput!) {
    formDetail(input: $input) {
      id
      teamId
      memberId
      name
      description
      interactiveMode
      kind
      settings {
        captchaKind
        active
        filterSpam
        published
        allowArchive
        password
        requirePassword
        redirectOnCompletion
        redirectUrl
        enableQuotaLimit
        quotaLimit
        enableIpLimit
        ipLimitCount
        ipLimitTime
      }
      retentionAt
      suspended
      status
    }
  }
`

export const FORM_DETAIL_GQL = gql`
  query formDetail($input: FormDetailInput!) {
    formDetail(input: $input) {
      id
      teamId
      memberId
      name
      nameSchema
      description
      interactiveMode
      kind
      settings {
        captchaKind
        active
        enableExpirationDate
        enabledAt
        closedAt
        enableTimeLimit
        timeLimit
        filterSpam
        published
        allowArchive
        password
        requirePassword
        redirectOnCompletion
        redirectUrl
        enableQuotaLimit
        quotaLimit
        enableIpLimit
        ipLimitCount
        ipLimitTime
        enableProgress
      }
      welcomePage {
        icon
        titleSchema
        bodySchema
      }
      thankYouPage {
        icon
        titleSchema
        bodySchema
      }
      fields {
        id
        title
        titleSchema
        bodySchema
        kind
        validations
        properties
      }
      fieldUpdateAt
      themeSettings {
        themeId
        theme {
          fontFamily
          codeFontFamily
          fontSize
          lineHeight
          smallFontSize
          title
          titleFontSize
          background
          backgroundImage
          question
          questionFontSize
          answer
          answerFontSize
          button
          buttonText
          error
        }
      }
      retentionAt
      suspended
      draft
      status
    }
  }
`

export const CREATE_FORM_GQL = gql`
  mutation createForm($input: CreateFormInput!) {
    createForm(input: $input)
  }
`

export const IMPORT_FORM_GQL = gql`
  query importExternalForm($input: ImportExternalFormInput!) {
    importExternalForm(input: $input)
  }
`

export const UPDATE_FORM_SCHEMAS_GQL = gql`
  mutation updateFormSchemas($input: UpdateFormSchemasInput!) {
    updateFormSchemas(input: $input)
  }
`

export const CREATE_FORM_FIELD_GQL = gql`
  mutation createFormField($input: CreateFormFieldInput!) {
    createFormField(input: $input)
  }
`

export const UPDATE_FORM_FIELD_GQL = gql`
  mutation updateFormField($input: UpdateFormFieldInput!) {
    updateFormField(input: $input)
  }
`

export const DELETE_FORM_FIELD_GQL = gql`
  mutation deleteFormField($input: DeleteFormFieldInput!) {
    deleteFormField(input: $input)
  }
`

export const UPDATE_FORM_GQL = gql`
  mutation ($input: UpdateFormInput!) {
    updateForm(input: $input)
  }
`

export const UPDATE_FORM_ARCHIVE_GQL = gql`
  mutation ($input: UpdateFormArchiveInput!) {
    updateFormArchive(input: $input)
  }
`

export const UPDATE_FORM_THEME_GQL = gql`
  mutation updateFormTheme($input: UpdateFormThemeInput!) {
    updateFormTheme(input: $input)
  }
`

export const FORM_INTEGRATIONS_GQL = gql`
  query formIntegrations($input: FormDetailInput!) {
    formIntegrations(input: $input) {
      formId
      appId
      attributes
      status
    }
  }
`

export const UPDATE_FORM_INTEGRATIONS_GQL = gql`
  mutation ($input: UpdateFormIntegrationInput!) {
    updateFormIntegration(input: $input)
  }
`

export const DUPLICATE_FORM_GQL = gql`
  mutation duplicateForm($input: FormDetailInput!) {
    duplicateForm(input: $input)
  }
`

export const SEARCH_FORM_GQL = gql`
  query searchForms($input: SearchFormInput!) {
    searchForms(input: $input) {
      teamId
      teamName
      formId
      formName
      templateId
      templateName
    }
  }
`

export const MOVE_FORM_TO_TRASH_GQL = gql`
  mutation moveFormToTrash($input: FormDetailInput!) {
    moveFormToTrash(input: $input)
  }
`

export const RESTORE_FORM_GQL = gql`
  mutation restoreForm($input: FormDetailInput!) {
    restoreForm(input: $input)
  }
`

export const DELETE_FORM_GQL = gql`
  mutation deleteForm($input: FormDetailInput!) {
    deleteForm(input: $input)
  }
`

export const APPS_GQL = gql`
  query apps {
    apps {
      id
      internalType
      uniqueId
      category
      name
      description
      avatar
      homepage
      helpLinkUrl
      status
    }
  }
`

export const APP_DETAIL_GQL = gql`
  query appDetail($input: AppDetailInput!) {
    appDetail(input: $input) {
      id
      name
      description
      avatar
      homepage
      status
    }
  }
`

export const APP_AUTHORIZE_URL_GQL = gql`
  query appAuthorizeUrl($input: AppAuthorizeUrlInput!) {
    appAuthorizeUrl(input: $input)
  }
`

export const SUBMISSIONS_GQL = gql`
  query submissions($input: SubmissionsInput!) {
    submissions(input: $input) {
      total
      submissions {
        id
        category
        contact {
          id
          fullName
          avatar
          email
        }
        title
        answers
        endAt
      }
    }
  }
`

export const UPDATE_SUBMISSIONS_CATEGORY_GQL = gql`
  mutation updateSubmissionsCategory($input: UpdateSubmissionsCategoryInput!) {
    updateSubmissionsCategory(input: $input)
  }
`

export const DELETE_SUBMISSIONS_GQL = gql`
  mutation deleteSubmissions($input: DeleteSubmissionInput!) {
    deleteSubmissions(input: $input)
  }
`

export const UPDATE_SUBMISSION_ANSWER_GQL = gql`
  mutation updateSubmissionAnswer($input: UpdateSubmissionAnswerInput!) {
    updateSubmissionAnswer(input: $input)
  }
`

export const SUBMISSION_LOCATIONS_GQL = gql`
  query submissionLocations($input: SubmissionLocationsInput!) {
    submissionLocations(input: $input) {
      code
      total
    }
  }
`

export const SUBMISSION_ANSWERS_GQL = gql`
  query submissionAnswers($input: SubmissionAnswersInput!) {
    submissionAnswers(input: $input) {
      total
      answers {
        kind
        value
        endAt
      }
    }
  }
`

export const USER_CDN_TOKEN_GQL = gql`
  query userCdnToken($input: CdnTokenInput!) {
    userCdnToken(input: $input) {
      urlPrefix
      token
      key
    }
  }
`

export const USER_DETAILS_GQL = gql`
  query userDetail {
    userDetail {
      id
      name
      email
      avatar
      lang
      isEmailVerified
      isDeletionScheduled
      deletionScheduledAt
    }
  }
`

export const UPDATE_USER_DETAIL_GQL = gql`
  mutation updateUser($input: UpdateUserInput!) {
    updateUser(input: $input)
  }
`

export const CHANGE_USER_EMAIL_GQL = gql`
  mutation changeEmailAddress($input: ChangeEmailAddressInput!) {
    changeEmailAddress(input: $input)
  }
`

export const VERIFY_USER_EMAIL_GQL = gql`
  mutation verifyEmailAddress($input: VerifyEmailAddressInput!) {
    verifyEmailAddress(input: $input)
  }
`

export const UPDATE_USER_PASSWORD_GQL = gql`
  mutation updateUserPassword($input: UpdateUserPasswordInput!) {
    updateUserPassword(input: $input)
  }
`

export const RESEND_VERIFY_EMAIL_GQL = gql`
  query resendVerifyEmail {
    resendVerifyEmail
  }
`

export const USER_DANGER_ZONE_GQL = gql`
  query userSupermanMode($input: UserSupermanModeInput!) {
    userSupermanMode(input: $input)
  }
`

export const USER_DELETION_CODE_GQL = gql`
  query userDeletionCode {
    userDeletionCode
  }
`

export const VERIFY_USER_DELETION_GQL = gql`
  mutation verifyUserDeletion($input: VerifyUserDeletionInput!) {
    verifyUserDeletion(input: $input)
  }
`

export const CANCEL_USER_DELETION_GQL = gql`
  mutation cancelUserDeletion {
    cancelUserDeletion
  }
`

export const THIRD_PARTY_OAUTH_URL_GQL = gql`
  query thirdPartyOauthUrl($input: ThirdPartyInput!) {
    thirdPartyOauthUrl(input: $input)
  }
`

export const MAILCHIMP_OAUTH_GQL = gql`
  mutation mailchimpOauth($input: ThirdPartyOAuthInput!) {
    mailchimpOauth(input: $input)
  }
`

export const MAILCHIMP_AUDIENCES_GQL = gql`
  query mailchimpAudiences($input: ThirdPartyInput!) {
    mailchimpAudiences(input: $input) {
      id
      name
    }
  }
`

export const GOOGLE_OAUTH_GQL = gql`
  mutation googleOauth($input: ThirdPartyOAuthInput!) {
    googleOauth(input: $input)
  }
`

export const GOOGLE_DRIVE_LIST_GQL = gql`
  query googleDriveList($input: ThirdPartyInput!) {
    googleDriveList(input: $input) {
      id
      name
    }
  }
`

export const GOOGLE_DRIVE_FOLDERS_GQL = gql`
  query googleDriveFolders($input: GoogleDriveFoldersInput!) {
    googleDriveFolders(input: $input) {
      id
      name
    }
  }
`

export const GOOGLE_SHEETS_LIST_GQL = gql`
  query googleSheetsList($input: GoogleDriveFoldersInput!) {
    googleSheetsList(input: $input) {
      id
      name
    }
  }
`

export const GOOGLE_SHEETS_WORKSHEETS_GQL = gql`
  query googleSheetsWorksheets($input: GoogleSheetsWorksheetsInput!) {
    googleSheetsWorksheets(input: $input)
  }
`

export const GOOGLE_SHEETS_FIELDS_GQL = gql`
  query googleSheetsFields($input: GoogleSheetsFieldsInput!) {
    googleSheetsFields(input: $input)
  }
`

export const UPDATE_INTEGRATION_SETTINGS_GQL = gql`
  mutation updateIntegrationSettings($input: UpdateIntegrationInput!) {
    updateIntegrationSettings(input: $input)
  }
`

export const UPDATE_INTEGRATION_STATUS_GQL = gql`
  mutation updateIntegrationStatus($input: UpdateIntegrationStatusInput!) {
    updateIntegrationStatus(input: $input)
  }
`

export const DELETE_INTEGRATION_SETTINGS_GQL = gql`
  mutation deleteIntegrationSettings($input: ThirdPartyInput!) {
    deleteIntegrationSettings(input: $input)
  }
`

export const HUBSPOT_OAUTH_GQL = gql`
  mutation hubspotOauth($input: ThirdPartyOAuthInput!) {
    hubspotOauth(input: $input)
  }
`

export const MONDAY_OAUTH_GQL = gql`
  mutation mondayOauth($input: ThirdPartyOAuthInput!) {
    mondayOauth(input: $input)
  }
`

export const MONDAY_BOARDS_GQL = gql`
  query mondayBoards($input: ThirdPartyInput!) {
    mondayBoards(input: $input) {
      id
      name
      state
    }
  }
`

export const MONDAY_GROUPS_GQL = gql`
  query mondayGroups($input: MondayGroupsInput!) {
    mondayGroups(input: $input) {
      id
      title
    }
  }
`

export const MONDAY_FIELDS_GQL = gql`
  query mondayFields($input: MondayGroupsInput!) {
    mondayFields(input: $input) {
      id
      title
      type
    }
  }
`

export const SUPPORTPAL_DEPARTMENTS_GQL = gql`
  query supportpalDepartments($input: SupportPalInput!) {
    supportpalDepartments(input: $input) {
      id
      name
    }
  }
`

export const SUPPORTPAL_PRIORITIES_GQL = gql`
  query supportpalPriorities($input: SupportPalPrioritiesInput!) {
    supportpalPriorities(input: $input) {
      id
      name
    }
  }
`

export const SUPPORTPAL_STATUS_GQL = gql`
  query supportpalStatus($input: SupportPalInput!) {
    supportpalStatus(input: $input) {
      id
      name
    }
  }
`

export const GITHUB_OAUTH_GQL = gql`
  mutation githubOauth($input: ThirdPartyOAuthInput!) {
    githubOauth(input: $input)
  }
`

export const GITHUB_ORGANIZATIONS_GQL = gql`
  query githubOrganizations($input: ThirdPartyInput!) {
    githubOrganizations(input: $input) {
      login
      organization
    }
  }
`

export const GITHUB_REPOSITORIES_GQL = gql`
  query githubRepositories($input: GithubRepositoriesInput!) {
    githubRepositories(input: $input)
  }
`

export const GITHUB_ASSIGNEES_GQL = gql`
  query githubAssignees($input: GithubAssigneesInput!) {
    githubAssignees(input: $input)
  }
`

export const GITHUB_LABELS_GQL = gql`
  query githubLabels($input: GithubAssigneesInput!) {
    githubLabels(input: $input)
  }
`

export const GITHUB_MILESTONES_GQL = gql`
  query githubMilestones($input: GithubAssigneesInput!) {
    githubMilestones(input: $input) {
      title
      number
    }
  }
`

export const GITLAB_GROUPS_GQL = gql`
  query gitlabGroups($input: GitlabInput!) {
    gitlabGroups(input: $input) {
      id
      name
    }
  }
`

export const GITLAB_PROJECTS_GQL = gql`
  query gitlabProjects($input: GitlabProjectsInput!) {
    gitlabProjects(input: $input) {
      id
      name
    }
  }
`

export const GITLAB_MEMBERS_GQL = gql`
  query gitlabMembers($input: GitlabMembersInput!) {
    gitlabMembers(input: $input) {
      id
      name
    }
  }
`

export const GITLAB_LABELS_GQL = gql`
  query gitlabLabels($input: GitlabMembersInput!) {
    gitlabLabels(input: $input) {
      id
      name
    }
  }
`

export const GITLAB_MILESTONES_GQL = gql`
  query gitlabMilestones($input: GitlabMembersInput!) {
    gitlabMilestones(input: $input) {
      id
      name
    }
  }
`

export const DROPBOX_OAUTH_GQL = gql`
  mutation dropboxOauth($input: ThirdPartyOAuthInput!) {
    dropboxOauth(input: $input)
  }
`

export const DROPBOX_FOLDERS_GQL = gql`
  query dropboxFolders($input: ThirdPartyInput!) {
    dropboxFolders(input: $input) {
      id
      name
    }
  }
`

export const CONTACTS_GQL = gql`
  query contacts($input: ContactsInput!) {
    contacts(input: $input) {
      total
      contacts {
        id
        teamId
        fullName
        email
        avatar
        phoneNumber
        jobTitle
        groups {
          id
          name
        }
      }
    }
  }
`

export const CREATE_CONTACT_GQL = gql`
  mutation createContact($input: CreateContactInput!) {
    createContact(input: $input)
  }
`

export const IMPORT_CONTACTS_GQL = gql`
  mutation importContacts($input: ImportContactsInput!) {
    importContacts(input: $input)
  }
`

export const UPDATE_CONTACT_GQL = gql`
  mutation updateContact($input: UpdateContactInput!) {
    updateContact(input: $input)
  }
`

export const DELETE_CONTACTS_GQL = gql`
  mutation deleteContacts($input: DeleteContactsInput!) {
    deleteContacts(input: $input)
  }
`

export const GROUPS_GQL = gql`
  query groups($input: GroupsInput!) {
    groups(input: $input) {
      total
      groups {
        id
        teamId
        name
        contactCount
      }
    }
  }
`

export const CREATE_GROUP_GQL = gql`
  mutation createGroup($input: CreateGroupInput!) {
    createGroup(input: $input)
  }
`

export const UPDATE_GROUP_GQL = gql`
  mutation updateGroup($input: UpdateGroupInput!) {
    updateGroup(input: $input)
  }
`

export const DELETE_GROUP_GQL = gql`
  mutation deleteGroup($input: DeleteGroupInput!) {
    deleteGroup(input: $input)
  }
`

export const SHARE_TO_AUDIENCE_GQL = gql`
  mutation shareToAudience($input: ShareToAudienceInput!) {
    shareToAudience(input: $input)
  }
`

export const UNSPLASH_SEARCH_GQL = gql`
  query unsplashSearch($input: UnsplashSearchInput!) {
    unsplashSearch(input: $input) {
      id
      url
      thumbUrl
      downloadUrl
      author
      authorUrl
    }
  }
`

export const UNSPLASH_TRACK_DOWNLOAD_GQL = gql`
  mutation unsplashTrackDownload($input: UnsplashTrackDownloadInput!) {
    unsplashTrackDownload(input: $input)
  }
`
