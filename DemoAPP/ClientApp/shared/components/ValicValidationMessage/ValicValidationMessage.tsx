import React from 'react';
import PropTypes from 'prop-types';
class ValicValidationMessage extends React.Component{   
    render(){      
        const {formErrors}   = this.props;
        return ( <div className='form-errors'>
    {formErrors !== undefined? formErrors.map((field, i) => {
      if(field.errorMessage !== ""){
        return (          
		  <p  key={i}><label key={i} className="tooltip-text form-error">{ field.errorMessage} </label></p>
        )        
      } else {
        return '';
      }
    }):''}
  </div>);
    }
    static PropTypes = {
        formErrors: PropTypes.arrayOf(PropTypes.shape({            
            fieldName: PropTypes.string.isRequired,
            errorMessage: PropTypes.string.isRequired
        }).isRequired).isRequired        
    }
}

export default ValicValidationMessage;