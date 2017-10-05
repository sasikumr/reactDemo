import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import ProspectEditContainer from './containers/Prospect/ProspectEditContainer';
//import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ProspectDetail  from './reducers/Prospect';
import {ProspectMiddleWare, errorHandler}  from './api/Prospect/prospectApi';
const loggerMiddleware = createLogger();

//const store = createStore(ProspectDetail,
//  {ProspectDetail: {}, states: [],errors:[{fieldName:'', errorMessage:''}] },
//  composeWithDevTools(applyMiddleware(thunkMiddleware, loggerMiddleware)));

const store = createStore(ProspectDetail,
  {ProspectDetail: {gender: 0}, states: [],errors:[{fieldName:'', errorMessage:''}], agentCode:'03499' },
  composeWithDevTools(applyMiddleware(errorHandler,ProspectMiddleWare)));

ReactDOM.render(<Provider store={store}>
  <ProspectEditContainer />
  </Provider>
, document.getElementById('react-app'));
registerServiceWorker();
