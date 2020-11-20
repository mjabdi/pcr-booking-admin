import * as EmailValidator from 'email-validator';

export default function ValidateInfo (state,setState) 
  {

    var error = false;

      ///validate Basic Info
      if (!state.gender)
      {
        setState(state => ({...state, genderError : true}));
        error = true;
      }
      if (!state.title)
      {
        setState(state => ({...state, titleError : true}));
        error = true;
      }
      if (!state.firstname || state.firstname.trim().length < 1)
      {
        setState(state => ({...state, firstnameError : true}));
        error = true;
      }
      if (!state.lastname || state.lastname.trim().length < 1)
      {
        setState(state => ({...state, lastnameError : true}));
        error = true;
      }
      if (!state.birthDate)
      {
        setState(state => ({...state, birthDateError : true}));
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
      if (!state.postCode || state.postCode.trim().length < 5)
      {
        setState(state => ({...state, postCodeError : true}));
        error = true;
      }
      if (!state.address || state.address.trim().length < 10)
      {
        setState(state => ({...state, addressError : true}));
        error = true;
      }    
      if (state.certificate && (!state.passportNumber || state.passportNumber.trim().length < 6))
      {
        setState(state => ({...state, passportNumberError : true}));
        error = true;
      }

      return !error;   
  }