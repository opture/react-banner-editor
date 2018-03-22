export const configProduction = {
  apiKey: "AIzaSyAeJyXu2KLa-ZtNArZTiduL6pYYS6XDgKQ",
  authDomain: "codeta-admin.firebaseapp.com",
  databaseURL: "https://codeta-admin.firebaseio.com",
  projectId: "codeta-admin",
  storageBucket: "codeta-admin.appspot.com",
  messagingSenderId: "178944696430"
};
export const configStaging = {
  apiKey: "AIzaSyCjmpmW-JV8oD7PN-0CHh2sSPUe4wosh9M",
  authDomain: "codeta-admin-stage.firebaseapp.com",
  databaseURL: "https://codeta-admin-stage.firebaseio.com",
  projectId: "codeta-admin-stage",
  storageBucket: "codeta-admin-stage.appspot.com",
  messagingSenderId: "232909008343" 
}

export const config = (process.env.REACT_APP_ENV === 'production') ? configProduction : configStaging
//export const config = (process.env.REACT_APP_ENV === 'production') ? configProduction : configProduction
