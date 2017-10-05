import React from 'react';
import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';
class ValicInput extends React.Component {
	constructor(props) {
		super(props);
		//this.state ={state: this.props.state, value: this.props.value};
		this.onChangeEmail = this.onChangeEmail.bind(this);
		this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
		this.onChangeSSN = this.onChangeSSN.bind(this);
		this.onChangeText = this.onChangeText.bind(this);
		this.onChangeNumber = this.onChangeNumber.bind(this);
	}
	onChangeText(e) {
		e.preventDefault();
		//let inputField = e.target;
		//this.setState({value: inputField.value});
		if (this.props.onChange !== undefined) {
			this.props.onChange(e);
		}
	}
	onChangeNumber(e) {
		e.preventDefault();
		//let inputField = e.target;
		//this.setState({value: inputField.value});
		this.props.onChange(e);
	}
	onChangeEmail(e) {
		e.preventDefault();
		let isValid = true;
		let inputField = e.target;
		isValid = this.isValid(inputField);
		inputField.errorMessage = '';
		if (isValid === false) {
			//this.addError(this.state,inputField.name, inputField.name + " is required");
			inputField.isValid = false;
			inputField.errorMessage = inputField.name + " is required";
		}
		else {
			inputField.isValid = true;
			if (this.validateEmailFormat(inputField) === false) {
				inputField.isFormatValid = false;
				inputField.errorMessage = inputField.name + ' is invalid';
			}
			else {

				inputField.isFormatValid = true;
				inputField.errorMessage = '';
				//$(inputField).parent().removeClass('has-error has-feedback');       
				//this.addError(this.props.state,inputField.name, "");
			}
		}		
		this.props.onChange(e);
	}
	onChangePhoneNumber(e) {
		e.preventDefault();
		let isValid = true;
		let inputField = e.target;
		isValid = this.isValid(inputField);

		if (isValid === false) {
			//this.addError(this.state,inputField.name, inputField.name + " is required");
			inputField.isValid = false;
			inputField.errorMessage = inputField.name + " is required";
		}
		else {
			inputField.isValid = true;
			if (this.validatePhoneNumberFormat(inputField) === false) {
				//$(inputField).parent().addClass('has-error has-feedback');       					
				inputField.isFormatValid = false;
				inputField.errorMessage = inputField.name + ' is invalid';
			}
			else {
				inputField.isFormatValid = true;
				inputField.errorMessage = '';

			}
		}

		this.props.onChange(e);
	}
	onChangeSSN(e) {
		e.preventDefault();
		let isValid = true;
		let inputField = e.target;
		isValid = this.isValid(inputField);

		if (isValid === false) {
			inputField.isValid = false;
			inputField.errorMessage = inputField.name + " is required";
		}
		else {
			inputField.isValid = true;
			if (this.validateSSNFormat(inputField) === false) {
				inputField.isFormatValid = false;
				inputField.errorMessage = inputField.name + ' is invalid';
			}
			else {
				inputField.isFormatValid = true;
				inputField.errorMessage = '';

			}
		}

		this.props.onChange(e);
	}
	validateEmailFormat(input) {
		let isFormatValid = true;
		let format = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
		if (input.value !== "" & format !== "" && format.test(input.value) === false) {
			isFormatValid = false;
		}
		return isFormatValid;
	}
	validateSSNFormat(input) {
		let isFormatValid = true;
		let format = /^[0-9A-Z]{3}-[0-9A-Z]{2}-[0-9A-Z]{4}$/;
		if (input.value !== "" & format !== "" && format.test(input.value) === false) {
			isFormatValid = false;
		}
		return isFormatValid;
	}
	validatePhoneNumberFormat(input) {
		let isFormatValid = true;
		let format = /(?:\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{4}/;
		if (input.value !== "" & format !== "" && format.test(input.value) === false) {
			isFormatValid = false;
		}
		return isFormatValid;
	}
	isValid(input) {
		let isValid = true;
		//console.log(input)
		if (input.getAttribute('required') !== null && input.value === "") {
			//$(input).parent().addClass('has-error has-feedback');           
			isValid = false;
		}
		else {
			// $(input).parent().removeClass('has-error has-feedback');
			//input.nextSibling.textContent = "";
			isValid = true;
		}
		return isValid;
	}
	render() {
		let inputType = this.props.type !== undefined && this.props.type !== null ? this.props.type : "text";
		let inputControl;
		const props = { ...this.props };

		switch (inputType.toString().toLowerCase()) {
			case "phone":
				inputControl = <InputMask  {...props} onChange={this.onChangePhoneNumber} />;
				break;
			case "number":
				inputControl = <input {...props} type="number" onChange={this.onChangeNumber} />;
				break;
			case "email":
				inputControl = <input {...props} type="email" onChange={this.onChangeEmail} />;
				break;
			case "ssn":
				inputControl = <InputMask  {...props} onChange={this.onChangeSSN} />;
				break;
			default:
				inputControl = <input {...props} type="text" onChange={this.onChangeText} />;
				break;
		}
		return inputControl;
	}


	static propTypes = {
		type: PropTypes.string.isRequired,
		onChange: PropTypes.func.isRequired,
		name: PropTypes.string.isRequired
	}
}



export default ValicInput;