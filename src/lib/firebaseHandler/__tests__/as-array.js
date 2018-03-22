
import firebaseHandler from '../index'
import firebase from '../__mocks__/firebase'
//import firebase from 'firebase/app'
import {getSynchronizedArray} from '../as-array'
jest.mock('firebase')

//Mock the redux store action dispatcher.
var store = {
  dispatch: (data) => {}
}

//firebaseHandler.init(store)

const ref = firebase.database().ref('/game-categories')
ref.autoFlush(true) //Flushes so the 'value' event is raised


test('get synchronized array', ()=> {
  return getSynchronizedArray( ref, store, 'CATEGORY').then( (data) => {
    expect(data).toHaveProperty('isLoading')
  })
})

test('add to synchronized array', ()=> {
  return getSynchronizedArray( ref, store, 'CATEGORY').then( (data) => {
    let newItem = data.add({name:'Some category'})
    //Check that the propert Id is set
    expect(data.items[0]._key).toBe(newItem.key)
  })
})
