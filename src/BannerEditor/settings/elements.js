export const defaultColors = [
  {value: 'transparent', label: 'Transparent'}, 
  {value: '#122010', label: 'Dark green'}, 
  {value: '#1b3b25', label: 'Medium green' }, 
  {value: '#397f65', label: 'Light green' },
  {value: '#DFc48c', label: 'Sand' },
  {value: '#ecdcba', label: 'Beige' },
  {value: '#D90902', label: 'Red' },
  {value: '#B60f00', label: 'Dark red' },
  {value: '#ffffff', label: 'White' },
  {value: '#000000', label: 'Black' },
] 
export const defaultFonts = [
  {value: 'unset', label: 'Default'}, 
  {value: '"American Captain", sans-serif', label: 'American Captain'}, 
  {value: '"Avenir LT W01_95 Black1475556", sans-serif', label: 'Black'}, 
  {value: '"Avenir LT W01_45 Book1475508", sans-serif', label: 'Book'}, 
  {value: '"Avenir LT W01_85 Heavy1475544", sans-serif', label: 'Heavy'}, 
] 
export const allowedStyles = {
  backgroundColor: {
    label:'Background Color',
    type:'dropdown',
    options:[...defaultColors],
  },
  color:{
    label:'Text color',
    type:'dropdown',
    options:[...defaultColors],
  },
  fontFamily:{
    label:'Font family',
    type:'dropdown',
    options:[...defaultFonts],
  }, 
  fontSize:{
    label:'Font size',
    type:'textfield',
  },
  letterSpacing:{
    label:'Letter spacing',
    type:'textfield',
  },
  lineHeight:{
    label:'Line Height',
    type:'textfield',
  },
  whiteSpace:{
    label:'White space',
    type:'textfield',
    option:[
      {value: 'unset', label: 'Unset'},
      {value: 'normal', label: 'Normal'},
      {value: 'nowrap', label: 'Nowrap'},
      {value: 'pre', label: 'Pre'},
      {value: 'pre-wrap', label: 'Pre wrap'},
      {value: 'pre-line', label: 'Pre line'},
    ]
  },  
  padding:{
    label:'Padding',
    type:'textfield',
  },
  paddingTop:{
    label:'Padding top',
    type:'textfield',
  },
  paddingRight:{
    label:'Padding right',
    type:'textfield',
  },
  paddingBottom:{
    label:'Padding bottom',
    type:'textfield',
  },
  paddingLeft:{
    label:'Padding left',
    type:'textfield',
  },
  margin:{
    label:'Margin',
    type:'textfield',
  },
  marginTop:{
    label:'Margin top',
    type:'textfield',
  },
  marginRight:{
    label:'Margin right',
    type:'textfield',
  },
  marginBottom:{
    label:'Margin bottom',
    type:'textfield',
  },
  marginLeft:{
    label:'Margin left',
    type:'textfield',
  },
  borderWidth:{
    label:'Border width',
    type:'textfield',
  },
  borderStyle:{
    label:'Border style',
    type:'dropdown',
    options:[
      {value: 'noen', label: 'None'},
      {value: 'hidden', label: 'Hidden'},
      {value: 'dotted', label: 'Dotted'},
      {value: 'dashed', label: 'Dashed'},
      {value: 'solid', label: 'Solid'},
      {value: 'double', label: 'Double'},
      {value: 'groove', label: 'Groove'},
      {value: 'ridge', label: 'Ridge'},
      {value: 'inset', label: 'Inset'},
      {value: 'outset', label: 'Outset'},
      {value: 'initial', label: 'Initial'},
      {value: 'inherit', label: 'Inherit'},
    ]
  },
  borderColor:{
    label:'Border color',
    type:'dropdown',
    options:[...defaultColors],
  },
  borderRadius:{
    label:'Border radius',
    type:'textfield',
  }
}
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
            value: 'whiteText',
            label: 'White Text'
          },
          {
            value: 'greenStyle',
            label: 'Green Style'
          }
        ]
      },
      {
        prop: 'className',
        label: 'Style',
        input: 'dropdown',
        items: [{
            value: 'whiteText',
            label: 'White Text'
          },
          {
            value: 'greenStyle',
            label: 'Green Style'
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

