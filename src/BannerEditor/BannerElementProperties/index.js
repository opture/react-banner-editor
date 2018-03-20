import React, { Component } from 'react';
import settings from '../settings/elements'
class BannerElementProperties extends Component {
  renderDropDown = (prop) => {
    return (
      <select>
        {prop.items.map( (item) => {
          return item.hasOwnProperty('key') && item.hasOwnProperty('value')
          ? <option key={item.key} value={item.key}>{item.value}</option>
          : <option key={item} value={item}>{item}</option>
        })}
        
      </select>
    )
  }
  renderInput = (prop) => {
    return <input type="text" placeholder={prop.prop}/>
  }
  render() {
    const {element} = this.props
    const elementProperties = settings[element.type].properties
    return (
      <div className="BannerElementProperties">
        {
          elementProperties.map( prop => {
            return prop.input === 'dropdown' 
             ? this.renderDropDown(prop)
             : prop.input === 'textfield'
              ? this.renderInput(prop)
              : null
          })
        }
      </div>
    );
  }
}

export default BannerElementProperties;