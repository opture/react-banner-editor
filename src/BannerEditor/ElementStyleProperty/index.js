import React, { Component } from 'react';
import PropTypes from 'prop-types'
class ElementStyleProperty extends Component {
  
  render() {
    const {styleProperty, propName, element} = this.props
    const options = styleProperty.options
    switch (styleProperty.type){
      case 'dropdown':
      return (
        <select name={propName} onChange={this.props.onChange} value={element.style[propName]}>
          <option>- Select value -</option>
          {options && options.length
            ? options.map( (option, i) => {
              return <option key={option.value.toString() + i} value={option.value}>{option.label}</option>
            })
            : null
          }
        </select>
    )
      case 'textfield':
        return <input type="text" name={propName} onChange={this.props.onChange} value={element.style[propName]}/>
      default:
        void(0)
    }

  }
}

ElementStyleProperty.propTypes = {
  styleProperty: PropTypes.object,

}

export default ElementStyleProperty;