export default {
  text: {
    properties: [{
        prop: 'content',
        label: 'Text',
        input: 'textfield'
      },
      {
        prop: 'className',
        label: 'Style',
        input: 'dropdown',
        items: [{
            key: 'whiteText',
            value: 'White Text'
          },
          {
            key: 'greenStyle',
            value: 'Green Style'
          }
        ]
      },
      {
        prop: 'className',
        label: 'Style',
        input: 'dropdown',
        items: [{
            key: 'whiteText',
            value: 'White Text'
          },
          {
            key: 'greenStyle',
            value: 'Green Style'
          }
        ]
      },      
      {
        prop: 'tagType',
        label: 'Type',
        input: 'dropdown',
        items: ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P']
      },
    ]
  }
}

