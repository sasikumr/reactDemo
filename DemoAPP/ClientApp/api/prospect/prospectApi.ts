import * as ProspectAction from '../../actions/prospectAction';
import ApiUrl from '../apiUrl';
import fetch from 'isomorphic-fetch';
import { agileneturl } from '../../constants';
import * as ValidationMessage from '../../actions/ValidationMessage';
import * as ActionTypes from '../../constants/actionTypes';
//import errorhandler from 'errorhandler';
//import connect from 'connect';

const advisorUrl = ApiUrl.advisorUrl;
const participantUrl = ApiUrl.participantUrl;

export const ProspectMiddleWare = (store:any) => next => action => {
    switch (action.type) {
        case ActionTypes.GET_PROSPECT_REQUEST:
            next(ProspectAction.loaderBegin());
            return fetch(`${participantUrl}prospect/${action.id}`, {
                method: 'GET'
            })
                .then(response => response.json())
                .then(data => {
                    //console.log(data);
                    let prospect = {};
                    if (data !== undefined && data !== null) {
                        prospect.firstName = data.FirstName;
                        prospect.lastName = data.LastName;
                        prospect.ssn = data.Ssn;
                        prospect.isNew = true;
                        prospect.clientProspectId = data.Id;
                        if (data.Id > 0) {
                            prospect.isNew = false;
                        }
                        else {
                            prospect.isNew = true;
                        }
                        let homeAddressStreet1, homeAddressStreet2, homeAddressStreet3, homeAddressZipCode, homeAddressState, homeAddressCity;
                        let mailingAddressStreet1, mailingAddressStreet2, mailingAddressStreet3, mailingAddressZipCode, mailingAddressState, mailingAddressCity;
                        if (data.Addresses !== undefined && data.Addresses !== null) {
                            data.Addresses["$values"].forEach(function (address) {
                                //data.Addresses.forEach(function (address) {
                                if (address.AddressType === 0) {
                                    homeAddressStreet1 = address.Street1;
                                    homeAddressStreet2 = address.Street2;
                                    homeAddressStreet3 = address.Street3;
                                    homeAddressState = address.State;
                                    homeAddressCity = address.City;
                                    //homeAddressCountry = address.Country;
                                    homeAddressZipCode = address.Zip;
                                }
                                else if (address.AddressType === 2) {
                                    mailingAddressStreet1 = address.Street1;
                                    mailingAddressStreet2 = address.Street2;
                                    mailingAddressStreet3 = address.Street3;
                                    mailingAddressState = address.State;
                                    mailingAddressCity = address.City;
                                    //mailingAddressCountry = address.Country;
                                    mailingAddressZipCode = address.Zip;
                                }
                            });
                        }


                        let homePhoneNumber; let workPhoneNumber; let otherPhoneNumber;
                        if (data.PhoneNumbers !== null && data.PhoneNumbers !== undefined) {
                            data.PhoneNumbers["$values"].forEach(function (phone) {
                                //data.PhoneNumbers.forEach((phone) => {
                                if (phone.PhoneType === 0) {
                                    homePhoneNumber = phone.Number;
                                }
                                else if (phone.PhoneType === 1) {
                                    workPhoneNumber = phone.Number;
                                }
                                else if (phone.PhoneType === 5) {
                                    otherPhoneNumber = phone.Number;
                                }

                            });
                        }

                        let isReferral = false;
                        if (data.ReferralDate !== null && data.ReferralDate !== undefined && new Date(data.ReferralDate.toString()).getFullYear() > 1900) {
                            isReferral = true;
                        }
                        prospect.title = data.Title;
                        prospect.middleInitial = data.MiddleInitial !== null ? data.MiddleInitial : '';
                        prospect.dateOfBirth = data.DateOfBirth !== null && data.DateOfBirth !== undefined ? new Date(data.DateOfBirth.toString()).toISOString().substr(0, 10) : '';
                        prospect.gender = data.Gender !== null && data.Gender !== undefined ? data.Gender.toString() : '';
                        prospect.usCitizen = data.UsCitizenFlag !== null && data.UsCitizenFlag !== undefined ? data.UsCitizenFlag.toString() : '';
                        prospect.maritalStatus = data.MaritalStatus !== null && data.MaritalStatus !== undefined ? data.MaritalStatus.toString() : '';
                        prospect.homeAddressLine1 = homeAddressStreet1;
                        prospect.homeAddressLine2 = homeAddressStreet2;
                        prospect.homeAddressLine3 = homeAddressStreet3;
                        prospect.homeAddressCity = homeAddressCity;
                        prospect.homeAddressState = homeAddressState;
                        prospect.homeAddressZipCode = homeAddressZipCode;
                        prospect.mailingAddressLine1 = mailingAddressStreet1;
                        prospect.mailingAddressLine2 = mailingAddressStreet2;
                        prospect.mailingAddressLine3 = mailingAddressStreet3;
                        prospect.mailingAddressCity = mailingAddressCity;
                        prospect.mailingAddressState = mailingAddressState;
                        prospect.mailingAddressZipCode = mailingAddressZipCode;
                        prospect.homePhone = homePhoneNumber;
                        prospect.workPhone = workPhoneNumber;
                        prospect.otherPhone = otherPhoneNumber;
                        prospect.referral = isReferral;
                        prospect.emailAddress = data.Email;
                        if (data.ProspectInvestorProfile !== null && data.ProspectInvestorProfile !== undefined) {
                            prospect.previousFunds = data.ProspectInvestorProfile.InvestmentExperience_Flag !== undefined && data.ProspectInvestorProfile.InvestmentExperience_Flag !== null ? data.ProspectInvestorProfile.InvestmentExperience_Flag.toString() : '';
                            prospect.FINRA = data.ProspectInvestorProfile.Finra_Flag !== undefined && data.ProspectInvestorProfile.Finra_Flag !== null ? data.ProspectInvestorProfile.Finra_Flag.toString() : '';
                            prospect.investmentObjective = data.ProspectInvestorProfile.InvestmentObjective;
                            prospect.riskProfile = data.ProspectInvestorProfile.RiskProfile;
                            prospect.annualHouseholdIncomeRange = data.ProspectInvestorProfile.HouseholdIncomeRange;
                            prospect.netWorthRange = data.ProspectInvestorProfile.NetWorthRange;
                            prospect.lifeInsuranceRange = data.ProspectInvestorProfile.LifeInsuranceRange;
                            prospect.taxBracket = data.ProspectInvestorProfile.TaxBracketNumber;
                            prospect.dependentsNo = data.ProspectInvestorProfile.DepedentNumber;
                            prospect.ages = data.ProspectInvestorProfile.Ages;
                            prospect.currentEmployer = data.ProspectInvestorProfile.CurrentEmployer;
                            prospect.employmentStatus = data.ProspectInvestorProfile.EmploymentStatus;
                            prospect.occupation = data.ProspectInvestorProfile.Occupation;
                            prospect.employerAddress = data.ProspectInvestorProfile.EmployerAddress;
                            prospect.employerCity = data.ProspectInvestorProfile.EmployerCity;
                            prospect.employerState = data.ProspectInvestorProfile.EmployerState;
                            prospect.employerZipCode = data.ProspectInvestorProfile.EmployerZipCode;
                            prospect.employerSalary = data.ProspectInvestorProfile.Salary;
                            prospect.hireDate = data.ProspectInvestorProfile.HireDate !== null && data.ProspectInvestorProfile.HireDate !== undefined ? new Date(data.ProspectInvestorProfile.HireDate.toString()).toISOString().substr(0, 10) : '';
                            prospect.expectedAnnuityDate = data.ProspectInvestorProfile.ExpectedAnnuityDate !== null && data.ProspectInvestorProfile.ExpectedAnnuityDate !== undefined ? new Date(data.ProspectInvestorProfile.ExpectedAnnuityDate.toString()).toISOString().substr(0, 10) : '';
                            prospect.isInvestorProfileNew = false;
                        }
                        else {
                            prospect.isInvestorProfileNew = true;
                        }
                        if (data.ProspectIncomeSource !== undefined && data.ProspectIncomeSource !== null) {
                            prospect.incomeAccountSalary = data.ProspectIncomeSource.Salary;
                            prospect.socialSecurity = data.ProspectIncomeSource.SocialSecurity;
                            prospect.pensionBenefits = data.ProspectIncomeSource.PensionBenefits;
                            prospect.investmentIncome = data.ProspectIncomeSource.InvestmentIncome;
                            prospect.rmd = data.ProspectIncomeSource.RMD;
                            prospect.other = data.ProspectIncomeSource.Other;
                            prospect.expensesAmount = data.ProspectIncomeSource.ExpensesAmount;
                            prospect.isIncomeSourceNew = false;
                        }
                        else {
                            prospect.isIncomeSourceNew = true;
                        }
                    }
                    else {
                        prospect.isNew = true;
                    }
                    next(ProspectAction.fetchProspectSuccess(prospect))
                    next(ProspectAction.loaderComplete());
                    //return Promise.resolve();
                })
                .catch(error => {
                    next(ValidationMessage.AddErrorMessage('', "Unable to get prospect"));
                    next(ProspectAction.fetchProspectFailed());
                    next(ProspectAction.loaderComplete());
                    //console.log(error);
                    //return Promise.resolve();
                });
            break;
        case ActionTypes.GET_STATES_REQUEST:
            next(ProspectAction.loaderBegin());
            return fetch(`${advisorUrl}advisor/states`)
                .then(response => response.json())
                .then(json => {
                    next(ProspectAction.fetchStatesSuccess(json["$values"]))
                    next(ProspectAction.loaderComplete());

                })
                .catch(error => {
                    console.log('request states failed', error);
                    next(ProspectAction.loaderComplete());
                    next(ValidationMessage.AddErrorMessage('', "Unable to get states"));
                    next(ProspectAction.fetchStatesFailed());
                    //throw error;
                    //return error;
                });
            break;
        case ActionTypes.UPDATE_PROSPECT_REQUEST:
            let state = store.getState();
            let prospect = state.ProspectDetail;
            next(ProspectAction.loaderBegin());
            let validForm = true;

            state.errors.forEach(function (error, index) {
                if (error.errorMessage !== "") {
                    validForm = false;
                }
            });
            console.log(validForm);
            if (validForm !== false) {
                var plainSSN = prospect.ssn;
                console.log(plainSSN);
                plainSSN = plainSSN.split('-').join('').split('_').join('');

                var referral;
                if (prospect.referral === true) {
                    referral = new Date().toUTCString();
                }
                var homeAddress = {};
                homeAddress.Street1 = prospect.homeAddressLine1;
                homeAddress.Street2 = prospect.homeAddressLine2;
                homeAddress.Street3 = prospect.homeAddressLine3;
                homeAddress.City = prospect.homeAddressCity;
                homeAddress.State = prospect.homeAddressState;
                homeAddress.Zip = prospect.homeAddressZipCode;
                homeAddress.AddressType = 0;
                var address = [];
                address.push(homeAddress);
                var mailingAddress = {};
                mailingAddress.Street1 = prospect.mailingAddressLine1;
                mailingAddress.Street2 = prospect.mailingAddressLine2;
                mailingAddress.Street3 = prospect.mailingAddressLine3;
                mailingAddress.City = prospect.mailingAddressCity;
                mailingAddress.State = prospect.mailingAddressState;
                mailingAddress.Zip = prospect.mailingAddressZipCode;
                mailingAddress.AddressType = 2;
                address.push(mailingAddress);

                var phoneNumbers = [];
                var homePhone = {};
                homePhone.Number = prospect.homePhone !== undefined ? prospect.homePhone.split('-').join('').split('(').join('').split(')').join('').split('_').join('') : '';
                homePhone.PhoneType = 0;
                phoneNumbers.push(homePhone);

                var workPhone = {};
                workPhone.Number = prospect.workPhone !== undefined ? prospect.workPhone.split('-').join('').split('(').join('').split(')').join('').split('_').join('') : '';
                workPhone.PhoneType = 1;
                phoneNumbers.push(workPhone);

                var otherPhone = {};
                otherPhone.Number = prospect.otherPhone !== undefined ? prospect.otherPhone.split('-').join('').split('(').join('').split(')').join('').split('_').join('') : '';
                otherPhone.PhoneType = 5;
                phoneNumbers.push(otherPhone);

                var incomeSource = {};
                incomeSource.SocialSecurity = prospect.socialSecurity;
                incomeSource.Salary = prospect.incomeAccountSalary;
                incomeSource.PensionBenefits = prospect.pensionBenefits;
                incomeSource.InvestmentIncome = prospect.investmentIncome;
                incomeSource.RMD = prospect.rmd;
                incomeSource.Other = prospect.other;
                incomeSource.ExpensesAmount = prospect.expensesAmount;
                incomeSource.ClientProspectId = prospect.clientProspectId;

                var investorProfile = {};
                investorProfile.InvestmentExperience_Flag = prospect.previousFunds;
                investorProfile.Finra_Flag = prospect.FINRA;
                investorProfile.InvestmentObjective = prospect.investmentObjective;
                investorProfile.RiskProfile = prospect.riskProfile;
                investorProfile.HouseholdIncomeRange = prospect.annualHouseholdIncomeRange;
                investorProfile.NetWorthRange = prospect.netWorthRange;
                investorProfile.LifeInsuranceRange = prospect.lifeInsuranceRange;
                investorProfile.TaxBracketNumber = prospect.taxBracket;
                investorProfile.DepedentNumber = prospect.dependentsNo;
                investorProfile.Ages = prospect.ages;
                investorProfile.CurrentEmployer = prospect.currentEmployer;
                investorProfile.EmploymentStatus = prospect.employmentStatus;
                investorProfile.Occupation = prospect.occupation;
                investorProfile.EmployerAddress = prospect.employerAddress;
                investorProfile.EmployerCity = prospect.employerCity;
                investorProfile.EmployerState = prospect.employerState;
                investorProfile.EmployerZipCode = prospect.employerZipCode;
                investorProfile.HireDate = prospect.hireDate;
                investorProfile.ExpectedAnnuityDate = prospect.expectedAnnuityDate;
                investorProfile.Salary = prospect.employerSalary;
                investorProfile.ClientId = prospect.clientProspectId;

                var prospectData = {
                    Id: prospect.clientProspectId, FirstName: prospect.firstName, Title: prospect.title, MiddleInitial: prospect.middleInitial,
                    LastName: prospect.lastName, Ssn: plainSSN, DateOfBirth: prospect.dateOfBirth, MaritalStatus: prospect.maritalStatus, ReferralDate: referral, Addresses: address,
                    PhoneNumbers: phoneNumbers, Gender: prospect.gender, Email: prospect.emailAddress, ProspectIncomeSource: incomeSource,
                    ProspectInvestorProfile: investorProfile, UsCitizenFlag: prospect.usCitizen
                };


                return fetch(`${participantUrl}prospect/update`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(prospectData)
                })
                    .then(response => {
                        next(ProspectAction.loaderComplete());
                        if (response.status >= 200 && response.status < 300) {
                            window.location = agileneturl + "/Dashboard/Advisor/ClientProspectListing.aspx?agentId=03499";
                        } else {
                            const error = new Error(response.statusText);
                            error.response = response;
                            throw error;
                        }
                    })
                    .catch(error => {
                        next(ValidationMessage.AddErrorMessage('', "Unable to update prospect"));
                        next(ProspectAction.loaderComplete());
                    })
            }
            else {
                next(ProspectAction.loaderComplete());
                next(ValidationMessage.AddErrorMessage('', "Unable to update prospect"));
            }
            break;
        default:
            //console.log(action);
            next(action);
            break;
    }
};

