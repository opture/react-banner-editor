import fbHandler from './index.js'
import {publishContentPageToApp} from './content-pages'
/*
import firebase from 'firebase/app'
// eslint-disable-next-line
import { database } from 'firebase/database'
*/



//Add storage of urls in separate document?

export const storePromotion = (promotion) => {
    if (!promotion || !promotion.selectedCountries || promotion.selectedCountries.length < 1) {
      return Promise.reject(new Error('Invalid promotion data, can not store.'))
    }
    console.log(promotion)
    return new Promise((resolve, reject) => {
      //If it has a key update the related promotion document.
      let promises = []
      let name = promotion[promotion.selectedCountries[0]].header
      let storeObj = {...promotion}

      if (promotion._key){
        //Update the promotion
        promises.push( fbHandler.updateItem({name}, '/promotions/' + promotion._key) )
        promises.push( fbHandler.updateItem(promotion, '/promotion/' + promotion._key) )
      }else{
        let newKey = fbHandler.getNewKey('/promotions/')

        storeObj._key = newKey
        promises.push( fbHandler.setItem({_key: newKey, name}, '/promotions/' + newKey) )
        promises.push( fbHandler.setItem(storeObj, '/promotion/' + newKey))
      }

      Promise.all(promises)
        .then( result => resolve(storeObj))
        .catch( err => reject(err) )
    })
}

export const publishPromotionToWebapp = (promotion) => {
  return new Promise( (resolve, reject) => {
    let promises = []

    let publishCountryPromotion = (country) => {
      let publishPromotion = {...promotion[country]}
      delete publishPromotion.page
      return fbHandler.setItem(publishPromotion, '/webapp/promotions/' + country + '/' + promotion._key + '/')
    }

    let publishContentPage = (country) => {
      let publishPage = {...promotion[country].page}
      return publishContentPageToApp(publishPage, promotion[country].landingpage)
    }

    promotion.selectedCountries.forEach( (country) => {
      promises.push(publishCountryPromotion(country))
      promises.push(publishContentPage(country))
    })

    Promise.all(promises)
      .then( result => resolve() )
      .catch( err => reject(err))
  })
  //If promotion is set then use that otherwise check for key and fetch the promotion


}

// export const getPromotions = () => {
//   return fbHandler.getPathAsArray('/promotions/')
// }

// export const getPromotion = (key) => {
//   if (!key) return Promise.reject(new Error('promotion key is empty'))
//   return fbHandler.getPathAsObject('/promotion/' + key)
// }

