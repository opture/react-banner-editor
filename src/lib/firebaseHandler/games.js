import fbHandler from './index.js'

/*
import firebase from 'firebase/app'
// eslint-disable-next-line
import { database } from 'firebase/database'
*/



export const addGame = (newGame) => {
  return new Promise( (resolve, reject) => {
    //Copy the landing page supplied.
    if (typeof newGame.game === 'object') {
      newGame = newGame.game
    }
    let _newGame = {...newGame}
    if (_newGame.isLive === undefined || _newGame.isLive === null ) {
      _newGame.isLive = _newGame.tableID ? true : false;
    }
    let newKey = _newGame.slug || _newGame.tableID
    _newGame._key = newKey
    _newGame.lastChanged = new Date().getTime()

    var promises = [];
    let simpleGame = {
      _key:newKey,
      isLive: _newGame.isLive,
      name:_newGame.name,
      description:_newGame.description,
      isOpen:_newGame.isOpen || false,
      logo:_newGame.logo,
      openingTime:_newGame.openingTime || '',
      thumbnail:_newGame.thumbnail,
      url:_newGame.url,
      vendor:_newGame.vendor,
      limit:_newGame.limit || {},
      backgroundImage:_newGame.backgroundImage,
      lastchanged: _newGame.lastChanged,
      video: _newGame.video || '',
    }

    promises.push( fbHandler.setItem(simpleGame, '/games/' + newKey) )
    promises.push( fbHandler.setItem(_newGame, '/games-data/' + newKey) )
    
    //Are there tags that needs to be stored?

    //Are there categories that needs to be upådated?
    // if (newGame.codetaCategories) {
    //   newGame.codetaCategories.forEach( (c) => {
    //     promises.push(addGameToCategory(newGame, c))
    //   })
    // }

    Promise.all(promises).then( () => {
      resolve(_newGame)
    })
  });
}
export function clearGames(){
  console.log('clear games')
  return new Promise((resolve, reject) => {
    let promises = []
    promises.push(fbHandler.setItem({}, '/games/'))
    promises.push(fbHandler.setItem({}, '/games-data/'))
    Promise.all(promises)
    .then( () => {
      console.log('games cleared')
      resolve()
    })
    .catch( (err) => {
      reject(err)
    })
  })

}
export const getGameData = (gameKey) => {
  if (!gameKey) return Promise.reject(new Error('gameKey is empty'))
  return fbHandler.getPathAsObject('/games-data/' + gameKey)
}

export const getGamesSimple = () => {
  return fbHandler.getPathAsArray('/games')
}
export const getGamesData = () => {
  return fbHandler.getPathAsArray('/games-data')
}