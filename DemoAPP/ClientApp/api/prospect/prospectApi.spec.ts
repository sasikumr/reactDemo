import {ProspectMiddleWare, errorHandler}  from '../prospectApi';
import thunkMiddleware from 'redux-thunk';
import * as ProspectAction from '../../../actions/prospectAction';
import * as ActionTypes from '../../../constants/actionTypes';

const create = () => {
    const store = {
      getState: jest.fn(() => ({})),
      dispatch: jest.fn(),
    };
    const next = jest.fn();
    const invoke = (action) => ProspectMiddleWare(store)(next)(action)
    return {store, next, invoke}
  };

  it.only('passes through non-function action', () => {
    const { next, invoke } = create()
    const action = {type:ActionTypes.GET_STATES_REQUEST}
    const loaderAction ={type:ActionTypes.LOADER_BEGIN}
    const expectActin = {type:ActionTypes.GET_STATES_SUCCESS}

    invoke(action);
    
    expect(next).toHaveBeenCalledWith(loaderAction);
   
  })
  
  