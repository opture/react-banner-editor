import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './style.css'

class FloatingWindow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      draggable: false,
      dragging: false,
      positionY: 0,
      positionX: 0,
      oldMouseX: 0,
      oldMouseY: 0
    }
  }

  onDragStart = (e, data) => {
    e.stopPropagation();

    if (!this.state.draggable) {
      return false;
    }

    this.setState({
      ...this.state,
      dragging: true,
      oldMouseX: e.clientX,
      oldMouseY: e.clientY
    })
  }

  onDrag = (e, data) => {
    if (this.state.dragging) {
      const changePosX = e.clientX - this.state.oldMouseX
      const changePosY = e.clientY - this.state.oldMouseY

      let newPosX = changePosX > 0 ? (this.state.positionX + changePosX) : (this.state.positionX - (changePosX * -1))
      let newPosY = changePosY > 0 ? (this.state.positionY + changePosY) : (this.state.positionY - (changePosY * -1))

      if (newPosX < 0) newPosX = 0
      if (newPosY < 0) newPosY = 0

      this.setState((state) => {
        return {
          ...state,
          positionY: newPosY,
          positionX: newPosX,
          oldMouseX: e.clientX,
          oldMouseY: e.clientY
        }
      })
    }
  }

  onDragEnd = (e, data) => {
    this.setState({
      ...this.state,
      dragging: false
    })

    return true
  }

  setDraggable = () => {
    if (!this.state.draggable) {
      this.setState({
        ...this.state,
        draggable: true
      })
    }
  }

  unsetDraggable = () => {
    if (!this.state.dragging) {
      this.setState({
        ...this.state,
        draggable: false
      })
    }
  }

  componentDidMount() {
    const wrapper = ReactDOM.findDOMNode(this)
    const container = ReactDOM.findDOMNode(this.refs.container)

    wrapper.addEventListener('mousemove', this.onDrag)
    wrapper.addEventListener('mouseup', this.onDragEnd)
    wrapper.addEventListener('mousedown', this.onDragStart)

    let initialY = (wrapper.clientHeight - container.clientHeight) / 2
    let initialX = (wrapper.clientWidth - container.clientWidth) / 2

    if (initialY < 0) initialY = 0
    if (initialX < 0) initialX = 0

    this.setState({
      positionY: initialY,
      positionX: initialX
    })
  }

  componentWillUnmount() {
    const wrapper = ReactDOM.findDOMNode(this)
    wrapper.removeEventListener('mousemove', this.onDrag)
    wrapper.removeEventListener('mouseup', this.onDragEnd)
    wrapper.removeEventListener('mousedown', this.onDragStart)
  }

  render() {
    let closeButton = ''
    if (this.props.onClose !== undefined) {
      closeButton = <span className="headerCloseButton" onClick={this.props.onClose}>X</span>
    }

    return (
      <div className="floatingWindow">
        <div
          ref="container"
          className="container"
          style={{ top: this.state.positionY, left: this.state.positionX }}>
          <div className="header">
            <h4 onMouseEnter={this.setDraggable} onMouseLeave={this.unsetDraggable}>{this.props.title}</h4>{closeButton}
          </div>
          <div className="content">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

export default FloatingWindow