// class ProspectAPI {
//     static updateProspect() {
//         return (dispatch, getState) => {
//             let state = getState();
//         }
//     }
// }
//export default ProspectAPI;  

/*
const app = connect();
app.use(function(err, req, res, next) {
  if (app.get('env') === 'development1') {
    return errorhandler(err, req, res, next);
  } else {
    res.sendStatus(401);
  }
});*/

export const errorHandler = state => next => action => {
    try {

        next(action);
    }
    catch (err) {
        console.log("error caught");
    }
}
/*
export function errorHandler(error, getState, lastAction, dispatch) {
   console.log('reer');
    console.error(error);
    //console.debug('current state', getState());
    console.debug('last action was', lastAction);
    // optionally dispatch an action due to the error using the dispatch parameter
  }
*/

/*  
export class ProspectAPI {
    static getProspectInfo(id) {
        return dispatch => {
            dispatch(ProspectAction.loaderBegin());
            return fetch(`${participantUrl}prospect/${id}`, {
                method: 'GET'
            })
                .then(response => response.json())
                .then(data => {
                    //console.log(data);
                    let prospect = {};
                    if(data!== null && data !== undefined){
                        prospect.firstName = data.FirstName;
                        prospect.lastName = data.LastName;
                        prospect.ssn = data.Ssn;
                        prospect.isNew = true;
                        prospect.clientProspectId = data.Id;
                        if (data.Id > 0) {
                            prospect.isNew = false;
                        }
                        let homeAddressStreet1, homeAddressStreet2, homeAddressStreet3, homeAddressZipCode, homeAddressState, homeAddressCity;
                        let mailingAddressStreet1, mailingAddressStreet2, mailingAddressStreet3, mailingAddressZipCode, mailingAddressState, mailingAddressCity;
                        if (data.Addresses !== undefined && data.Addresses !== null) {                        
                            data.Addresses["$values"].forEach(function (address) {
                                //data.Addresses.forEach(function (address) {
                                if (address.AddressType === 0) {
                                    homeAddressStreet1 = address.Street1;
                                    homeAddressStreet2 = address.Street2;
                                    homeAddressStreet3 = address.Street3;
                                    homeAddressState = address.State;
                                    homeAddressCity = address.City;
                                    //homeAddressCountry = address.Country;
                                    homeAddressZipCode = address.Zip;
                                }
                                else if (address.AddressType === 2) {
                                    mailingAddressStreet1 = address.Street1;
                                    mailingAddressStreet2 = address.Street2;
                                    mailingAddressStreet3 = address.Street3;
                                    mailingAddressState = address.State;
                                    mailingAddressCity = address.City;
                                    //mailingAddressCountry = address.Country;
                                    mailingAddressZipCode = address.Zip;
                                }
                            });
                        }


                        let homePhoneNumber; let workPhoneNumber; let otherPhoneNumber;
                        if (data.PhoneNumbers !== null && data.PhoneNumbers !== undefined) {
                            data.PhoneNumbers["$values"].forEach(function (phone) {
                                //data.PhoneNumbers.forEach((phone) => {
                                if (phone.PhoneType === 0) {
                                    homePhoneNumber = phone.Number;
                                }
                                else if (phone.PhoneType === 1) {
                                    workPhoneNumber = phone.Number;
                                }
                                else if (phone.PhoneType === 5) {
                                    otherPhoneNumber = phone.Number;
                                }

                            });
                        }

                        let isReferral = false;
                        if (data.ReferralDate !== null && data.ReferralDate !== undefined && new Date(data.ReferralDate.toString()).getFullYear() > 1900) {
                            isReferral = true;
                        }
                        prospect.title = data.Title;
                        prospect.middleInitial = data.MiddleInitial !== null ? data.MiddleInitial : '';
                        prospect.dateOfBirth = data.DateOfBirth !== null && data.DateOfBirth !== undefined ? new Date(data.DateOfBirth.toString()).toISOString().substr(0, 10) : '';
                        prospect.gender = data.Gender !== null && data.Gender !== undefined ? data.Gender.toString() : '';
                        prospect.usCitizen = data.UsCitizenFlag !== null && data.UsCitizenFlag !== undefined ? data.UsCitizenFlag.toString() : '';
                        prospect.maritalStatus = data.MaritalStatus !== null && data.MaritalStatus !== undefined ? data.MaritalStatus.toString() : '';
                        prospect.homeAddressLine1 = homeAddressStreet1;
                        prospect.homeAddressLine2 = homeAddressStreet2;
                        prospect.homeAddressLine3 = homeAddressStreet3;
                        prospect.homeAddressCity = homeAddressCity;
                        prospect.homeAddressState = homeAddressState;
                        prospect.homeAddressZipCode = homeAddressZipCode;
                        prospect.mailingAddressLine1 = mailingAddressStreet1;
                        prospect.mailingAddressLine2 = mailingAddressStreet2;
                        prospect.mailingAddressLine3 = mailingAddressStreet3;
                        prospect.mailingAddressCity = mailingAddressCity;
                        prospect.mailingAddressState = mailingAddressState;
                        prospect.mailingAddressZipCode = mailingAddressZipCode;
                        prospect.homePhone = homePhoneNumber;
                        prospect.workPhone = workPhoneNumber;
                        prospect.otherPhone = otherPhoneNumber;
                        prospect.referral = isReferral;
                        prospect.emailAddress = data.Email;
                        if(data.ProspectInvestorProfile !== null && data.ProspectInvestorProfile !== undefined){
                            prospect.previousFunds = data.ProspectInvestorProfile.InvestmentExperience_Flag !== undefined && data.ProspectInvestorProfile.InvestmentExperience_Flag !== null ? data.ProspectInvestorProfile.InvestmentExperience_Flag.toString() : '';
                            prospect.FINRA = data.ProspectInvestorProfile.Finra_Flag !== undefined && data.ProspectInvestorProfile.Finra_Flag !== null ? data.ProspectInvestorProfile.Finra_Flag.toString() : '';
                            prospect.investmentObjective = data.ProspectInvestorProfile.InvestmentObjective;
                            prospect.riskProfile = data.ProspectInvestorProfile.RiskProfile;
                            prospect.annualHouseholdIncomeRange = data.ProspectInvestorProfile.HouseholdIncomeRange;
                            prospect.netWorthRange = data.ProspectInvestorProfile.NetWorthRange;
                            prospect.lifeInsuranceRange = data.ProspectInvestorProfile.LifeInsuranceRange;
                            prospect.taxBracket = data.ProspectInvestorProfile.TaxBracketNumber;
                            prospect.dependentsNo = data.ProspectInvestorProfile.DepedentNumber;
                            prospect.ages = data.ProspectInvestorProfile.Ages;
                            prospect.currentEmployer = data.ProspectInvestorProfile.CurrentEmployer;
                            prospect.employmentStatus = data.ProspectInvestorProfile.EmploymentStatus;
                            prospect.occupation = data.ProspectInvestorProfile.Occupation;
                            prospect.employerAddress = data.ProspectInvestorProfile.EmployerAddress;
                            prospect.employerCity = data.ProspectInvestorProfile.EmployerCity;
                            prospect.employerState = data.ProspectInvestorProfile.EmployerState;
                            prospect.employerZipCode = data.ProspectInvestorProfile.EmployerZipCode;
                            prospect.employerSalary = data.ProspectInvestorProfile.Salary;
                            prospect.hireDate = data.ProspectInvestorProfile.HireDate !== null && data.ProspectInvestorProfile.HireDate !== undefined ? new Date(data.ProspectInvestorProfile.HireDate.toString()).toISOString().substr(0, 10) : '';
                            prospect.expectedAnnuityDate = data.ProspectInvestorProfile.ExpectedAnnuityDate !== null && data.ProspectInvestorProfile.ExpectedAnnuityDate !== undefined ? new Date(data.ProspectInvestorProfile.ExpectedAnnuityDate.toString()).toISOString().substr(0, 10) : '';
                            prospect.isInvestorProfileNew = false;
                        }
                        else{
                            prospect.isInvestorProfileNew = true;
                        }
                        if(data.ProspectIncomeSource !== null && data.ProspectIncomeSource !== undefined){
                            prospect.incomeAccountSalary = data.ProspectIncomeSource.Salary;
                            prospect.socialSecurity = data.ProspectIncomeSource.SocialSecurity;
                            prospect.pensionBenefits = data.ProspectIncomeSource.PensionBenefits;
                            prospect.investmentIncome = data.ProspectIncomeSource.InvestmentIncome;
                            prospect.rmd = data.ProspectIncomeSource.RMD;
                            prospect.other = data.ProspectIncomeSource.Other;
                            prospect.expensesAmount = data.ProspectIncomeSource.ExpensesAmount;
                            prospect.isIncomeSourceNew = false;
                        }
                        else{
                            prospect.isIncomeSourceNew = true;
                        }
                        prospect.isNew = false;
                    }
                    else{
                        prospect.isNew = true;
                    }
                    //dispatch(ProspectAction.getProspectSuccess(prospect))
                    dispatch(ProspectAction.fetchProspectSuccess(prospect));
                    dispatch(ProspectAction.loaderComplete());
                })
                .catch(error => { console.log('request prospect failed', error); dispatch(ProspectAction.loaderComplete());
            dispatch(ProspectAction.fetchProspectFailed());
            })
        }
    }
    static getStates() {
        return dispatch => {
            dispatch(ProspectAction.loaderBegin());
            return fetch(`${advisorUrl}advisor/states`)
                .then(response => response.json())
                .then(json => {
                    dispatch(ProspectAction.fetchStatesSuccess(json["$values"]))
                    dispatch(ProspectAction.loaderComplete());
                    //throw new Error('safsd')
                })
                .catch(error => { console.log('request states failed', error);
                 dispatch(ProspectAction.loaderComplete()); 
                 //throw new Error('ss'); 
            })
        }
    }
    static updateProspect() {
        return (dispatch, getState) => {
            let state = getState();
            let prospect = state.ProspectDetail;
            dispatch(ProspectAction.loaderBegin());
            //console.log(state);
            let validForm = true;
            //console.log(state.errors[0].errorMessage) ;
            state.errors.forEach(function (error, index) {
                if (error.errorMessage !== "") {
                    validForm = false;
                }
            });
            console.log(validForm);
            if (validForm !== false) {
                var plainSSN = prospect.ssn;
                console.log(plainSSN);
                plainSSN = plainSSN.split('-').join('').split('_').join('');

                var referral;
                if (prospect.referral === true) {
                    referral = new Date().toUTCString();
                }
                var homeAddress = {};
                homeAddress.Street1 = prospect.homeAddressLine1;
                homeAddress.Street2 = prospect.homeAddressLine2;
                homeAddress.Street3 = prospect.homeAddressLine3;
                homeAddress.City = prospect.homeAddressCity;
                homeAddress.State = prospect.homeAddressState;
                homeAddress.Zip = prospect.homeAddressZipCode;
                homeAddress.AddressType = 0;
                var address = [];
                address.push(homeAddress);
                var mailingAddress = {};
                mailingAddress.Street1 = prospect.mailingAddressLine1;
                mailingAddress.Street2 = prospect.mailingAddressLine2;
                mailingAddress.Street3 = prospect.mailingAddressLine3;
                mailingAddress.City = prospect.mailingAddressCity;
                mailingAddress.State = prospect.mailingAddressState;
                mailingAddress.Zip = prospect.mailingAddressZipCode;
                mailingAddress.AddressType = 2;
                address.push(mailingAddress);

                var phoneNumbers = [];
                var homePhone = {};
                homePhone.Number = prospect.homePhone !== undefined ? prospect.homePhone.split('-').join('').split('(').join('').split(')').join('').split('_').join('') : '';
                homePhone.PhoneType = 0;
                phoneNumbers.push(homePhone);

                var workPhone = {};
                workPhone.Number = prospect.workPhone !== undefined ? prospect.workPhone.split('-').join('').split('(').join('').split(')').join('').split('_').join('') : '';
                workPhone.PhoneType = 1;
                phoneNumbers.push(workPhone);

                var otherPhone = {};
                otherPhone.Number = prospect.otherPhone !== undefined ? prospect.otherPhone.split('-').join('').split('(').join('').split(')').join('').split('_').join('') : '';
                otherPhone.PhoneType = 5;
                phoneNumbers.push(otherPhone);

                var incomeSource = {};
                incomeSource.SocialSecurity = prospect.socialSecurity;
                incomeSource.Salary = prospect.incomeAccountSalary;
                incomeSource.PensionBenefits = prospect.pensionBenefits;
                incomeSource.InvestmentIncome = prospect.investmentIncome;
                incomeSource.RMD = prospect.rmd;
                incomeSource.Other = prospect.other;
                incomeSource.ExpensesAmount = prospect.expensesAmount;
                incomeSource.ClientProspectId = prospect.clientProspectId;

                var investorProfile = {};
                investorProfile.InvestmentExperience_Flag = prospect.previousFunds;
                investorProfile.Finra_Flag = prospect.FINRA;
                investorProfile.InvestmentObjective = prospect.investmentObjective;
                investorProfile.RiskProfile = prospect.riskProfile;
                investorProfile.HouseholdIncomeRange = prospect.annualHouseholdIncomeRange;
                investorProfile.NetWorthRange = prospect.netWorthRange;
                investorProfile.LifeInsuranceRange = prospect.lifeInsuranceRange;
                investorProfile.TaxBracketNumber = prospect.taxBracket;
                investorProfile.DepedentNumber = prospect.dependentsNo;
                investorProfile.Ages = prospect.ages;
                investorProfile.CurrentEmployer = prospect.currentEmployer;
                investorProfile.EmploymentStatus = prospect.employmentStatus;
                investorProfile.Occupation = prospect.occupation;
                investorProfile.EmployerAddress = prospect.employerAddress;
                investorProfile.EmployerCity = prospect.employerCity;
                investorProfile.EmployerState = prospect.employerState;
                investorProfile.EmployerZipCode = prospect.employerZipCode;
                investorProfile.HireDate = prospect.hireDate;
                investorProfile.ExpectedAnnuityDate = prospect.expectedAnnuityDate;
                investorProfile.Salary = prospect.employerSalary;
                investorProfile.ClientId = prospect.clientProspectId;

                var prospectData = {
                    Id: prospect.clientProspectId, FirstName: prospect.firstName, Title: prospect.title, MiddleInitial: prospect.middleInitial,
                    LastName: prospect.lastName, Ssn: plainSSN, DateOfBirth: prospect.dateOfBirth, MaritalStatus: prospect.maritalStatus, ReferralDate: referral, Addresses: address,
                    PhoneNumbers: phoneNumbers, Gender: prospect.gender, Email: prospect.emailAddress, ProspectIncomeSource: incomeSource,
                    ProspectInvestorProfile: investorProfile, UsCitizenFlag: prospect.usCitizen
                };


                return fetch(`${participantUrl}prospect/update`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(prospectData)
                })
                    .then(response => {
                        dispatch(ProspectAction.loaderComplete());
                        if (response.status >= 200 && response.status < 300) {
                            window.location = agileneturl;
                        } else {
                            const error = new Error(response.statusText);
                            error.response = response;
                            throw error;
                        }
                    })
                    .catch(error => { console.log('request failed', error); dispatch(ProspectAction.loaderComplete()); })
            }
            else {
                dispatch(ProspectAction.loaderComplete());
                console.log('Fix error');
            }
        }
    }
}
*/