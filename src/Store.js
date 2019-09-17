import { createStore, combineReducers, compose} from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer} from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';

//Reducers
import notifyReducer from './reducers/notifyReducer';
import settingsReducer from './reducers/settingsReducer';

  const firebaseConfig = {
    apiKey: "AIzaSyDJwwwtBgfOR3fsnkC5zUnbI6vsyH0e2Bo",
    authDomain: "reactbankapp.firebaseapp.com",
    databaseURL: "https://reactbankapp.firebaseio.com",
    projectId: "reactbankapp",
    storageBucket: "reactbankapp.appspot.com",
    messagingSenderId: "573202721509",
    appId: "1:573202721509:web:47e9dcd8c947d6da"
  };

  //react-redux-firebase config
  const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
  };

  //Init firebase instance
  firebase.initializeApp(firebaseConfig);

  //Init firestore
  const firestore = firebase.firestore();
  const settings = {timestampsInSnapshots: true};
  firestore.settings(settings);
  

  // Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase) 
)(createStore);

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  notify: notifyReducer,
  settings: settingsReducer
});

//check for setting in localstorage
if(localStorage.getItem('settings') == null){
  //default Setting
const defaultSetting = {
  disableBalanceOnAdd: true,
  disableBalanceOnEdit: false,
  allowRegistration: false
}
//set to localStorage
localStorage.setItem('settings',JSON.stringify(defaultSetting))
}


//create initial state
const initialState = {settings : JSON.parse(localStorage.getItem('settings'))};

//create store

const store = createStoreWithFirebase(rootReducer, initialState, compose(reactReduxFirebase(firebase),
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;