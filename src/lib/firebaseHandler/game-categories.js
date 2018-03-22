import fbHandler from './index.js'
/*
import firebase from 'firebase/app'
// eslint-disable-next-line
import { database } from 'firebase/database'
*/


export const clearGameCategories = () => {
  fbHandler.removeItem('/game-categories')
  fbHandler.removeItem('/game-categories-data')
  fbHandler.removeItem('/game-categories-games')
  fbHandler.removeItem('/game-categories-topgames')

}

export const addGameCategory = (newCategory, language) => {
  language = language || 'default'
  return new Promise( (resolve, reject) => {
    //Copy the landing page supplied.
    let _newCategory = {...newCategory}
    let _games = null;
    let _topGames = null;





    let newKey = fbHandler.getNewKey('/game-categories/' + language)
    _newCategory._key = newKey

    var promises = [];
    promises.push( fbHandler.setItem({_key:newKey, name:_newCategory.name}, '/game-categories/' + newKey  ) )
    promises.push( fbHandler.setItem({_key:newKey, name:_newCategory.name}, '/game-categories/' + newKey + '/' + language ) )
    promises.push( fbHandler.setItem(_newCategory, '/game-categories-data/' + newKey + '/' + language) )
    //promises.push( fbHandler.setItem({_key:newKey, name:_newCategory.name}, '/game-categories-games/' + newKey + '/' + language) )
    //promises.push( fbHandler.setItem({_key:newKey, name:_newCategory.name}, '/game-categories-topgames/' + newKey + '/' + language) )




    Promise.all(promises).then( () => {
      resolve(_newCategory)
    }).catch( (err) => {
      reject(err)
    } )
  });
}

export const updateGameCategoryData = (category,  language) => {
    let _copiedCategory = {...category}
    let key = category._key
    var promises = [];

    promises.push( fbHandler.setItem( {_key: key, name: category.name}, '/game-categories/' + language + '/' + key ) );
    promises.push( fbHandler.setItem( {_key: key, name: category.name, description: category.description ||''}, '/game-categories-data/' + key + '/' + language) );


    return new Promise( (resolve, reject) => {
      Promise.all(promises).then( () => {
        resolve(_copiedCategory)
      }).catch( (err) => {
        reject(err)
      })
    })
}

export function addGameToCategory(game, category){
  return new Promise((resolve, reject) => {
    if (!category) return Promise.reject(new Error('categoryKey is empty'))
    if (!game) return Promise.reject(new Error('Game is not supplied'))

    let updatedGame = {...game}

    fbHandler.getFbRefAsArray('games-data/' + game._key + '/codetaCategories')
    .then( (categories) => {

      console.log('got categories')
      console.log(categories)

      let codetaCategories = Array.isArray(categories.items) ? categories.items.map((c)=>{return category._key !== c._key ? {_key:c._key, name:c.name} : null} ) : []
      codetaCategories.push({_key:category._key, name:category.name})
      updatedGame.codetaCategories = codetaCategories

      let promises = []
      console.log('updatedgame')
      console.log(updatedGame)

      promises.push(fbHandler.setItem(game, '/game-categories-games/' + category._key + '/' + game._key))
      promises.push(fbHandler.setItem(codetaCategories, '/games-data/' + updatedGame._key +'/codetaCategories' ))

      return Promise.all(promises)
    })
    .then( () => {
      return Promise.resolve();
    })
  })
}

export function removeGameFromCategory(game, category){
  //Remove from all the published categories.
  //Remove the category from the game.
}
export function addTopGameToCategory(game, categoryKey, language, index){
  language = language || 'default'
  if (!categoryKey) return Promise.reject(new Error('categoryKey is empty'))
  if (!game) return Promise.reject(new Error('Game is not supplied'))
  return fbHandler.setItem(game, '/game-categories-topgames/' + categoryKey + '/' + language + '/' + index)
}

function addGamesFromArray(games, category){
  let promises = []

  games.forEach( (_game) => {
    promises.push(addGameToCategory(_game, category))
  })
  return promises
}

function addTopGamesFromArray(games, categoryKey, language){
  let promises = []
  console.log('adding top games')
  games.forEach( (_game, i) => {
    promises.push(addTopGameToCategory(_game, categoryKey, language, i))
  })
  return promises
}

export function updateGameCategoryGames(games, category){


  if (!category) return Promise.reject(new Error('categoryKey is empty'))
  if (!games) return Promise.reject(new Error('Game is not supplied'))

  return new Promise( (resolve, reject) => {
    //Loop over games and add them
    let promises
    let refPath = '/game-categories-games/' + category._key
    fbHandler.removeItem(refPath).then( () => {
      promises = addGamesFromArray(games, category)
      Promise.all(promises).then( () => resolve())
    })
  })
}

