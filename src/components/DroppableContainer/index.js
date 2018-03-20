import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';
import './style.css'

const dropTypes = (props) => {
  return props.types
}

const spec = {
  drop: (props, monitor, component) => {
    const domnode = ReactDOM.findDOMNode(component)
    const targetOffset = domnode.getBoundingClientRect()
    const sourceOffset = monitor.getSourceClientOffset()

    if (typeof props.itemDropped === 'function' && monitor.isOver({ shallow: true })) {
      props.itemDropped(monitor.getItem(), sourceOffset, targetOffset)
    }
  },
  hover: (props, monitor, component) => {
    console.log('hovering')
    console.log(component)

    console.log(monitor)
  },
  canDrop: (props, monitor) => {
    return true
  }
}

const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    item: monitor.getItem(),
    hovered: monitor.isOver(),
    hoverThis: monitor.isOver({ shallow: true })
  }
}

class DroppableContainer extends Component {
  render() {
    const { connectDropTarget } = this.props
    return (
      connectDropTarget(
        <div className="DroppableContainer">
          {this.props.children ? this.props.children : <div>{'empty'}</div>}
        </div>
      )
    )
  }
}

export default DropTarget(dropTypes, spec, collect)(DroppableContainer);

DroppableContainer.propTypes = {
  itemDropped: PropTypes.func.isRequired,
  types: PropTypes.oneOfType([
    PropTypes.symbol,
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.symbol).isRequired
  ])
}
