export default {
  login: {
    signIn: 'Sign in to your account',
    startFree: 'start your free trial',
    signWith: 'Sign in with',
    continueWith: 'Or continue with',
    rememberMe: 'Remember me',
    forgotPassword: 'Forgot your password?',
    or: 'Or',
    Email: 'Email address',
    Password: 'Password',
    button: 'Sign In',
    Google: 'Sign in with Google',
    Apple: 'Sign in with Apple'
  },
  auth: {
    signup: {
      signUp: 'Create an account',
      signIn: 'sign in with existing one',
      signWith: 'Sign up with',
      continueWith: 'Or continue with',
      nameCant: "Name can't be empty",
      invalidEmail: 'Invalid email address',
      PasswordViolation:
        'Your password must be at least 8 characters, and at least 1 uppercase, 1 lowercase and 1 number.',
      agreeTo: 'By signing up, you agree to our',
      terms: 'Terms of Service',
      privacy: 'Privacy Policy',
      and: 'and',
      Email: 'Email address'
    },
    forgotPassword: {
      forgot: 'Forgot Password?',
      sendEmail: "We'll send you an email with verification code to reset your password.",
      link: 'Back to sign in',
      continue: 'Continue'
    },
    resetPassword: {
      reset: 'Reset Password',
      sentEmail:
        "We've sent you an email with a 6-digit verification code. Please check your inbox at",
      verificationCode: 'Verification code',
      invalidCode: 'Invalid verification code',
      newPassword: 'New password',
      repeatPassword: 'Repeat password',
      passwordViolation:
        'Your password must be at least 8 characters, and at least 1 uppercase, 1 lowercase and 1 number.',
      passwordMismatch: 'Your new password and repeat password do not match.'
    }
  },
  audiences: {
    contact: {
      addContact: {
        add: 'Add contact',
        addPeople: 'Add people who needs to take part in the survey or data collection.',
        groups: 'Groups',
        selectGroup: 'Select at least one group or create a new one',
        findGroup: 'Find or create a group',
        createGroup: 'Create new group',
        fullName: 'Full name',
        notEmpty: "Full name can't be empty",
        invalidEmail: 'Invalid email address',
        phoneNumber: 'Phone number',
        optional: 'optional',
        phoneNotEmpty: "Phone number can't be empty",
        jobTitle: ' Job title',
        jobNotEmpty: "Job title can't be empty",
        successCreate: 'Contact has been created'
      },
      importContact: {
        Import: 'Import contacts',
        CSVFile: 'You can bulk create contacts from CSV file.',
        download: 'Download the template',
        csv: 'The number of columns in your CSV should be the same as the example below.',
        blankTemplate: 'Download blank template',
        imp: 'Import',
        groupSelect: 'Select groups',
        selectOne: 'Select at least one group or create a new one',
        uploadCsv: 'Upload completed CSV file',
        invalid: 'Invalid CSV file'
      },
      editContact: {
        detail: 'Contact detail',
        update: 'Update contact',
        selectGroup: 'Select at least one group or create a new one',
        name: 'Full name',
        nameNotEmpty: "Full name can't be empty",
        phoneNotEmpty: "Phone number can't be empty",
        contactUpdate: 'Contact has been updated'
      },
      index: {
        delContact: 'Deleting contact...',
        deleted: 'Contact has been deleted',
        edit: 'Edit',
        noContact: "You don't have any contacts yet",
        addPeople: 'Add people who needs to take part in the survey or data collection.'
      }
    },
    groups: {
      addGroup: {
        add: 'Add group',
        explain: 'You can organize your contacts into groups to work with them more easily.',
        GroupName: 'Group name',
        groupNotEmpty: "Group name can't be empty"
      },
      renameGroup: {
        rename: 'Rename group',
        up: 'Update'
      },
      contact: 'Contacts',
      noGroup: "You don't have any groups yet",
      explain: 'You can organize your contacts into groups to work with them more easily.'
    },
    Title: 'Audience',
    subText: 'Create the right audience for accurate results'
  },
  setup: {
    createW: 'Create a new workspace',
    explain:
      'Workspaces are shared environments where members can collaborate. After create a workspace, you can invite others to join.',
    name: 'Workspace name',
    logo: 'Workspace logo',
    create: 'Create'
  },
  project: {
    deleteProject: {
      del: 'Delete project',
      deleteExplain:
        'Keep in mind this operation is irreversible and will permanently delete all the data associated with this project.',
      deleteExplain2:
        ' Once you confirm to delete the project, you will no longer have access to the project data.',
      sendEmail: 'An email containing a verification code was sent to',
      delBottom: 'Delete project',
      code: 'Verification code'
    },
    rename: 'Rename',
    del: 'Delete',
    bottom: ' Create form',
    forms: 'Forms',
    Trash: 'Trash',
    renameP: 'Rename this project',
    update: 'Update',
    projectName: 'Project name',
    suspended: 'Suspended',
    draft: 'Draft',
    active: 'Active',
    closed: 'Closed',
    edit: 'Edit',
    dup: 'Duplicate',
    noForm: "Don't have any forms in this project yet",
    text: "It's your one-stop solution for all form needs. Quickly build online forms without any coding or design experience.",
    suspendForm: 'This form is suspended',
    suspendText:
      'If you have any questions about suspend, please click the button below to contact us.',
    contact: 'Contact us',
    Deleting: 'Deleting form...',
    Duplicating: 'Duplicating form...',
    ProjectMembers: {
      members: 'Members in this project',
      explain: 'Assigned members can co-manage the activities here in this project.',
      assigned: 'Assigned',
      notAssigned: 'Not assigned',
      leave: 'Leave',
      remove: 'Remove',
      assign: 'Assign',
      submissions: 'submissions',
      NoSubmissions: 'No submissions yet',
      removeMember: 'Failed to remove member',
      assignMember: 'Failed to assign member',
      leftP: 'You have left the project',
      leaveP: 'Failed to leave this project',
      you: ' (You)'
    },
    trash: {
      restore: 'Restore',
      delForever: 'Delete forever',
      explain: 'You can restore any file deleted in the last 30 days.',
      link: 'Learn more',
      noForm: "Don't have any forms in trash",
      daysExplain: 'Forms will be permanently deleted from the trash after 30 days.',
      delForm: "will be deleted forever and you won't be able to restore it.",
      deleteForever: 'Delete forever?',
      cancel: 'Cancel',
      restoring: 'Restoring form'
    }
  },
  workspace: {
    members: {
      delMember:
        'Once you confirm to remove this member, member will no longer have access to this workspace data.',
      delConfirm: 'Are you sure you want to remove this member?',
      remove: 'Remove',
      inputPrompt: 'Please enter at least one valid email address',
      inviteMember: 'Invite members to',
      send: 'Invitations have been send',
      inviteExplain:
        'You can invite members to join the workspace by sending emails below. The invitation expires on',
      Add: 'Add more',
      sendBottom: 'Send Invitations',
      member: 'Members',
      manage: 'Manage who has access to the workspace.',
      leave: 'Are you sure you want to leave the workspace?',
      leaveExplain:
        'Once you confirm to leave this workspace, you will no longer have access to this workspace data.',
      bottomLeave: 'Leave',
      transferTitle: 'Are you sure you want to transfer this workspace?',
      transferWorkspace:
        'Once you confirm to transfer this workspace, you will no longer be the owner of this workspace.',
      transfer: 'Transfer',
      index: {
        owner: 'Owner',
        member: 'Member',
        transfer: 'Transfer ownership',
        leave: 'Leave workspace',
        invite: 'Invite member'
      }
    },
    workSpace: {
      createP: 'Create a new project',
      workExplain:
        'Projects are sub groups in a workspace, where you can add your workspace members to work collaboratively on forms, audiences and integrations.',
      createBottom: 'Create',
      assign: 'Assign members',
      createP2: 'Create project',
      noProject: "You don't have any projects yet",
      text: 'Projects are sub groups in a workspace, where you can add your workspace members to work collaboratively on forms, audiences and integrations.',
      forms: 'forms',
      noForms: 'No form yet'
    },
    settings: {
      WorkSettings: 'Workspace Settings',
      subTitle: 'Manage your workspace settings',
      up: 'Update',
      nameW: 'Workspace name',
      removeBranding: 'Remove HeyForm branding',
      brandingExplain:
        "To make HeyForm feel like it's completely owned by your brand, remove the HeyForm Logo in the form footer.",
      learnMore: 'Learn more about remove branding in docs',
      customDomain: 'Custom domain',
      domainExplain:
        'Custom domains allow you to make form accessible at your own, non-HeyForm domain names (for example, yourcustomdomain.com). HeyForm supports all top-level domains in custom domains.',
      domainExplain2:
        'Custom domains allow you to make form accessible at your own, non-HeyForm domain names.',
      domainLink: 'Learn more about custom domains',
      domainChecking: 'Checking',
      type: 'Type',
      domainName: 'Name',
      content: 'Content',
      cname: 'CNAME',
      domainUp: 'Custom domain has been updated',
      invalid: 'Invalid domain name',
      domain: 'eg: yourcustomdomain.com',
      delWorkspace: {
        sendEmail: 'An email containing a verification code was sent to',
        dissolve: 'Dissolve workspace',
        warning:
          'Keep in mind this operation is irreversible and will permanently delete all the data associated with this workspace.',
        warning2:
          'Once you confirm to dissolve the workspace, you will no longer have access to the workspace data.',
        warning3:
          'By dissolving the team, all the forms and data will be erased and cannot be restored! Be cautious!'
      },
      receive: 'Once the export is ready, you will receive an email with the download link.',
      export: 'Export content',
      getEmail: 'Get an email with all your forms, settings in one file.',
      exportBottom: 'Request your data',

      logo: 'Logo',
      pickLogo: 'Pick a logo for your workspace'
    },
    createWorkspace: {
      newWorkspace: 'Create a new workspace',
      text: 'Workspaces are shared environments where members can collaborate. After create a workspace, you can invite others to join.',
      name: 'Workspace name',
      logo: 'Workspace logo',
      create: 'Create'
    },
    join: {
      invited: "You've been invited to",
      UsernameAdd: "'s workspace",
      joinText: 'Join the workspace and start working together!',
      member: 'members',
      bottom: 'Join'
    }
  },
  user: {
    settings: {
      avatar: 'Avatar',
      avatarText:
        'Gravatar is used by default as your HeyForm avatar, you can upload your custom avatar here',
      deletedAccount: {
        sendEmail: 'An email containing a verification code was sent to',
        del: 'Delete account',
        delText:
          'This action cannot be undone. This will permanently delete your entire account. All workspaces you created will be deleted, and you will be removed from all shared workspaces.',
        delSure:
          'If you are sure you want to proceed with the deletion of your account, please continue below.',
        delBottom: 'Delete my account',
        delCode: 'Verification code',
        delAccount: 'Account deletion scheduled',
        delSendEmail:
          'We have scheduled your account deletion in 48 hours. You will receive an email confirmation when it has completed.',
        loggedOut: 'You will now be logged out.',
        delText2:
          'This will permanently delete your entire account. All your forms, submissions and workspaces will be deleted',
        danger: 'Danger zone'
      },
      emailAddress: {
        change: 'Change your email address',
        sendEmail: 'We will send you an email with a 6-digit verification code.',
        newEmail: 'New email address',
        checkEmail: 'Check your email',
        code: "We've sent you an email with a 6-digit verification code. Please check your inbox at",
        continue: 'Continue',
        changeEmail: 'Change email address',
        send: 'Send'
      },
      account: 'Account Settings',
      accountText: 'Changes to account settings will apply to all of your workspaces.',
      password: {
        changeText: 'Your password has been changed',
        changeP: 'Change password',
        currentPassword: 'Current password',
        newP: 'New password'
      },
      name: 'Your name'
    },
    verifyEmail: 'Verify your email address',
    sendEmailText:
      "We've sent you an email with a 6-digit verification code. Please check your inbox at",
    typoEmail: 'Made a typo on email address?',
    click: 'click here',
    change: 'to change it.',
    text: "Don't receive the code?",
    resend: 'Resend'
  },
  billing: {
    billed: "You haven't been billed yet",
    send: 'Once we send you a bill, the details will show here.',
    monthly: 'Monthly',
    annually: 'Annually',
    cycle: 'Billing Cycle',
    addCode: 'Add coupon code',
    apply: 'Apply',
    noCode: "Coupon code can't be empty",
    coupon: 'Coupon code',
    downGrade: 'Downgrade plan',
    downText:
      'Notice: once you confirm to downgrade the plan, your workspace will no longer be able to access features of premium plans.',
    Downgrade: 'Downgrade',
    upgrade: 'Upgrade',
    current: 'Current plan',
    perMonth: 'per month',
    member: 'Member',
    audience: 'Audience',
    storage: 'Storage',
    planMay: 'Your plan may expire at',
    noExpires: 'Your plan will never expires',
    Plan: 'Plan',
    form: 'Form',
    upPlan: 'Upgrade plan',
    plan: 'plan',
    Billed: 'Billed',
    Subtotal: 'Subtotal',
    Discount: 'Discount',
    add: 'Add coupon code',
    total: 'Total',
    bottom: 'Upgrade now',
    Subscription: 'Subscription',
    Invoices: 'Invoices',
    View: 'View invoice',
    Billing: 'Billing',
    invoices: 'Manage your subscription and invoices',
    plans: {
      plan: 'Plans',
      usage: 'Usage',
      comparison: 'Pricing plan comparison',
      unlimited: 'Unlimited',
      questions: 'Number of questions per form',
      formsN: 'Number of forms',
      submissions: 'Number of submissions',
      collaborators: 'Number of collaborators',
      contacts: 'Number of contacts',
      additional: 'Additional Seats Cost',
      seat1: '$3/seat/month',
      seat2: '$5/seat/month',
      seat3: '$8/seat/month',
      reports: 'Reports',
      storage: 'Storage',
      features: 'Features',
      integrations: 'Integrations',
      limited: 'Limited',
      integrations1: 'Limited (70% unlocked)',
      integrations2: 'Limited (85% unlocked)',
      validation: 'Fields Validation',
      anti: 'Anti spam and bots Prevention',
      template: 'Access to Template Gallery',
      embed: 'Embed to website',
      submissionLimit: 'Close on submission limit',
      schedule: 'Schedule a close date',
      URL: 'Custom URL redirects',
      export: 'Export data to CSV',
      Password: 'Password Protection',
      customized: 'Theme Customization',
      Thank: 'Custom Thank you page',
      team: 'Team Collaboration',
      customDomain: 'Custom Domain',
      whitelabel: 'Whitelabel Branding',
      partial: 'Partial',
      support: 'Support',
      manager: 'Dedicated manager'
    }
  },
  share: {
    embed: 'Embed in a web page',
    Standard: 'Standard',
    Mode: 'Mode',
    scanCode: 'Scan the code to open the form. Work online and offline with a printer.',
    getCode: 'Get QR code',
    selectGroups: 'You can select groups below to share forms, you can also',
    addContacts: 'add contacts',
    Or: 'or organize them into',
    ShareAudience: 'Share to audience',
    groups: 'groups',
    Groups: 'Groups',
    noGroups: "Groups can't be empty",
    findGroup: 'Find or create group',
    createGroup: 'Create new group',
    Share: 'Share',
    shareLin: 'Share by link',
    enablePassword: 'Enable password access to the form',
    Url: 'Public URL',
    custom: 'Custom domain',
    shareAudience: 'Share to audience',
    sendForm: 'Send form to the right audience for accurate results. You can',
    organize: 'or organize them into',
    easilyShare:
      'to share forms with them more easily without manually enter all the email addresses everytime.',
    embedWeb: [
      {
        title: 'Standard',
        description: 'Present HeyForm as part of your website'
      },
      {
        title: 'Popup',
        description: 'HeyForm pops up in the center of the screen.'
      },
      {
        title: 'Popup over',
        description: 'Floating popover when hits the button on the right corner.'
      },
      {
        title: 'Side tab',
        description: 'Floating panel when hits the button on the right edge.'
      }
    ],
    embedText: 'You can embed your form to your website using any method listed below.',
    Code: 'Code',
    shared: 'Form have been successfully shared',
    fetchGroups: 'Failed to fetch audience groups',
    Analytics: 'Analytics'
  },
  analytics: {
    Analytics: 'Analytics',
    Report: 'Report',
    Submissions: 'Submissions',
    Views: 'Views',
    complete: 'Complete Rate',
    Average: 'Average Duration',
    topAudience: 'Top Audience Locations',
    AnalyticsOverview: 'Analytics Overview',
    time: ['Last week', 'Last month', 'Last 3 months', 'Last year'],
    Responses: 'Responses'
  },
  report: {
    Responses: 'Responses',
    Questions: 'Questions',
    Print: 'Print',
    responses: 'responses',
    seeAll: 'See all {{count}} responses',
    noSubmission: 'There is no submission yet. You can share this form with more people.',
    average: 'average'
  },
  submissions: {
    Inbox: 'Inbox',
    Spam: 'Spam',
    export: 'Export CSV',
    Delete: 'Delete',
    selected: 'selected',
    Deselect: 'Deselect all'
  },
  formSettings: {
    Form: 'Form',
    manageForm: 'Manage your form settings',
    Extra: 'Extra',
    subArchive: 'Submission Archive',
    archiveText:
      "Disable the submission archive if you don't want HeyForm to store your submissions.",
    timeLimit: 'Time Limit',
    timeText: 'You can set it below if you want to block submission when the time is up.',
    dataError: 'Please enter a valid number',
    Hour: 'Hour',
    Minute: 'Minute',
    Second: 'Second',
    Day: 'Day',
    progressBar: 'Progress Bar',
    progressText: 'You can easily let respondents know how close they are to completing your form.',
    Redirect: 'Redirect On Completion',
    redirectText:
      "Take your respondents to another web page once they're done filling in your form.",
    Update: 'Update',
    Basic: 'Basic',
    formUpdated: 'Form settings have been successfully updated',
    status: 'Form Status',
    disableForm:
      'You can disable this form to stop receiving new submissions and prevent public access to the form.',
    expiration: 'Expiration date',
    expirationText:
      'When you want to receiving submissions within a certain date range, you can set the start and end dates below.',
    to: 'to',
    dateErr: 'Close Date must come after the Start Date',
    submission: 'Submission Limit',
    submissionText:
      'This allows you to set a specific total number of submissions allowed for your form.',
    IpLimit: 'IP Address Limit',
    IpLimitText:
      'You can set it below if you want to limit the number of submitting times from a same IP address in a period.',
    Protection: 'Protection',
    Anti: 'Anti-Spam',
    AntiText: 'Enable to prevent spam submissions.',
    Bots: 'Bots Prevention',
    BotsText: 'Prevent bot submissions by enabling the captcha.',
    deleteForm: 'Delete this Form',
    deleteFormText:
      'Deleting the form will erase all traces of this form on our databases, including all the submissions.',
    archive: 'Are you sure you want to disable Submission Archive?',
    archiveConfirm:
      'Once you confirm to disable Submission Archive, all submissions will be deleted.',
    Cancel: 'Cancel',
    Disable: 'Disable'
  },
  integration: {
    Categories: 'Categories',
    connectText: 'Connect your form data with other apps, get to the',
    help: 'Help center',
    helpApp: 'here to help you connect the apps.',
    Integrations: 'Integrations',
    AirtableText:
      'Airtable uses simple token-based authentication. To generate or manage your API key,  visit your',
    airtablePage: 'Airtable account page',
    airtableLabel: 'Airtable API key',
    AirtableId: 'Airtable base ID',
    open: 'To obtain the ID of your Airtable base, open the',
    airtableLink: 'Airtable API page',
    airtableIDText:
      'and click on the base that you want to use. You will find the ID of your base in the Introduction section.',
    tableText:
      "It's crucial to type the table name exactly as it appears in your Airtable base e.g. Table 1.",
    tableText2:
      "If you change the table name on Airtable, please update it here too, otherwise the integration won't work as expected.",
    tableName: 'Table name',
    mapFields: 'Map fields',
    tableText3:
      "Map HeyForm to Airtable fields. It's crucial to type the Airtable field names exactly as they appear in your table. If you change a field name on Airtable, please update it here too, otherwise the integration won't work as expected.",
    DropboxText:
      'Folder where to place file if you have added a "File Upload" component in your form.',
    select: 'Select Folder',
    Connect: 'Connect',
    coming: 'Coming soon',
    githubConnect: 'You can select your own account or organizations which you are connected with.',
    chatId: 'Chat ID',
    Add: 'Add',
    toTelegram: 'to your Telegram group, type',
    inTelegram: 'in the group, you will receive a message with a Chat ID.',
    labelWeb: 'Custom Webhook URL',
    labelSlack: 'Webhook URL',
    createS: 'Create your',
    appSlack: 'Slack app',
    pasteSlack: 'enable Incoming Webhooks and paste the Webhook URL here.',
    trackingCode: 'Tracking Code',
    copyGoogle: 'Copy and paste your Google Analytics tracking code below.',
    link: 'How do I find my tracking code?',
    addA: 'Add a',
    customBots: 'custom bots',
    customBotText: 'in your group, and paste Webhook URL here from bot settings.',
    PixelID: 'Pixel ID',
    copyId: 'Copy and paste your Facebook Pixel ID below.',
    findId: 'How do I find my Pixel ID?',
    ServerURL: 'Server URL',
    gitlabURL:
      'The system URL is the URL you access the frontend of the system with. This can be https://domain.com for example.',
    tokens: 'Personal access tokens',
    obtainToken:
      'To obtain the access token, open the https://domain.com/-/profile/personal_access_tokens and add a new one. You can also visit the',
    helpDocument: 'help document',
    SelectGroup: 'Select Group',
    selectGroup: 'You can select your own group or groups which you are connected with.',
    selectProject: 'Select Project',
    selectMember: 'Select Member (Optional)',
    selectLabel: 'Select Label (Optional)',
    selectMilestone: 'Select Milestone (Optional)',
    issueTitle: 'Issue title',
    issueDescription: 'Issue description (Optional)',
    SelectOrganization: 'Select Organization',
    selectRepository: 'Select Repository',
    selectAssignee: 'Select Assignee (Optional)',
    selectDrive: 'Select Drive',
    selectGoogleDrive: 'You can select your own Google Drive or',
    GoogleSharedDrives: 'Google Shared Drives',
    with: 'which you are connected with.',
    SelectFolder: 'Select Folder',
    GoogleText:
      'Folder where to place file if you have added a "File Upload" component in your form.',
    SelectSpreadsheet: 'Select Spreadsheet',
    SelectWorksheet: 'Select Worksheet',
    MapFields: 'Map fields',
    googleSheet:
      "Map HeyForm to Google Sheets fields. If you change a field on Google Sheets, please update it here too, otherwise the integration won't work as expected.",
    leftPlaceholder: 'HeyForm question',
    rightPlaceholder: 'Google Sheets field',
    leftTipText: 'Select HeyForm question',
    rightTipText: 'Select Google Sheets field',
    ColumnValues: 'Column Values (Optional)',
    mondayText:
      "Map HeyForm to Monday columns. If you change a column on Monday, please update it here too, otherwise the integration won't work as expected.",
    Board: 'Board',
    SelectBoard: 'Select a board',
    Group: 'Group (Optional)',
    ItemName: 'Item Name',
    mondayColumn: 'Select Monday column',
    selectQuestion: 'Select a question',
    PhoneNumber: 'Phone Number (Optional)',
    JobTitle: 'Job Title (Optional)',
    SelectAudience: 'Select Audience',
    SubscriberEmail: 'Subscriber Email',
    Address: 'Address',
    AddField: 'Add field',
    ConnectWith: 'Connect with',
    SystemURL: 'System URL',
    LearnAbout: 'Learn about',
    integration: 'integration',
    URLText:
      "The system URL is the URL you access the frontend of the system with. This can be https://support.domain.com or https://domain.com/support for example. The URL may require '/index.php' at the end of it if you do not have Pretty URLs enabled.",
    tokenAPT: 'API Token',
    APIText:
      'Generate an API token by going to Settings -&gt; General -&gt; API Tokens in the operator panel, making sure it has Read & Write access.',
    UserName: 'User Name (optional)',
    UserEmail: 'User Email (optional)',
    Subject: 'Subject',
    Text: 'Text',
    Department: 'Department',
    department: 'Choose department',
    Priority: 'Priority',
    ChoosePriority: 'Choose priority',
    Status: 'Status',
    ChooseStatus: 'Choose status',
    Authorization: 'Authorization',
    AuthorizationText: 'First off all, please authorize HeyForm to access your data',
    login: 'Login to',
    loginGoogle: 'Login to Google'
  },
  importForm: {
    createForm: 'Create a new form',
    importText: 'Import your existing forms and customize them.',
    ImportForm: 'Import Form',
    works: 'How it works',
    Text: 'HeyForm will detect the form tag from the URL given just like a crawler, once a form tag is detected, the engine will try to parse the components and convert it into HeyForm blocks.',
    testText: "This is still a beta feature, we can't guarantee that it will be 100% effective.",
    Detect: 'Detect',
    formURL: 'Provide the form URL',
    enterURL: 'Please enter valid url'
  },
  template: {
    Templates: 'Templates',
    UseTemplate: 'Use template',
    create: 'Create a new form'
  },
  createForm: {
    typeText:
      "Choose a form type based on your purpose. Once a form is created, the form type can't be changed.",
    createNew: 'Create a new form from scratch',
    ClassicForm: 'Classic Form',
    templatesForm: 'Create a new form from templates',
    URLForm: 'Import form from external URL'
  },
  other: {
    DragUploader: {
      drag: 'or drag and drop',
      upTo: 'PNG, JPG, GIF up to'
    },
    labelList: {
      Dashboard: 'Dashboard',
      TeamMembers: 'Team members',
      Audiences: ' Audiences',
      Billing: 'Billing & Subscription',
      Workspace: 'Workspace settings',
      Projects: 'Projects',
      Resources: 'Resources',
      GettingStarted: 'Getting started',
      Help: 'Help center',
      Template: 'Template gallery',
      Changelog: 'Changelog',
      View: 'View profile',
      Account: 'Account settings',
      Logout: 'Logout',
      CreateWorkspace: 'Create new workspace',
      Version: 'Version'
    },
    Change: 'Change',
    Remove: 'Remove'
  }
}
