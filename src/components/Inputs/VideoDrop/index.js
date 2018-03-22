import Dropzone from 'react-dropzone'
import React, { Component } from 'react';
//import firebase from 'lib/firebase'
import { storeFile, getFilesInFolder } from 'lib/firebaseHandler/filestorage'
import classnames from 'classnames'
import Spinner from 'react-svg-spinner'
import FilesFolder from 'components/FilesFolder'
import './style.css'

class VideoDropZone extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isUploading: false,
      folderLoaded: false,
      showFolder: false,
      folderFiles: {
        //file key as property
      }
    }
    this.onVideoDrop = this.onVideoDrop.bind(this)
    this.onClick = this.onClick.bind(this)
    this.selectStoreFile = this.selectStoreFile.bind(this)
    this.closefolderView = this.closefolderView.bind(this)
  }

  closefolderView(e) {
    e.preventDefault()
    e.stopPropagation()
    this.setState({
      showFolder: false,
    })
  }

  selectStoreFile(e, file) {
    e.stopPropagation()
    console.log(file)
    const { name } = this.props
    this.setState({
      showFolder: false,
    })
    //this.props.onSelected(file)
    this.props.onChange(name, file.url)
  }

  onVideoDrop(acceptedFiles, rejected) {
    if (rejected.length) {
      alert('Only video files allowed')
      return
    }

    this.setState({ isUploading: true })

    const { disabled, storagePath, name } = this.props

    if (disabled) return
    acceptedFiles.forEach(file => {
      storeFile(file, "video", storagePath).then((dbFile) => {
        console.log('upload done!')
        console.log(name, dbFile.url)
        this.props.onChange(name, dbFile.url)
        this.setState({ isUploading: false })
      }).catch((err) => {
        this.setState({ isUploading: false })
        alert('An error occured')
        console.log(err)
      })
    });
  }

  onClearItem = (e) => {
    const { disabled, name } = this.props
    e.preventDefault()

    if (disabled) return
    this.props.onChange(name, '')
  }

  onClick(e) {
    const { storagePath } = this.props
    e.preventDefault()

    //Load the images for the selected directory.
    this.setState({
      showFolder: true,
      folderX: e.clientX,
      folderY: e.clientY,
    })
    getFilesInFolder(storagePath, {
      type: "video",
      onChildAdded: (file, key) => {

        console.log('file added')
        console.log(file)
        this.setState({
          folderLoaded: true,

          folderFiles: {
            ...this.state.folderFiles,
            [key]: file
          }
        })
      }
    })
    //this.props.onClick(e)
  }

  render() {
    const { value, placeholder, videoHeight, videoWidth, className, error, onDoubleClick } = this.props
    const { folderLoaded, folderFiles, showFolder } = this.state
    const spinner = this.state.isUploading ? <Spinner height="100%" color="#FF0000"/> : null;

    const winWidth = window.innerWidth < 1200 ? window.innerWidth : 1200;
    const folderWidth = window.innerWidth < 800 ? window.innerWidth : 800;
    let folderX = winWidth < 800
      ? 0
      : folderWidth + this.state.folderX > winWidth
        ? winWidth - folderWidth
        : this.state.folderX

    console.log(folderX)
    folderX += 'px'
    const showPlaceholder = (!value && !this.state.isUploading)
      ? <div className="imagePlaceHolder" style={{ lineHeight: videoHeight }}>{placeholder}</div>
      : null

    const video = value ? <video
      loop="true"
      muted={true}
      src={value}
      data-mobile-src={value}
      data-src={value}      
      type="video/mp4"
      playsInline="true"
      style={{ maxHeight: videoHeight, maxWidth: videoWidth }}>
    </video> : null

    return (
      <div
        className={classnames("form-field VideoDrop", className, { hasError: error })}
        style={{ alignSelf: 'center', ...this.props.style }}>
        <div className="removeWrapper"><div className="removeItem" onClick={this.onClearItem}>X</div></div>
        <div onClick={this.onClick}>
          <Dropzone
            accept="video/*"
            className="videoDropzone"
            onDrop={(acceptedFiles, rejectedFiled) => this.onVideoDrop(acceptedFiles, rejectedFiled)}
            style={{ height: videoHeight, width: videoWidth }}
            onDoubleClick={onDoubleClick}
            disableClick={true}>
            {spinner}
            {showPlaceholder}
            {video}
          </Dropzone>
        </div>

        {folderLoaded && showFolder
          ? <FilesFolder
            folderFiles={folderFiles}
            folderX={folderX}
            folderY={this.state.folderY}
            onClose={this.closefolderView}
            imageHeight={videoHeight}
            imageWidth={videoWidth}
            selectStoreFile={this.selectStoreFile}
          />
          : null
        }

      </div >
    );
  }
}

export default VideoDropZone;