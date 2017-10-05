import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TabContainer, Tab } from '../../components/TabContainer/TabContainer';
import $ from 'jquery';
import ValicValidationMessage from '../../components/ValicValidationMessage/ValicValidationMessage';
import Loader from '../../components/Loader/Loader';
import { validateFormField } from '../../utility/utility';
import { PersonalInformationContainer } from './PersonalInformationContainer';
import { InvestorProfileContainer } from './InvestorProfileContainer';
import { IncomeSourceContainer } from './IncomeSourceContainer';
import { agileneturl } from '../../constants';
import { AddErrorMessage } from '../../actions/ValidationMessage';
//import {ProspectAPI} from '../api/prospectApi';
//import * as ActionTypes from '../actions/actionTypes';
import * as ProspectAction from '../../actions/prospectAction';
export class ProspectEditContainer extends Component {
    componentDidMount() {
        this.props.componentDidMount();
    }
    componentDidCatch(error, info) {
        //const {dispatch} = this.props;
        //dispatch()
        //console.log('componentcath');
    }
    render() {
        const { formErrors, isLoading } = this.props;
        if (formErrors !== undefined && formErrors !== null) {
            let errors = formErrors.filter(error => error.errorMessage !== '' && error.fieldName === '');
            //console.log(errors);
            if (errors.length > 0) {
                //throw new Error("failed component")
                return (<AppError error={errors[0].errorMessage} />)
                
        }
    }

    return (

        <div>
    {isLoading ? <Loader /> : '' }
                <ValicValidationMessage formErrors={formErrors} className="form-errors" />
                <form style={isLoading ? { opacity: '.6' } : { opacity: '1' }}>
                
                <TabContainer>
                    <Tab name="Personal Information" isDefaultTab>
                        <PersonalInformationContainer />
                    </Tab>
                    <Tab name="Investor Profile">
                        <InvestorProfileContainer />
                    </Tab>
                    <Tab name="Income Source">
                        <IncomeSourceContainer />
                    </Tab>
                </TabContainer>
                <button type="submit" className="btn btn-primary" onClick={(e) => {
                    e.preventDefault();
                    this.props.saveProspect(e);
                }} >Save</button>
                &nbsp;<button type="button" className="btn btn-default" onClick={(e) => {
                    e.preventDefault();
                    this.props.cancelProspect();
                }} >Cancel</button>
            </form>
        </div>
    );
                }
    static propTypes = {
        saveProspect: PropTypes.func.isRequired,
        componentDidMount: PropTypes.func.isRequired,
        formErrors: PropTypes.array.isRequired,
        isLoading: PropTypes.bool.isRequired
    }
}
const mapStateToProps = (state) => ({
    formErrors: state.errors,
    isLoading: state.isLoading
})
const mapDispatchToProps = (dispatch) => ({
    saveProspect: function () {
        let inputs = document.getElementsByTagName('input');
        for (let index = 0; index < inputs.length; ++index) {
            let inputField = inputs[index];
            validateFormField(inputField);

            if (inputField.isValid === false || inputField.isFormatValid === false) {
                dispatch(AddErrorMessage(inputField.name, inputField.errorMessage));
                $(inputField).parent().addClass('has-error has-feedback');
            }
            else {
                dispatch(AddErrorMessage(inputField.name, ''));
                $(inputField).parent().removeClass('has-error has-feedback');
            }

        }
        dispatch(ProspectAction.updateProspectRequest());
        //dispatch(ProspectAPI.updateProspect())
    },
    cancelProspect: function (e) {
        if (window.confirm('Are you sure want to cancel?')) {
            document.location = agileneturl + "Dashboard/Advisor/ClientProspectListing.aspx?agentId=03499";
        }
    },
    componentDidMount: function () {
        //dispatch(ProspectAPI.getStates());        
        //dispatch(ProspectAPI.getProspectInfo(1963));
        dispatch(ProspectAction.loaderBegin());
        dispatch(ProspectAction.setAgentCode( window.__agentCode__));
        dispatch(ProspectAction.fetchStatesRequest());
        dispatch(ProspectAction.fetchProspectRequest(window.__PROSPECTID__));        
       
    }
})
const AppError = (props) => {
    return (<div>
        Something went wrong!!! {props.error}
    </div>);
}
ProspectEditContainer = connect(mapStateToProps, mapDispatchToProps)(ProspectEditContainer);
export default ProspectEditContainer;