export function updateGameCategoryTopGames(games, categoryKey, language){
  console.log('updateGameCategoryTopGames')
  language = language || 'default'
  if (!categoryKey) return Promise.reject(new Error('categoryKey is empty'))
  if (!games) return Promise.reject(new Error('Game is not supplied'))

  return new Promise( (resolve, reject) => {
    //Loop over games and add them
    let promises
    let refPath = '/game-categories-topgames/' + categoryKey
    fbHandler.removeItem(refPath + '/' + language).then( () => {
      console.log('removed')
      promises = addTopGamesFromArray(games, categoryKey, language)
      Promise.all(promises).then( () => resolve())
    })
  })
}

export const getGameCategoryData = (categoryKey, language) => {
  console.log('getGameCategoryData')
  language = language || 'default'
  console.log('make some request')
  if (!categoryKey) return Promise.reject(new Error('categoryKey is empty'))
    console.log('make some request')
  return fbHandler.getPathAsObject('/game-categories-data/' + categoryKey + '/' + language)
}


export const  getDefaultAndlanguagegames = (categoryKey, language) => {
  return new Promise( (resolve, reject) => {
    //Fetch both the default and the specific language.
    let promises = [];
    promises.push( fbHandler.getPathAsArray('/game-categories-games/' + categoryKey + '/' + language ) )
    promises.push( fbHandler.getPathAsArray('/game-categories-games/' + categoryKey + '/default') )
    Promise.all(promises).then( (data) => {
      if (data[0]) {
        resolve(data[0])
      }else{
        resolve(data[1])
      }
    })
  })
}

export const getGameCategoryGames = (categoryKey) => {

  return new Promise( (resolve, reject)  => {
    if (!categoryKey) {
      reject(new Error('categoryKey is empty'))
      return;
    }

    return fbHandler.getPathAsArray('/game-categories-games/' + categoryKey ).then( (data) =>  resolve(data || []) )

  })
}

export const getGameCategoryTopGames = (categoryKey, language) => {
  language = language || 'default'
  if (!categoryKey) return Promise.reject(new Error('categoryKey is empty'))
  if (language  === 'default'){
    return fbHandler.getPathAsArray('/game-categories-topgames/' + categoryKey + '/' + language )
  }else{
    //Get both default and for the specififc language and merge them
    return new Promise( (resolve, reject) => {
      let promises = []
      promises.push( fbHandler.getPathAsArray('/game-categories-topgames/' + categoryKey + '/' + language ) )
      promises.push( fbHandler.getPathAsArray('/game-categories-topgames/' + categoryKey + '/default') )
      Promise.all(promises).then( (data) => {
        if (data[0]) {
          resolve(data[0])
        }else{
          resolve(data[1] || [])
        }
      })
    })
  }

}


function publishGameCategoryLanguageStep2(key, language, result){
  let promises2 = []          
  let name = result[0] ? result[0].name : ''
  
  if (result[0]){
    promises2.push(fbHandler.setItem({_key: key, name},'/webapp/gamecategories/' + language + '/' + name))
    promises2.push(fbHandler.setItem({_key: key, name},'/webapp/gamecategory/' + language + '/' + name +'/data'))
  }

  if (result[1]){
    promises2.push(fbHandler.setItem(result[1],'/webapp/gamecategory/' + language + '/' + name +'/games'))
  }

  if (result[2]){
    promises2.push(fbHandler.setItem(result[2],'/webapp/gamecategory/' + language + '/' + name +'/topgames'))
  }

  return Promise.all(promises2)

}

function publishGameCategoryLanguage(key, language){
  let promises = [
    getGameCategoryData(key, language),
    getGameCategoryGames(key, language),
    getGameCategoryTopGames(key, language)
  ]
  return Promise.all(promises)
  .then( result => publishGameCategoryLanguageStep2(key, language, result) )
}



export const publishCategory = (category, key) => {
  //Check if we got a category then use that.
  key = key ||category._key
  let promises = []
  return fbHandler.getPathAsObject('/game-categories-data/' + key)
  .then( result => {
    Object.keys(result).forEach( language =>  promises.push(publishGameCategoryLanguage(key, language)) )
    return Promise.all(promises)   
  })
}

export const getGameCategoriesSimple = (language) => {
  language = language || 'default'
  return fbHandler.getPathAsArray('/game-categories/' + language)
}

export const getGameCategoriesData = () => {
  return fbHandler.getPathAsArray('/game-categories-data')
}

