import * as ProspectActionTypes from '../constants/actionTypes';
export const ValidationErrorMessage = (state = [], action) => {
    switch (action.type) {       
        
        case ProspectActionTypes.ADD_VALIDATION_ERROR_MESSAGE:
            if (state !== null && state !== undefined) {
                let isExist = false;
                let newobj = state.map(error => {
                    if (error.fieldName === action.fieldName) {
                        isExist = true;
                       return Object.assign({},error,{ errorMessage: action.errorMessage} );
                    }
                    else {
                        return error;
                    }
                });
                if (!isExist) {
                    return [
                        ...state,
                        {
                            fieldName: action.fieldName,
                          errorMessage: action.errorMessage                          
                        }]
                }
                else {
                    return newobj;
                }
            }
            else {
                return [
                    ...state,
                    {
                        fieldName: action.fieldName,
                      errorMessage: action.errorMessage                          
                    }]
            }        
        default:
            return state;
    }
}