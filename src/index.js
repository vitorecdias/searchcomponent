import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './custom.css'

import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'

import promise from 'redux-promise'
import thunk from 'redux-thunk'

import reducers from './main/reducers'

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ 
                    && window.__REDUX_DEVTOOLS_EXTENSION__()

const store = applyMiddleware(promise,thunk)(createStore)(reducers,devTools)

ReactDOM.render(
    <Provider store={store}>              
        <App />       
    </Provider>

, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
