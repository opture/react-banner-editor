import React, { Component } from 'react';
import DroppableContainer from 'components/DroppableContainer'
import BannerElements from './BannerElements'
import BannerElement from './BannerElement'

import './style.css'
import BannerElementProperties from './BannerElementProperties';


class BannerEditor extends Component {
  constructor(props){
    super(props)
    this.state = {
      selectedElement: null,
      banner:{
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
    this.setState({selectedElement, selectedElementIndex})
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
    if (target.name === 'content'){
      banner.elements[elementIndex] = {
        ...banner.elements[elementIndex],
        content:target.value
      }
    }else{
      banner.elements[elementIndex] = {
        ...banner.elements[elementIndex],
        style:{
          ...banner.elements[elementIndex].style,
          [target.name]:target.value
        }
      }
    }
    this.setState({banner, selectedElement:banner.elements[elementIndex], selectedElementIndex:elementIndex})
  }

  render() {
    const { banner } = this.state
    const elements = banner.elements.map( element => {
      return <BannerElement element={element} selected={this.state.selectedElement===element} onClick={ () =>{ this.setSelectedElement(element) }} />
    } )
    return (
      <div className="BannerEditor">
        <div className="BannerEditor-controls">
          <BannerElements />
        </div>
        <DroppableContainer 
          types={["BannerItem","AddedElement"]}
          itemDropped={this.bannerElementDropped}
        >
          <div className="BannerEditor-editor" style={{...banner.style}}>
          {elements}
          </div>
        </DroppableContainer>
        <div className="BannerEditor-properties">
          <ul>
            {banner.elements && banner.elements.length
            ? banner.elements.map( element => {
              return <li onClick={()=>{this.setSelectedElement(element)} }>{element.type}</li>
            })
            : null
            }
          </ul>
          { this.state.selectedElement 
            ? <BannerElementProperties 
                element={this.state.selectedElement} 
                onPropertyChanghe={this.elementPropertyChanged}
              /> 
            : null 
          }
        </div>
      </div>
    );
  }
}

export default BannerEditor;