import axios from 'axios';
import { SERVER } from '../../config/Keys';
import {
  SHOW_SIGN_IN_SCREEN,
  SIGN_IN_AS_EXISTING_CUSTOMER,
  SIGN_IN_AS_EXISTING_CUSTOMER_FAILED,
  RESET_EXISTING_CUSTOMER_PASSWORD,
  RESET_EXISTING_CUSTOMER_PASSWORD_FAILED,
  LOG_OUT,
} from '../../config/ActionTypes';

export const showSignInScreen = (value) => {
  return ({
    type: SHOW_SIGN_IN_SCREEN,
    payload: value
  });
};

const validatePasswordAndEmail = (password1, password2, email, firstName, surname) => {
  let lowerCaseLetters = /[a-z]/g;
  let upperCaseLetters = /[A-Z]/g;
  let numbers = /[0-9]/g;
  // eslint-disable-next-line no-useless-escape
  let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // make sure they enter a first name
  if (firstName.length < 2) {
    return ({ passValid: false, validationMessage: 'Invalid first name' })
  }
  // make sure they enter a surname
  else if (surname.length < 2) {
    return ({ passValid: false, validationMessage: 'Invalid surname' })
  }
  else if (!re.test(email)) {
  // validate email
    return ({ passValid: false, validationMessage: 'Invalid email.' })
  }
  // make sure it is at least 7 characters long
  else if (password1.length < 7) {
    return ({ passValid: false, validationMessage: 'The password must be at least 7 characters long.' })
  }
  // make sure they are identical
  else if (password1 !== password2) {
    return ({ passValid: false, validationMessage: 'The passwords entered are not the same!' });
  }
  // make sure that it contains a lowercase letter
  else if (!password1.match(lowerCaseLetters)) {
    return ({ passValid: false, validationMessage: 'The password must contain at least one lowercase letter.' })
  }
  // make sure it contains an uppercase letter
  else if (!password1.match(upperCaseLetters)) {
    return ({ passValid: false, validationMessage: 'The password must contain at least one uppercase letter.' })
  }
  // make sure it includes a number 
  else if (!password1.match(numbers)) {
    return ({ passValid: false, validationMessage: 'The password must contain at least one number.' })
  }
  return ({ passValid: true, validationMessage: null })
}

export const signInAsExistingCustomer = ({
  email,
  password,
}, callback) => {
  return async (dispatch) => {
    try {
      // validate the email & passwords
      let { passValid, validationMessage } = validatePasswordAndEmail(password, password, email, 'Placeholder', 'Placeholder');
      if (passValid) {
        // send request to server
        const response = await axios.post(
          `${SERVER}/v1/sign-in`, 
        {
          email,
          password
        });
        localStorage.setItem('JWT_TOKEN', response.data.token);
        dispatch({
          type: SIGN_IN_AS_EXISTING_CUSTOMER,
          payload: response.data
        });
        callback({ 
          success: true, 
          message: null 
        });
      } else {
        callback({ success: false, message: validationMessage });
        dispatch({ type: SIGN_IN_AS_EXISTING_CUSTOMER_FAILED });
      }
    } catch (e) {
      console.log(e);
      if (e.response) {
        callback({ success: false, message: e.response.data });
        dispatch({ type: SIGN_IN_AS_EXISTING_CUSTOMER_FAILED });
      } else {
        callback({ success: false, message: 'Failed to contact server' });
        dispatch({ type: SIGN_IN_AS_EXISTING_CUSTOMER_FAILED });
      }
    }
  };
};

export const resetPassword = ({
  email,
}, callback) => {
  return async (dispatch) => {
    try {
      // validate the email & passwords
        // send request to server
        const response = await axios.post(
          `${SERVER}/v1/reset-password`, 
        {
          email
        });
        dispatch({
          type: RESET_EXISTING_CUSTOMER_PASSWORD,
          payload: response.data
        });
        callback({ 
          success: true, 
          message: 'Your password has been reset, check your emails to see your new auto generated one.' 
        });
    } catch (e) {
      if (e.response.statusText) {
        console.log(e.response);
        callback({ success: false, message: e.response.statusText });
        dispatch({ type: RESET_EXISTING_CUSTOMER_PASSWORD_FAILED });
      } else {
        callback({ success: false, message: 'Failed to contact server' });
        dispatch({ type: RESET_EXISTING_CUSTOMER_PASSWORD_FAILED });
      }
    }
  };
};

export const logOut = () => {
  localStorage.removeItem('JWT_TOKEN');
  return ({
    type: LOG_OUT,
    payload: null,
  });
};

export const autoSignIn = (callback) => {
  return async (dispatch) => {
    try {
      const JWT = localStorage.getItem('JWT_TOKEN');
      if (JWT) {
        // get user info from the server
        const response = await axios({
          url: `${SERVER}/v1/auto-sign-in`,
          method: 'post',
          headers: {'X-Requested-With': 'XMLHttpRequest', authorization: JWT, },
          data: null 
        });
        dispatch({
          type: SIGN_IN_AS_EXISTING_CUSTOMER,
          payload: response.data
        });
        callback();
      } else {
        // literally do nothing
        callback();
        dispatch({ type: SIGN_IN_AS_EXISTING_CUSTOMER_FAILED });
      }
    } catch (e) {
        callback();
        dispatch({ type: SIGN_IN_AS_EXISTING_CUSTOMER_FAILED });
    }
  };
};