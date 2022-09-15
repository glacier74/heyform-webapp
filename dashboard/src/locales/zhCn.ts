export default {
  app: {
    name: '简约表单',
    copy: '复制',
    copied: '已复制'
  },
  login: {
    signIn: '登录您的帐户',
    startFree: '开始您的免费试用',
    signWith: '使用以下方式登录',
    noAccount: '没有账号? 立即注册',
    bindAccountDescription: '已有简约表单账号? 输入账号信息登录立即绑定',
    continueWith: '或者其他方式登录',
    rememberMe: '记住我',
    forgotPassword: '忘记密码?',
    or: '或者',
    Email: '电子邮件地址',
    Password: '密码',
    button: '登录',
    Google: '使用 Google 登录',
    Apple: '使用 Apple 登录',
    Code: '验证码',
    GetCode: '获取验证码',
    CountDown: '{{count}}秒后重发',
    PhoneNumber: '手机号码',
    CodeSendSuccess: '验证码发送成功',
    bindAccount: '绑定账号',
    signInAndBindPhoneNumber: '授权并登录',
    termsPrivacy: '登录即代表您同意我们的<2>服务条款</2>和<6>隐私政策</6>。',
    EmailRequired: '无效的邮箱地址',
    PasswordRequired: '无效的密码',
    PhoneNumberRequired: '无效的手机号码',
    CodeRequired: '无效的验证码'
  },
  auth: {
    signup: {
      signUp: '创建帐户',
      description: '开始为期14天的简约表单免费试用',
      signIn: '使用现有帐户登录',
      signWith: '使用以下方式注册',
      continueWith: '或者其他方式注册',
      Name: '姓名',
      nameCant: '姓名不能为空',
      invalidEmail: '无效的电子邮件地址',
      PasswordViolation: '您的密码必须至少有8个字符，并且至少有1个大写字母、1个小写字母和1个数字。',
      agreeTo: '通过注册，视为您同意我们的',
      terms: '服务条款',
      privacy: '隐私策略',
      and: '和',
      Email: '电子邮件地址',
      button: '开始免费试用'
    },
    forgotPassword: {
      forgot: '忘记密码?',
      sendEmail: '我们将向您发送一封包含验证码的电子邮件，以重置您的密码。',
      link: '返回以登录',
      continue: '继续'
    },
    resetPassword: {
      reset: '重置密码',
      sentEmail: '我们已经向您发送了一封包含6位数字验证码的电子邮件。请查看您的收件箱在',
      verificationCode: '验证码',
      invalidCode: '无效的验证码',
      newPassword: '新的密码',
      repeatPassword: '重复密码',
      passwordViolation: '您的密码必须至少有8个字符，并且至少有1个大写字母、1个小写字母和1个数字。',
      passwordMismatch: '您的新密码和重复密码不匹配。'
    }
  },
  audiences: {
    contact: {
      addContact: {
        add: '新增联系人',
        addPeople: '添加需要参与调查或数据收集的人员。',
        groups: '群组',
        selectGroup: '至少选择一个群组或创建一个新群组',
        findGroup: '查找或创建一个群组',
        createGroup: '新建群组',
        fullName: '姓名',
        notEmpty: '全名不能为空',
        invalidEmail: '无效的电子邮件地址',
        phoneNumber: '电话号码',
        optional: '可选的',
        phoneNotEmpty: '电话号码不能为空',
        jobTitle: ' 职位名称',
        jobNotEmpty: '职位名称不能为空',
        successCreate: '联系人已创建',
        Filter: '过滤'
      },
      importContact: {
        Import: '导入联系人',
        CSVFile: '您可以从 CSV 文件批量创建联系人',
        download: '下载模板',
        csv: 'CSV 中的列数应与以下示例相同',
        blankTemplate: '下载空白模板',
        imp: '导入',
        groupSelect: '选择群组',
        selectOne: '至少选择一个群组或创建一个新群组',
        uploadCsv: '上传完成的 CSV 文件',
        invalid: '无效的 CSV 文件'
      },
      editContact: {
        detail: '联系人详情',
        update: '更新联系人',
        selectGroup: '至少选择一个群组或创建一个新群组',
        name: '姓名',
        nameNotEmpty: '姓名不能为空',
        phoneNotEmpty: '电话号码不能为空',
        contactUpdate: '联系人已创建'
      },
      index: {
        delContact: '删除联系人...',
        deleted: '联系人已被删除',
        edit: '编辑',
        rename: '重命名',
        noContact: '您还没有任何联系人',
        addPeople: '添加需要参与调查或数据收集的人员。',
        Contact: '联系人',
        Phone: '手机号码',
        Company: '公司'
      }
    },
    groups: {
      addGroup: {
        add: '新建群组',
        explain: '您可以将联系人组织成组，以便更轻松地与他们合作。',
        GroupName: '群组名称',
        groupNotEmpty: '群组名称不能为空'
      },
      renameGroup: {
        rename: '重命名群组',
        up: '更新'
      },
      contact: '联系人',
      noGroup: '您还没有任何群组',
      explain: '您可以将联系人组织成组，以便更轻松地与他们合作。',
      count: '联系人数量'
    },
    Title: '受众群体',
    subText: '创建合适的受众以获得准确的结果'
  },
  setup: {
    createW: '创建新团队空间',
    explain: '团队空间是成员可以协作的共享环境。创建团队空间后，您可以邀请其他人加入。',
    name: '团队空间名称',
    logo: '团队空间标识',
    create: '新建'
  },
  project: {
    deleteProject: {
      del: '删除项目',
      deleteExplain: '请记住，此操作是不可逆的，并将永久删除与此项目相关的所有数据。',
      deleteExplain2: '一旦您确认删除项目，您将无法再访问项目数据。',
      sendEmail: '一封包含验证码的电子邮件已发送至',
      delBottom: '删除项目',
      code: '验证码'
    },
    rename: '重命名',
    del: '删除',
    bottom: '新建表单',
    forms: '表单',
    Trash: '回收站',
    renameP: '重命名这个项目',
    renameForm: '重命名这个表单',
    update: '更新',
    projectName: '项目名称',
    formName: '表单名称',
    suspended: '已暂停',
    draft: '草稿',
    active: '进行中',
    closed: '已关闭',
    edit: '编辑',
    dup: '复制',
    noForm: '在这个项目中还没有任何表单',
    text: '这是一站式解决方案，可满足所有表单需求。快速构建在线表单，无需任何编码或设计经验。',
    suspendForm: '此表单已暂停使用',
    suspendText: '如果您对表单暂停有任何疑问，请单击下面的按钮与我们联系。',
    contact: '联系我们',
    Deleting: '删除表单...',
    Duplicating: '复制表单...',
    ProjectMembers: {
      members: '本项目的成员',
      explain: '指定的成员可以在此项目中共同管理活动。',
      assigned: '已分派',
      notAssigned: '未分派',
      leave: '离开',
      remove: '移除',
      assign: '分派',
      submissions: '提交',
      NoSubmissions: '还没有提交',
      removeMember: '未能删除成员',
      assignMember: '未能分派成员',
      leftP: '您已经离开了这个项目',
      leaveP: '未能离开这个项目',
      you: ' (您)'
    },
    trash: {
      restore: '还原',
      delForever: '永久删除',
      explain: '您可以恢复过去30天内删除的任何文件。',
      link: '了解更多',
      noForm: '垃圾箱里没有任何表单',
      daysExplain: '表单将在30天后从回收站中永久删除。',
      delForm: '将被永久删除，而您将无法恢复它。',
      deleteForever: '永久删除？',
      cancel: '取消',
      restoring: '恢复表单',
      FormName: '表单名称',
      LastUpdate: '最新更新'
    }
  },
  workspace: {
    members: {
      delMember: '一旦您确认删除此成员，该成员将无法再访问此团队空间数据。',
      delConfirm: '您确定要删除此成员吗？',
      remove: '移除',
      inputPrompt: '请至少输入一个有效的电子邮件地址',
      inviteMember: '邀请成员到',
      send: '邀请已经发出',
      inviteExplain: '您可以通过发送以下电子邮件邀请成员加入团队空间。邀请有效期为',
      Add: '添加更多',
      sendBottom: '发送邀请',
      member: '成员',
      manage: '管理谁有权访问团队空间。',
      leave: '是否确实要离开团队空间？',
      leaveExplain: '一旦您确认离开此团队空间，您将无法再访问此团队空间数据。',
      bottomLeave: '离开',
      transferTitle: '是否确实要转移此团队空间？',
      transferWorkspace: '一旦您确认转移此团队空间，您将不再是此团队空间的所有者',
      transfer: '转移',
      Role: '角色',
      LastSeen: '最近活跃时间',
      Action: '操作',
      index: {
        owner: '所有人',
        member: '成员',
        transfer: '所有权转移',
        leave: '离开团队空间',
        invite: '邀请成员'
      }
    },
    workSpace: {
      createP: '创建一个新的项目',
      workExplain:
        '项目是工作空间中的子组，您可以在其中添加工作空间成员，以便在表单、访问群体和集成方面进行协作。',
      createBottom: '新建项目',
      assign: '分派成员',
      createP2: '创建项目',
      noProject: '您还没有任何项目',
      text: '项目是工作空间中的子组，您可以在其中添加工作空间成员，以便在表单、访问群体和集成方面进行协作。',
      forms: '表单',
      noForms: '还没有表单'
    },
    settings: {
      WorkSettings: '团队空间设置',
      subTitle: '管理您的团队空间设置',
      up: '更新',
      id: '团队空间 ID',
      nameW: '团队空间名称',
      removeBranding: '移除 简约表单 品牌标识',
      brandingExplain: '删除 简约表单 表单页底部的品牌标识，让 简约表单 更像是完全属于您的品牌。',
      learnMore: '在文档中了解有关删除品牌的更多信息',
      customDomain: '自定义域名',
      domainExplain:
        '自定义域允许您在自己的非 简约表单 域名（例如yourcustomain.com）上访问表单。简约表单 支持自定义域中的所有顶级域。',
      domainExplain2: '自定义域允许您使用自己的非 简约表单 域名访问表单。',
      domainLink: '了解有关自定义域的更多信息',
      domainChecking: '检查中',
      type: '类型',
      domainName: '名称',
      content: '内容',
      cname: 'CNAME',
      domainUp: '自定义域已更新',
      invalid: '无效的域名',
      domain: '例如: yourcustomdomain.com',
      delWorkspace: {
        sendEmail: '一封包含验证码的电子邮件已发送至',
        dissolve: '解散团队空间',
        warning: '请记住，此操作是不可逆的，并将永久删除与此团队空间相关联的所有数据。',
        warning2: '一旦确认要分解团队空间，您将无法再访问团队空间数据。',
        warning3: '通过解散团队空间，所有的表单和数据都将被擦除，无法恢复！要谨慎！'
      },
      receive: '导出完成后，您将收到一封带有下载链接的电子邮件。',
      export: '导出内容',
      getEmail: '在一个文件中获取一封包含所有表单和设置的电子邮件。',
      exportBottom: '请求您的数据',
      logo: '标识',
      pickLogo: '为您的团队空间选择一个标识'
    },
    createWorkspace: {
      newWorkspace: '创建新团队空间',
      text: '团队空间是成员可以协作的共享环境。创建团队空间后，您可以邀请其他人加入。',
      name: '团队空间名称',
      logo: '团队空间标识',
      create: '新建'
    },
    join: {
      invited: '您被邀请到',
      UsernameAdd: '的团队空间',
      joinText: '加入团队空间，开始一起工作！',
      member: '成员',
      bottom: '加入'
    }
  },
  user: {
    phoneNumber: '手机号码',
    newPhoneNumber: '新手机号码',
    update: '更新',
    settings: {
      avatar: '头像',
      avatarText: 'Gravatar 默认作为您的 简约表单 头像，您可以在这里上传您的自定义头像。',
      deletedAccount: {
        sendEmail: '一封包含验证码的电子邮件已发送至',
        del: '删除帐户',
        delText:
          '此操作无法撤消。这将永久删除您的整个帐户。您创建的所有团队空间都将被删除，并且您将从所有共享团队空间中移除。',
        delSure: '如果您确定要继续删除您的帐户，请继续下面的操作。',
        delBottom: '删除我的账户',
        delCode: '验证码',
        delAccount: '计划删除帐户',
        delSendEmail: '我们已计划在48小时内删除您的帐户。完成后，您将收到一封电子邮件确认。',
        loggedOut: '您将会退出登录',
        delText2: '这将永久删除您的整个帐户。您的所有表单、提交和团队空间都将被删除',
        danger: '危险行为'
      },
      emailAddress: {
        change: '更改您的电子邮件地址',
        sendEmail: '我们将向您发送一封带有6位数字验证码的电子邮件。',
        newEmail: '新电子邮件地址',
        checkEmail: '查看您的电子邮件',
        code: '我们已向您发送了一封带有6位数字验证码的电子邮件。请查看您的收件箱：',
        continue: '继续',
        changeEmail: '更改电子邮件地址',
        send: '发送'
      },
      phoneNumber: {
        change: '更改您的手机号码',
        description: '更改后，您可以使用新的手机号码登录。'
      },
      account: '帐户设置',
      accountText: '对帐户设置的更改将应用于您的所有团队空间。',
      password: {
        changeText: '您的密码已更改',
        changeP: '修改密码',
        currentPassword: '当前密码',
        newP: '新的密码'
      },
      name: '您的名字'
    },
    verifyEmail: '验证您的电子邮件地址',
    sendEmailText: '我们已向您发送了一封带有6位数字验证码的电子邮件。请查看您的收件箱：',
    typoEmail: '输入了错误的电子邮件地址？',
    click: '点击这里',
    change: '来改变它。',
    text: '没有收到验证码？',
    resend: '重新发送'
  },
  billing: {
    paid: '已支付',
    unpaid: '未支付',
    expired: '已过期',
    cancelled: '已取消',
    BillDate: '创建日期',
    ChargeTo: '支付用于',
    Amount: '总金额',
    Status: '状态',
    billed: '您还没有收到账单',
    send: '一旦我们向您发送账单，详细信息将显示在这里。',
    monthly: '按月',
    annually: '按年',
    cycle: '计费周期',
    addCode: '添加优惠券代码',
    apply: '应用',
    noCode: '优惠码不能为空y',
    coupon: '优惠码',
    downGrade: '降级套餐',
    downText: '注意：一旦确认降级套餐，您的团队空间将无法再访问高级套餐的功能。',
    Downgrade: '降级',
    upgrade: '升级',
    current: '当前套餐',
    perMonth: '每月',
    member: '成员',
    audience: '受众群体',
    storage: '存储',
    planMay: '您的套餐的到期时间为',
    noExpires: '您的套餐将不会到期',
    Plan: '套餐',
    form: '表单',
    upPlan: '升级套餐',
    renew: '续费套餐',
    renewButton: '现在续费',
    plan: '套餐',
    Billed: '按',
    Subtotal: '小计',
    Discount: '优惠',
    PaymentMethod: '支付方式',
    wechatPay: '微信支付',
    alipay: '支付宝',
    add: '添加优惠码',
    total: '总计',
    bottom: '现在升级',
    Subscription: '订阅',
    Invoices: '发票',
    Orders: '订单',
    View: '查看账单',
    Billing: '计费信息',
    invoices: '管理您的订阅和发票',
    Upgrade: '升级您的套餐',
    Unlock: '解锁更多功能。',
    Monthly: '按月计费',
    Annually: '按年计费',
    plans: {
      plan: '套餐',
      usage: '用途',
      comparison: '定价方案比较',
      unlimited: '不限制',
      questions: '每个表单的问题数',
      formsN: '表单数量',
      submissions: '提交数量',
      collaborators: '协作人数量',
      contacts: '联系人数量',
      AdditionalSeats: '额外坐席',
      additional: '额外坐席费用',
      seat1: '$3/坐席/每月',
      seat2: '$5/坐席/每月',
      seat3: '$8/坐席/每月',
      reports: '报告',
      storage: '存储',
      features: '功能',
      integrations: '集成',
      limited: '有限制',
      integrations1: '有效的 (70%可使用)',
      integrations2: '有效的 (85%可使用)',
      validation: '字段验证',
      anti: '反垃圾邮件和机器人预防',
      template: '访问模板库',
      embed: '嵌入到网站',
      submissionLimit: '到达提交额度限制时关闭表单',
      schedule: '定时关闭表单',
      URL: '自定义网址重定向',
      export: '将数据导出到 CSV',
      Password: '密码保护',
      customized: '主题定制',
      Thank: '定制表单完成页面',
      team: '团队协作',
      customDomain: '自定义域名',
      whitelabel: '自定义品牌标识',
      partial: '部分提交',
      support: '客服支持',
      manager: '专职客服经理'
    }
  },
  form: {
    create: '创建',
    connect: '连接',
    share: '分享',
    results: '结果',
    settings: '设置',
    published: '已发布',
    publish: '发布'
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
    sendForm: '将表单发送给合适的受众以获得准确的结果。您可以',
    organize: '或将它们组织成',
    easilyShare: '无需每次手动输入所有电子邮件地址，即可更轻松地与他们共享表单。',
    embedWeb: [
      {
        title: '标准',
        description: '将 简约表单 作为您网站的一部分'
      },
      {
        title: '弹出',
        description: '简约表单 在屏幕中央弹出。'
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
    embedText: '您可以使用下面列出的任何方法将表单嵌入到您的网站。',
    Code: '代码',
    shared: '表单已成功共享',
    fetchGroups: '无法获取联系人群组'
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
    Spam: '垃圾箱',
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
    archiveText: '如果您不希望 简约表单 存储您的提交，请禁用提交存档。',
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
    timeText: '如果您想在倒计时结束后自动提交，可以在下面设置。',
    dataError: '请输入一个有效的数字',
    Hour: '小时',
    Minute: '分钟',
    Second: '秒',
    Day: '天',
    progressBar: '进度条',
    progressText: '您可以很容易地让受访者知道他们离填写您的表单有多近。',
    formUpdated: '表单设置已成功更新',
    disableForm: '您可以禁用此表单以停止接收新提交的内容，并阻止公众访问该表单。',
    expiration: '到期时间',
    expirationText: '如果希望在某个日期范围内接收提交，可以在下面设置开始和结束日期。',
    dateErr: '结束日期必须在开始日期之后',
    submission: '提交限制',
    submissionText: '这允许您设置表单允许的特定提交总数。',
    IpLimit: 'IP 地址限制',
    IpLimitText: '如果要限制一段时间内从同一 IP 地址提交的次数，可以在下面设置。',
    times: '次 每'
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
      "Map 简约表单 to Airtable fields. It's crucial to type the Airtable field names exactly as they appear in your table. If you change a field name on Airtable, please update it here too, otherwise the integration won't work as expected.",
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
    helpDocument: '帮助文档',
    SelectGroup: '选择分组',
    selectGroup: '您可以选择自己的分组或您加入的分组。',
    selectProject: '选择项目',
    selectMember: '选择成员 (可选的)',
    selectLabel: '选择标签 (可选的)',
    selectMilestone: '选择里程碑 (可选的)',
    issueTitle: '问题标题',
    issueDescription: '问题描述 (可选的)',
    SelectOrganization: '选择组织',
    selectRepository: '选择存储库',
    selectAssignee: '选择接收人 (可选的)',
    selectDrive: '选择硬盘',
    selectGoogleDrive: '您可以选择自己的 Google 硬盘或',
    GoogleSharedDrives: 'Google 共享文硬盘',
    with: '和您有联系。',
    SelectFolder: '选择文件夹',
    GoogleText: '如果您在表单中添加了 "文件上传" 组件，则将文件放置在文件夹中。',
    SelectSpreadsheet: '选择表格',
    SelectWorksheet: '选择表',
    MapFields: '映射字段',
    googleSheet:
      '将 简约表单 映射到 Google Sheets 字段。如果您在 Google Sheets 上更改了一个字段，请在这里进行更新，否则集成将无法按预期工作。',
    leftPlaceholder: '简约表单 问题',
    rightPlaceholder: 'Google Sheets 字段',
    leftTipText: '选择 简约表单 问题',
    rightTipText: '选择 Google Sheets 字段',
    ColumnValues: '列值 (可选的)',
    mondayText:
      '将 简约表单 映射到 Monday 列。如果您在 Monday 更改了一列，请也在这里更新，否则集成将无法按预期工作。',
    Board: '机构',
    SelectBoard: '选择一个机构',
    Group: '分组 (可选的)',
    ItemName: '项目名称',
    mondayColumn: '选择 Monday 列',
    selectQuestion: '选择一个问题',
    PhoneNumber: '手机号码 (可选的)',
    JobTitle: '职位名称 (可选的)',
    SelectAudience: '选择联系人',
    SubscriberEmail: '订阅者电子邮件',
    Address: '地址',
    SystemURL: '系统网址',
    LearnAbout: '了解更多',
    integration: '集成',
    URLText:
      '系统网址是访问系统前端的网址。这可能是例如: https://support.domain.com 或 https://domain.com/support。系统网址可能需要 "/index.php"。如果您没有启用漂亮的地址，请在网址的末尾添加 ".php"。',
    tokenAPT: 'API Token',
    APIText: '跳转到 Settings -&gt; General -&gt; API Tokens 生成 API 令牌，并确保其具有读写权限。',
    UserName: '用户名 (可选的)',
    UserEmail: '邮箱地址 (可选的)',
    Subject: '标题',
    Text: '内容',
    Department: '部门',
    department: '选择部门',
    Priority: '优先级',
    ChoosePriority: '选择优先级',
    Status: '状态',
    ChooseStatus: '选择状态',
    Authorization: '授权',
    AuthorizationText: '首先，请授权 简约表单 访问您的数据',
    login: '登录到',
    loginGoogle: '登录 Google'
  },
  importForm: {
    createForm: '创建一个新表单',
    importText: '导入您现有的表单并对其进行自定义。',
    ImportForm: '导入表单',
    Text: '简约表单 会像爬虫一样从给定的网址中检测表单标签，一旦检测到表单标签，引擎将尝试解析组件并将其转换为 简约表单 块。',
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
  },
  other: {
    DragUploader: {
      drag: '或者拖放',
      upTo: 'PNG, JPG, GIF文件 最多',
      upload: '点击上传'
    },
    labelList: {
      Dashboard: '仪表板',
      TeamMembers: '团队成员',
      Audiences: '受众群体',
      Billing: '计费和订阅',
      Workspace: '团队空间设置',
      Projects: '项目',
      Resources: '资源',
      GettingStarted: '快速开始',
      Help: '帮助中心',
      Template: '模板库',
      Changelog: '更新日志',
      View: '查看个人信息',
      Account: '帐户设置',
      Logout: '退出登录',
      CreateWorkspace: '创建团队空间',
      Version: '版本'
    },
    Change: '更换',
    Remove: '删除',
    Search: '搜索 Unsplash 图片',
    Upload: '上传'
  },
  formBuilder: {
    type: '类型',
    settings: '设置',
    required: '是否必须填写',
    dateFormat: '日期格式',
    timeField: '时间字段',
    dateRangeTo: '至',
    multipleSelection: '多项选择',
    unlimited: '不限制',
    exactNumber: '指定数量',
    range: '范围',
    randomize: '随机选项',
    steps: '步骤',
    labels: '标签',
    leftLabel: '左侧标签',
    middleLabel: '中间标签',
    rightLabel: '右侧标签',
    defaultCountry: '默认国家或区域',
    star: '星星',
    like: '喜欢',
    thumbsUp: '赞同',
    crown: '皇冠',
    happy: '高兴',
    buttonText: '按钮文字',
    image: '图片',
    changeImage: '更换',
    removeImage: '删除',
    addImage: '新增',
    layout: '布局',
    brightness: '亮度',
    duplicate: '复制',
    delete: '删除',
    question: '问题',
    questionPlaceholder: '输入一个问题',
    descriptionPlaceholder: '为您的问题添加描述 (可选)',
    recommended: '推荐',
    contactInfo: '联系信息',
    choices: '选择',
    text: '文本',
    legalConsent: '法律和同意',
    formStructure: '表单结构',
    Content: '内容',
    searchFieldType: '查找一个问题类型',
    allFieldTypes: '所有问题类型',
    welcome: '欢迎页面',
    thankYou: '感谢页面',
    multipleChoice: '多项选择',
    phoneNumber: '手机号码',
    shortText: '短文本',
    longText: '长文本',
    questionGroup: '问题组',
    statement: '陈述文字',
    pictureChoice: '图片选择',
    yesNo: '是或否',
    email: '邮箱地址',
    fullName: '全名',
    rating: '评分',
    opinionScale: '意见量表',
    date: '日期',
    dateTime: '日期与时间',
    dateRange: '日期范围',
    number: '数字',
    fileUpload: '文件上传',
    address: '地址',
    country: '国家或区域',
    legalTerms: '法律协议',
    signature: '签名',
    website: '网站地址',
    address1: '地址1',
    address2: '地址2(可选)',
    city: '城市',
    state: '州/省',
    zip: '邮政编码',
    selectCountry: '选择一个国家或区域',
    year: '年',
    month: '月',
    day: '日',
    hour: '小时',
    minute: '分钟',
    clickUpload: '单击以上传文件或将文件拖到此处。',
    sizeLimit: '大小限制: 10MB',
    firstName: '姓',
    lastName: '名',
    accept: '我接受',
    dontAccept: '我不接受',
    yourAnswer: '在这里输入你的答案',
    hitTip: '按下 Shift ⇧ + Enter ↵ 来换行',
    addChoice: '新增选项',
    choicePlaceholder: '选择',
    drawSignature: '在上面签名',
    clearSignature: '清除',
    data: '数据',
    inputTable: '输入表格',
    addColumn: '新建列',
    columnPlaceholder: '列{{index}}',
    theme: '主题',
    customize: '自定义',
    redirect: '完成时重定向',
    buttonLinkUrl: '按钮链接地址'
  },
  onboarding: {
    trialTitle: 'Start your 14-day free trial',
    trialDesc:
      'No contracts, downgrade or cancel the subscription anytime within a single click from your dashboard.',
    trialButton: 'Go for a trial',
    trialGofree: 'Continue with free plan'
  },
  languages: {
    en: 'English',
    zhCn: 'Chinese (simplified)',
    zhTw: 'Chinese (traditional)',
    fr: 'French',
    de: 'German'
  }
}
