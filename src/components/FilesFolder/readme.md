# Firebase Filetree

## Description
* I want to be able to drag and drop a image to be uploaded.
* I want to be able to click the image/placeholder and be able to choose a image from that subset
* A click should present me a view with all the images in that folder, but also subfolders as a treev iew on the side.

Draw information from the database to present a tree strcture of the firebase storage.

Create Storage node in firebase database
Create media and files below that (Storagae/media, Storage/files)

The strucutre needs to make it able to create a strucutre in the database that refers to each other
I want to easily fetch files from one location by requesting:

Bea blet to:
* Fetch files based on path
* Fetch file based on key
* Fetch folder based on path
* fetch 

## Structure
### Firebase database
```
{
  @@Storage:{
    foldersKeys:{
      '%2Fimages':0,
      '%2Fimages%2Favatars':0,
      '%2Fimages%2Favatars%2Flowres':0,
      '%2Fimages%2Favatars%2Fhighres':0,
      '%2Fimages%2Fbanners':0,
      '%2Fimages%2Fbanners%2F16x9':0,
      '%2Fimages%2Fbanners%2F16x9%2Flowres':0,
      '%2Fimages%2Fbanners%2F16x9%2Fhighres':0,
    }
    folders:{
      images:{
        _key: '%2Fimages,
        avatars:{
          _key:'%2Fimages%2Favatars',
          lowres:{
            _key:'%2Fimages%2Favatars%2Flowres'
          },
          highres:{
            _key:'%2Fimages%2Favatars%2Fhighres'
          },
          banners:{
            _key:_key:'%2Fimages%2Fbanners'
            16x9:{
              _key:_key:'%2Fimages%2Fbanners%2F16x9'
              lowres:{
                _key:'%2Fimages%2Fbanners%2F16x9%2Flowres'
              },
              highres:{
                _key:'%2Fimages%2Fbanners%2F16x9%2Fhighres'
              }
            }
          }
        }
      }
    },
    files:{
      [AutoGenKey]:{
        name:'filename.jpg',
        url:'url to firebase storage',
        added: Date,
        folder:'folder'
      },
      [AutoGenKey]:{
        name:'filename.jpg',
        url:'url to firebase storage',
        added: Date
      }      
    },
    filesInFolder:{
      [_folder_key]:{
        _file_key:1
        _file_key2:1
        _file_key3:1
        _file_key4:1
      },
      [_folder_key_2]:{
        _file_key5:1
        _file_key6:1
        _file_key7:1
        _file_key8:1
      },      
    }
  }
}
```
* /Storage/files
* /Storage/media
  * /Storage/media/images
  * /Storage/media/video
* /storage/keyedPath

### Firebase storage
* /files
* /media

Pseudo code to store a file
```javascript
  storeFile = (file, path) => {
    //Check that the path exists
    
  }
  fetchFolderKey(path, createIfNonExistent){
    //Fetch the folder key. 
    
    //To check if it exists,


  }
```

___files

/storage/media/images/
  {
    _key:String,
    @@files:[{
      filename:String,
      uploaded:Date,
      tags:[]
    }],
    otherPath:{
      _key:String,
      @@files:[{
        filename:String,
        uploaded:Date,
        tags:[]
      },{
        filename:String,
        uploaded:Date,
        tags:[]
      }],
    }
 }


    
    
