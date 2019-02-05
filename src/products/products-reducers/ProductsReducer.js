import {
  GET_PRODUCTS_LIST,
  GET_PRODUCTS_LIST_FAILED,
  GET_PRODUCT,
  GET_PRODUCT_FAILED,
} from '../../config/ActionTypes';

const INITIAL_STATE = { 
  productsList: [],
  product: null
};

export default (state = INITIAL_STATE, action) => {
  const payload = action.payload;
  switch (action.type) {
    case GET_PRODUCTS_LIST_FAILED: return { ...state };
    case GET_PRODUCTS_LIST: return { ...state, 
      productsList: payload.productsList
    };
    case GET_PRODUCT_FAILED: return { ...state };
    case GET_PRODUCT: return { ...state, 
      productsList: payload.productsList
    };
    default:
    return state;
  }
}