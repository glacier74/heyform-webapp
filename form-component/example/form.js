export default {
  id: 'NWq2Qgnu',
  teamId: 'wAheyLAK',
  memberId: '61c477ff348cc338aff924c8',
  name: 'Form',
  description: null,
  interactiveMode: 1,
  kind: 1,
  settings: {
    enableTimeLimit: true,
    timeLimit: 3000,
    enableProgress: true
  },
  fields: [
    {
      id: 'welcome',
      kind: 'welcome',
      title: ['WelCOme!'],
      description: [['b', ['Make any website your Mac desktop wallpaper.&nbsp;']]],
      properties: {
        buttonText: 'Get started'
      },
      layout: {
        mediaType: 'image',
        mediaUrl:
          'https://images.unsplash.com/photo-1649664585762-3f4bea1aedb3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2075&q=80',
        brightness: 30,
        align: 'inline'
      }
    },
    {
      id: 'short_text',
      title: ["Hello, what's your name?"],
      description: null,
      kind: 'short_text',
      validations: { required: true },
      layout: {
        mediaType: 'image',
        mediaUrl:
          'https://images.unsplash.com/photo-1646013532943-d5b86e8689b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
        brightness: 30,
        align: 'split_right'
      }
    },
    {
      id: 'long_text',
      title: [
        'Hi, @',
        [
          'mention',
          ['@Short text?'],
          {
            id: 'short_text'
          }
        ]
      ],
      description: ['Let us know how we can help you.'],
      kind: 'long_text',
      validations: { required: true }
    },
    {
      id: 'statement',
      kind: 'statement',
      title: ['Statement!'],
      description: [['b', ['Make any website your Mac desktop wallpaper.&nbsp;']]],
      properties: {
        buttonText: 'Go next'
      },
      layout: {
        mediaType: 'image',
        mediaUrl:
          'https://images.unsplash.com/photo-1586227740560-8cf2732c1531?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1861&q=80',
        brightness: 30,
        align: 'float_right'
      }
    },
    {
      id: 'statement2',
      kind: 'statement',
      title: ['Statement! #2'],
      description: [['b', ['Make any website your Mac desktop wallpaper.&nbsp;']]],
      properties: {
        buttonText: 'Skip this'
      },
      layout: {
        mediaType: 'image',
        mediaUrl:
          'https://images.unsplash.com/photo-1646013532943-d5b86e8689b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
        brightness: 30,
        align: 'inline'
      }
    },
    {
      id: 'full_name',
      title: ['Full name'],
      description: null,
      kind: 'full_name',
      validations: { required: true }
    },
    {
      id: 'address',
      title: ['Address'],
      description: null,
      kind: 'address',
      validations: { required: true }
    },
    {
      id: 'country_selector',
      title: ['Country'],
      description: null,
      kind: 'country_selector',
      validations: { required: true }
    },
    {
      id: 'date',
      title: ['Date'],
      description: null,
      kind: 'date',
      validations: { required: true },
      properties: {
        format: 'MM/DD/YYYY'
      }
    },
    {
      id: 'email',
      title: ['Email'],
      description: null,
      kind: 'email',
      validations: { required: true }
    },
    {
      id: 'file_upload',
      title: ['File upload'],
      description: null,
      kind: 'file_upload',
      validations: { required: true }
    },
    {
      id: 'legal_terms',
      title: ['Legal Terms'],
      description: null,
      kind: 'legal_terms',
      validations: { required: true }
    },
    {
      id: 'multiple_choice',
      title: ['Multiple Choice'],
      description: null,
      kind: 'multiple_choice',
      validations: { required: true, min: null, max: null },
      properties: {
        allowMultiple: true,
        choices: [
          {
            id: 'a',
            label: 'Lab (example: fume hood, work bench, biosafety cabinet)'
          },
          {
            id: 'b',
            label: 'Office (example: computer workstation)'
          },
          {
            id: 'c',
            label: 'Patient field study work'
          }
        ]
      }
    },
    {
      id: 'number',
      title: ['Number'],
      description: null,
      kind: 'number',
      validations: { required: true }
    },
    {
      id: 'opinion_scale',
      title: ['Opinion Scale'],
      description: null,
      kind: 'opinion_scale',
      validations: { required: true },
      properties: {
        total: 10
      }
    },
    {
      id: 'phone_number',
      title: ['Phone Number'],
      description: null,
      kind: 'phone_number',
      validations: { required: true },
      properties: {
        defaultCountryCode: 'US'
      }
    },
    {
      id: 'picture_choice',
      title: ['Picture Choice'],
      description: null,
      kind: 'picture_choice',
      validations: { required: true },
      properties: {
        choices: [
          {
            id: 'a',
            label: 'Choice 1',
            image:
              'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80'
          },
          {
            id: 'b',
            label: 'Choice 2',
            image:
              'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80'
          },
          {
            id: 'c',
            label: 'Choice 3',
            image:
              'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80'
          }
        ]
      }
    },
    {
      id: 'rating',
      title: ['Rating'],
      description: null,
      kind: 'rating',
      validations: { required: true },
      properties: {
        total: 5,
        shape: 'heart'
      }
    },
    {
      id: 'signature',
      title: ['Signature'],
      description: null,
      kind: 'signature',
      validations: { required: true }
    },
    {
      id: 'url',
      title: ['Website'],
      description: null,
      kind: 'url',
      validations: { required: true }
    },
    {
      id: 'yes_no',
      title: ['Yes No'],
      description: null,
      kind: 'yes_no',
      validations: { required: true },
      properties: {
        choices: [
          {
            id: 'a',
            label: 'Yes'
          },
          {
            id: 'b',
            label: 'No'
          }
        ]
      }
    },
    {
      id: 'thank_you',
      kind: 'thank_you',
      title: ['Thank you'],
      description: [
        [
          'mention',
          ['@Is there anything wrong? Please type your full name here?'],
          {
            id: 'short_text'
          }
        ],
        '&nbsp;',
        'thank you for filling out the form.'
      ],
      properties: {
        buttonText: 'Let’s do this again'
      }
    }
  ],
  fieldUpdateAt: 1642689077,
  themeSettings: {
    theme: {
      backgroundColor: '#fff',
      backgroundImage:
        'https://unsplash.com/photos/Dakbfhj51eE/download?ixid=MnwxMjA3fDB8MXxhbGx8NTd8fHx8fHwyfHwxNjM3NDc1NDc3&force=true&w=1920',
      backgroundBrightness: 80
    }
  },
  retentionAt: -1,
  suspended: false,
  draft: false,
  status: 1
}
