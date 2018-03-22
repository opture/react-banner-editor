import React, { Component } from 'react';
import { allowedStyles } from '../settings/elements'
import ElementStyleProperty from '../ElementStyleProperty'


class BannerElementStyles extends Component {
  constructor(props){
    super(props)
    this.state = {
      selectedProperty:null,
      selectedPropertyName:'',
      propertyForm:null,
    }
  }

  dropDownStyle = (propName, styleProperty, selected) => {
    const {options} = styleProperty
    return (
      <React.Fragment>
        <select value={selected} name={propName}>
          <option>- Select value -</option>
          {options && options.length
            ? options.map( (option, i) => {
              return <option key={option.value.toString() + i} value={option.value}>{option.label}</option>
            })
            : null
          }
        </select>
      </React.Fragment>
    )
  }

  defaultStyle = (propName, styleProperty, value) => {
    return (
      <React.Fragment>
        <input type="text" value={value} name={propName}/>
      </React.Fragment>
    )
  }

  renderPropertyForm = (e) => {
    const propertyName = e.target.value,
      selectedProperty = allowedStyles[propertyName]
    if (!selectedProperty){
      this.setState({
        selectedProperty:null,
        propertyForm:null,
        selectedPropertyName:''
      })      
    }


    // if (selectedProperty.type==='dropdown'){
    //   propertyForm =  this.dropDownStyle(propertyName, selectedProperty, '')
    // }else if (selectedProperty.type==='textfield'){
    //   propertyForm = this.defaultStyle(propertyName, selectedProperty, '')
    // }
    this.setState({
      selectedProperty,
      selectedPropertyName:propertyName
    })
  }
  

  addProperty = () => {

  }

  render() {
    const {element} = this.props
    return (
      <div className="formfield">
        <select onChange={this.renderPropertyForm}>
          <option>- Select Style -</option>
          {Object.keys(allowedStyles).map( key => {
            const style = allowedStyles[key]
            return <option key={key} value={key}>{style.label}</option>
          })}
        </select>
        {this.state.selectedProperty && this.state.selectedProperty.type
          ? <ElementStyleProperty 
              styleProperty={this.state.selectedProperty} 
              element={element}
              propName={this.state.selectedPropertyName}
              onChange={this.props.onChange}
            />
          : null
        }
      </div>
    );
  }
}


export default BannerElementStyles;