import {
  GET_CUSTOMERS_LIST,
  GET_CUSTOMERS_LIST_FAILED,
  GET_CUSTOMER,
  GET_CUSTOMER_FAILED
} from '../../config/ActionTypes';

const INITIAL_STATE = { 
  customersList: [],
  customer: null
};

export default (state = INITIAL_STATE, action) => {
  const payload = action.payload;
  switch (action.type) {
    case GET_CUSTOMERS_LIST_FAILED: return { ...state };
    case GET_CUSTOMERS_LIST: return { ...state, 
      customersList: payload.customersList
    };
    case GET_CUSTOMER_FAILED: return { ...state };
    case GET_CUSTOMER: return { ...state, 
      customersList: payload.customersList
    };
    default:
    return state;
  }
}