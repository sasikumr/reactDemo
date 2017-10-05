import * as ProspectActionTypes from '../constants/actionTypes';
import { combineReducers } from 'redux';
import { ValidationErrorMessage } from './ValidationMessage';

export const GetStates = (state = [], action) => {
    switch (action.type) {
        case ProspectActionTypes.GET_STATES_SUCCESS:
            return Object.assign([], state, action.states);
        default:
            return state;
    }
}

export const Prospect = (state = {}, action) => {
    switch (action.type) {
        case ProspectActionTypes.ON_INPUT_CHANGE:
            return Object.assign({}, state, { [action.name]: action.value });
        case ProspectActionTypes.GET_PROSPECT_SUCCESS:
            return Object.assign({}, action.prospect);
        case ProspectActionTypes.GET_PROSPECT_FAILED:
            return Object.assign({}, null);
        default:
            return state;
    }
}

export const Loader = (state = false, action) => {
    switch (action.type) {
        case ProspectActionTypes.LOADER_BEGIN:
            return true;
        case ProspectActionTypes.LOADER_COMPLETE:
            return false;
        default:
            return state;
    }
}

export const agentCode = (state = "", action) => {
    switch (action.type) {
        case ProspectActionTypes.SET_AGENTCODE:
            return action.agentCode;
        default:
            return state;
    }
}

const ProspectDetail = combineReducers({
    ProspectDetail: Prospect,
    isLoading: Loader,
    states: GetStates,
    errors: ValidationErrorMessage,
    agentCode
})



export default ProspectDetail;