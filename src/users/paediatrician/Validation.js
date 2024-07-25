import * as EmailValidator from 'email-validator';

export default function ValidateInfo (state,setState) 
  {

    var error = false;

      if (!state.firstname || state.firstname.trim().length < 1)
      {
        setState(state => ({...state, firstnameError : true}));
        error = true;
      }
      if (!state.email || !EmailValidator.validate(state.email))
      {
        setState(state => ({...state, emailError : true}));
        error = true;
      }

      if (!state.retypeEmail || !EmailValidator.validate(state.retypeEmail) || state.email !== state.retypeEmail)
      {
        setState(state => ({...state, retypeEmailError : true}));
        error = true;
      }

      if (!state.phone || state.phone.trim().length < 6)
      {
        setState(state => ({...state, phoneError : true}));
        error = true;
      }

      return !error;   
  }