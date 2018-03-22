import React, { Component } from 'react';
import classnames from 'classnames'
import DraggableItem from 'components/DraggableItem'
class BannerElement extends Component {
  cleanStyles = (style, selected) => {
    const cleanedStyle = {...style}
    !cleanedStyle.position 
    || (cleanedStyle.position && cleanedStyle.position !== 'absolute') ? cleanedStyle.position = 'absolute' : void(0)
    if (selected){
      cleanedStyle.outline = '1px dashed red'
    }
    return cleanedStyle
  }
  
  render() {
    const { element } = this.props
    return (
      <DraggableItem 
        type="AddedElement"
        className={classnames("BannerElement", {selected:this.props.selected} )}
        style={this.cleanStyles(element.style, this.props.selected)}
        item={element}
        onItemClick={this.props.onClick}
      >
        {element.content}
      </DraggableItem>
    );
  }
}

export default BannerElement;