import React, { Component } from 'react';
import ValicInput from '../ValicInput/ValicInput';
class InvestorProfile extends Component {
    constructor(props) {
        super(props);
        this.handleUserInput = this.handleUserInput.bind(this);
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
        return (<div>
            <div className="row">
                <div className="form-group col-sm-12">
                    <label htmlFor="previousFunds">Previously purchased mutual funds or other securities?</label>
                    <span className="checkbox" onChange={this.handleUserInput}>
                        <label className="radio-inline">
                            <input type="radio" checked={this.props.previousFunds === "1"} name="previousFunds" value="1" />Yes
                            </label>
                        <label className="radio-inline">
                            <input type="radio" value="0" name="previousFunds" checked={this.props.previousFunds === "0"} />No
                            </label>
                    </span>
                </div>
            </div>
            <div className="row">
                <div className="form-group col-sm-12">
                    <label htmlFor="FINRA">Employed by or registered with a FINRA member firm?</label>
                    <span className="checkbox" onChange={this.handleUserInput}>
                        <label className="radio-inline">
                            <input type="radio" name="FINRA" value="1" checked={this.props.FINRA === "1"} />Yes
                            </label>
                        <label className="radio-inline">
                            <input type="radio" name="FINRA" value="0" checked={this.props.FINRA === "0"} />No
                            </label>
                    </span>
                </div>
            </div>

            <div className="row">
                <div className="form-group col-sm-12">
                    <label htmlFor="investmentObjective">Investment Objective</label>
                    <span className="checkbox" onChange={this.handleUserInput}>
                        <label className="radio-inline">
                            <input type="radio" name="investmentObjective" value="SP" checked={this.props.investmentObjective === "SP"} />Safety of Principal
                            </label>
                        <label className="radio-inline">
                            <input type="radio" name="investmentObjective" value="LG" checked={this.props.investmentObjective === "LG"} />Long-Term Growth
                            </label>
                        <label className="radio-inline">
                            <input type="radio" name="investmentObjective" value="IN" checked={this.props.investmentObjective === "IN"} />Income
                            </label>
                    </span>
                </div>
            </div>
            <div className="row">
                <div className="form-group col-sm-12">
                    <label htmlFor="riskProfile">Risk Profile</label>
                    <select name="riskProfile" value={this.props.riskProfile} onChange={this.handleUserInput}>
                        <option value=""></option>
                        <option value="HR">Higher Risk</option>
                        <option value="AG">Aggressive</option>
                        <option value="MA">Moderately Aggressive</option>
                        <option value="MD">Moderate</option>
                        <option value="MC">Moderately Conservative</option>
                        <option value="CN">Conservative</option>
                        <option value="CA">Cautious</option>
                    </select>
                </div>
            </div>
            <div className="row">
                <span> Financial Situation</span>
            </div>
            <div className="row">
                <div className="form-group col-sm-12">
                    <label htmlFor="annualHouseholdIncomeRange">Annual Household Income Range</label>
                    <span className="checkbox" onChange={this.handleUserInput}>
                        <label className="radio-inline">
                            <input type="radio" name="annualHouseholdIncomeRange" value="01" checked={this.props.annualHouseholdIncomeRange === "01"} />Under $50,000
                            </label>
                        <label className="radio-inline">
                            <input type="radio" name="annualHouseholdIncomeRange" value="02" checked={this.props.annualHouseholdIncomeRange === "02"} />$50,000 - $100,000
                            </label>
                        <label className="radio-inline">
                            <input type="radio" name="annualHouseholdIncomeRange" value="03" checked={this.props.annualHouseholdIncomeRange === "03"} />Over $100,000
                            </label>
                    </span>
                </div>
            </div>
            <div className="row">
                <div className="form-group col-sm-12">
                    <label htmlFor="netWorthRange">Net Worth Range</label>
                    <span className="checkbox" onChange={this.handleUserInput}>
                        <label className="radio-inline">
                            <input type="radio" name="netWorthRange" value="1" checked={this.props.netWorthRange === "1"} />Under $50,000
                            </label>
                        <label className="radio-inline">
                            <input type="radio" name="netWorthRange" value="2" checked={this.props.netWorthRange === "2"} />$50,000 - $100,000
                            </label>
                        <label className="radio-inline">
                            <input type="radio" name="netWorthRange" value="3" checked={this.props.netWorthRange === "3"} />Over $100,000
                            </label>
                    </span>
                </div>
            </div>
            <div className="row">
                <div className="form-group col-sm-12">
                    <label htmlFor="lifeInsuranceRange">Life Insurance Range</label>
                    <span className="checkbox" onChange={this.handleUserInput}>
                        <label className="radio-inline">
                            <input type="radio" name="lifeInsuranceRange" value="01" checked={this.props.lifeInsuranceRange === "01"} />Under $50,000
                            </label>
                        <label className="radio-inline">
                            <input type="radio" name="lifeInsuranceRange" value="02" checked={this.props.lifeInsuranceRange === "02"} />$50,000 - $100,000
                            </label>
                        <label className="radio-inline">
                            <input type="radio" name="lifeInsuranceRange" value="03" checked={this.props.lifeInsuranceRange === "03"} />Over $100,000
                            </label>
                    </span>
                </div>
            </div>
            <div className="row">
                <div className="form-group col-sm-3">
                    <label htmlFor="taxBracket">Tax Bracket</label>
                    <ValicInput type="number" min="0" name="taxBracket" className="form-control" onChange={this.handleUserInput} value={this.props.taxBracket} />
                </div>
                <div className="form-group col-sm-3">
                    <label htmlFor="dependentsNo">Dependents:  Number</label>
                    <ValicInput type="number" min="0" name="dependentsNo" className="form-control" onChange={this.handleUserInput} value={this.props.dependentsNo} />
                </div>
                <div className="form-group col-sm-3">
                    <label htmlFor="ages">Ages</label>
                    <ValicInput type="number" min="0" name="ages" className="form-control" onChange={this.handleUserInput} value={this.props.ages} />
                </div>
            </div>
            <div className="row">
                <hr className="half-rule" />
            </div>
            <div className="row">
                <div className="form-group col-sm-4">
                    <label htmlFor="currentEmployer">Current Employer</label>
                    <input type="text" name="currentEmployer" className="form-control" onChange={this.handleUserInput} value={this.props.currentEmployer} />
                </div>
                <div className="form-group col-sm-8">
                    <label htmlFor="occupation">Occupation</label>
                    <input type="text" name="occupation" className="form-control" onChange={this.handleUserInput} value={this.props.occupation} />
                    <span className="checkbox" onChange={this.handleUserInput}>
                        <label className="radio-inline">
                            <input type="radio" name="employmentStatus" value="R" checked={this.props.employmentStatus === "R"} />Retired
                            </label>
                        <label className="radio-inline">
                            <input type="radio" name="employmentStatus" value="U" checked={this.props.employmentStatus === "U"} />Unemployed
                            </label>
                    </span>
                </div>

            </div>
            <div className="row">
                <div className="form-group col-sm-4">
                    <label htmlFor="employerAddress">Employer Address</label>
                    <input type="text" name="employerAddress" className="form-control" onChange={this.handleUserInput} value={this.props.employerAddress} />
                </div>
                <div className="form-group col-sm-4">
                    <label htmlFor="employerCity">City</label>
                    <input type="text" name="employerCity" className="form-control" onChange={this.handleUserInput} value={this.props.employerCity} />
                </div>
                <div className="form-group col-sm-2">
                    <label htmlFor="employerState">State</label>
                    <select name="employerState" className="form-control" onChange={this.handleUserInput} value={this.props.employerState}>
                        <option value=""></option>
                        {statesListDown}
                    </select>
                </div>
                <div className="form-group col-sm-2">
                    <label htmlFor="employerZipCode">ZipCode</label>
                    <input type="text" name="employerZipCode" maxLength="5" className="form-control" onChange={this.handleUserInput} value={this.props.employerZipCode} />
                </div>
            </div>
            <div className="row">
                <div className="form-group col-sm-2">
                    <label htmlFor="employerSalary">Salary</label>
                    <input type="number" name="employerSalary" className="form-control" min="0" onChange={this.handleUserInput} value={this.props.employerSalary} />
                </div>
                <div className="form-group col-sm-3">
                    <label htmlFor="hireDate">Hire Date</label>
                    <input type="date" name="hireDate" className="form-control" onChange={this.handleUserInput} value={this.props.hireDate} />
                </div>
                <div className="form-group col-sm-3">
                    <label htmlFor="expectedAnnuityDate">Expected Annuity Date</label>
                    <input type="date" name="expectedAnnuityDate" className="form-control" onChange={this.handleUserInput} value={this.props.expectedAnnuityDate} />
                </div>

            </div>
        </div>);
    }
}
export default InvestorProfile;