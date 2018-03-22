import React, { Component } from 'react';
import FloatingWindow from 'containers/FloatingWindow'
import './style.css'

class FilesFolder extends Component {
  handleStart = (e) => {
    e.stopPropagation();
  }

  render() {
    /* const { folderX, folderY, onClose, imageHeight, imageWidth, folderFiles, selectStoreFile } = this.props
    <div className="folderview" style={{ left: folderX, top: folderY }}> */
    const { onClose, imageHeight, imageWidth, folderFiles, selectStoreFile } = this.props
    return (
      <FloatingWindow title="Select file" onClose={onClose}>
        {Object.keys(folderFiles).map(key => {
          const file = folderFiles[key];
          return (
            <div className="folder-fileitem"
              style={{ width: imageWidth }}
              key={key}
              onClick={(e) => selectStoreFile(e, file)}
              title={file.name}>
              {
                file.type === "video" ?
                  <video
                    loop="true"
                    muted={true}
                    playsInline="true"
                    style={{ height: imageHeight, width: imageWidth }}>
                    <source
                      className="video-src-tag"
                      data-mobile-src={file.url}
                      data-src={file.url}
                      src={file.url}
                      type={'video/' + file.extension} />
                  </video>
                  :
                  <div style={{
                    backgroundImage: 'url(' + file.url + ')',
                    height: imageHeight,
                    width: imageWidth,
                  }}>
                  </div>
              }
            </div>
          )
        })
        }
      </FloatingWindow>
    );
  }
}

export default FilesFolder;