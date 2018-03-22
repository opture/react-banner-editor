import firebase from 'firebase'
import fbHandler from './index.js'
var siteCountries = ['se','no','de','fi','uk']

export function addCountry(newCountry){
  return new Promise( (resolve, reject) => {
    //Copy the landing page supplied.
    let _newCountry = {...newCountry}
    let newKey = fbHandler.getNewKey('/site-countries')
    _newCountry._key = newKey

    var promises = [];
    promises.push( fbHandler.setItem({_key:newKey, name:_newCountry.name, code:_newCountry.code}, '/site-countries/' + newKey) )
    promises.push( fbHandler.setItem(_newCountry, '/site-countries-data/' + newKey) )

    Promise.all(promises).then( () => {
      resolve(_newCountry)
    })
  });
}

export const getCountryData = (pageKey) => {
  if (!pageKey) return Promise.reject(new Error('pageKey is empty'))
  return fbHandler.getPathAsObject('/site-countries-data/' + pageKey)
}

export const getCountriesSimple = () => {
  return fbHandler.getPathAsArray('/site-countries')
}
export const getCountriesData = () => {
  return fbHandler.getPathAsArray('/site-countries-data')
}