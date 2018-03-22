import firebase from '../__mocks__/firebase'
import { addGame, getGameData, getGamesSimple, getGamesData} from '../games'
var testKey
var testData = {
  sv:{code:'sv', name:'Sweden', localName:'Sverige', language:'Swedish', localLanguage:'Svenska'},
  en:{code:'en', name:'United Kingdom', localName:'United Kingdom', language:'English (uk)', localLanguage:'English (uk)'}
}


test('add game', () => {
  return addGame(testData.sv).then( (data) => {
    expect(data.code).toBe(testData.sv.code)
  })
})

test('add another game', () => {
  return addGame(testData.en).then( (data) => {
    expect(data.code).toBe(testData.en.code)
  })
})


  test('getGamesSimple', () => {
    return getGamesSimple().then( (data) => {
      testKey = data[0]._key
      expect(data[0]).toHaveProperty('name')
    })
  })


  test('getGamessData', () => {
    return getGamesData().then( (data) => {
      expect(data[0]).toHaveProperty('name')
    })
  })


  test('getGameData', () => {
    return getGameData(testKey).then( (data) => {
      expect(data).toHaveProperty('name')
    })
  })