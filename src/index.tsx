import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import './assets/styles/main.scss';
import rootReducer from 'redux/reducers';
import thunk from 'redux-thunk';
import { App } from 'common';

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let mwModules = [thunk];

const { createLogger } = require('redux-logger');
const logger = createLogger({
  collapsed: true,
  duration: true,
  timestamp: false,
  diff: true,
});

mwModules = [...mwModules, logger];

const middleware = applyMiddleware(...mwModules);

const store = createStore(rootReducer, reduxDevTools(middleware));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root') as HTMLElement,
);

export type RootReducer = ReturnType<typeof rootReducer>;
