import React, { Component } from 'react';
import DroppableContainer from 'components/DroppableContainer'
import BannerElements from './BannerElements'
import BannerElement from './BannerElement'
import BannerSettings from './BannerSettings'
import ImageDrop from 'components/Inputs/ImageDrop'
import VideoDrop from 'components/Inputs/VideoDrop'

import './style.css'
import BannerElementSettings from './BannerElementSettings';


class BannerEditor extends Component {
  constructor(props){
    super(props)
    this.state = {
      selectedElement: null,
      addVideo:false,
      addImage:false,
      banner:{
        actionLoggedOut:'',
        actionLoggedIn:'',
        urlLoggedIn:'',
        urlLoggedOut:'',
        style:{
          display:'inline-block',
        },
        elements:[
          {
            type:'text',
            style:{
              backgroundColor:'#397f65',
              color:'#fff'
            }
          }
        ]
      }
    }
  }

  componentWillMount(){
    this.setState({
      banner:{
        ...this.state.banner,
        style:{
          ...this.state.banner.style,
          width:this.props.width,
          height:this.props.height
        }
      }
    })
  }

  keyboardWatcher = (event) => {
    event.preventDefault()
    event.stopPropagation()
    if (!this.state.selectedElement) return
    const selectedElementIndex = this.state.banner.elements.indexOf(this.state.selectedElement)

    if (event.keyCode  === 37){
      this.moveBannerElement( this.state.banner.elements[selectedElementIndex].style.top, this.state.banner.elements[selectedElementIndex].style.left - 1, selectedElementIndex)
    } //Left arrow
    if (event.keyCode  === 38){
      this.moveBannerElement(this.state.banner.elements[selectedElementIndex].style.top - 1, this.state.banner.elements[selectedElementIndex].style.left, selectedElementIndex)
    } //Up arrow
    if (event.keyCode  === 39){
      this.moveBannerElement( this.state.banner.elements[selectedElementIndex].style.top, this.state.banner.elements[selectedElementIndex].style.left + 1, selectedElementIndex)
    } //right arrow
    if (event.keyCode  === 40){
      this.moveBannerElement(this.state.banner.elements[selectedElementIndex].style.top + 1, this.state.banner.elements[selectedElementIndex].style.left, selectedElementIndex)
    } //Down arrow
  }

  componentDidMount() {
    document.addEventListener("keyup", this.keyboardWatcher, false)
  }

  componentWillUnmount() {
    document.removeEventListener("keyup", this.keyboardWatcher, false)
  }
  
  addBannerElement = (item, elementY, elementX) => {
    const banner = {
      ...this.state.banner,
      elements:[
        ...this.state.banner.elements,
      ]
    }
    const newElement = {
      type:item.type,
      style:{
        position:'absolute',
        left:elementX,
        top:elementY
      }
    }
    banner.elements.push(newElement)
    this.setState({banner, selectedElement:newElement, selectedElementIndex:banner.elements.length - 1})
  }

  moveBannerElement = ( elementY, elementX, elementIndex) => {
    
    const banner = {
      ...this.state.banner,
      elements:[
        ...this.state.banner.elements,
      ]
    }
    banner.elements[elementIndex] = {
      ...banner.elements[elementIndex],
      style:{
        ...banner.elements[elementIndex].style,
        left:elementX,
        top:elementY
      }
    }

    this.setState({banner, selectedElement:banner.elements[elementIndex], selectedElementIndex:elementIndex})
  }



  bannerElementDropped = (item, sourceOffset, targetOffset) => {
    console.log(sourceOffset)
    console.log(targetOffset)
    const elementY = sourceOffset.y - targetOffset.top
    const elementX = sourceOffset.x - targetOffset.left
    const elementIndex = this.state.banner.elements.indexOf(item)
    if (elementIndex > -1){
      this.moveBannerElement(elementY, elementX, elementIndex)
    }else{
      this.addBannerElement(item, elementY, elementX)
    }
  }

  changeBanner = (e) => {
    this.setState({
      style:{
        ...this.state.style,
        [e.target.name]: e.target.value
      }
    })
  }

  setSelectedElement = (selectedElement) => {
    const selectedElementIndex = this.state.banner.elements.indexOf(selectedElement)
    this.setState({
      selectedElement, 
      selectedElementIndex,
      editBanner:false
    })
  }


  editBanner = () => {
    this.setState({
      selectedElement: null, 
      selectedElementIndex: null,
      editBanner:true,
    })
  }

  setElementProperty = (name, value) => {

  }

