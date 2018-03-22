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

        <DraggableItem 
          type="BannerItem" 
          item={{type:'html'}}
        >
          Html
        </DraggableItem>
        <label>Add Image</label><input type="checkbox" name="addImage" checked={this.props.addImage} onChange={this.props.onChangeImage}/>
        <label>Add Video</label><input type="checkbox" name="addVideo" checked={this.props.addVideo} onChange={this.props.onChangeVideo}/>
      </div>
    );
  }
}

export default BannerElements;