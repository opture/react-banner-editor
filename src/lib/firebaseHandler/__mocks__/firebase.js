import MockFirebase from 'firebase-mock'
var mockdatabase = new MockFirebase.MockFirebase();
var mockauth = new MockFirebase.MockFirebase();

var mocksdk = MockFirebase.MockFirebaseSdk(function(path) {
  return mockdatabase.child(path);
}, function() {
  return mockauth;
});



mocksdk.initializeApp = function(){return}

const firebase = mocksdk

export default firebase