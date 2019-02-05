import {
  GET_TEAM_INFO,
  GET_TEAM_INFO_FAILED,
  SHOW_SIGN_IN_SCREEN,
  SIGN_IN_AS_EXISTING_CUSTOMER,
  SIGN_IN_AS_EXISTING_CUSTOMER_FAILED,
  RESET_EXISTING_CUSTOMER_PASSWORD,
  RESET_EXISTING_CUSTOMER_PASSWORD_FAILED,
  LOG_OUT,
  GET_STAFF_MEMBER_INFO_FAILED,
  GET_STAFF_MEMBER_INFO,
} from '../../config/ActionTypes';

const INITIAL_STATE = { 
  teamsList: [],
  team: null,
  isSignedIn: false,
  signInVisible: false,
  token: '',
  email: '',
  firstName: '',
  surname: '',
};

export default (state = INITIAL_STATE, action) => {
  const payload = action.payload;
  switch (action.type) {
    case SHOW_SIGN_IN_SCREEN: return { ...state, signInVisible: payload };
    case GET_TEAM_INFO_FAILED: return { ...state };
    case GET_TEAM_INFO: return { ...state, 
      team: payload.team
    };
    case SIGN_IN_AS_EXISTING_CUSTOMER_FAILED: return { ...state };
    case SIGN_IN_AS_EXISTING_CUSTOMER : return { ...state, 
      isSignedIn: true,
      token: payload.token
    };
    case RESET_EXISTING_CUSTOMER_PASSWORD: return { ...state };
    case RESET_EXISTING_CUSTOMER_PASSWORD_FAILED: return { ...state };
    case LOG_OUT: return {
      signInVisible: false,
      isSignedIn: false,
      token: '',
    };
    case GET_STAFF_MEMBER_INFO_FAILED: return { ...state };
    case GET_STAFF_MEMBER_INFO : return { ...state, 
      email: payload.email,
      firstName: payload.firstName,
      surname: payload.surname,
    };
    default:
    return state;
  }
}