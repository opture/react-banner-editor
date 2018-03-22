
import firebase from 'firebase'
/*import firebase from 'firebase/app'
import { database } from 'firebase/database' */
import { config } from './config'
import {getSynchronizedArray} from './as-array'
//import { authStateChange } from '../../actions/auth';

var firebaseHandler = (() => {
  firebase.initializeApp(config);
  const storage = firebase.storage();
  let initDone = false;
  let store = {};
  let exported = {}
  let _refs = {};

  function init(_store, useAuth = false) {
    store = _store;
    initDone = true;

    if (useAuth) {
      startAuthStateChangedListener()
    }
  }

  function getFbRefAsArray(url, slug, orderBy, filter) {

    if (!initDone) {
      throw new Error('Firebase not initialized')
    }
    return (!_refs[url]) ? (
      getSynchronizedArray(url, store, slug, orderBy, filter)
    ) : Promise.resolve(_refs[url])
  }

  function addItem(item, refPath) {
    return new Promise((resolve, reject) => {
      let newKey = getNewKey(refPath)
      item._key = newKey
      let newRef = firebase.database().ref(refPath + '/' + newKey)
      newRef.set(item).then(() => {
        resolve(item)
      }).catch((err) => {
        reject(err)
      })
      if (newRef.flush) newRef.flush(100)
    })
  }

  function addItemAt(item, refPath) {
    return new Promise((resolve, reject) => {
      let newKey = getNewKey(refPath)
      let newRef = firebase.database().ref(refPath + '/' + newKey)
      newRef.set(item).then(() => {
        resolve(item)
      }).catch((err) => {
        reject(err)
      })
      if (newRef.flush) newRef.flush(100)
    })
  }

  /**
   * Adds item to array type document
   * It will create a new key, add the key to the object and return the object with the _key property added.
   * @param {Object} item    The object to be stored
   * @param {Object} refPath The path to store it to
   */
  function setItem(item, refPath) {
    console.log(item)
    console.log(refPath)
    if (!item || !refPath) {throw new Error('Missing input parameters for setItem')}
    var theRef = firebase.database().ref(refPath)
    let setItem = {...item}
    if (setItem.hasOwnProperty('$id')) { delete setItem.$id; }
    console.log(setItem)
    return theRef.set(setItem)
    //if (theRef.flush) theRef.flush()
    //return theRef
  }
  /**
   * Update item
   * @param  {Object} item    The item to update to
   * @param  {String} refPath the firebase path to the item
   * @return {Promise}
   */
  function updateItem(item, refPath) {
    var theRef = firebase.database().ref(refPath).update(item)
    if (theRef.flush) theRef.flush()
    return theRef
  }

  function getNewKey(refPath) {
    var theRef = firebase.database().ref(refPath).push()

    return theRef.key
  }

  function removeItem(refPath) {
    var theRef = firebase.database().ref(refPath).remove();
    if (theRef.flush) theRef.flush()
    return theRef
  }

  function getPathAsObject(refPath) {
    return new Promise((resolve, reject) => {
      let theRef = firebase.database().ref(refPath)
      theRef.once('value', (snap) => {
        resolve(snap.val())
      }, (err) => {
        reject(err)
      })
      if (theRef.flush) theRef.flush()
    })
  }

  function objectToArray(transformObject) {
    return new Promise((resolve, reject) => {
      var arr = Object.keys(transformObject).map(function (key) { return transformObject[key]; });
      resolve(arr);
    });

  }

  function getPathAsArray(refPath) {
    return new Promise((resolve, reject) => {

      let theRef = firebase.database().ref(refPath)

      theRef.once('value', (snap) => {
        let data = snap.val()
        if (!data) {
          resolve()
        } else {
          resolve(objectToArray(data))
        }

      }, (err) => {
        reject(err)
      })
      if (theRef.flush) theRef.flush()
    })
  }

  function signInWithEmailAndPassword(email, password) {
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(result => {
          console.log(result)
          resolve(result)
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
    })
  }

  function signOut() {
    return new Promise((resolve, reject) => {
      firebase.auth().signOut()
        .then(result => {
          console.log(result)
          resolve(result)
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
    })
  }

  function goOffline() {
    firebase.database().goOffline();
  } 
  function goOnline(){
    firebase.database().goOnline();
  }

  function startAuthStateChangedListener() {
    firebase.auth().onAuthStateChanged(function (user) {
      console.log(user)
      //store.dispatch(authStateChange(user))
    });
  }

  function addFile(file, path){
    // if (path.indexOf('/') !== 0) path = '/' + path
    // if (path.substring(path.length-1) !== '/') path = path +'/'
    // path = path
    const ref = storage.ref(path + file.name)
    //Check if there is a file with the same name already.
    return new Promise( (resolve, reject) => {
      ref.put(file).then( snap => {
        //Add path and name to images.
        addItem({url: snap.downloadURL, name: file.name}, '/images' + path).then( () => {
          resolve(snap.downloadURL)
        })
      }).catch( (err) => {
        reject(err)
      })
    })
  }

  exported.addItem = addItem
  exported.addFile = addFile
  exported.getFbRefAsArray = getFbRefAsArray
  exported.getNewKey = getNewKey
  exported.getPathAsArray = getPathAsArray
  exported.getPathAsObject = getPathAsObject
  exported.init = init;
  exported.removeItem = removeItem
  exported.setItem = setItem
  exported.signInWithEmailAndPassword = signInWithEmailAndPassword
  exported.signOut = signOut
  exported.startAuthStateChangedListener = startAuthStateChangedListener
  exported.updateItem = updateItem
  exported.addItemAt = addItemAt
  exported.goOnline = goOnline
  exported.goOffline = goOffline

  return exported;

})();

export default firebaseHandler