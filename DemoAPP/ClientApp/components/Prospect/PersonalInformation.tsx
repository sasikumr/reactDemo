import React, { Component } from 'react';
import ValicInput from '../ValicInput/ValicInput';
import PropTypes from 'prop-types';
import {errorClass} from '../../utility/utility';
class PersonalInformation extends Component {
    constructor(props) {
        super(props);
        this.handleUserInput = this.handleUserInput.bind(this);
        this.valicInputChange = this.valicInputChange.bind(this);
    }
    valicInputChange(e){
        const { valicInputChange } = this.props;
        valicInputChange(e);
    }
    handleUserInput(e) {
        const { onChange } = this.props;
        onChange(e);
    }   
    
    render() {
        let { states } = this.props;
        let statesListDown;
        if (states !== undefined) {

            statesListDown = Object.keys(states).map((key, index) => { return <option key={index} value={states[key].Code} >{states[key].Code}</option> })
        }
        //= states !== undefined ? states.map((item, index) => { return <option key={index} value= {item.Code}>{item.Code}</option>}): '';				
        return (
            <div>
                <div className="row form-group">
                    <div className="form-group col-sm-2">
                        <label htmlFor="title">Title</label>
                        <select className="form-control" name="title" value={this.props.title} onChange={this.handleUserInput}>
                            <option></option>
                            <option>Mr.</option>
                            <option>Mrs.</option>
                            <option>Ms.</option>
                            <option>Dr.</option>
                            <option>Rev.</option>
                        </select>
                    </div>
                    <div className={`form-group col-sm-4 ${errorClass(this.props.errors, 'firstName')}`}>

                        <label htmlFor="firstName">First Name</label>
                        <input type="text" required className="form-control" name="firstName"
                            placeholder="FirstName"
                            value={this.props.firstName}
                            onChange={this.handleUserInput} />
                    </div>
                    <div className="form-group col-sm-1">
                        <label htmlFor="middleInitial">MI</label>
                        <input type="text" className="form-control" name="middleInitial"
                            placeholder="MI" value={this.props.middleInitial}
                            maxLength="1" onChange={this.handleUserInput} />
                    </div>
                    <div className={`form-group col-sm-5 ${errorClass(this.props.errors, 'lastName')}`}>
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" required className="form-control" name="lastName"
                            placeholder="LastName"
                            value={this.props.lastName}
                            onChange={this.handleUserInput} />
                    </div>
                </div>
                <div className="row formasm-group">
                    <div className={`form-group col-sm-3 ${errorClass(this.props.errors, 'ssn')}`}>
                        <label htmlFor="ssn">SSN</label>
                        <ValicInput type="ssn" className="form-control" name="ssn"
                            placeholder="AAA-AA-AAAA" mask="***\-**\-****" maskChar="_" onChange={this.valicInputChange} required value={this.props.ssn} />
                        Only change SSN if you know the real value.
                    </div>

                    <div className="form-group col-sm-3">
                        <label htmlFor="dateOfBirth">Date Of Birth</label>
                        <input type="date" className="form-control" data-dateBirth='true' name="dateOfBirth" value={this.props.dateOfBirth} onChange={this.handleUserInput} />
                    </div>
                    <div className="form-group col-sm-3">
                        <label htmlFor="gender">Gender</label>
                        <span className="checkbox" onChange={this.handleUserInput}>
                            <label className="checkbox-inline"><input type="radio" value="1" name="gender" checked={this.props.gender === "1"} />Male</label>
                            <label className="checkbox-inline"><input type="radio" value="2" name="gender" checked={this.props.gender === "2"} />Female</label>
                        </span>
                    </div>
                    <div className="form-group col-sm-3">
                        <label htmlFor="usCitizen">US Citizen</label>
                        <span className="checkbox" onChange={this.handleUserInput}>
                            <label className="radio-inline">
                                <input type="radio" name="usCitizen" value="1" checked={this.props.usCitizen === "1"} />Yes
                            </label>
                            <label className="radio-inline">
                                <input type="radio" name="usCitizen" value="0" checked={this.props.usCitizen === "0"} />No
                            </label>
                        </span>
                    </div>
                </div>
                <div className="row form-group">
                    <div className="form-group col-sm-8">
                        <label htmlFor="maritalStatus">Marital Status</label>
                        <span className="checkbox" onChange={this.handleUserInput}>
                            <label className="checkbox-inline"><input type="radio" name="maritalStatus" value="1" checked={this.props.maritalStatus === "1"} />Married</label>
                            <label className="checkbox-inline"><input type="radio" name="maritalStatus" value="0" checked={this.props.maritalStatus === "0"} />Not Married</label>
                            <label className="checkbox-inline"><input type="radio" name="maritalStatus" value="6" checked={this.props.maritalStatus !== "1" && this.props.maritalStatus !== "0"} />Civil Union</label>
                        </span>
                    </div>
                </div>
                <div className="row">
                    <hr className="half-rule" />
                </div>
                <div className="row form-group">
                    <div className="col-sm-6">
                        <label>Home Address:</label>

                        <div className="row">
                            <div className="form-group col-sm-12">
                                <label htmlFor="homeAddressLine1">Address Line 1</label>
                                <input type="text" className="form-control" name="homeAddressLine1"
                                    placeholder="Address Line 1" onChange={this.handleUserInput} value={this.props.homeAddressLine1} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-sm-12">
                                <label htmlFor="homeAddressLine2">Address Line 2</label>
                                <input type="text" className="form-control" name="homeAddressLine2"
                                    placeholder="Address Line 2" onChange={this.handleUserInput} value={this.props.homeAddressLine2} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-sm-12">
                                <label htmlFor="homeAddressLine3">Address Line 3</label>
                                <input type="text" className="form-control" name="homeAddressLine3"
                                    placeholder="Address Line 3" onChange={this.handleUserInput} value={this.props.homeAddressLine3} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-sm-4">
                                <label htmlFor="homeAddressCity">City</label>
                                <input type="text" className="form-control" name="homeAddressCity"
                                    placeholder="City" onChange={this.handleUserInput} value={this.props.homeAddressCity} />
                            </div>
                            <div className="form-group col-sm-4">
                                <label htmlFor="homeAddressState">State</label>
                                <select name="homeAddressState" className="form-control" onChange={this.handleUserInput} value={this.props.homeAddressState} >
                                    <option value="" ></option>
                                    {statesListDown}
                                </select>
                            </div>
                            <div className="form-group col-sm-4">
                                <label htmlFor="homeAddressZipCode">Zip Code</label>
                                <input type="text" className="form-control" name="homeAddressZipCode"
                                    placeholder="ZipCode" maxLength="5" onChange={this.handleUserInput} value={this.props.homeAddressZipCode} />
                            </div>
                        </div>

                    </div>
                    <div className="col-sm-6">
                        <label>Mailing Address:</label>
                        <div className="row">
                            <div className="form-group col-sm-12">
                                <label htmlFor="mailingAddressLine1">Address Line 1</label>
                                <input type="text" className="form-control" name="mailingAddressLine1"
                                    placeholder="Address Line 1" onChange={this.handleUserInput} value={this.props.mailingAddressLine1} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-sm-12">
                                <label htmlFor="mailingAddressLine2">Address Line 2</label>
                                <input type="text" className="form-control" name="mailingAddressLine2"
                                    placeholder="Address Line 2" onChange={this.handleUserInput} value={this.props.mailingAddressLine2} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-sm-12">
                                <label htmlFor="mailingAddressLine3">Address Line 3</label>
                                <input type="text" className="form-control" name="mailingAddressLine3"
                                    placeholder="Address Line 3" onChange={this.handleUserInput} value={this.props.mailingAddressLine3} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-sm-4">
                                <label htmlFor="mailingAddressCity">City</label>
                                <input type="text" className="form-control" name="mailingAddressCity"
                                    placeholder="City" onChange={this.handleUserInput} value={this.props.mailingAddressCity} />
                            </div>
                            <div className="form-group col-sm-4">
                                <label htmlFor="mailingAddressState">State</label>

                                <select name="mailingAddressState" className="form-control" onChange={this.handleUserInput} value={this.props.mailingAddressState} >
                                    <option value=""></option>
                                    {statesListDown}
                                </select>
                            </div>
                            <div className="form-group col-sm-4">
                                <label htmlFor="mailingAddressZipCode">Zip Code</label>
                                <input type="text" className="form-control" name="mailingAddressZipCode"
                                    placeholder="ZipCode" maxLength="5" onChange={this.handleUserInput} value={this.props.mailingAddressZipCode} />
                            </div>
                        </div>

                    </div>

                </div>
                <div className="row form-group">
                    <div className="form-group col-sm-3">
                        <label htmlFor="homePhone">Home Phone</label>
                        <ValicInput type="phone" className="form-control" name="homePhone" mask="\(999\)999\-9999" maskChar="_"
                            onChange={this.valicInputChange} value={this.props.homePhone} />
                    </div>
                    <div className="form-group col-sm-3">
                        <label htmlFor="workPhone">Work Phone</label>
                        <ValicInput type="phone" className="form-control" name="workPhone" mask="\(999\)999\-9999" maskChar="_" onChange={this.valicInputChange} value={this.props.workPhone} />

                    </div>
                    <div className="form-group col-sm-3">
                        <label htmlFor="otherPhone">Other Phone</label>
                        <ValicInput type="phone" className="form-control" name="otherPhone" mask="\(999\)999\-9999" maskChar="_" onChange={this.valicInputChange} value={this.props.otherPhone} />

                    </div>

                </div>
                <div className="row form-group">
                    <div className="form-group col-sm-3">
                        <span className="checkbox col-sm-12">
                            <label className="checkbox-inline"><input type="checkbox" name="referral" onChange={this.handleUserInput} checked={this.props.referral} />Referral</label>
                        </span>
                    </div>
                </div>
                <div className="row form-group">
                    <div className="form-group col-sm-6">
                        <label htmlFor="emailAddress">Email Address</label>
                        <ValicInput type="email" className="form-control" name="emailAddress" onChange={this.valicInputChange}
                            value={this.props.emailAddress} />
                    </div>
                </div>
            </div>

        );
    }
}
PersonalInformation.propTypes ={
   /* firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    ssn: PropTypes.string.isRequired,    */
    onChange: PropTypes.func.isRequired,
    valicInputChange: PropTypes.func.isRequired,
}
export default PersonalInformation;