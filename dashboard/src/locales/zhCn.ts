export default {
  login: {
    signIn: '登录您的帐户',
    startFree: 'start your free trial',
    signWith: 'Sign in with',
    continueWith: 'Or continue with',
    rememberMe: 'Remember me',
    forgotPassword: 'Forgot your password?',
    or: 'Or',
    Email: '电子邮件地址',
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
  Audiences: {
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
      text: 'Projects are sub groups in a workspace, where you can add your workspace members to work collaboratively on forms, audiences and integrations.'
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
    embed: '嵌入网页',
    Standard: '标准',
    Mode: '类型',
    scanCode: '扫描二维码打开表单。使用打印机在线和离线工作。',
    selectGroups: '您可以选择下方的群组分享表单，您也可以',
    getCode: '获取二维码',
    addContacts: '添加联系人',
    Or: '或将它们组织成',
    ShareAudience: '分享给受众',
    groups: '群组',
    Groups: '群组',
    noGroups: '群组不能为空',
    findGroup: '查找或创建群组',
    createGroup: '新建群组',
    Share: '分享',
    shareLin: '通过链接分享',
    enablePassword: '启用对表单的密码访问',
    Url: '公共网址',
    custom: '自定义域名',
    shareAudience: '分享给受众',
    sendForm: '将表单发送给合适的受众以获得准确的结果。你可以',
    organize: '或将它们组织成',
    easilyShare: '无需每次手动输入所有电子邮件地址，即可更轻松地与他们共享表单。',
    embedWeb: [
      {
        title: '标准',
        description: '将 HeyForm 作为您网站的一部分'
      },
      {
        title: '弹出',
        description: 'HeyForm 在屏幕中央弹出。'
      },
      {
        title: '弹出窗口',
        description: '点击右上角的按钮时浮动弹出窗口。'
      },
      {
        title: '侧边标签',
        description: '点击右边缘的按钮时浮动面板。'
      }
    ],
    embedText: 'You can embed your form to your website using any method listed below.',
    Code: '代码',
    shared: 'Form have been successfully shared',
    fetchGroups: 'Failed to fetch audience groups'
  },
  analytics: {
    Analytics: '分析',
    Report: '报告',
    Submissions: '提交',
    Views: '查看',
    complete: '完成率',
    Average: '平均时间',
    topAudience: '热门受众地点',
    AnalyticsOverview: '分析概览',
    time: ['最近一周', '最近一月', '最近三个月', '最近一年']
  },
  report: {
    Responses: '提交',
    Questions: '问题',
    Print: '打印',
    responses: '提交',
    seeAll: '查看所有 {{count}} 份提交',
    noSubmission: '还没有提交。您可以与更多人分享此表单。',
    average: '平均'
  },
  submissions: {
    Inbox: '收件箱',
    Spam: '垃圾提交',
    export: '导出 CSV',
    Delete: '删除',
    selected: '选中',
    Deselect: '取消全选'
  },
  formSettings: {
    Form: '表单',
    manageForm: '管理您的表单设置',
    Extra: '额外的',
    subArchive: '提交存档',
    archiveText: '如果您不希望 HeyForm 存储您的提交，请禁用提交存档。',
    timeLimit: '时间限制',
    Redirect: '完成时重定向',
    redirectText: '填写完您的表单后，将您的受访者带到另一个网页。',
    Update: '更新',
    Basic: '基础',
    status: '表单状态',
    to: '到',
    Protection: '保护',
    Anti: '反垃圾提交',
    AntiText: '启用以防止垃圾提交。',
    Bots: '机器人预防',
    BotsText: '通过启用验证码来防止机器人提交。',
    deleteForm: '删除此表单',
    deleteFormText: '删除表单将清除我们数据库中此表单的所有痕迹，包括所有提交的内容。',
    archive: '您确定要禁用提交存档吗？',
    archiveConfirm: '一旦您确认禁用提交存档，所有提交将被删除。',
    Cancel: '取消',
    Disable: '禁止',
    timeText: 'You can set it below if you want to block submission when the time is up.',
    dataError: 'Please enter a valid number',
    Hour: 'Hour',
    Minute: 'Minute',
    Second: 'Second',
    Day: 'Day',
    progressBar: 'Progress Bar',
    progressText: 'You can easily let respondents know how close they are to completing your form.',
    formUpdated: 'Form settings have been successfully updated',
    disableForm:
      'You can disable this form to stop receiving new submissions and prevent public access to the form.',
    expiration: 'Expiration date',
    expirationText:
      'When you want to receiving submissions within a certain date range, you can set the start and end dates below.',
    dateErr: 'Close Date must come after the Start Date',
    submission: 'Submission Limit',
    submissionText:
      'This allows you to set a specific total number of submissions allowed for your form.',
    IpLimit: 'IP Address Limit',
    IpLimitText:
      'You can set it below if you want to limit the number of submitting times from a same IP address in a period.'
  },
  integration: {
    Categories: '分类',
    connectText: '将您的表单数据与其他应用程序连接，访问',
    help: '帮助中心',
    helpApp: '来帮助您连接应用程序。',
    integrations: '集成',
    Connect: '连接',
    coming: '即将推出',
    Add: '增加',
    AddField: '添加字段',
    ConnectWith: '连接到',
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
    githubConnect: 'You can select your own account or organizations which you are connected with.',
    chatId: 'Chat ID',
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
    createForm: '创建一个新表单',
    importText: '导入您现有的表单并对其进行自定义。',
    ImportForm: '导入表单',
    Text: 'HeyForm 会像爬虫一样从给定的网址中检测表单标签，一旦检测到表单标签，引擎将尝试解析组件并将其转换为 HeyForm 块。',
    testText: '这仍然是一个测试版功能，我们不能保证它会 100% 有效。',
    Detect: '探测',
    formURL: '提供表单网址',
    enterURL: '请输入有效的链接'
  },
  template: {
    Templates: '模板',
    UseTemplate: '使用模板',
    create: '创建一个新表单'
  },
  createForm: {
    typeText: '根据您的目的选择表单类型。一旦创建了表单，就无法更改表单类型。',
    createNew: '从头开始创建一个新表单',
    ClassicForm: '传统表单',
    templatesForm: '从模板创建新表单',
    URLForm: '从外部网址导入表单'
  }
}
