import firebase from 'firebase/app'
import { database } from 'firebase/database'
//import {storage} from 'firebase/storage'



const storageHandler = (() => {

  // const data = {
  //   folders:[],
  //   files:[]
  // }
  const filesByKey = {

  }
  const filesByFolder = {
    _folderkey: {
      file_key1: {},
      file_key2: {}
    },
    _folderkey2: {

    }
  }

  function _createFileStorageItem(file, type, path) {

    const extension = file.name.split('.').pop()
    const storagePath = removeSlashesFromPath(path)
    const fileRef = firebase.database().ref('@@Storage/files/')
    const filesInFolderRef = firebase.database().ref('@@Storage/filesInFolders/')
    let folderKey = getFolderKeyFromPath(path)
    var fileKey = fileRef.push().key
    const storageRef = firebase.storage().ref('/' + storagePath + '/' + fileKey + '.' + extension)
    let dbFile = {}

    return new Promise((resolve, reject) => {
      if (!file) reject("File is required")
      if (!type) reject("Type is required")
      if (!path) reject("Path is required")

      createFolder(path)
        .then(() => {
          return storageRef.put(file)
        })
        .then((fileSnap) => {
          dbFile = {
            _key: fileKey,
            name: file.name,
            created: new Date(),
            url: fileSnap.downloadURL,
            folder: folderKey,
            type: type,
            extension
          }

          return fileRef.child(fileKey).set(dbFile)
        })
        .then((snap) => {

          return filesInFolderRef.child(folderKey).update({ [fileKey]: 1 })
        })
        .then(() => {
          resolve(dbFile)
        })
        .catch((err) => {
          reject(err)
        })
    })

  }

  function storeFile(file, type, path) {
    const storeagePath = removeSlashesFromPath(path)
    const _folder_key = getFolderKeyFromPath(storeagePath)

    return _createFileStorageItem(file, type, path)
  }

  function getFilesInFolder(path, options) {
    //Options

    let folderKey = getFolderKeyFromPath(path)
    let folderRef = firebase.database().ref('@@Storage/filesInFolders/' + folderKey)
    let filesRef = firebase.database().ref('@@Storage/files')

    folderRef.on('value', (snap) => {
      if (typeof options.onValue === 'function') {
        window.requestAnimationFrame(() => {
          options.onValue(snap.val(), snap.key)
        })
      }
    })
    folderRef.on('child_added', (snap) => {
      if (typeof options.onChildAdded === 'function') {

        filesRef.child(snap.key)
          .on('value', (fileSnap) => {
            if (options.type) {
              var values = fileSnap.val()
              if (values.type !== options.type) return;
            }

            //filesByFolder = fileSnap.val()
            window.requestAnimationFrame(() => {
              let file = fileSnap.val()
              options.onChildAdded(file, fileSnap.key)
              if (!filesByFolder.hasOwnProperty(folderKey)) filesByFolder[folderKey] = {}
              filesByFolder[folderKey][fileSnap.key] = file
              filesByKey[fileSnap.key] = file
              //store.dispatch('storage/' + path + '/CHILD_ADDED')
            })
          })
      }
    })
  }

  /**
 * 
 * @param {String} path The folder path.
 */
  function createFolder(path) {
    let folderKey = getFolderKeyFromPath(path)
    let folderPath = removeSlashesFromPath(path)
    //First add the path as key in @@storage/foldersKeys
    var folderKeyRef = firebase.database().ref('/@@Storage/foldersKeys/' + folderKey)
    var foldersRef = firebase.database().ref('/@@Storage/folders/' + folderPath)

    //Then add the folder on the proper location below folders.
    return new Promise((resolve, reject) => {
      let promises = []
      promises.push(folderKeyRef.set(1))
      promises.push(foldersRef.update({ _key: folderKey }))
      Promise.all(promises)
        .then((result) => {
          resolve(folderKey, folderPath)
        })
        .catch((err) => {
          reject(err)
        })
    })

    //Create all the folders neede for that path.

  }

  function removeFile(dbFile) {
    //remove from files infodlders
    firebase.database()
      .ref('@@Storage/filesInFolders')
      .child(dbFile.folder)
      .child(dbFile._key)
      .remove()

    //remove from files
    firebase.database()
      .ref('@@Storage/files')
      .child(dbFile._key)
      .remove()

    //remove the storage item
    firebase.storage()
      .ref('/' + decodeURIComponent(dbFile.folder))
      .child(dbFile._key + '.' + dbFile.extension)
      .delete()
  }


  function removeFolder(path) {
    //It will need to remove all the referenced files.
  }


  function folderExists(path) {
    let folderKey = getFolderKeyFromPath(path)
    let folderRef = firebase.database().ref('/@@Storage/' + folderKey)
    return new Promise((resolve, reject) => {
      folderRef.once('value', (snap) => {
        resolve(snap.exists())
      }, err => reject(err))
    })

  }

  function removeSlashesFromPath(path) {
    let retVal = (path.indexOf('/') === 0) ? path = path.subString(1) : path
    retVal = (path.substring(path.length - 1) === '/') ? retVal = retVal.slice(0, -1) : retVal
    return retVal
  }

  function getFolderKeyFromPath(path) {
    path = removeSlashesFromPath(path)
    return encodeURIComponent(path)
  }
  return {
    storeFile,
    getFilesInFolder,
    createFolder,
    getFolderKeyFromPath,
    folderExists,
    removeFolder,
    removeFile
  }

})()
export default storageHandler



export const storeFile = storageHandler.storeFile
export const getFilesInFolder = storageHandler.getFilesInFolder





