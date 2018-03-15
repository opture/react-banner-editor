import React, { Component } from 'react';
import './style.css'


class BannerEditor extends Component {
  constructor(props){
    super(props)
    this.state = {
      banner:{
        display:'inline-block',
        width:'10px',
        height:'10px'
      }
    }
  }
  changeBanner = (e) => {
    this.setState({
      banner:{
        ...this.state.banner,
        [e.target.name]: e.target.value
      }
    })
  }
  render() {
    return (
      <div className="BannerEditor">
        <input type="text" name="width" value={this.state.banner.width} onChange={this.changeBanner} />
        <input type="text" name="height" value={this.state.banner.height} onChange={this.changeBanner} />
        <div>
        <div className="BannerEditor-editor" style={{...this.state.banner}}>
        </div>
        </div>
      </div>
    );
  }
}

export default BannerEditor;