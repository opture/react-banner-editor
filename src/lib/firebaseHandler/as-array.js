
import firebase from 'firebase/app'
// eslint-disable-next-line
//import { database } from 'firebase/database'

export const getSynchronizedArray = (url, store, slug, orderBy, filter) => {
  return new Promise((resolve, reject) => {


    //let firebaseRef = ref
    var retval = {
      ref: null,
      isLoading: true,
      isEmpty: true,
      hasRows: false,
      items: [],
      getItemByKey: (key) => {
        return new Promise((_resolve, _reject) => {
          let foundItem = retval.items.find((_item) => {
            return _item._key === key;
          })

          if (foundItem) {
            _resolve(foundItem)
          } else {
            retval.ref
              .child(key)
              .once('value')
              .then((snap) => {
                if (snap.exists()) {
                  _resolve(snap.val())
                } else {
                  _reject({
                    err: {
                      description: 'Item with key ' + key + ' doesn\'t exist'
                    }
                  })
                }
              })
          }
        })

      }
    }
    store.dispatch({ type: 'firebase/LOADING/' + slug, value: retval })
    var baseRef = firebase.database().ref(url);
    var sortRef = null
    if (orderBy) {
      if (orderBy.orderByValue) {
        sortRef = firebase.database().ref(url).orderByValue();
      }
      if (orderBy.orderByChild) {
        sortRef = firebase.database().ref(url).orderByChild(orderBy.orderByChild);
      }
      if (orderBy.orderByKey) {
        sortRef = firebase.database().ref(url).orderByKey(orderBy.orderByKey);
      }
    }
    if (filter) {
      //euqalTo needs a sorted to define the value to compare to.
      if (filter.equalTo && sortRef) {
        console.log('filter the array')
        sortRef = sortRef.equalTo(filter.equalTo)
      }
      if (filter.limitToFirst) {
        sortRef = sortRef ? sortRef.limitToFirst(filter.limitToFirst) : baseRef.limitToFirst(filter.limitToFirst)
      }
      if (filter.limitToLast) {
        sortRef = sortRef ? sortRef.limitToLast(filter.limitToLast) : baseRef.limitToLast(filter.limitToLast)
      }
      if (filter.startAt) {
        sortRef = sortRef ? sortRef.startAt(filter.startAt) : baseRef.startAt(filter.startAt)
      }
      if (filter.endAt) {
        sortRef = sortRef ? sortRef.endAt(filter.endAt) : baseRef.endAt(filter.endAt)
      }
    }
    retval.ref = baseRef
    syncChanges(retval, sortRef ? sortRef : baseRef, store, slug)
    wrapLocalCrudOps(retval, baseRef, store, slug);

    //Listen for when loading is done.
    baseRef.once('value', function (snapshot) {
      retval.isLoading = false;
      retval.raw = snapshot.val()
      store.dispatch({ type: 'firebase/LOADED/' + slug, value: retval, list: snapshot.val() });
      resolve(retval)
    });
  })
}

function syncChanges(list, ref, store, slug) {

  ref.on('child_added', function _add(snap, prevChild) {

    if (!snap.exists) return;
    var data = snap.val();
    //if (typeof data._key === 'undefined' || data._key === null) data._key = snap.key;
    //data.$id = snap.key;
    if (!data._key) data._key = snap.key
    var pos = positionAfter(list.items, prevChild);
    list.items.splice(pos, 0, data);

    list.isEmpty = false
    list.hasRows = true
    if (!list.isLoading) {
      store.dispatch({ type: 'firebase/CHILD_ADDED/' + slug, value: list, index: pos, list: list.items });
    }
  });

  ref.on('child_removed', function _remove(snap) {
    console.log('child removed')
    console.log(snap.key)
    var i = positionFor(list.items, snap.key);

    if (i > -1) {
      list.items.splice(i, 1);
    }

    if (list.items.length === 0) { list.isEmpty = true; list.hasRows = false }
    console.log('child removed event...')
    store.dispatch({ type: 'firebase/CHILD_REMOVED/' + slug, value: list, index: i, list: list.items });
  });

  ref.on('child_changed', function _change(snap) {
    var data = snap.val();
    //data.$id = snap.key;
    if (!data._key) data._key = snap.key
    var i = positionFor(list.items, snap.key);
    console.log('child changed: ' + i)
    if (i > -1) {
      list.items[i] = data;
    }
    store.dispatch({ type: 'firebase/CHILD_CHANGED/' + slug, value: list, index: i, list: list.items });
  });

  ref.on('child_moved', function _move(snap, prevChild) {
    var curPos = positionFor(list.items, snap.key);
    if (curPos > -1) {
      var data = list.items.splice(curPos, 1)[0];
      var newPos = positionAfter(list.items, prevChild);
      list.items.splice(newPos, 0, data);
    }
    store.dispatch({ type: 'firebase/CHILD_MOVED/' + slug, value: list, prevPos: curPos, prevChild, newPos, list: list.items });
  });
}

function wrapLocalCrudOps(list, firebaseRef, store, slug) {
  // we can hack directly on the array to provide some convenience methods
  list.add = function (data, key) {
    let saveData = { ...data }
    if (saveData.hasOwnProperty('$id')) { delete saveData.$id; }
    if (!typeof key === 'undefined' || key === null) {
      return firebaseRef.push(data);
    } else {
      return firebaseRef.child(key).set(saveData);
    }
  };

  list.remove = function (key) {
    console.log('firebase remove: ' + key)
    firebaseRef.child(key).remove();
  };

  list.set = function (newData, key) {
    // make sure we don't accidentally push our _key prop
    let saveData = { ...newData }
    if (saveData.hasOwnProperty('$id')) { delete saveData.$id; }
    firebaseRef.child(key).set(saveData);
  };

  list.update = function (newData, key) {
    // make sure we don't accidentally push our _key prop
    let saveData = { ...newData }
    if (saveData.hasOwnProperty('$id')) { delete saveData.$id; }
    firebaseRef.child(key).update(saveData);
  };

  list.indexOf = function (key) {
    return positionFor(list, key); // positionFor in examples above
  }
}

// similar to indexOf, but uses id to find element
function positionFor(list, key) {

  for (var i = 0, len = list.length; i < len; i++) {
    if (list[i]._key === key) {
      return i;
    }
  }
  return -1;
}


// using the Firebase API's prevChild behavior, we
// place each element in the list after it's prev
// sibling or, if prevChild is null, at the beginning
function positionAfter(list, prevChild) {
  if (prevChild === null) {
    return 0;
  }
  else {
    var i = positionFor(list, prevChild);
    if (i === -1) {
      return list.length;
    }
    else {
      return i + 1;
    }
  }
}

