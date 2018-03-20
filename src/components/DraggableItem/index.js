import React, { Component } from 'react'
import { DragSource } from 'react-dnd'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const spec = {
  beginDrag: (props, monitor, component) => {
    // Return the data describing the dragged item
    return props.item ? props.item : {};
  }
}

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    item: monitor.getItem(),
    isDragging: monitor.isDragging()
  }
}


class DraggableItem extends Component {
  
  shouldComponentUpdate(nextProps, nextState){
    return (
      nextProps.displayText !== this.props.displayText 
      || nextProps.className !== this.props.className 
      || nextProps.style !== this.props.style 
    )
  }

  onItmeClicked = () => {
    if (this.props.onItemClick) this.props.onItemClick(this.props.item)
  }

  render() {
    const { isDragging, connectDragSource, onItemClick, onItemDoubleClick, displayText, selected, style } = this.props
    return connectDragSource(
      <div 
        className={classnames("DraggableItem", this.props.className, { dragging: isDragging, selected: selected })}
        style={{...style}}
        onClick={this.onItmeClicked}
        onDoubleClick={onItemDoubleClick}>
        {displayText || this.props.children}
      </div>
    );
  }
}


export default DragSource((props) => props.type, spec, collect)(DraggableItem);

DraggableItem.propTypes = {
  type: PropTypes.string.isRequired
}