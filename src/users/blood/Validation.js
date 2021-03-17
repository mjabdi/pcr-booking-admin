import * as EmailValidator from 'email-validator';

export default function ValidateInfo (state,setState) 
  {

    var error = false;

      if (!state.firstname || state.firstname.trim().length < 1)
      {
        setState(state => ({...state, firstnameError : true}));
        error = true;
      }
      if (state.email && state.email.length > 0  && !EmailValidator.validate(state.email))
      {
        setState(state => ({...state, emailError : true}));
        error = true;
      }

      return !error;   
  }