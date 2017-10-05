import React from 'react';
import {Loader, GetStates} from '../../reducers/Prospect';
import * as ActionTypes from '../../constants/actionTypes';

describe('Reducers/Propsect/Loader',() =>{
    test('Verify Loader Reducers', () => {
        expect(Loader(undefined, {})).toEqual(false)
    });
    test('Verify Loader Reducers on begin', () => {
        expect(Loader(false,{ type: ActionTypes.LOADER_BEGIN})).toEqual(true)
    });
    test('Verify Loader Reducers on complete', () => {
        expect(Loader(false,{ type: ActionTypes.LOADER_COMPLETE})).toEqual(false)
    });
});

describe('Reducers/Propsect/State',() =>{
    test('Verify GetState Reducers', () => {
        expect(GetStates(undefined, {})).toEqual([])
    });    
    it('Verify GetState Reducers with value', () => {
        let state = [];        
        state.push({"Code":'AL'});
        state.push({"Code":'AW'});        
        expect(GetStates(undefined, {
            type: ActionTypes.GET_STATES_SUCCESS, states:Object.assign({},state)
        })).toEqual(state)
    });  
});