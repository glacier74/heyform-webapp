export default {
  app: {
    name: 'HeyForm',
    copy: 'Copy',
    copied: 'Copied'
  },
  login: {
    signIn: '👋 Welcome back!',
    logIn: 'Log in to your account',
    startFree: 'create an account',
    signWith: 'Log in with',
    noAccount: "Don't have an account yet?",
    bindAccountDescription: 'Already a HeyForm user? Login and link your account.',
    continueWith: 'Or continue with',
    rememberMe: 'Remember me',
    forgotPassword: 'Forgot your password?',
    or: 'or',
    Email: 'Email address',
    Password: 'Password',
    button: 'Log in',
    Google: 'Log in with Google',
    Apple: 'Log in with Apple',
    Code: 'Verification code',
    GetCode: 'Get code',
    CountDown: 'Resend in {{count}}s',
    PhoneNumber: 'Phone Number',
    CodeSendSuccess: 'Verification code has been sent to your mobile phone',
    bindAccount: 'Bind account',
    signInAndBindPhoneNumber: 'Sign in and bind phone number',
    termsPrivacy:
      'By signing in, you agree to our <2>Terms of Service</2> and <6>Privacy Policy</6>.',
    EmailRequired: 'Invalid email address',
    PasswordRequired: 'Invalid password',
    PhoneNumberRequired: 'Invalid phone number',
    CodeRequired: 'Invalid validation code'
  },
  auth: {
    signup: {
      signUp: 'Create an account',
      description: 'Start a 7-day trial with all features unlocked.',
      signIn: 'sign in with existing one',
      signWith: 'Start with',
      continueWith: 'Or continue with',
      nameCant: 'Name is required',
      invalidEmail: 'Invalid email address',
      PasswordViolation:
        'Password must be at least 8 characters, and at least 1 uppercase, 1 lowercase and 1 number.',
      agreeTo: 'By signing up, you agree to our',
      terms: 'terms of service',
      privacy: 'privacy policy',
      and: 'and',
      Email: 'Email address',
      button: 'Get started'
    },
    forgotPassword: {
      forgot: 'Forgot password?',
      sendEmail: "We'll send you an email with verification code.",
      link: 'Back to sign in',
      continue: 'Continue'
    },
    resetPassword: {
      reset: 'Reset password',
      sentEmail:
        "We've sent you an email with a 6-digit verification code, please check your inbox at",
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
        successCreate: 'Contact has been created',
        Filter: 'Filter'
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
        rename: 'Rename',
        noContact: "You don't have any contacts yet",
        addPeople: 'Add people who needs to take part in the survey or data collection.',
        Contact: 'Contact',
        Phone: 'Phone number',
        Company: 'Company'
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
      explain: 'You can organize your contacts into groups to work with them more easily.',
      count: 'Contact count'
    },
    Title: 'Audience',
    subText: 'Create the right audience for accurate results'
  },
  setup: {
    createW: 'Step 1: create a new workspace',
    explain: 'Workspace is a shared environment where members can collaborate.',
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
    createForm: 'Build a new form',
    create2: 'Create',
    giveName: 'Give it a name',
    bottom: 'Continue',
    forms: 'Forms',
    Trash: 'Trash',
    renameP: 'Rename this project',
    renameForm: 'Rename this form',
    update: 'Update',
    projectName: 'Project name',
    formName: 'Form name',
    suspended: 'Suspended',
    draft: 'Draft',
    active: 'Active',
    closed: 'Closed',
    edit: 'Edit',
    dup: 'Duplicate',
    noForm: 'No form in this project yet',
    text: 'Simply pick a template or start from scratch.',
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
      restoring: 'Restoring form',
      FormName: 'Form name',
      LastUpdate: 'Last update'
    }
  },
  workspace: {
    members: {
      delMember:
        'Once you confirm to remove this member, member will no longer have access to this workspace data.',
      delConfirm: 'Are you sure you want to remove this member?',
      remove: 'Remove',
      inputPrompt: 'Please enter at least one valid email address',
      inviteMember: 'Invite your team mates',
      send: 'Invitations have been send',
      inviteExplain:
        'You can invite your team mates to join the workspace via email. The invitation valids for 7 days and will expire on',
      Add: 'Add more',
      sendBottom: 'Invite',
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
      Role: 'Role',
      LastSeen: 'Last seen',
      Action: 'Action',
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
      noProject: "You don't have any project yet",
      text: 'Project works like a group, where you can add your teammates to collaborate on forms, audiences, and integrations.',
      forms: 'forms',
      noForms: 'No form yet'
    },
    settings: {
      WorkSettings: 'Workspace Settings',
      subTitle: 'Manage your workspace settings',
      up: 'Update',
      id: 'Workspace ID',
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
    phoneNumber: 'Phone number',
    newPhoneNumber: 'New phone number',
    update: 'Update',
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
      phoneNumber: {
        change: 'Change your phone number',
        description: 'After changing, you can login with the new phone number.'
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
    click: 'Click here',
    change: 'to change it.',
    text: "Don't receive the code?",
    resend: 'Resend'
  },
  billing: {
    submission: 'Submission',
    resetsOn: 'Resets on {{date}}',
    paid: 'Paid',
    unpaid: 'Unpaid',
    expired: 'Expired',
    cancelled: 'Cancelled',
    BillDate: 'Billing date',
    ChargeTo: 'Charge to',
    Amount: 'Amount',
    Status: 'Status',
    billed: "You haven't been billed yet",
    send: 'Once we send you a bill, the details will show here.',
    monthly: 'Monthly',
    annually: 'Annually',
    cycle: 'Billing Cycle',
    addCode: 'Have a coupon code?',
    apply: 'Apply',
    noCode: "Coupon code can't be empty",
    coupon: 'Coupon code',
    downGrade: 'Downgrade plan',
    downText:
      'Notice: once you confirm to downgrade the plan, your workspace will no longer be able to access features of premium plans.',
    Downgrade: 'Downgrade',
    upgrade: 'Continue',
    cancel: 'Cancel plan',
    cancelHead: 'Cancel your plan?',
    cancelConfirm: 'Cancel plan',
    cancelText:
      'You can continue using {{planName}} Plan until {{endAt}}, at which point your subscription will expire.',
    cancelText2:
      'Once you confirm to cancel the plan, your workspace will no longer be able to access features of premium plans.',
    current: 'Current plan',
    perMonth: 'per month',
    member: 'Member',
    audience: 'Audience',
    storage: 'Storage',
    planMay: 'Your plan will expire at',
    canceledPlan: 'Your subscription canceled at {{canceledAt}}, and will end on {{endAt}}',
    noExpires: 'Your plan will never expire',
    close: 'Close',
    Plan: 'Plan',
    form: 'Form',
    upPlan: 'Upgrade plan',
    renew: 'Renew plan',
    renewButton: 'Renew now',
    plan: 'plan',
    Billed: 'Billed',
    Subtotal: 'Subtotal',
    Discount: 'Discount',
    PaymentMethod: 'Payment method',
    wechatPay: 'Wechat Pay',
    alipay: 'Alipay',
    add: 'Have a coupon code?',
    total: 'Total',
    bottom: 'Upgrade now',
    Subscription: 'Subscription',
    Invoices: 'Invoices',
    Orders: 'Orders',
    View: 'View invoice',
    Billing: 'Billing',
    invoices: 'Manage your subscription and invoices',
    Upgrade: 'Upgrade to unlock all features',
    Unlock:
      'HeyForm is completely free to use, but if you need advanced features, consider upgrading to HeyForm Premium.',
    Monthly: 'Billed monthly',
    Annually: 'Billed annually',
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
      AdditionalSeats: 'Additional Seats',
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
  form: {
    create: 'Create',
    connect: 'Connect',
    share: 'Share',
    results: 'Results',
    settings: 'Settings',
    published: 'Published',
    analytics: 'Analytics',
    submissions: 'Submissions',
    preview: 'Preview',
    publish: 'Publish'
  },
  share: {
    embed: 'Embed in website',
    Standard: 'Standard',
    Mode: 'Mode',
    scanCode: 'Scan the code to open the form, it works online and offline with a printer.',
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
    complete: 'Complete rate',
    Average: 'Average duration',
    topAudience: 'Top audience locations',
    AnalyticsOverview: 'Analytics overview',
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
    Deselect: 'Deselect all',
    NoSubmissions: 'No submissions yet',
		SubHeadline: 'Share the form online to engage a broader audience.'
  },
  formSettings: {
    Form: 'Form settings',
    subTitle: 'Manage your form settings',
    Extra: 'Extra',
    subArchive: 'Submission archive',
    archiveText:
      "Disable the submission archive if you don't want HeyForm to store your submissions.",
    timeLimit: 'Time limit',
    timeText:
      'You can set an allowable time here if you want to block the submission after the countdown is over.',
    dataError: 'Please enter a valid number',
    Hour: 'Hour',
    Minute: 'Minute',
    Second: 'Second',
    Day: 'Day',
    progressBar: 'Progress bar',
    progressText: 'You can easily let respondents know how close they are to completing your form.',
    Redirect: 'Redirect on completion',
    redirectText:
      "Take your respondents to another web page once they're done filling in your form.",
    Update: 'Update',
    Basic: 'Basic',
    formUpdated: 'Form settings have been successfully updated',
    status: 'Form status',
    closeForm: 'Close form',
    closeFormText:
      'You can close this form to stop receiving new submissions and prevent public access to the form.',
    closedFormMessage: 'Closed form message',
    closedFormMessageText:
      'This is what the recipients will see if you closed the form with one of the options above.',
    closedFormTitle: 'Title',
    closedFormDescription: 'Description',
    expiration: 'Close form when expires',
    expirationText:
      'When you want to receiving submissions within a certain date range, you can set the start and end dates here.',
    to: 'to',
    dateErr: 'Close Date must come after the Start Date',
    submission: 'Limit the number of submissions',
    submissionText:
      'This allows you to set a specific total number of submissions allowed for your form.',
    IpLimit: 'Limit the frequency of submitting for same IP address',
    IpLimitText:
      'You can set it here if you want to limit the number of submitting times from a same IP address in a period.',
    Protection: 'Protection',
    Anti: 'Anti-spam',
    AntiText: 'Enable to prevent spam submissions.',
    Bots: 'Bots prevention',
    BotsText: 'Prevent bot submissions by enabling the captcha.',
    deleteForm: 'Delete this Form',
    deleteFormText:
      'Deleting the form will erase all traces of this form on our databases, including all the submissions.',
    archive: 'Are you sure you want to disable Submission Archive?',
    archiveConfirm:
      'Once you confirm to disable Submission Archive, all submissions will be deleted.',
    Cancel: 'Cancel',
    Confirm: 'Confirm',
    Disable: 'Disable',
    times: 'times in every',
    Language: 'Language',
    LanguageDescription:
      'Select the language in which respondents will see your form. Applies to non-customized text, such as default buttons, validation errors, etc.'
  },
  integration: {
    Categories: 'Categories',
    connectText: 'Connect your form data with your favorite apps, refer to the ',
    help: 'help center',
    helpApp: 'for the instructions.',
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
    select: 'Select folder',
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
    SelectGroup: 'Select group',
    selectGroup: 'You can select your own group or groups which you are connected with.',
    selectProject: 'Select project',
    selectMember: 'Select member (optional)',
    selectLabel: 'Select label (optional)',
    selectMilestone: 'Select milestone (optional)',
    issueTitle: 'Issue title',
    issueDescription: 'Issue description (optional)',
    SelectOrganization: 'Select organization',
    selectRepository: 'Select repository',
    selectAssignee: 'Select assignee (optional)',
    selectDrive: 'Select drive',
    selectGoogleDrive: 'You can select your own Google Drive or',
    GoogleSharedDrives: 'Google shared drives',
    with: 'which you are connected with.',
    SelectFolder: 'Select folder',
    GoogleText:
      'Folder where to place file if you have added a "File Upload" component in your form.',
    SelectSpreadsheet: 'Select spreadsheet',
    SelectWorksheet: 'Select worksheet',
    MapFields: 'Map fields',
    googleSheet:
      "Map HeyForm to Google Sheets fields. If you change a field on Google Sheets, please update it here too, otherwise the integration won't work as expected.",
    leftPlaceholder: 'HeyForm question',
    rightPlaceholder: 'Google Sheets field',
    leftTipText: 'Select HeyForm question',
    rightTipText: 'Select Google Sheets field',
    ColumnValues: 'Column values (optional)',
    mondayText:
      "Map HeyForm to Monday columns. If you change a column on Monday, please update it here too, otherwise the integration won't work as expected.",
    Board: 'Board',
    SelectBoard: 'Select a board',
    Group: 'Group (Optional)',
    ItemName: 'Item Name',
    mondayColumn: 'Select Monday column',
    selectQuestion: 'Select a question',
    PhoneNumber: 'Phone number (optional)',
    JobTitle: 'Job title (optional)',
    SelectAudience: 'Select audience',
    SubscriberEmail: 'Subscriber email',
    Address: 'Address',
    AddField: 'Add field',
    ConnectWith: 'Connect with',
    SystemURL: 'System URL',
    serverURL: 'Server URL',
    serverURLText:
      'The server URL is the URL you access the frontend of the system with. This can be https://support.domain.com or https://domain.com/support for example.',
    ApiKey: 'API Key',
    ApiKeyText:
      'Generate an API token by going to Manage -> API keys in the admin panel, making sure it has create ticket permission',
    LearnAbout: 'Learn about',
    integration: 'integration',
    URLText:
      'The system URL is the URL you access the frontend of the system with. This can be https://support.domain.com or https://domain.com/support for example.',
    tokenAPT: 'API Token',
    APIText:
      'Generate an API token by going to Settings -> General -> API Tokens in the operator panel, making sure it has Read & Write access.',
    UserName: 'User name (optional)',
    UserEmail: 'Email address (optional)',
    UserNameRequired: 'User name',
    UserEmailRequired: 'Email address',
    Subject: 'Subject',
    Text: 'Text',
    Message: 'Message',
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
    ImportForm: 'Import form',
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
    ClassicForm: 'Classic form',
    templatesForm: 'Create a new form from templates',
    URLForm: 'Import form from external URL'
  },
  other: {
    DragUploader: {
      drag: 'or drag and drop',
      upTo: 'PNG, JPG, GIF up to',
      upload: 'Upload a file'
    },
    labelList: {
      Dashboard: 'Dashboard',
      TeamMembers: 'Team',
      Audiences: ' Audiences',
      Billing: 'Billing',
      Workspace: 'Workspace settings',
      Projects: 'Projects',
      Resources: 'Resources',
      GettingStarted: 'Getting started',
      Help: 'Help center',
      Template: 'Templates',
      Changelog: "What's new",
      View: 'View profile',
      Account: 'Account settings',
      Logout: 'Logout',
      CreateWorkspace: 'Create new workspace',
      Version: 'Version'
    },
    Change: 'Change',
    Remove: 'Remove',
    Search: 'Search unsplash images',
    Upload: 'Upload',
    Unsplash: 'Unsplash'
  },
  formBuilder: {
    type: 'Type',
    settings: 'Settings',
    required: 'Required',
    dateFormat: 'Date format',
    timeField: 'Time field',
    dateRangeTo: 'to',
    multipleSelection: 'Multiple selection',
    unlimited: 'Unlimited',
    exactNumber: 'Exact number',
    range: 'Range',
    randomize: 'Randomize',
    steps: 'Steps',
    labels: 'Labels',
    leftLabel: 'Left label',
    middleLabel: 'Middle label',
    rightLabel: 'Right label',
    defaultCountry: 'Default country',
    star: 'Star',
    like: 'Like',
    thumbsUp: 'Thumbs up',
    crown: 'Crown',
    happy: 'Happy',
    buttonText: 'Button text',
    image: 'Image',
    changeImage: 'Change',
    removeImage: 'Remove',
    addImage: 'Add',
    layout: 'Layout',
    brightness: 'Brightness',
    duplicate: 'Duplicate',
    delete: 'Delete',
    question: 'Question',
    questionPlaceholder: 'Type a question',
    descriptionPlaceholder: 'Add a description (optional)',
    recommended: 'Recommended',
    contactInfo: 'Contact info',
    choices: 'Choices',
    text: 'Text',
    legalConsent: 'Legal & consent',
    formStructure: 'Form structure',
    Content: 'Content',
    searchFieldType: 'Find a question type',
    allFieldTypes: 'All question types',
    welcome: 'Welcome',
    thankYou: 'Thank you',
    multipleChoice: 'Multiple choice',
    phoneNumber: 'Phone number',
    shortText: 'Short text',
    longText: 'Long text',
    questionGroup: 'Question group',
    statement: 'Statement',
    pictureChoice: 'Picture choice',
    yesNo: 'Yes/No',
    email: 'Email',
    fullName: 'Full name',
    rating: 'Rating',
    opinionScale: 'Opinion scale',
    date: 'Date',
    dateTime: 'Date & time',
    dateRange: 'Date range',
    number: 'Number',
    fileUpload: 'File upload',
    payment: 'Payment',
    address: 'Address',
    country: 'Country',
    legalTerms: 'Legal terms',
    signature: 'Signature',
    website: 'Website',
    address1: 'Address line 1',
    address2: 'Address line 2 (optional)',
    city: 'City',
    state: 'State/province',
    zip: 'Zip/Postal code',
    selectCountry: 'Select a country',
    year: 'Year',
    month: 'Month',
    day: 'Day',
    hour: 'Hour',
    minute: 'Minute',
    clickUpload: 'Drag-and-drop, or select a file to upload.',
    sizeLimit: 'Size limit: 10MB',
    firstName: 'First name',
    lastName: 'Last name',
    accept: 'I accept',
    dontAccept: "I don't accept",
    yourAnswer: 'Your answer goes here',
    hitTip: 'Press Shift ⇧ + Enter ↵ for a new line',
    addChoice: 'Add choice',
    choicePlaceholder: 'choice',
    drawSignature: 'Draw your signature above',
    clearSignature: 'Clear',
    data: 'Data',
    inputTable: 'Input table',
    addColumn: 'Add column',
    columnPlaceholder: 'Col {{index}}',
    design: 'Design',
    theme: 'Theme',
    customize: 'Customize',
    customCSS: 'Custom CSS',
    submitDate: 'Submit date',
    contact: 'Contact',
    customText: 'Custom text',
    customSingle: 'Custom single choice',
    customMultiple: 'Custom multiple choice',
    logic: 'Logic',
    addNewQuestion: 'Add new question',
    variable: {
      title: 'Variables',
      description:
        'A form variable represents a hidden calculated value based on the answers from your respondents in your form. For example, calculating the score of a quiz.',
      empty: 'There are no variables yet, you can click "Add variable" to add one.',
      add: 'Add variable',
      update: 'Update variable',
      edit: 'Edit variable',
      addButton: 'Add variable',
      updateButton: 'Update variable',
      value: 'Default value: {{value}}',
      type: 'Type',
      name: 'Name',
      default: 'Default value',
      string: 'String',
      number: 'Number'
    },
    edit: 'Edit',
    rules: 'Rules',
    bulkEdit: 'Bulk edit',
    bulkEditDescription: "Bulk edit multiple question's logics at once",
    removeAll: 'Remove all',
    saveChanges: 'Save changes',
    cancel: 'Cancel',
    when: 'When',
    then: 'Then',
    deleteRule: 'Delete rule',
    rulePlaceholder:
      'There are no rules yet. Select a question in the left preview and add a rule in the pop-up panel. You can also click "Bulk edit" to batch edit all rules.',
    singleRule: '1 rule has been set',
    multipleRules: '{{count}} rules have been set',
    redirect: 'Redirect on completion',
    buttonLinkUrl: 'Button link URL',
    CustomCSS: 'Custom CSS',
    CustomCSSDescription:
      'If neither the Theme nor Customize defined styles meet your needs, you can insert custom CSS to modify it to your desired styles.',
    customCssTableDescription: 'Description',
    customCssTableClass: 'CSS Class',
    ConnectStripe: 'Connect with stripe',
    price: 'Price',
    currency: 'Currency'
  },
  onboarding: {
    trialTitle: 'Start your 14-day free trial',
    trialDesc:
      'No contracts, downgrade or cancel the subscription anytime within a single click from your dashboard.',
    trialButton: 'Start trial',
    trialGofree: 'Continue with free plan'
  }
}
