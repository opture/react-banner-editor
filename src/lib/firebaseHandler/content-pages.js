import fbHandler from './index'
import {urlToPageKey} from '../common'
/*
import firebase from 'firebase/app'
// eslint-disable-next-line
import { database } from 'firebase/database'
*/



//Add storage of urls in separate document?

export const addContentPage = (newContentPage, url) => {
  return new Promise( (resolve, reject) => {

    //Store the url in a separate document
    // '/content-page/urls'
    //   Create a key and store the url as s string
    //   Store the url as a key.

    //Copy the landing page supplied.
    console.log(newContentPage)
    let _newPage = {data:newContentPage}
    let pageKey = urlToPageKey(url)
    _newPage._key = pageKey

    var promises = [];
    
    promises.push( fbHandler.setItem({url:url}, '/content-page-urls/' + pageKey) )
    promises.push( fbHandler.setItem(newContentPage, '/content-pages-data/' + pageKey) )

    Promise.all(promises).then( () => {
      resolve(_newPage)
    }).catch( (err) => {
      console.log('error in saving content page')
      console.log(err)
      reject(err)
    })
  });
}

export const publishContentPageToApp = (contentPage,url) => {
  //Fethc the page and
  let pageKey = urlToPageKey(url)
  return fbHandler.setItem(contentPage, '/webapp/contentpages/' + pageKey)
}

export const getContentPageData = (url) => {

  if (!url) return Promise.reject(new Error('url is empty'))
  let pageKey = urlToPageKey(url)

  return fbHandler.getPathAsObject('/content-pages-data/' + pageKey)
}

export const getContentPageUrls = () => {
  return fbHandler.getPathAsArray('/content-page-urls')
}
export const getContentPagesData = (url) => {
  let pageKey = urlToPageKey(url)
  return fbHandler.getPathAsArray('/content-pages-data/' + pageKey)
}

