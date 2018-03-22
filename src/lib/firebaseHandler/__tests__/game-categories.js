import firebase from '../__mocks__/firebase'
import {gameCategoryMockData as mockData} from '../__mocks__/data/game-categories.js'
import { addGameCategory,addGameToCategory,updateGameCategoryGames,getGameCategoryData,getGameCategoryGames,getGameCategoryTopGames,getGameCategoriesSimple,getGameCategoriesData } from '../game-categories'

let firstKey = ''

test('addGameCategory', () => {
  return addGameCategory(mockData.testCategory1).then( (data) => {
    firstKey = data._key
    expect(data).toHaveProperty('name')
    expect(data.name).toBe('Test Game Category 1')
  })
})

test('add game to category', () => {
  return addGameToCategory({name:'the game'}, firstKey).then( (data) => {
    expect(data).toHaveProperty('_key')
  })
})



test('getGameCategoryGames', () => {
  return getGameCategoryGames(firstKey, 'sv').then( (data) => {
    expect(data[0].name).toBe('the game')
  })
})

test('add game to category', () => {
  return addGameToCategory({name:'the game 2'}, firstKey, 'sv').then( (data) => {
    expect(data).toHaveProperty('_key')
  })
})
test('getGameCategoryGames', () => {
  return getGameCategoryGames(firstKey, 'sv').then( (data) => {
    expect(data[0].name).toBe('the game 2')
  })
})