  setElementStyle = (name, value) => {

  }
  elementStyleChanged = (e) => {
    console.log('element style changed')
    const {target} = e
    const elementIndex = this.state.selectedElementIndex
    const banner = {
      ...this.state.banner,
      elements:[
        ...this.state.banner.elements,
      ]
    }    
    banner.elements[elementIndex] = {
      ...banner.elements[elementIndex],
      style:{
        ...banner.elements[elementIndex].style,
        [target.name]:target.value
      }
    }
    
    this.setState({banner, selectedElement:banner.elements[elementIndex], selectedElementIndex:elementIndex})
  }
  elementPropertyChanged = (e) => {
    console.log('element property changed')
    const {target} = e
    const elementIndex = this.state.selectedElementIndex
    const banner = {
      ...this.state.banner,
      elements:[
        ...this.state.banner.elements,
      ]
    }

    banner.elements[elementIndex] = {
      ...banner.elements[elementIndex],
      [target.name]:target.value
    }

    this.setState({banner, selectedElement:banner.elements[elementIndex], selectedElementIndex:elementIndex})
  }

  onBannerSettingsChange = (e) => {
    const target = e.target,
      value = target.type === 'checkbox' ? target.checked : target.value,
      name = target.name,
      nameSplitted = name.split('.'),
      banner = {
        ...this.state.banner
      }

    if (nameSplitted.length === 1){
      banner[nameSplitted[0]] = value
    }else{
      if (!banner[nameSplitted[0]]) banner[nameSplitted[0]] = {}
      banner[nameSplitted[0]][nameSplitted[1]] = value
    }

    this.setState({banner})
  }

  onChangeImage = (e) => {
    const target = e.target,
    value = target.type === 'checkbox' ? target.checked : target.value
    this.setState({
      addImage:value,
      addVideo:false
    })
  }

  onChangeVideo = (e) => {
    const target = e.target,
    value = target.type === 'checkbox' ? target.checked : target.value
    this.setState({
      addImage:false,
      addVideo:value
    })
  }
  onBannerImageChange = (property,path) => {
    console.log(property)
    console.log(path)
    
    this.setState({
      banner:{
        ...this.state.banner,
        [property]:path
      }
    })
  }
  changeBanner = (e) => {

  }
  render() {
    const { banner } = this.state
    const elements = banner.elements.map( element => {
      return <BannerElement element={element} selected={this.state.selectedElement===element} onClick={ () =>{ this.setSelectedElement(element) }} />
    } )
    return (
      <div className="BannerEditor">
        <div className="BannerEditor-controls">
          <BannerElements 
            onChangeVideo={this.onChangeVideo} 
            addVideo={this.state.addVideo} 
            addImage={this.state.addImage} 
            onChangeImage={this.onChangeImage}
          />
        </div>
        <DroppableContainer 
          types={["BannerItem","AddedElement"]}
          itemDropped={this.bannerElementDropped}
        >
          <div className="BannerEditor-editor" style={{...banner.style, backgroundImage:!this.state.addImage && !this.state.addVideo ? `url(${banner.imageUrl})` : null}}>
          {this.state.addImage 
            ? <ImageDrop
                storagePath='banners'
                imageHeight='100%'
                imageWidth="100%"
                alt="Image"
                placeholder='Drop Image'
                name="imageUrl"
                value={banner.imageUrl}
                onChange={this.onBannerImageChange}
                onSelected={(file) => this.onBannerImageChange("imageUrl", file)}
              />
            : null 
          }
          {this.state.addVideo ? <VideoDrop/> : null }
          {!this.state.addImage && !this.state.addVideo ? elements : null}
          </div>
        </DroppableContainer>

        <div className="BannerEditor-properties">
          <ul style={{listStyle:'none'}}>
            <li onClick={()=>{this.editBanner(banner)}}>Banner</li>
            {banner.elements && banner.elements.length
            ? banner.elements.map( element => {
              return <li onClick={()=>{this.setSelectedElement(element)} }>{element.type}</li>
            })
            : null
            }
          </ul>

          { this.state.selectedElement 
            ? <BannerElementSettings 
                element={this.state.selectedElement} 
                onPropertyChange={this.elementPropertyChanged}
                onStyleChange={this.elementStyleChanged}
              /> 
            : this.state.editBanner
              ? <BannerSettings 
                  banner={banner} 
                  onChange={this.onBannerSettingsChange}
                /> 
              : null
          }

        </div>
      </div>
    );
  }
}

export default BannerEditor;