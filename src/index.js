import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import firebaseHander from './lib/firebaseHandler'



//const store = configureStore({});

//const store = configureStore();


firebaseHander.init({}, true)

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
