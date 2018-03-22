/*import firebase from 'firebase' */
import fbHandler from './index.js'
/*
import firebase from 'firebase/app'
// eslint-disable-next-line
import { database } from 'firebase/database'
*/

export const addLandingPage = (newLandingPage) => {
  return new Promise( (resolve, reject) => {
    //Copy the landing page supplied.
    let _newPage = {...newLandingPage}
    let pageKey = fbHandler.getNewKey('/landing-pages')
    _newPage._key = pageKey

    var promises = [];
    promises.push( fbHandler.setItem({_key:pageKey, name:_newPage.name}, '/landing-pages/' + pageKey) )
    promises.push( fbHandler.setItem(_newPage, '/landing-pages-data/' + pageKey) )

    Promise.all(promises).then( () => {
      resolve(_newPage)
    })
  });
}

export const getLandingPageData = (pageKey) => {
  if (!pageKey) return Promise.reject(new Error('pageKey is empty'))
  return fbHandler.getPathAsObject('/landing-pages-data/' + pageKey)
}

export const getLandingPagesSimple = () => {
  return fbHandler.getPathAsArray('/landing-pages')
}
export const getLandingPagesData = () => {
  return fbHandler.getPathAsArray('/landing-pages-data')
}