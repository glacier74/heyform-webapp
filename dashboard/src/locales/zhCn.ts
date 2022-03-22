export default {
  login: {
    signIn: '登录您的帐户',
    startFree: 'start your free trial',
    signWith: 'Sign in with',
    continueWith: 'Or continue with',
    remberMe: 'Remember me',
    forgotPassword: 'Forgot your password?',
    or: 'Or'
  },
  auth: {
    signup: {
      signUp: 'Create an account',
      signIn: 'sign in with existing one',
      signWith: 'Sign up with',
      continueWith: 'Or continue with',
      nameCant: 'Name can\'t be empty',
      invalidEmail: 'Invalid email address',
      PasswordViolation: 'Your password must be at least 8 characters, and at least 1 uppercase, 1 lowercase and 1 number.',
      agreeTo: 'By signing up, you agree to our',
      terms: 'Terms of Service',
      privacy: 'Privacy Policy',
      and: 'and',
      Email: 'Email address'
    },
    forgotPassword: {
      forgot: 'Forgot Password?',
      sendEmail: 'We\'ll send you an email with verification code to reset your password.',
      link: 'Back to sign in',
      continue: 'Continue'
    },
    resetPassword: {
      reset: 'Reset Password',
      sentEmail: 'We\'ve sent you an email with a 6-digit verification code. Please check your inbox at',
      verificationCode: 'Verification code',
      invalidCode: 'Invalid verification code',
      newPassword: 'New password',
      repeatPassword: 'Repeat password',
      passwordViolation: 'Your password must be at least 8 characters, and at least 1 uppercase, 1 lowercase and 1 number.',
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
        notEmpty: 'Full name can\'t be empty',
        invalidEmail: 'Invalid email address',
        phnoeNumber: 'Phone number',
        optional: 'optional',
        phoneNotempty: 'Phone number can\'t be empty',
        jobTitle: ' Job title',
        jobNotempty: 'Job title can\'t be empty',
        successCreate: 'Contact has been created'
      },
      importContact: {
        Import: 'Import contacts',
        CSVfile: 'You can bulk create contacts from CSV file.',
        download: 'Download the template',
        csv: 'The number of columns in your CSV should be the same as the example below.',
        blankTemplate: 'Download blank template',
        imp: 'Import',
        groupSelect: 'Select groups',
        selectOne: 'Select at least one group or create a new one',
        uploadCsv: 'Upload completed CSV file',
        invaild: 'Invalid CSV file'
      },
      editContact: {
        detail: 'Contact detail',
        update: 'Update contact',
        selectGroup: 'Select at least one group or create a new one',
        name: 'Full name',
        nameNotempty: 'Full name can\'t be empty',
        phoneNottempty: 'Phone number can\'t be empty'
      },
      index: {
        delContact: 'Deleting contact...',
        deleted: 'Contact has been deleted',
        edit: 'Edit',
        noContact: 'You don\'t have any contacts yet',
        addPeople: 'Add people who needs to take part in the survey or data collection.'
      }
    },
    groups: {
      addGroup: {
        add: 'Add group',
        explain: 'You can organize your contacts into groups to work with them more easily.',
        Gname: 'Group name',
        groupNottempty: 'Group name can\'t be empty'

      },
      renameGroup: {
        rename: 'Rename group',
        up: 'Update'
      },
      contact: 'Contacts',
      noGroup: 'You don\'t have any groups yet',
      explain: 'You can organize your contacts into groups to work with them more easily.'

    },
    Title: 'Audience',
    subText: 'Create the right audience for accurate results'
  },
  setup: {
    createW: 'Create a new workspace',
    explain: 'Workspaces are shared environments where members can collaborate. After create a workspace, you can invite others to join.',
    name: 'Workspace name',
    logo: 'Workspace logo',
    create: 'Create'
  },
  project: {
    deleteProject: {
      del: 'Delete project',
      deleteExplain: 'Keep in mind this operation is irreversible and will permanently delete all the data associated with this project.',
      deleteExplain2: ' Once you confirm to delete the project, you will no longer have access to the project data.',
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
    noForm: 'Don\'t have any forms in this project yet',
    text: 'It\'s your one-stop solution for all form needs. Quickly build online forms without any coding or design experience.',
    suspendForm: 'This form is suspended',
    suspendText: 'If you have any questions about suspend, please click the button below to contact us.',
    contact: 'Contact us',
    ProjectMembers: {
      members: 'Members in this project',
      explain: 'Assigned members can co-manage the activities here in this project.',
      assigned: 'Assigned',
      notassigned: 'Not assigned',
      leave: 'Leave',
      remove: 'Remove',
      assign: 'Assign'
    },
    trash: {
      restore: 'Restore',
      delForever: 'Delete forever',
      explain: 'You can restore any file deleted in the last 30 days.',
      link: 'Learn more',
      noForm: 'Don\'t have any forms in trash',
      daysExplain: 'Forms will be permanently deleted from the trash after 30 days.',
      delForm: 'will be deleted forever and you won\'t be able to restore it.',
      deleteForever: 'Delete forever?',
      cancel: 'Cancel'

    }


  },
  workspace: {
    members: {
      delmember: 'Once you confirm to remove this member, member will no longer have access to this workspace data.',
      delconfirm: 'Are you sure you want to remove this member?',
      remove: 'Remove',
      inputPrompt: 'Please enter at least one valid email address',
      inviteMember: 'Invite members to',
      send: 'Invitations have been send',
      inviteExplain: 'You can invite members to join the workspace by sending emails below. The invitation expires on',
      Add: 'Add more',
      sendBottom: 'Send Invitations',
      member: 'Members',
      manage: 'Manage who has access to the workspace.',
      leave: 'Are you sure you want to leave the workspace?',
      leaveExplain: 'Once you confirm to leave this workspace, you will no longer have access to this workspace data.',
      bottomLeave: 'Leave',
      transferTitle: 'Are you sure you want to transfer this workspace?',
      transferWorkspace: 'Once you confirm to transfer this workspace, you will no longer be the owner of this workspace.',
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
      workExplain: 'Projects are sub groups in a workspace, where you can add your workspace members to work collaboratively on forms, audiences and integrations.',
      createBottom: 'Create',
      assign: 'Assign members',
      createP2: 'Create project',
      noProject: 'You don\'t have any projects yet',
      text: 'Projects are sub groups in a workspace, where you can add your workspace members to work collaboratively on forms, audiences and integrations.'

    },
    settings: {
      Wsettings: 'Workspace Settings',
      subTitle: 'Manage your workspace settings',
      up: 'Update',
      nameW: 'Workspace name',
      removeBranding: 'Remove HeyForm branding',
      brandingExplain: 'To make HeyForm feel like it\'s completely owned by your brand, remove the HeyForm Logo in the form footer.',
      learnMore: 'Learn more about remove branding in docs',
      customDomain: 'Custom domain',
      domainExplain: 'Custom domains allow you to make form accessible at your own, non-HeyForm domain names (for example, yourcustomdomain.com). HeyForm supports all top-level domains in custom domains.',
      domainExplain2: 'Custom domains allow you to make form accessible at your own, non-HeyForm domain names.',
      domainLink: 'Learn more about custom domains',
      domainChecking: 'Checking',
      type: 'Type',
      domainName: 'Name',
      content: 'Content',
      cname: 'CNAME',
      domainUp: 'Custom domain has been updated',
      invalid: 'Invalid domain name',
      domain: 'eg: yourcustomdomain.com',
      delWorksapce: {
        sendEmail: 'An email containing a verification code was sent to',
        dissolve: 'Dissolve workspace',
        warning: 'Keep in mind this operation is irreversible and will permanently delete all the data associated with this workspace.',
        warning2: 'Once you confirm to dissolve the workspace, you will no longer have access to the workspace data.',
        warning3: 'By dissolving the team, all the forms and data will be erased and cannot be restored! Be cautious!'
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
      invited: 'You\'ve been invited to',
      UsernameAdd: '\'s workspace',
      joinText: 'Join the workspace and start working together!',
      member: 'members',
      bottom: 'Join'
    }
  }

}
