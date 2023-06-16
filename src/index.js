import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Context, { firebaseContext } from './store/FirebaseContext';
import {} from './store/FirebaseContext'
import {db,auth,storage} from './firebase/Config'
ReactDOM.render(

    <firebaseContext.Provider value={{db,auth,storage}}>
        <Context>
        <App />
        </Context>
        
    </firebaseContext.Provider>
, document.getElementById('root'));
