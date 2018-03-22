import React, { Component } from 'react';
import BannerActions from '../BannerActions'
import BannerElementStyles from '../BannerElementStyles';

class BannerElementSettings extends Component {
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
    
    return (
      <div className="BannerElementSettings">
      <div className="formfield">
        <label>Content</label>
        <input type="text" name="content" value={element.content} onChange={this.props.onPropertyChange} />
      </div>
      <div className="formfield">
        <BannerActions 
          onChange={this.props.onPropertyChange} 
          element={element}
        />
      </div>
      <div>
        <BannerElementStyles element={element} onChange={this.props.onStyleChange} />
        <table>
          <thead>
            <tr>
              <th>Property</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(element.style).map( (key) => {
              return <tr><td>{key}</td><td>{element.style[key]}</td></tr>
            })}
          </tbody>
        </table>
        </div>
      </div>
    ); 
  }
}

export default BannerElementSettings;