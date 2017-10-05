import React, { Component } from 'react';
class IncomeSource extends Component {
    constructor(props) {
        super(props);
        this.handleUserInput = this.handleUserInput.bind(this);
    }
    handleUserInput(e) {
        const { onChange } = this.props;
        onChange(e);
    }
    render() {
        return (<div><div className="row">
            <span>Annual Household</span>
        </div>
            <div className="row">
                Income Account From:
                </div>
            <div className="row">
                <div className="col-sm-4 form-group">
                    <label htmlFor="incomeAccountSalary">Salary</label>
                    <input type="number" className="form-control" name="incomeAccountSalary" onChange={this.handleUserInput} value={this.props.incomeAccountSalary} />
                </div>
                <div className="col-sm-4 form-group">
                    <label htmlFor="socialSecurity">Social Security</label>
                    <input type="number" className="form-control" name="socialSecurity" onChange={this.handleUserInput} value={this.props.socialSecurity} />
                </div>
                <div className="col-sm-4 form-group">
                    <label htmlFor="pensionBenefits">Pension Benefits</label>
                    <input type="number" className="form-control" name="pensionBenefits" onChange={this.handleUserInput} value={this.props.pensionBenefits} />
                </div>
            </div>
            <div className="row">
                <div className="col-sm-4 form-group">
                    <label htmlFor="investmentIncome">Investment Income</label>
                    <input type="number" className="form-control" name="investmentIncome" onChange={this.handleUserInput} value={this.props.investmentIncome} />
                </div>
                <div className="col-sm-4 form-group">
                    <label htmlFor="rmd">RMD</label>
                    <input type="number" className="form-control" name="rmd" onChange={this.handleUserInput} value={this.props.rmd} />
                </div>
                <div className="col-sm-4 form-group">
                    <label htmlFor="other">Other</label>
                    <input type="number" className="form-control" name="other" min="0" onChange={this.handleUserInput} value={this.props.other} />
                </div>
            </div>
            <div className="row">
                <div className="col-sm-4 form-group">
                    <label htmlFor="expensesAmount">Expenses Amount</label>
                    <input type="number" className="form-control" name="expensesAmount" onChange={this.handleUserInput} value={this.props.expensesAmount} />
                </div>
            </div>
        </div>);
    }
}
export default IncomeSource;