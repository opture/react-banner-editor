import React, { Component } from 'react';

class BannerSettings extends Component {
  render() {
    const {banner, onChange}  =this.props
    return (
      <div>
        <div>
          <div className="formfield">
            <label>StartDate</label>
            <input 
              type="date" 
              name="startDate" 
              value={banner.startDate} 
              onChange={onChange}
            />
            <input 
              type="time" 
              name="startTime" 
              value={banner.startTime} 
              onChange={onChange}
            />      
          </div>
          <div className="formfield">
            <label>EndDate</label>
            <input 
              type="date" 
              name="endDate" 
              value={banner.endDate} 
              onChange={onChange}
            />
            <input 
              type="time" 
              name="endTime" 
              value={banner.endTime} 
              onChange={onChange}
            />          
          </div>
          <div className="formfield">            
            <label>Active</label>
            <input 
              type="checkbox" 
              name="active" 
              value={banner.active} 
              onChange={onChange}
            />
          </div>
          <div className="formfield">            
            <label>Countries</label>
            <div>
              <label>Default</label>
              <input 
                type="checkbox" 
                name="countries.default"
                onChange={onChange}
              />
              <label>De</label>
              <input 
                type="checkbox" 
                name="countries.de"
                onChange={onChange}
              />
              <label>Fi</label>
              <input 
                type="checkbox" 
                name="countries.fi"
                onChange={onChange}
              />
              <label>No</label>
              <input 
                type="checkbox" 
                name="countries.no"
                onChange={onChange}
              />
              <label>Sv</label>
              <input 
                type="checkbox" 
                name="countries.sv"
                onChange={onChange}
              />
              <label>UK</label>
              <input 
                type="checkbox" 
                name="countries.uk"
                onChange={onChange}
              />
            </div>
          </div>
          <div className="formfield">
            <label>Desktop</label>
            <input 
              type="checkbox" 
              name="onDesktop" 
              value={banner.onDesktop} 
              onChange={onChange}
            />
          </div>
          <div className="formfield">          
            <label>Mobile</label>
            <input 
              type="checkbox" 
              name="onMobile" 
              value={banner.onMobile} 
              onChange={onChange}
            />
          </div>          
        </div>
      </div>
    );
  }
}

export default BannerSettings;