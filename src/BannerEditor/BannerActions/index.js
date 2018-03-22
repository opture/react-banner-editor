import React, { Component } from 'react';
import PropTypes  from 'prop-types'

class BannerActions extends Component {

  render() {
    const { onChange, element } = this.props
    const { actionLoggedIn, actionLoggedOut, urlLoggedIn, urlLoggedOut } = element
    return (
      <React.Fragment>
        
        <label>Click Action</label><br/>
        <div className="formfield">
          <label>Logged in</label>
          <select name="actionLoggedIn" value={actionLoggedIn} onChange={onChange}>
            <option value="">- No Click Action -</option>
            <option value="deposit">Deposit</option>
            <option value="login">Login</option>
            <option value="register">Register</option>
            <option value="url">Link</option>
          </select>
          </div>

          {actionLoggedIn === 'url'
            ? <div className="formfield"><input type="text" name="url" value={urlLoggedIn} onChange={onChange} /></div>
            : null
          }
        
        <div className="formfield">
        <label>Not logged in</label>
        <select name="actionLoggedOut" value={actionLoggedOut} onChange={onChange}>
          <option value="">- No Click Action -</option>
          <option value="deposit">Deposit</option>
          <option value="login">Login</option>
          <option value="register">Register</option>
          <option value="url">Link</option>
        </select>        
        </div>
        {actionLoggedOut === 'url'
          ? <div className="formfield"><input type="text" name="url" value={urlLoggedIn} onChange={onChange} /></div>
          : null
        }
      </React.Fragment>
    );
  }
}
BannerActions.propTypes = {
  onChange:PropTypes.func.isRequired,
  action:PropTypes.string,
  url:PropTypes.string
}

export default BannerActions;