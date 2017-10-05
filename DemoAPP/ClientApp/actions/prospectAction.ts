import * as ProspectActionType from '../constants/actionTypes';

export const fetchProspectRequest =  (id:any) => ({
    type: ProspectActionType.GET_PROSPECT_REQUEST,
    id
})
/*
export const fetchProspectSuccess =  () => ({
    type: ProspectActionType.GET_PROSPECT_REQUEST
    
})
*/

export const fetchProspectFailed =  () => ({
    type: ProspectActionType.GET_PROSPECT_FAILED    
})

export const fetchProspectSuccess = (prospect:any) => ({
    type: ProspectActionType.GET_PROSPECT_SUCCESS,
    prospect
})
export const fetchStatesRequest = () => ({
    type: ProspectActionType.GET_STATES_REQUEST    
})

export const fetchStatesFailed = () => ({
    type: ProspectActionType.GET_STATES_FAILED    
})
interface State{
Code:string;
}

export const fetchStatesSuccess = (states:State) => ({
    type: ProspectActionType.GET_STATES_SUCCESS,
    states
})
export const updateProspectRequest = () =>({
    type: ProspectActionType.UPDATE_PROSPECT_REQUEST
})
export const onInputChange = (name:string,value:string) => ({
    type: ProspectActionType.ON_INPUT_CHANGE,
    name,
    value
})

export const loaderBegin= () =>({
    type: ProspectActionType.LOADER_BEGIN
})

export const setAgentCode = (agentCode:string) => ({
    type: ProspectActionType.SET_AGENTCODE,
    agentCode
})

export const loaderComplete = () => ({
    type: ProspectActionType.LOADER_COMPLETE
})
