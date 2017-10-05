    import $ from 'jquery';
import { connect } from 'react-redux';
import PersonalInformation from '../../components/Prospect/PersonalInformation';
import {validateFormField} from '../../utility/utility';
import { onInputChange as onChange } from '../../actions/prospectAction';
import { AddErrorMessage } from '../../actions/ValidationMessage';

export const mapDispatchToProps = (dispatch) => ({
    valicInputChange: function (e) {
        const name = e.target.name;
        let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        let inputField = e.target;
        dispatch(onChange(name, value));
        if (inputField.isValid === false || inputField.isFormatValid === false) {
            dispatch(AddErrorMessage(name, inputField.errorMessage));
            $(inputField).parent().addClass('has-error has-feedback');
        }
        else {
            dispatch(AddErrorMessage(name, ''));
            $(inputField).parent().removeClass('has-error has-feedback');
        }
    },
    onChange: function (e) {
        let name = e.target.name;
        let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        let inputField = e.target;
        dispatch(onChange(name, value));
        validateFormField(inputField);

        if (inputField.isValid === false || inputField.isFormatValid === false) {
            dispatch(AddErrorMessage(name, inputField.errorMessage));
            $(inputField).parent().addClass('has-error has-feedback');
        }
        else {
            dispatch(AddErrorMessage(name, ''));
            $(inputField).parent().removeClass('has-error has-feedback');
        }


    }

})
const mapStateToProps = (state) => ({
    ssn: state.ProspectDetail.ssn,
    title: state.ProspectDetail.title,
    firstName: state.ProspectDetail.firstName,
    lastName: state.ProspectDetail.lastName,
    middleInitial: state.ProspectDetail.middleInitial,
    dateOfBirth: state.ProspectDetail.dateOfBirth,
    gender: state.ProspectDetail.gender,
    usCitizen: state.ProspectDetail.usCitizen,
    maritalStatus: state.ProspectDetail.maritalStatus,
    homeAddressLine1: state.ProspectDetail.homeAddressLine1,
    homeAddressLine2: state.ProspectDetail.homeAddressLine2,
    homeAddressLine3: state.ProspectDetail.homeAddressLine3,
    homeAddressCity: state.ProspectDetail.homeAddressCity,
    homeAddressState: state.ProspectDetail.homeAddressState,
    homeAddressZipCode: state.ProspectDetail.homeAddressZipCode,
    mailingAddressLine1: state.ProspectDetail.mailingAddressLine1,
    mailingAddressLine2: state.ProspectDetail.mailingAddressLine2,
    mailingAddressLine3: state.ProspectDetail.mailingAddressLine3,
    mailingAddressCity: state.ProspectDetail.mailingAddressCity,
    mailingAddressState: state.ProspectDetail.mailingAddressState,
    mailingAddressZipCode: state.ProspectDetail.mailingAddressZipCode,
    homePhone: state.ProspectDetail.homePhone,
    workPhone: state.ProspectDetail.workPhone,
    otherPhone: state.ProspectDetail.otherPhone,
    referral: state.ProspectDetail.referral,
    emailAddress: state.ProspectDetail.emailAddress,
    states: state.states
});
export const PersonalInformationContainer = connect(mapStateToProps, mapDispatchToProps)(PersonalInformation);
