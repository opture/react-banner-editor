import React, { Component } from 'react';
import DraggableItem from 'components/DraggableItem'

class BannerElements extends Component {
  
  render() {
    return (
      <div>
        <DraggableItem 
          type="BannerItem" 
          item={{type:'text'}}
        >
          Text
        </DraggableItem>

        <DraggableItem 
          type="BannerItem" 
          item={{type:'button'}}
        >
          Button
        </DraggableItem>

        <DraggableItem 
          type="BannerItem" 
          item={{type:'image'}}
        >
          Image
        </DraggableItem>

        <DraggableItem 
          type="BannerItem" 
          item={{type:'video'}}
        >
          Video
        </DraggableItem>

      </div>
    );
  }
}

export default BannerElements;