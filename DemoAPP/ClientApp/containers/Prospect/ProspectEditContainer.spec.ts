import React from 'react';
import { mount, shallow } from 'enzyme';
import ProspectEditContainer from '../ProspectEditContainer';
import ReactDOM from 'react-dom';
import ProspectDetail  from '../../../reducers/Prospect';
import {ProspectMiddleWare, errorHandler}  from '../../../api/Prospect/prospectApi';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import * as ProspectAction from '../../../actions/prospectAction';
import * as ActionTypes from '../../../constants/actionTypes';

//import configureStore from 'redux-mock-store';

describe('Prospect Container',()=>{
    
    // beforeEach(() => 
    // {
    //     const middlewares = [ProspectMiddleWare]; // add your middlewares like `redux-thunk` 
    //     const mockStore = configureStore(middlewares);    
    // });
    // test.only('Store Validation',(done)=>{
    //     const getState = {}; // initial state of the store 
    //     const action = { type: ActionTypes.GET_STATES_SUCCESS };
    //     const expectedActions = [action];
       
    //     const store = mockStore(getState, expectedActions, done);
    //     store.dispatch(action);

    // });
    test('render without crashing',()=>{
        const div = document.createElement('div');
        console.error = jest.genMockFn();
     
        const store = createStore(ProspectDetail,
            {ProspectDetail: {}, states: [],errors:[{fieldName:'', errorMessage:''}], agentCode:'' },
            applyMiddleware(ProspectMiddleWare));
        expect(store.getState().states.length).toEqual(0);
          window.__agentCode__ = '03499';
          window.__PROSPECTID__ = '1963;
          ReactDOM.render(<Provider store={store}>
            <ProspectEditContainer />
            </Provider>, div)
         const container = mount(<Provider store={store}>
            <ProspectEditContainer />
            </Provider>);
        //container.find("input".get).simulate('click');
        //let element = container.getNode();
        
        //console.log(element)
        
        expect(console.error).toBeCalled();        
        expect(console.error.mock.calls.length).toBeGreaterThan(0);     
        //container.find('type="submit"').simulate('click');
        const form = container.find('form').at(0);
        const children = form.render().children().children();
        form.simulate('submit', { target: { children } });
        //console.log(container.instance().getState..props['lastName'])
        //form.simulate('su')
        console.log(container.instance().context.children)
        //console.log(container.find('name="lastName"').get(0).value)

        //expect(container.prop('states').length).toBeGreaterThan(0);
        //store.dispatch(ProspectAction.fetchStatesRequest());
        //expect(store.getState().states.length).toBeGreaterThan(0);
        //mount()

    })
})