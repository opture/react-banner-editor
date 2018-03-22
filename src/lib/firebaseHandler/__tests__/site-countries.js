import firebase from '../__mocks__/firebase'
import { addCountry, getCountryData, getCountriesSimple, getCountriesData} from '../site-countries'
var testKey
var testData = {
  sv:{code:'sv', name:'Sweden', localName:'Sverige', language:'Swedish', localLanguage:'Svenska'},
  en:{code:'en', name:'United Kingdom', localName:'United Kingdom', language:'English (uk)', localLanguage:'English (uk)'}
}


test('add country', () => {
  return addCountry(testData.sv).then( (data) => {
    expect(data.code).toBe(testData.sv.code)
  })
})

test('add another country', () => {
  return addCountry(testData.en).then( (data) => {
    expect(data.code).toBe(testData.en.code)
  })
})


  test('getCountriesSimple', () => {
    return getCountriesSimple().then( (data) => {
      testKey = data[0]._key
      expect(data[0]).toHaveProperty('name')
    })
  })


  test('getCountriesData', () => {
    return getCountriesData().then( (data) => {
      expect(data[0]).toHaveProperty('name')
    })
  })


  test('getCountryData', () => {
    return getCountryData(testKey).then( (data) => {
      expect(data).toHaveProperty('name')
    })
  })